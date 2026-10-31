import { apiClient } from '@/lib/api';

/**
 * Client for the authors API (`backend/routes/authors.js`) — the named experts
 * credited on Resources articles. Same `{ success, data }` envelope as blogs.
 */

export const AUTHORS_API = '/api/authors';

export type Author = {
  _id: string;
  name: string;
  /** Public profile path segment: /team/<slug>. */
  slug: string;
  role: string;
  /** Plain text; blank lines separate paragraphs. */
  bio: string;
  credentials: string[];
  photo: string | null;
  linkedin: string;
  createdAt?: string;
  updatedAt?: string;
};

export const authorPath = (author: Pick<Author, 'slug'>) => `/team/${author.slug}`;

/** Bio split into paragraphs for rendering. */
export const bioParagraphs = (bio: string) =>
  bio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

// ─── Admin (browser, axios, uncached) ─────────────────────────────────────────

export async function listAuthors(): Promise<Author[]> {
  const { data } = await apiClient.get(AUTHORS_API);
  return data?.data ?? [];
}

export async function createAuthor(formData: FormData): Promise<Author> {
  const { data } = await apiClient.post(AUTHORS_API, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function updateAuthor(id: string, formData: FormData): Promise<Author> {
  const { data } = await apiClient.put(`${AUTHORS_API}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function deleteAuthor(id: string): Promise<void> {
  await apiClient.delete(`${AUTHORS_API}/${id}`);
}

// ─── Public (server, native fetch so Next caches it) ──────────────────────────

const apiBase = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';

export async function fetchPublicAuthors(
  options: { revalidate?: number } = {},
): Promise<Author[]> {
  const response = await fetch(`${apiBase()}${AUTHORS_API}`, {
    next: { revalidate: options.revalidate ?? 300 },
  });
  if (!response.ok) throw new Error(`Failed to load authors (${response.status})`);
  const body = await response.json();
  return body?.data ?? [];
}

/** Null when the author doesn't exist, so the caller can render a 404. */
export async function fetchPublicAuthor(
  slug: string,
  options: { revalidate?: number } = {},
): Promise<Author | null> {
  const response = await fetch(`${apiBase()}${AUTHORS_API}/${encodeURIComponent(slug)}`, {
    next: { revalidate: options.revalidate ?? 300 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to load author (${response.status})`);
  const body = await response.json();
  return body?.data ?? null;
}
