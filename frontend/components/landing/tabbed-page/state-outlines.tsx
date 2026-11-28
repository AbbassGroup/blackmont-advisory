/**
 * Simplified state outlines for the Locations cards (decorative only).
 * Source: Australian state boundaries (ABS-derived GeoJSON, github.com/rowanhogan/australian-states),
 * mainland outline only, projected and simplified to ~150 points, normalised to a 100-unit box.
 *
 * The path data lives once in /public/state-outlines.svg and is referenced with <use>,
 * instead of being inlined (twice: HTML + RSC payload) on every card. `fill` set on the
 * outer <svg> inherits into the sprite, so the colour/hover classes work as before.
 */
export const STATE_OUTLINES: Record<string, { id: string; viewBox: string }> = {
  'New South Wales': { id: 'nsw', viewBox: '0 0 100 88' },
  'Victoria': { id: 'vic', viewBox: '0 0 100 71.2' },
  'Queensland': { id: 'qld', viewBox: '0 0 79.1 100' },
  'Western Australia': { id: 'wa', viewBox: '0 0 67.4 100' },
};

export function StateOutline({ name, className }: { name: string; className: string }) {
  const outline = STATE_OUTLINES[name];
  if (!outline) return null;
  return (
    <svg aria-hidden='true' focusable='false' viewBox={outline.viewBox} className={className}>
      <use href={`/state-outlines.svg#${outline.id}`} />
    </svg>
  );
}
