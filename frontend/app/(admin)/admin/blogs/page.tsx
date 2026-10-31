'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus, Search, Eye, Pencil, Trash2, Loader2, ImageOff, UsersRound } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { listBlogs, deleteBlog, blogErrorMessage, BLOGS_PER_PAGE, type Blog } from '@/lib/blogs';
import { BlogViewDialog } from './_components/blog-view-dialog';

const ACTION_CLASS = 'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none';

function updatedDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'dd MMM yyyy, h:mma');
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const requestId = useRef(0);

  const fetchBlogs = useCallback(async () => {
    const request = ++requestId.current;
    setLoading(true);
    setListError('');
    try {
      const result = await listBlogs({ page, limit: BLOGS_PER_PAGE, search });
      if (request !== requestId.current) return;
      setBlogs(result.blogs);
      setTotalPages(Math.max(1, result.pagination.totalPages));
      setTotal(result.pagination.total);
    } catch (error) {
      if (request === requestId.current) setListError(blogErrorMessage(error, 'Failed to load blogs'));
    } finally {
      if (request === requestId.current) setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => void fetchBlogs(), search ? 350 : 0);
    return () => { clearTimeout(timer); requestId.current += 1; };
  }, [fetchBlogs, search]);

  const closeDelete = () => {
    if (deleting) return;
    setDeleteTarget(null);
    setDeleteError('');
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await deleteBlog(deleteTarget._id);
      toast.success('Blog deleted successfully');
      setDeleteTarget(null);
      if (blogs.length === 1 && page > 1) { setLoading(true); setPage((current) => current - 1); }
      else await fetchBlogs();
    } catch (error) {
      const message = blogErrorMessage(error, 'Failed to delete blog');
      setDeleteError(message);
      toast.error(message);
    } finally { setDeleting(false); }
  };

  return (
    <AdminPageLayout title='Blogs' description='Write and manage the articles published under Resources.' action={<div className='flex flex-wrap gap-3'><LandingButtonLink href='/admin/blogs/authors' variant='outline' size='compact'><UsersRound aria-hidden='true' className='size-4' /> Authors</LandingButtonLink><LandingButtonLink href='/admin/blogs/new' size='compact'><Plus aria-hidden='true' className='size-4' /> New blog</LandingButtonLink></div>}>
      <section aria-label='Blog articles' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-w-0 min-[681px]:max-w-md'>
            <label htmlFor='blog-search' className='sr-only'>Search blogs by title, category or description</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input id='blog-search' type='search' value={search} disabled={deleting} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder='Search by title, category or description…' className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white py-2 pr-3 pl-10 font-advisory-body text-base text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm' />
          </div>
          <p className='m-0 shrink-0 text-sm leading-[1.6] text-ink' aria-live='polite'>{loading ? 'Loading blogs…' : listError ? 'List unavailable' : `${total} ${total === 1 ? 'blog' : 'blogs'}`}</p>
        </div>

        {loading ? (
          <div><p role='status' className='sr-only'>Loading blogs.</p><div aria-hidden='true' className='min-w-0 overflow-x-auto'>
            <table className='w-full min-w-[1120px] text-left text-sm leading-[1.65]'><BlogsHead /><tbody className='divide-y divide-advisory-rule'>{[0, 1, 2, 3, 4].map((index) => <tr key={index}><td className='px-5 py-4'><div className='h-12 w-16 animate-pulse bg-canvas motion-reduce:animate-none' /></td><td className='w-[30%] min-w-60 px-5 py-4'><div className='flex flex-col gap-2'><div className='h-4 w-4/5 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-3 w-3/5 animate-pulse bg-canvas motion-reduce:animate-none' /></div></td>{[0, 1, 2].map((column) => <td key={column} className='px-5 py-4'><div className='h-4 w-24 animate-pulse bg-canvas motion-reduce:animate-none' /></td>)}<td className='px-5 py-3'><div className='ml-auto h-10 w-32 animate-pulse bg-canvas motion-reduce:animate-none' /></td></tr>)}</tbody></table>
          </div></div>
        ) : listError ? (
          <div role='alert' className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your blogs.</h2><p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>{listError}</p><LandingButton variant='outline' size='compact' onClick={() => void fetchBlogs()}>Try again</LandingButton></div>
        ) : blogs.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>{search ? 'No matching blogs' : 'No blogs yet'}</h2><p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>{search ? 'Try another title, category or description.' : 'Write your first article to publish it under Resources.'}</p>{search ? <LandingButton variant='outline' size='compact' onClick={() => { setSearch(''); setPage(1); }}>Clear search</LandingButton> : <LandingButtonLink href='/admin/blogs/new' size='compact'>New blog</LandingButtonLink>}</div>
        ) : (
          <div role='region' aria-label='Blog article table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[1120px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>Articles, cover images, categories, public URLs and management actions.</caption>
              <BlogsHead />
              <tbody className='divide-y divide-advisory-rule'>
                {blogs.map((blog) => {
                  const title = blog.title || 'Untitled';
                  return (
                    <tr key={blog._id} className='transition-colors duration-150 hover:bg-canvas/50 motion-reduce:transition-none'>
                      <td className='px-5 py-4 align-top'><BlogCover key={blog.image || blog._id} src={blog.image} /></td>
                      <td className='w-[30%] min-w-60 px-5 py-4 align-top'><Link href={`/admin/blogs/${blog._id}`} className='break-words font-semibold text-midnight no-underline transition-colors duration-150 hover:text-gilt focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none'>{title}</Link>{blog.metaDescription && <p className='mt-1 mb-0 line-clamp-2 text-xs leading-[1.75] text-ink'>{blog.metaDescription}</p>}</td>
                      <td className='px-5 py-4 align-top'>{blog.category ? <span className='inline-flex bg-canvas px-2.5 py-1 text-xs leading-[1.5] font-medium text-midnight'>{blog.category}</span> : '—'}</td>
                      <td className='min-w-40 break-all px-5 py-4 align-top text-xs leading-[1.75] text-ink'>{blog.url ? `/resources/${blog.url}` : '—'}</td>
                      <td className='px-5 py-4 align-top whitespace-nowrap text-ink'>{updatedDate(blog.updatedAt)}</td>
                      <td className='px-5 py-3 align-top'><div role='group' aria-label={`Actions for ${title}`} className='flex items-center justify-end gap-1'>
                        <button type='button' disabled={deleting} onClick={() => setViewId(blog._id)} className={ACTION_CLASS} title='Preview blog' aria-label={`Preview ${title}`}><Eye aria-hidden='true' className='size-4' /></button>
                        <Link href={`/admin/blogs/${blog._id}`} className={ACTION_CLASS} title='Edit blog' aria-label={`Edit ${title}`}><Pencil aria-hidden='true' className='size-4' /></Link>
                        <button type='button' disabled={deleting} onClick={() => { setDeleteError(''); setDeleteTarget(blog); }} className={cn(ACTION_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')} title='Delete blog' aria-label={`Delete ${title}`}><Trash2 aria-hidden='true' className='size-4' /></button>
                      </div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !listError && totalPages > 1 && <nav aria-label='Blog pagination' className='flex flex-wrap items-center justify-between gap-4 border-t border-advisory-rule px-5 py-4 min-[681px]:px-6'>
          <p className='m-0 text-sm text-ink' aria-live='polite' aria-atomic='true'>Page {page} of {totalPages}</p>
          <div className='flex gap-2'><LandingButton variant='outline' size='compact' disabled={page === 1 || deleting} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</LandingButton><LandingButton variant='outline' size='compact' disabled={page === totalPages || deleting} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Next</LandingButton></div>
        </nav>}
      </section>

      {viewId && <BlogViewDialog key={viewId} blogId={viewId} onClose={() => setViewId(null)} />}
      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open) closeDelete(); }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}>
          <DialogHeader><DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Delete this blog?</DialogTitle><DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'><span className='mb-2 block break-words font-semibold text-midnight'>{deleteTarget?.title || 'Untitled'}</span>This article will be permanently removed. This action cannot be undone.</DialogDescription></DialogHeader>
          {deleteError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{deleteError}</p>}
          <div className='flex flex-wrap justify-end gap-3'><LandingButton variant='outline' size='compact' disabled={deleting} onClick={closeDelete}>Cancel</LandingButton><LandingButton size='compact' disabled={deleting} onClick={() => void handleDelete()} className='border-red-700 bg-red-700 text-white hover:bg-red-800'>{deleting && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{deleting ? 'Deleting…' : 'Delete blog'}</LandingButton></div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}

function BlogsHead() {
  return <thead className='border-b border-advisory-rule bg-canvas text-midnight'><tr>{['Cover', 'Title', 'Category', 'URL', 'Last updated', 'Actions'].map((label) => <th key={label} scope='col' className={cn('px-5 py-4 font-semibold', label === 'Actions' && 'text-right')}>{label}</th>)}</tr></thead>;
}

function BlogCover({ src }: { src: string | null }) {
  const [failed, setFailed] = useState(false);
  return <div className='flex h-12 w-16 items-center justify-center overflow-hidden border border-advisory-rule bg-canvas'>
    {src && !failed ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt='' onError={() => setFailed(true)} className='h-full w-full object-cover' />
    ) : <ImageOff aria-hidden='true' className='size-4 text-ink/60' />}
  </div>;
}
