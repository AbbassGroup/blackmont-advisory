const { sendMail } = require('./mailer');


const ALERT_TO = process.env.ERROR_ALERT_EMAIL;

const ALERT_FROM = process.env.FROM_EMAIL;

// Dedup window: identical errors within this window send at most one email.
const THROTTLE_MS = parseInt(process.env.ERROR_ALERT_THROTTLE_MS, 10) || 10 * 60 * 1000;
const recentAlerts = new Map();

// Periodically drop stale entries so the map can't grow unbounded.
const CLEANUP_MS = 60 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [key, meta] of recentAlerts) {
    if (now - meta.lastSent > THROTTLE_MS) recentAlerts.delete(key);
  }
}, CLEANUP_MS).unref?.();

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Never surface secrets in an alert email.
const REDACT_KEYS = /pass(word)?|token|secret|authorization|cookie|card|cvv|ssn/i;

function safeStringify(obj) {
  try {
    if (obj == null) return '';
    const seen = new WeakSet();
    return JSON.stringify(
      obj,
      (key, val) => {
        if (REDACT_KEYS.test(key)) return '[redacted]';
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) return '[circular]';
          seen.add(val);
        }
        return val;
      },
      2
    );
  } catch {
    return String(obj);
  }
}

function normalizeError(error) {
  if (!error) return { message: '', stack: '' };
  if (typeof error === 'string') return { message: error, stack: '' };
  return {
    message: error.message || String(error),
    stack: error.stack || '',
  };
}

/**
 * Report a server-side error via email.
 *
 * @param {Object} context
 * @param {string} [context.source]     - Where it happened, e.g. "API 500", "uncaughtException", "client".
 * @param {string} [context.endpoint]   - Request path (req.originalUrl).
 * @param {string} [context.method]     - HTTP method.
 * @param {number} [context.statusCode] - Response status code.
 * @param {Error|string} [context.error]- The underlying error.
 * @param {string} [context.ip]         - Client IP.
 * @param {Object} [context.body]       - Request body (sensitive keys are redacted).
 * @param {Object} [context.extra]      - Any additional detail to include.
 */
async function notifyError(context = {}) {
  try {
    if (!ALERT_TO) {
      console.error('[errorNotifier] No ERROR_ALERT_EMAIL / ADMIN_EMAIL configured; skipping alert.');
      return;
    }

    const {
      source = 'server',
      endpoint = '',
      method = '',
      statusCode = '',
      error,
      ip = '',
      body,
      extra,
    } = context;

    const { message, stack } = normalizeError(error);

    // Throttle by what makes two errors "the same": where + what.
    const throttleKey = `${source}|${method}|${endpoint}|${message}`;
    const now = Date.now();
    const existing = recentAlerts.get(throttleKey);

    if (existing && now - existing.lastSent < THROTTLE_MS) {
      existing.suppressed += 1;
      return;
    }

    // How many identical errors were swallowed since the last email for this key.
    const suppressedCount = existing ? existing.suppressed : 0;
    recentAlerts.set(throttleKey, { lastSent: now, suppressed: 0 });

    const subjectBits = [statusCode, method, endpoint].filter(Boolean).join(' ');
    const subject = `[Site Error] ${subjectBits || source}${message ? ` — ${message.slice(0, 80)}` : ''}`;

    const rows = [
      ['Site', 'Blackmont Advisory'],
      ['Source', source],
      ['Endpoint', `${method} ${endpoint}`.trim()],
      ['Status', statusCode],
      ['Error', message],
      ['Client IP', ip],
      ['Time', new Date().toISOString()],
    ].filter(([, v]) => v !== '' && v != null);

    const suppressedNote =
      suppressedCount > 0
        ? `<p style="color:#b45309;">⚠️ ${suppressedCount} identical error(s) were suppressed in the last ${Math.round(
          THROTTLE_MS / 60000
        )} minutes.</p>`
        : '';

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;">
        <h2 style="margin:0 0 12px;">A user encountered an error</h2>
        ${suppressedNote}
        <table style="border-collapse:collapse;">
          ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top;">${escapeHtml(
              k
            )}</td><td style="padding:4px 0;">${escapeHtml(v)}</td></tr>`
        )
        .join('')}
        </table>
        ${body
        ? `<h3 style="margin:16px 0 4px;">Request body</h3><pre style="background:#f5f5f5;padding:12px;border-radius:6px;overflow:auto;">${escapeHtml(
          safeStringify(body)
        )}</pre>`
        : ''
      }
        ${extra
        ? `<h3 style="margin:16px 0 4px;">Details</h3><pre style="background:#f5f5f5;padding:12px;border-radius:6px;overflow:auto;">${escapeHtml(
          safeStringify(extra)
        )}</pre>`
        : ''
      }
        ${stack
        ? `<h3 style="margin:16px 0 4px;">Stack trace</h3><pre style="background:#f5f5f5;padding:12px;border-radius:6px;overflow:auto;">${escapeHtml(
          stack
        )}</pre>`
        : ''
      }
      </div>
    `;

    const text = [
      'A user encountered an error',
      ...rows.map(([k, v]) => `${k}: ${v}`),
      body ? `\nRequest body:\n${safeStringify(body)}` : '',
      extra ? `\nDetails:\n${safeStringify(extra)}` : '',
      stack ? `\nStack trace:\n${stack}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    await sendMail({
      to: ALERT_TO,
      from: ALERT_FROM,
      subject,
      text,
      html,
    });
  } catch (err) {
    // Last line of defense: alerting must never throw into the caller.
    console.error('[errorNotifier] Failed to send error alert:', err && err.message);
  }
}

module.exports = { notifyError };
