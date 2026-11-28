/**
 * Link attributes for blog article HTML.
 *
 * TipTap's Link extension defaults every link to
 * `target="_blank" rel="noopener noreferrer nofollow"`. On links to our own
 * pages that is wrong: `nofollow` tells Google not to pass ranking signals
 * through internal links, and a new tab is unexpected for a same-site link.
 *
 * - Internal links (relative, or to blackmontadvisory.com): same tab, no `rel`.
 * - External links: new tab with `rel="noopener noreferrer"`. Any `nofollow`
 *   an author set deliberately on an external link is preserved.
 */

const SITE_HOSTS = new Set(['blackmontadvisory.com', 'www.blackmontadvisory.com']);

export function isInternalHref(href: string): boolean {
  const value = href.trim();
  if (!value) return false;
  if (value.startsWith('#') || (value.startsWith('/') && !value.startsWith('//'))) return true;
  try {
    return SITE_HOSTS.has(new URL(value, 'https://blackmontadvisory.com').hostname.toLowerCase())
      && /^(https?:)?\/\//i.test(value);
  } catch {
    return false;
  }
}

/** The `target`/`rel` a link to `href` should carry (null = attribute omitted). */
export function linkAttributesFor(href: string): { target: string | null; rel: string | null } {
  return isInternalHref(href)
    ? { target: null, rel: null }
    : { target: '_blank', rel: 'noopener noreferrer' };
}

const ATTR = (name: string) => new RegExp(`\\s${name}\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s>]+)`, 'i');
const HREF = /\shref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;

/**
 * Removes `target` and `rel` from every <a> pointing at our own site, so
 * internal links are followed and open in the same tab. External links are
 * left untouched. String-based so it runs the same on server, client and in
 * maintenance scripts.
 */
export function normalizeInternalLinks(html: string): string {
  if (!html || !html.includes('<a')) return html;
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const m = tag.match(HREF);
    const href = m ? (m[1] ?? m[2] ?? m[3] ?? '') : '';
    if (!isInternalHref(href)) return tag;
    return tag.replace(ATTR('target'), '').replace(ATTR('rel'), '');
  });
}
