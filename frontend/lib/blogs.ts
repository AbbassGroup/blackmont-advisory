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
