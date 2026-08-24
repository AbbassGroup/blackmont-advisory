// Mirrors the money rules in backend/utils/offerTermSheetLogic.js; the server value wins.
const DEPOSIT_RATE = 0.1;
const MINIMUM_DEPOSIT = 25000;

const round2 = (n: number) => Math.round(n * 100) / 100;

export interface Amounts {
  depositAmount: number | null;
  balanceAmount: number | null;
}

const isBlank = (v: unknown) => v === null || v === undefined || v === '';

// The default deposit when neither party states one: 10% with a $25,000 floor.
export function computeAmounts(
  purchasePrice: number | null | undefined,
): Amounts {
  const price = Number(purchasePrice);
  if (!Number.isFinite(price) || price <= 0) {
    return { depositAmount: null, balanceAmount: null };
  }
  const deposit = Math.min(
    round2(Math.max(price * DEPOSIT_RATE, MINIMUM_DEPOSIT)),
    round2(price),
  );
  return { depositAmount: deposit, balanceAmount: round2(price - deposit) };
}

// A stated deposit is kept, a blank one takes the default, and the balance is the remainder.
export function resolveAmounts(
  purchasePrice: number | null | undefined,
  depositAmount: number | null | undefined,
): Amounts {
  const price = Number(purchasePrice);
  if (!Number.isFinite(price) || price <= 0) {
    return { depositAmount: null, balanceAmount: null };
  }
  if (isBlank(depositAmount)) return computeAmounts(price);

  const stated = Number(depositAmount);
  if (!Number.isFinite(stated)) return computeAmounts(price);

  const deposit = Math.min(Math.max(round2(stated), 0), round2(price));
  return { depositAmount: deposit, balanceAmount: round2(price - deposit) };
}

// A deposit larger than the price is a typo worth stopping.
export function depositExceedsPrice(
  purchasePrice: number | null | undefined,
  depositAmount: number | null | undefined,
): boolean {
  if (isBlank(purchasePrice) || isBlank(depositAmount)) return false;
  const price = Number(purchasePrice);
  const deposit = Number(depositAmount);
  if (!Number.isFinite(price) || !Number.isFinite(deposit)) return false;
  return deposit > price;
}

// True while the deposit is still the untouched default, so a price change may re-derive it.
export function isDefaultDeposit(
  purchasePrice: number | null | undefined,
  depositAmount: number | null | undefined,
): boolean {
  if (isBlank(depositAmount)) return true;
  return computeAmounts(purchasePrice).depositAmount === Number(depositAmount);
}
