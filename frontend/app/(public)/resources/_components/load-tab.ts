import { BLOGS_PER_PAGE, fetchPublicBlogs, type Blog, type ResourceType } from '@/lib/blogs';

/** `?page=` is user input — anything that isn't a positive integer is page 1. */
export function toPageNumber(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

/**
 * One page of one Resources tab. An API outage degrades the tab to its
 * "unavailable" message rather than taking the whole page down.
 */
export async function loadResourceTab(type: ResourceType, page: number) {
  let blogs: Blog[] = [];
  let totalPages = 1;
  let failed = false;

  try {
    const result = await fetchPublicBlogs({ page, limit: BLOGS_PER_PAGE, type });
    blogs = result.blogs;
    totalPages = result.pagination.totalPages;
  } catch (error) {
    console.error(`Failed to load ${type} resources:`, error);
    failed = true;
  }

  return { blogs, totalPages, failed };
}

/** Canonical for a paged tab: page 1 is the bare path, later pages keep ?page=. */
export const pagedCanonical = (path: string, page: number) =>
  page === 1 ? path : `${path}?page=${page}`;
