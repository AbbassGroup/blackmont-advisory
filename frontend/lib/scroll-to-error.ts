/**
 * Scrolls the page (or a scrollable container) to the first form field
 * that has a validation error.
 *
 * Usage:
 *   scrollToError('businessName', containerRef)
 *   scrollToError('customerEmail')
 *
 * @param fieldName - The `name` or `id` attribute of the input/select to scroll to.
 *                    Falls back to a `data-field` attribute selector.
 * @param container - Optional scrollable container element. If omitted, uses
 *                    document-level scrollIntoView.
 */
export function scrollToError(
  fieldName: string,
  container?: HTMLElement | null,
) {
  // Try multiple selector strategies
  const selectors = [
    `[name="${fieldName}"]`,
    `#${fieldName}`,
    `[data-field="${fieldName}"]`,
  ];

  let target: HTMLElement | null = null;
  for (const selector of selectors) {
    target = (container ?? document).querySelector<HTMLElement>(selector);
    if (target) break;
  }

  if (!target) return;

  // Scroll the element into view within the container or the page
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Attempt to focus the element after scrolling
  setTimeout(() => {
    target?.focus({ preventScroll: true });
  }, 400);
}
