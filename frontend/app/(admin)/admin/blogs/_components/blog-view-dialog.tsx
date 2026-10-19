'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Pencil, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';
import { getBlog, blogErrorMessage, type Blog } from '@/lib/blogs';

interface BlogViewDialogProps { blogId: string | null; onClose: () => void }

const ARTICLE_CLASS = [
  'min-w-0 break-words font-advisory-body text-[15px] leading-[1.8] text-ink',
  '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
  '[&_:is(h1,h2,h3,h4,h5,h6)]:font-advisory-heading [&_:is(h1,h2,h3,h4,h5,h6)]:font-bold [&_:is(h1,h2,h3,h4,h5,h6)]:tracking-normal [&_:is(h1,h2,h3,h4,h5,h6)]:text-midnight',
  '[&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-[28px] [&_h1]:leading-[1.35]',
  '[&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-[25px] [&_h2]:leading-[1.4]',
  '[&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-[21px] [&_h3]:leading-[1.4]',
  '[&_:is(h4,h5,h6)]:mt-6 [&_:is(h4,h5,h6)]:mb-3 [&_:is(h4,h5,h6)]:text-lg',
  '[&_p]:my-0 [&_p+p]:mt-5 [&_strong]:font-semibold [&_strong]:text-midnight',
  '[&_:is(ul,ol)]:my-5 [&_:is(ul,ol)]:pl-6 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-2 [&_li_p]:m-0',
  '[&_a]:text-midnight [&_a]:underline [&_a]:decoration-gilt [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-gilt [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-3 [&_a:focus-visible]:outline-gilt motion-reduce:[&_a]:transition-none',
  '[&_blockquote]:my-6 [&_blockquote]:border-l [&_blockquote]:border-advisory-rule [&_blockquote]:pl-4 [&_blockquote]:italic',
  '[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_hr]:my-8 [&_hr]:border-advisory-rule',
  '[&_table]:my-6 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_td]:border [&_td]:border-advisory-rule [&_td]:p-3 [&_th]:border [&_th]:border-advisory-rule [&_th]:bg-canvas [&_th]:p-3',
].join(' ');

function displayDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'dd MMM yyyy');
}

/** Read-only preview of one article, fetched fresh by id. */
export function BlogViewDialog({ blogId, onClose }: BlogViewDialogProps) {
  const [result, setResult] = useState<{ id: string; blog?: Blog; error?: string } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const current = result?.id === blogId ? result : null;
  const blog = current?.blog ?? null;
  const error = current?.error ?? '';
  const loading = Boolean(blogId) && !current;

  useEffect(() => {
    if (!blogId) return;
    let active = true;
    getBlog(blogId).then((data) => {
      if (!data) throw new Error('Blog not found');
      if (active) setResult({ id: blogId, blog: data });
    }).catch((reason) => {
      if (active) setResult({ id: blogId, error: blogErrorMessage(reason, 'Failed to load blog') });
    });
    return () => { active = false; };
  }, [blogId, attempt]);

  return (
    <Dialog open={Boolean(blogId)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'flex max-h-[85dvh] min-h-0 w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-none border border-advisory-rule bg-white p-0 font-advisory-body text-sm text-ink ring-0 sm:max-w-[800px]')}>
        <DialogHeader className='shrink-0 border-b border-advisory-rule p-6 pr-16 min-[681px]:p-8 min-[681px]:pr-20'>
          <DialogTitle className='m-0 break-words font-advisory-heading text-[23px] leading-[1.4] font-bold tracking-normal text-midnight'>{blog?.title || 'Blog preview'}</DialogTitle>
          <DialogDescription className='mt-2 text-sm leading-[1.75] text-ink'>{blog ? `${blog.category || 'Uncategorised'} · Updated ${displayDate(blog.updatedAt)}` : error ? 'The article could not be opened.' : 'Loading the full article.'}</DialogDescription>
        </DialogHeader>
        <DialogClose asChild><button type='button' aria-label='Close blog preview' className='absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center border border-transparent text-midnight transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none'><X aria-hidden='true' className='size-4' /></button></DialogClose>

        <div aria-busy={loading} className='min-h-0 flex-1 overflow-y-auto p-6 min-[681px]:p-8'>
          {loading ? (
            <div><p role='status' className='sr-only'>Loading blog preview.</p><div aria-hidden='true' className='flex flex-col gap-6'><div className='aspect-[16/7] animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-16 animate-pulse bg-canvas motion-reduce:animate-none' />{[0, 1, 2, 3].map((index) => <div key={index} className='h-4 w-full animate-pulse bg-canvas motion-reduce:animate-none' />)}</div></div>
          ) : error ? (
            <div role='alert'><p className='mt-0 mb-5 text-sm leading-[1.75] text-ink'>{error}</p><LandingButton variant='outline' size='compact' onClick={() => { setResult(null); setAttempt((value) => value + 1); }}>Try again</LandingButton></div>
          ) : blog ? (
            <div className='flex min-w-0 flex-col gap-6'>
              {blog.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={blog.image} alt={blog.title} className='max-h-72 w-full object-cover' />
              )}
              {blog.metaDescription && <p className='m-0 bg-canvas p-4 text-sm leading-[1.8] text-ink'>{blog.metaDescription}</p>}
              <div className='flex flex-wrap gap-x-5 gap-y-2 text-xs leading-[1.75] text-ink'><span className='break-all'>URL: <span className='font-medium text-midnight'>{blog.url ? `/resources/${blog.url}` : '—'}</span></span><span>Created {displayDate(blog.createdAt)}</span></div>
              <article className={ARTICLE_CLASS} dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ) : null}
        </div>
        {blog && !loading && !error && <div className='flex shrink-0 justify-end border-t border-advisory-rule p-5 min-[681px]:px-8'><LandingButtonLink href={`/admin/blogs/${blog._id}`} size='compact'><Pencil aria-hidden='true' className='size-4' /> Edit this blog</LandingButtonLink></div>}
      </DialogContent>
    </Dialog>
  );
}
