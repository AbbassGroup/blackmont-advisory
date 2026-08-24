/**
 * Renders a Digital Proposal to PDF with headless Chrome.
 *
 * Two passes: Chrome applies one header template to every page, so the cover is
 * rendered edge-to-edge without one, the body with it, and pdf-lib stitches them.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

const SYSTEM_CHROME_PATHS = [
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/snap/bin/chromium',
];

const CACHE_BINARIES = [
  'chrome-linux64/chrome',
  'chrome-linux/chrome',
  'chrome-win64/chrome.exe',
  'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
];

function findInCache(root) {
  const dir = path.join(root, 'chrome');
  let versions;
  try {
    versions = fs.readdirSync(dir);
  } catch {
    return null;
  }
  for (const version of versions) {
    for (const rel of CACHE_BINARIES) {
      const candidate = path.join(dir, version, rel);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
}

/**
 * Override, then Puppeteer's own binary, then any Chrome in a known cache, then
 * a system one. The cache scan matters: a stale PUPPETEER_CACHE_DIR (inherited
 * from a CI shell, or stuck in a pm2 dump) otherwise hides a good install.
 */
async function resolveChromePath() {
  const override = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (override) return fs.existsSync(override) ? override : null;

  try {
    const bundled = await puppeteer.executablePath();
    if (bundled && fs.existsSync(bundled)) return bundled;
  } catch {
    /* keep looking */
  }

  const roots = [
    process.env.PUPPETEER_CACHE_DIR,
    path.join(os.homedir(), '.cache', 'puppeteer'),
    '/root/.cache/puppeteer',
    path.join(__dirname, '..', '.cache', 'puppeteer'),
  ].filter(Boolean);
  for (const root of roots) {
    const found = findInCache(root);
    if (found) return found;
  }

  return SYSTEM_CHROME_PATHS.find((p) => fs.existsSync(p)) ?? null;
}

// A4 at 96dpi.
const A4 = { width: 794, height: 1123 };

// Top clears the running header and leaves daylight under its rule.
const BODY_MARGIN_MM = { top: 30, bottom: 16, left: 14, right: 14 };
const BODY_MARGIN = Object.fromEntries(
  Object.entries(BODY_MARGIN_MM).map(([k, v]) => [k, `${v}mm`]),
);

// Body pages lay out at the printable width, not the full sheet — Recharts
// measures its container, and would otherwise size to 210mm and get clipped.
const MM_TO_PX = 96 / 25.4;
const BODY_VIEWPORT = {
  width: Math.round(A4.width - (BODY_MARGIN_MM.left + BODY_MARGIN_MM.right) * MM_TO_PX),
  height: Math.round(A4.height - (BODY_MARGIN_MM.top + BODY_MARGIN_MM.bottom) * MM_TO_PX),
};

const READY_SELECTOR = '[data-pdf-ready="true"]';
const READY_TIMEOUT = 45000;

let browserPromise = null;

// One Chrome per process, relaunched if it dies.
function getBrowser() {
  if (!browserPromise) {
    browserPromise = resolveChromePath()
      .then((executablePath) =>
        puppeteer.launch({
          headless: true,
          executablePath: executablePath || undefined,
          // Containers and most VPS images can't use Chrome's sandbox.
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        }),
      )
      .then((browser) => {
        browser.on('disconnected', () => {
          browserPromise = null;
        });
        return browser;
      })
      .catch((error) => {
        browserPromise = null;
        throw new Error(
          `Chrome could not start: ${error.message}. Run "npx puppeteer browsers install chrome" on the server, or point PUPPETEER_EXECUTABLE_PATH at an installed Chrome.`,
        );
      });
  }
  return browserPromise;
}

async function renderPart(url, { viewport = A4, ...pdfOptions } = {}) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // Only affects raster assets; text stays vector.
    await page.setViewport({ ...viewport, deviceScaleFactor: 1.5 });
    await page.emulateMediaType('print');
    const response = await page
      .goto(url, { waitUntil: 'networkidle0', timeout: READY_TIMEOUT })
      .catch((e) => {
        throw new Error(`Could not load the render page at ${url} — ${e.message}`);
      });
    if (response && !response.ok()) {
      throw new Error(
        `The render page returned HTTP ${response.status()}. Is the frontend deployed with /proposal-pdf, and is FRONTEND_URL correct?`,
      );
    }
    await page.waitForSelector(READY_SELECTOR, { timeout: READY_TIMEOUT }).catch(() => {
      throw new Error(
        'The render page never finished loading its data. Check that the backend URL the page calls (NEXT_PUBLIC_API_URL) is reachable from the browser.',
      );
    });
    return await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      ...pdfOptions,
    });
  } finally {
    await page.close().catch(() => {});
  }
}

function headerTemplate(logoDataUri, title) {
  const mark = logoDataUri
    ? `<img src="${logoDataUri}" style="height:30px;width:auto;display:block" />`
    : `<span style="font-size:14px;font-weight:700;letter-spacing:.08em;color:#16233b">BLACKMONT ADVISORY</span>`;
  return `
    <div style="width:100%;font-family:Helvetica,Arial,sans-serif;color:#16233b;
                padding:0 14mm;margin-top:7mm;">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;
                  padding-bottom:5px;border-bottom:.8px solid #c9a84c;">
        ${mark}
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:.18em;
                     color:#4b5563;line-height:1;">${escapeHtml(title)}</span>
      </div>
    </div>`;
}

function footerTemplate() {
  return `
    <div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7px;color:#9aa1ac;
                padding:0 14mm;margin-bottom:7mm;text-align:right;font-size:8px;">
      <span class="pageNumber"></span>
    </div>`;
}

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let logoPromise = null;
function getLogo(frontendUrl) {
  if (!logoPromise) {
    logoPromise = fetch(`${frontendUrl}/assets/blackmont.png`)
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .then((buf) => (buf ? `data:image/png;base64,${Buffer.from(buf).toString('base64')}` : null))
      .catch(() => null);
  }
  return logoPromise;
}

async function renderProposalPdf({ id, token, frontendUrl, title = 'Business Appraisal' }) {
  const base = `${frontendUrl.replace(/\/$/, '')}/proposal-pdf/${id}?token=${encodeURIComponent(token)}`;
  const logo = await getLogo(frontendUrl.replace(/\/$/, ''));

  const [cover, body] = await Promise.all([
    renderPart(`${base}&part=cover`, {
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
      displayHeaderFooter: false,
    }),
    renderPart(`${base}&part=body`, {
      viewport: BODY_VIEWPORT,
      margin: BODY_MARGIN,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate(logo, title),
      footerTemplate: footerTemplate(),
    }),
  ]);

  const out = await PDFDocument.create();
  for (const bytes of [cover, body]) {
    const src = await PDFDocument.load(bytes);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  return Buffer.from(await out.save());
}

// Logs at startup whether export can work, rather than failing on first use.
async function checkPdfRenderer() {
  try {
    const path = await resolveChromePath();
    if (path) {
      console.log('PDF renderer ready - Chrome at', path);
      return true;
    }
    const cacheDir = process.env.PUPPETEER_CACHE_DIR;
    console.warn(
      [
        'PDF export is UNAVAILABLE: no Chrome found on this host.',
        cacheDir
          ? `  PUPPETEER_CACHE_DIR is ${cacheDir}${
              cacheDir.startsWith('/tmp') ? ' - /tmp does not survive a reboot' : ''
            }`
          : '  PUPPETEER_CACHE_DIR is unset (Puppeteer looks in ~/.cache/puppeteer).',
        '  Fix: run "npx puppeteer browsers install chrome" as the user that runs this',
        '  process, or set PUPPETEER_EXECUTABLE_PATH to an installed Chrome/Chromium.',
      ].join('\n'),
    );
  } catch (error) {
    console.warn('PDF export is UNAVAILABLE:', error.message);
  }
  return false;
}

async function closePdfBrowser() {
  if (!browserPromise) return;
  const browser = await browserPromise.catch(() => null);
  browserPromise = null;
  if (browser) await browser.close().catch(() => {});
}

module.exports = { renderProposalPdf, checkPdfRenderer, closePdfBrowser };
