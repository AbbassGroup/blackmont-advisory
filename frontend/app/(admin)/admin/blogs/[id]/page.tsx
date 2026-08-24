'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import DashboardLayout from '@/components/global/dashboard-layout';
import { getBlog, blogErrorMessage } from '@/lib/blogs';
import BlogForm, { type BlogInitialData } from '../_components/blog-form';

/**
 * Stable identity — BlogForm resets its fields whenever `initialData` changes,
 * so a fresh `{}` each render would wipe the form on every keystroke.
 */
const BLANK_BLOG: BlogInitialData = {};

/** `/admin/blogs/new` creates; any other id edits that article. */
export default function BlogFormPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const idParam = params?.id as string;
  const isNew = idParam === 'new';

  const [loaded, setLoaded] = useState<{ id: string; data: BlogInitialData } | null>(null);

  // Derived, not stored: a loaded article only counts for the id in the URL, so
  // navigating between blogs can't briefly show the previous one.
  const initialData = isNew
    ? BLANK_BLOG
    : loaded?.id === idParam
      ? loaded.data
      : undefined;
  const loading = !initialData;

  useEffect(() => {
    if (isNew) return;

    let cancelled = false;

    getBlog(idParam)
      .then((blog) => {
        if (cancelled) return;
        setLoaded({
          id: idParam,
          data: {
            id: blog._id,
            title: blog.title ?? '',
            content: blog.content ?? '',
            imageUrl: blog.image ?? '',
            url: blog.url ?? '',
            category: blog.category ?? '',
            metaDescription: blog.metaDescription ?? '',
          },
        });
      })
      .catch((error) => {
        if (cancelled) return;
        toast.error(blogErrorMessage(error, 'Failed to load blog'));
        router.push('/admin/blogs');
      });

    return () => {
      cancelled = true;
    };
  }, [idParam, isNew, router]);

  return (
    <DashboardLayout
      title={isNew ? 'Create Blog' : 'Edit Blog'}
      description='Manage the blog title, category, content, URL and cover image.'
      button={
        <button
          type='button'
          onClick={() => router.push('/admin/blogs')}
          className='flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-muted'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Blogs
        </button>
      }
    >
      {loading ? (
        <div className='flex min-h-[50vh] items-center justify-center border border-border bg-card'>
          <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
        </div>
      ) : (
        <BlogForm
          mode={isNew ? 'create' : 'edit'}
          initialData={initialData}
          onCancel={() => router.push('/admin/blogs')}
          onSuccess={() => router.push('/admin/blogs')}
        />
      )}
    </DashboardLayout>
  );
}
