import { apiClient } from '@/lib/api';

/**
 * Client for the blogs API (`backend/routes/blogs.js`).
 *
 * That API wraps every response in `{ success, statusCode, message, data }`,
 * unlike the rest of this backend which returns bare JSON — so unwrapping lives
 * here rather than being repeated in each component.
 */

export const BLOGS_API = '/api/blogs';

/** Matches the backend's default page size. */
export const BLOGS_PER_PAGE = 12;

export type Blog = {
  _id: string;
  id?: string;
  title: string;
  content: string;
  image: string | null;
  url: string | null;
  category: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogPagination = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type BlogListResult = {
  blogs: Blog[];
  pagination: BlogPagination;
};

const EMPTY_PAGINATION: BlogPagination = {
  total: 0,
  page: 1,
  perPage: BLOGS_PER_PAGE,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

/** Turn a title into the URL slug the article is published under. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** The message the API sent, falling back to something readable. */
export function blogErrorMessage(error: any, fallback: string): string {
  return error?.response?.data?.message || error?.message || fallback;
}

export async function listBlogs(params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<BlogListResult> {
  const { data } = await apiClient.get(BLOGS_API, {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? BLOGS_PER_PAGE,
      ...(params.search ? { search: params.search } : {}),
      ...(params.category ? { category: params.category } : {}),
    },
  });

  return {
    blogs: data?.data ?? [],
    pagination: data?.pagination ?? EMPTY_PAGINATION,
  };
}

/**
 * Server-side list fetch for the public Resources page.
 *
 * Deliberately native `fetch` rather than the axios client: only fetch goes
 * through Next's data cache, so the published list is revalidated on a timer
 * instead of hitting the API on every visit. The axios client stays the path
 * for the admin portal, which is browser-only and wants no caching at all.
 */
export async function fetchPublicBlogs(params: {
  page?: number;
  limit?: number;
  category?: string;
  /** Seconds before the cached list is refetched. */
  revalidate?: number;
}): Promise<BlogListResult> {
  const query = new URLSearchParams({
    page: String(params.page ?? 1),
    limit: String(params.limit ?? BLOGS_PER_PAGE),
  });
  if (params.category) query.set('category', params.category);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';
  const response = await fetch(`${baseUrl}${BLOGS_API}?${query.toString()}`, {
    next: { revalidate: params.revalidate ?? 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load blogs (${response.status})`);
  }

  const body = await response.json();
  return {
    blogs: body?.data ?? [],
    pagination: body?.pagination ?? EMPTY_PAGINATION,
  };
}

/**
 * Server-side single-article fetch for the public article page.
 *
 * Returns null when the article doesn't exist so the caller can render a 404,
 * rather than throwing and turning a missing slug into a 500.
 */
export async function fetchPublicBlog(
  slug: string,
  options: { revalidate?: number } = {},
): Promise<Blog | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';
  const response = await fetch(
    `${baseUrl}${BLOGS_API}/${encodeURIComponent(slug)}`,
    { next: { revalidate: options.revalidate ?? 300 } },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to load blog (${response.status})`);
  }

  const body = await response.json();
  return body?.data ?? null;
}

/**
 * Every published slug, for `generateStaticParams` and the sitemap.
 *
 * Pages through the list rather than assuming one request covers it, so this
 * keeps working as the blog grows past a single page.
 */
export async function fetchAllPublicBlogSlugs(
  options: { revalidate?: number } = {},
): Promise<Array<{ url: string; updatedAt: string }>> {
  const slugs: Array<{ url: string; updatedAt: string }> = [];

  for (let page = 1; ; page += 1) {
    const { blogs, pagination } = await fetchPublicBlogs({
      page,
      limit: 100,
      revalidate: options.revalidate ?? 3600,
    });

    for (const blog of blogs) {
      if (blog.url) slugs.push({ url: blog.url, updatedAt: blog.updatedAt });
    }

    if (!pagination.hasNextPage) break;
  }

  return slugs;
}

/** Fetch one article. Accepts the ObjectId or the article's slug. */
export async function getBlog(idOrSlug: string): Promise<Blog> {
  const { data } = await apiClient.get(`${BLOGS_API}/${idOrSlug}`);
  return data.data;
}

export async function createBlog(formData: FormData): Promise<Blog> {
  const { data } = await apiClient.post(BLOGS_API, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function updateBlog(id: string, formData: FormData): Promise<Blog> {
  const { data } = await apiClient.put(`${BLOGS_API}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await apiClient.delete(`${BLOGS_API}/${id}`);
}

/** Upload a standalone image (editor insert / quick upload) and get its URL. */
export async function uploadBlogImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await apiClient.post(`${BLOGS_API}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data.url;
}

/**
 * Whether a slug is already used by another article.
 *
 * The backend enforces this with a unique index (409 on save); this is the
 * live check so the form can warn before the user hits Publish. A slug lookup
 * that 404s is free — anything else is treated as taken so we fail closed.
 */
export async function isSlugTaken(slug: string, currentId?: string): Promise<boolean> {
  try {
    const existing = await getBlog(slug);
    if (!existing) return false;
    // Editing an article that already owns this slug is not a conflict.
    return String(existing._id) !== String(currentId ?? '');
  } catch (error: any) {
    if (error?.response?.status === 404) return false;
    throw error;
  }
}
