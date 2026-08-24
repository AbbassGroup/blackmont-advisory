'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Loader2, Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getBlog, blogErrorMessage, type Blog } from '@/lib/blogs';

interface BlogViewDialogProps {
  blogId: string | null;
  onClose: () => void;
}

/** Read-only preview of one article, fetched fresh by id. */
export function BlogViewDialog({ blogId, onClose }: BlogViewDialogProps) {
  const [result, setResult] = useState<{
    id: string;
    blog?: Blog;
    error?: string;
  } | null>(null);

  // Derived, not stored: a result only counts for the id currently open, so
  // reopening the dialog on another blog never flashes the previous article.
  const current = result?.id === blogId ? result : null;
  const blog = current?.blog ?? null;
  const error = current?.error ?? '';
  const loading = Boolean(blogId) && !current;

  useEffect(() => {
    if (!blogId) return;

    let cancelled = false;

    getBlog(blogId)
      .then((data) => {
        if (!cancelled) setResult({ id: blogId, blog: data });
      })
      .catch((err) => {
        if (!cancelled) {
          setResult({ id: blogId, error: blogErrorMessage(err, 'Failed to load blog') });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [blogId]);

  return (
    <Dialog open={Boolean(blogId)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-h-[85vh] max-w-3xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='pr-6 text-left'>
            {blog?.title ?? 'Blog preview'}
          </DialogTitle>
          <DialogDescription className='text-left'>
            {blog
              ? `${blog.category || 'Uncategorised'} · Updated ${format(
                  new Date(blog.updatedAt),
                  'MMM dd, yyyy',
                )}`
              : 'Loading the full article.'}
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className='flex justify-center py-16'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        )}

        {error && !loading && <p className='py-10 text-center text-sm text-red-500'>{error}</p>}

        {blog && !loading && !error && (
          <div className='space-y-4'>
            {blog.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={blog.image}
                alt={blog.title}
                className='max-h-72 w-full border border-border object-cover'
              />
            )}

            {blog.metaDescription && (
              <p className='border-l-2 border-accent bg-muted/50 px-3 py-2 text-sm italic text-muted-foreground'>
                {blog.metaDescription}
              </p>
            )}

            <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground'>
              <span>
                URL:{' '}
                {blog.url ? (
                  <span className='font-medium text-secondary'>/resources/{blog.url}</span>
                ) : (
                  '—'
                )}
              </span>
              <span>Created {format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
            </div>

            <article
              className='blog-preview text-sm leading-relaxed text-foreground'
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <style>{`
              .blog-preview h2 { font-size: 1.35rem; font-weight: 700; margin: 1.2em 0 0.5em; }
              .blog-preview h3 { font-size: 1.15rem; font-weight: 700; margin: 1.1em 0 0.4em; }
              .blog-preview h4 { font-size: 1rem; font-weight: 600; margin: 1em 0 0.4em; }
              .blog-preview p { margin: 0.7em 0; }
              .blog-preview ul { list-style: disc; padding-left: 1.5em; margin: 0.7em 0; }
              .blog-preview ol { list-style: decimal; padding-left: 1.5em; margin: 0.7em 0; }
              .blog-preview li { margin: 0.25em 0; }
              .blog-preview blockquote {
                border-left: 3px solid var(--border);
                padding-left: 1em;
                margin: 0.8em 0;
                color: #64748b;
              }
              .blog-preview a { color: #b08d57; text-decoration: underline; }
              .blog-preview img { max-width: 100%; height: auto; margin: 1em 0; }
              .blog-preview hr { border: none; border-top: 1px solid var(--border); margin: 1.4em 0; }
            `}</style>

            <div className='flex justify-end border-t border-border pt-4'>
              <Link href={`/admin/blogs/${blog._id}`}>
                <Button className='gap-2 rounded-none bg-accent font-semibold text-primary hover:opacity-90'>
                  <Pencil className='h-4 w-4' />
                  Edit this blog
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
