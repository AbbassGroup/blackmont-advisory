'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { getBlog, blogErrorMessage } from '@/lib/blogs';
import BlogForm, { BlogFormSkeleton, type BlogInitialData } from '../_components/blog-form';

// Stable identity: BlogForm resets its fields when initialData changes.
const BLANK_BLOG: BlogInitialData = {};

/** /admin/blogs/new creates; any other id edits that article. */
export default function BlogFormPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const idParam = params.id;
  const isNew = idParam === 'new';
  const [loaded, setLoaded] = useState<{ id: string; data: BlogInitialData } | null>(null);
  const [error, setError] = useState<{ id: string; message: string } | null>(null);
  const [attempt, setAttempt] = useState(0);

  const initialData = isNew ? BLANK_BLOG : loaded?.id === idParam ? loaded.data : undefined;
  const loadError = error?.id === idParam ? error.message : '';

  useEffect(() => {
    if (isNew) return;
    let active = true;
    setError(null);
    getBlog(idParam)
      .then((blog) => {
        if (!active) return;
        setLoaded({
          id: idParam,
          data: { id: blog._id, title: blog.title ?? '', content: blog.content ?? '', imageUrl: blog.image ?? '', url: blog.url ?? '', category: blog.category ?? '', metaDescription: blog.metaDescription ?? '' },
        });
      })
      .catch((cause) => { if (active) setError({ id: idParam, message: blogErrorMessage(cause, 'Failed to load blog.') }); });
    return () => { active = false; };
  }, [idParam, isNew, attempt]);

  return (
    <AdminPageLayout title={isNew ? 'Create blog' : 'Edit blog'} description='Manage the blog title, category, content, URL and cover image.'
      action={<LandingButtonLink href='/admin/blogs' variant='outline' size='compact'><ArrowLeft aria-hidden='true' className='size-4' />Back to blogs</LandingButtonLink>}>
      {loadError ? (
        <section role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
          <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load this blog.</h2>
          <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>{loadError}</p>
          <LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton>
        </section>
      ) : !initialData ? <BlogFormSkeleton /> : (
        <BlogForm key={idParam} mode={isNew ? 'create' : 'edit'} initialData={initialData}
          onCancel={() => router.push('/admin/blogs')} onSuccess={() => router.push('/admin/blogs')} />
      )}
    </AdminPageLayout>
  );
}
