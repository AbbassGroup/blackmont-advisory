// Fire-and-forget event tracker for the public /access lead pages.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';
const ENDPOINT = `${API_URL}/api/access-analytics/event`;
const SID_KEY = 'abb_access_sid';

export type AccessEventType =
  | 'page_view'
  | 'resource_open'
  | 'lead_submitted'
  | 'tool_started'
  | 'tool_completed'
  | 'cta_click';

export interface AccessLead {
  name?: string;
  email?: string;
  phone?: string;
  industry?: string;
  location?: string;
  comments?: string;
  leadType?: 'resource_gate' | 'consultation';
}

interface TrackOptions {
  resource?: string;
  lead?: AccessLead;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let sid = localStorage.getItem(SID_KEY);
    if (!sid) {
      sid =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return '';
  }
}

function getUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const map: Record<string, string> = {
    utm_source: 'utmSource',
    utm_medium: 'utmMedium',
    utm_campaign: 'utmCampaign',
    utm_term: 'utmTerm',
    utm_content: 'utmContent',
  };
  const out: Record<string, string> = {};
  for (const [param, key] of Object.entries(map)) {
    const value = params.get(param);
    if (value) out[key] = value;
  }
  return out;
}

export function trackAccessEvent(
  type: AccessEventType,
  options: TrackOptions = {},
): void {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      type,
      resource: options.resource,
      path: window.location.pathname,
      sessionId: getSessionId(),
      referrer: document.referrer || undefined,
      ...getUtm(),
      ...(options.lead ? { lead: options.lead } : {}),
    };
    const body = JSON.stringify(payload);

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(ENDPOINT, blob);
      return;
    }
    void fetch(ENDPOINT, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body,
    }).catch(() => {});
  } catch {
    /* never disrupt the page */
  }
}
