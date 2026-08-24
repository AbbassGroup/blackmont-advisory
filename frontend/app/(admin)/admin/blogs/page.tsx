'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus, Search, Eye, Pencil, Trash2, Loader2, ImageOff } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/global/dashboard-layout';
import {
  listBlogs,
  deleteBlog,
  blogErrorMessage,
  BLOGS_PER_PAGE,
  type Blog,
} from '@/lib/blogs';
import { BlogViewDialog } from './_components/blog-view-dialog';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async (opts: { page: number; search: string }) => {
    setLoading(true);
    try {
      const result = await listBlogs({
        page: opts.page,
        limit: BLOGS_PER_PAGE,
        search: opts.search,
      });
      setBlogs(result.blogs);
      setTotalPages(result.pagination.totalPages);
      setTotal(result.pagination.total);
    } catch (error) {
      setBlogs([]);
      toast.error(blogErrorMessage(error, 'Failed to load blogs'));
    } finally {
      setLoading(false);
    }
  };

  // Debounced so typing in the search box doesn't fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => fetchBlogs({ page, search }), search ? 350 : 0);
    return () => clearTimeout(timer);
  }, [page, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteBlog(deleteTarget._id);
      toast.success('Blog deleted successfully');
      setDeleteTarget(null);

      // Deleting the last row on a page would otherwise leave an empty view.
      const isLastOnPage = blogs.length === 1 && page > 1;
      if (isLastOnPage) setPage((p) => p - 1);
      else fetchBlogs({ page, search });
    } catch (error) {
      toast.error(blogErrorMessage(error, 'Failed to delete blog'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout
      title='Blogs'
      description='Write and manage the articles published under Resources.'
      button={
        <Link href='/admin/blogs/new'>
          <Button className='gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'>
            <Plus className='h-4 w-4' />
            New Blog
          </Button>
        </Link>
      }
    >
      <div className='border border-border bg-card p-4 shadow-sm'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60' />
            <Input
              placeholder='Search by title, category or description...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className='rounded-none border-secondary/15 bg-background pl-9 shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15'
            />
          </div>
          <p className='shrink-0 text-sm text-muted-foreground'>
            {total} {total === 1 ? 'blog' : 'blogs'}
          </p>
        </div>
      </div>

      <div className='overflow-hidden border border-border bg-card shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-border bg-muted/60'>
                <Th className='w-20'>Cover</Th>
                <Th>Title</Th>
                <Th className='hidden md:table-cell'>Category</Th>
                <Th className='hidden lg:table-cell'>URL</Th>
                <Th className='hidden lg:table-cell'>Last Updated</Th>
                <Th className='text-right'>Actions</Th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/60'>
              {loading ? (
                <tr>
                  <td colSpan={6} className='py-12 text-center text-muted-foreground/60'>
                    <Loader2 className='mx-auto mb-2 h-6 w-6 animate-spin' />
                    Loading blogs...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className='py-12 text-center text-muted-foreground/60'>
                    {search ? (
                      <>No blogs match &ldquo;{search}&rdquo;.</>
                    ) : (
                      <>
                        No blogs yet. Click <span className='font-medium'>New Blog</span> to
                        write one.
                      </>
                    )}
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id} className='transition-colors hover:bg-muted/50'>
                    <td className='px-5 py-3'>
                      {blog.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={blog.image}
                          alt=''
                          className='h-12 w-16 border border-border object-cover'
                        />
                      ) : (
                        <div className='flex h-12 w-16 items-center justify-center border border-dashed border-border bg-muted/50'>
                          <ImageOff className='h-4 w-4 text-muted-foreground/50' />
                        </div>
                      )}
                    </td>
                    <td className='px-5 py-3'>
                      <p className='font-semibold text-secondary'>
                        {blog.title || 'Untitled'}
                      </p>
                      {blog.metaDescription && (
                        <p className='mt-0.5 line-clamp-1 max-w-md text-xs text-muted-foreground'>
                          {blog.metaDescription}
                        </p>
                      )}
                    </td>
                    <td className='hidden px-5 py-3 md:table-cell'>
                      {blog.category ? (
                        <span className='inline-flex items-center bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent'>
                          {blog.category}
                        </span>
                      ) : (
                        <span className='text-muted-foreground/60'>—</span>
                      )}
                    </td>
                    <td className='hidden px-5 py-3 text-xs text-muted-foreground lg:table-cell'>
                      {blog.url ? `/resources/${blog.url}` : '—'}
                    </td>
                    <td className='hidden px-5 py-3 text-muted-foreground lg:table-cell'>
                      {blog.updatedAt
                        ? format(new Date(blog.updatedAt), 'MMM dd, yyyy, h:mma')
                        : '—'}
                    </td>
                    <td className='px-5 py-3'>
                      <div className='flex items-center justify-end gap-1'>
                        <button
                          onClick={() => setViewId(blog._id)}
                          title='View'
                          className='p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-secondary'
                        >
                          <Eye className='h-4 w-4' />
                        </button>
                        <Link href={`/admin/blogs/${blog._id}`}>
                          <span
                            title='Edit'
                            className='flex p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-secondary'
                          >
                            <Pencil className='h-4 w-4' />
                          </span>
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(blog)}
                          title='Delete'
                          className='p-1.5 text-red-500 transition-colors hover:bg-red-50'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className='flex items-center justify-between border-t border-border bg-muted/40 px-5 py-3.5'>
            <p className='text-sm text-muted-foreground'>
              Page {page} of {totalPages}
            </p>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <BlogViewDialog blogId={viewId} onClose={() => setViewId(null)} />

      {deleteTarget && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 p-4 backdrop-blur-sm'>
          <div className='w-full max-w-sm border border-border bg-card p-6 shadow-xl'>
            <h3 className='mb-2 text-lg font-bold text-secondary'>Delete this blog?</h3>
            <p className='mb-6 text-sm text-muted-foreground'>
              <span className='font-medium text-secondary'>{deleteTarget.title}</span> will
              be{' '}
              <span className='font-medium text-red-600'>permanently removed</span>. This
              action cannot be undone.
            </p>
            <div className='flex justify-end gap-3'>
              <Button
                variant='outline'
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className='rounded-none bg-red-600 text-white hover:bg-red-700'
              >
                {deleting ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function Th({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground ${className}`}
    >
      {children}
    </th>
  );
}
