/** Sale status tag shown on every listing. Values must match `Listing.saleStatus` in the backend model. */
export const LISTING_STATUSES = [
  { value: 'for-sale', label: 'For Sale' },
  { value: 'under-offer', label: 'Under Offer' },
] as const;

export type ListingStatus = (typeof LISTING_STATUSES)[number]['value'];

export const DEFAULT_LISTING_STATUS: ListingStatus = 'for-sale';

/** Normalises a stored value; listings saved before the tag existed count as "For Sale". */
export function toListingStatus(value?: string | null): ListingStatus {
  return LISTING_STATUSES.some((status) => status.value === value)
    ? (value as ListingStatus)
    : DEFAULT_LISTING_STATUS;
}

export function listingStatusLabel(value?: string | null): string {
  const status = toListingStatus(value);
  return LISTING_STATUSES.find((item) => item.value === status)!.label;
}
