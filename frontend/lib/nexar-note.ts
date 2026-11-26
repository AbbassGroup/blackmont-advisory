const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Builds an HTML note for the Nexar CRM: one "<b>Label:</b> value" line per
 * entry, separated by <br>. Entries with an empty value are skipped.
 */
export function buildNexarNote(entries: Array<[label: string, value?: string]>) {
  return entries
    .map(([label, value]) => [label, value?.trim() ?? ''] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}`)
    .join('<br>');
}
