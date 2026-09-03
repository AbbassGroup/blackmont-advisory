export interface EbitdaBracket {
  floor: number;
  label: string;
  min: number;
  max: number;
}

export const EBITDA_BRACKETS: EbitdaBracket[] = [
  { floor: 10_000_000, label: '$10M+', min: 6.0, max: 10.0 },
  { floor: 5_000_000, label: '$5M – $10M', min: 5.0, max: 8.0 },
  { floor: 2_500_000, label: '$2.5M – $5M', min: 3.8, max: 6.5 },
  { floor: 1_000_000, label: '$1M – $2.5M', min: 3.0, max: 5.0 },
  { floor: 500_000, label: '$500k – $1M', min: 2.2, max: 4.0 },
  { floor: 250_000, label: '$250k – $500k', min: 1.6, max: 3.0 },
  { floor: 100_000, label: '$100k – $250k', min: 1.2, max: 2.4 },
  { floor: 0, label: 'Under $100k', min: 0.8, max: 1.8 },
];

const SMALLEST_BRACKET = EBITDA_BRACKETS[EBITDA_BRACKETS.length - 1];

export function bracketFor(ebitda: number): EbitdaBracket {
  return EBITDA_BRACKETS.find(({ floor }) => ebitda >= floor) ?? SMALLEST_BRACKET;
}
