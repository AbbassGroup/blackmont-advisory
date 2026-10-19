'use client';

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from 'react';
import { Loader2 } from 'lucide-react';
import { LandingButton } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import {
  createBlog,
  updateBlog,
  listBlogs,
  slugify,
  blogErrorMessage,
  type Blog,
} from '@/lib/blogs';
import BlogCategoryCombobox from './blog-category-field';
import BlogPhotoUploader from './blog-photo-uploader';
import BlogUrlField from './blog-url-field';
import { BlogEditor } from './blog-editor';
import { ImageField } from './image-field';

type BlogFormMode = 'create' | 'edit';

export interface BlogInitialData {
  id?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  url?: string;
  category?: string;
  metaDescription?: string;
}

interface BlogFormProps {
  mode?: BlogFormMode;
  initialData?: BlogInitialData;
  onCancel?: () => void;
  onSuccess?: (blog: Blog) => void;
}

const INPUT_CLASS = 'h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-50 min-[681px]:text-sm';
const HEADING_CLASS = 'm-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight';
const SECTION_CLASS = 'flex min-w-0 flex-col gap-6 border border-advisory-rule bg-white p-5 min-[681px]:p-8';

/** TipTap leaves an empty document as `<p></p>` — that isn't content. */
function hasContent(html: string): boolean {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;
}

export default function BlogForm({
  mode = 'create',
  initialData,
  onCancel,
  onSuccess,
}: BlogFormProps) {
  const isEdit = mode === 'edit';

  const [title, setTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [removeImage, setRemoveImage] = useState(false);
  const [quickUploadUrl, setQuickUploadUrl] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isSlugAvailable, setIsSlugAvailable] = useState(true);
  const [isSlugChecking, setIsSlugChecking] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setSaveError('');
    setTitle(initialData?.title ?? '');
    setMetaDescription(initialData?.metaDescription ?? '');
    setContent(initialData?.content ?? '');
    setUrl(initialData?.url ?? '');
    setCategory(initialData?.category ?? '');
    setPreview(initialData?.imageUrl ?? '');
    setImage(null);
    setRemoveImage(false);
    setIsSlugManuallyEdited(false);
    setIsSlugAvailable(true);
    setIsSlugChecking(false);
    setIsSlugValid(true);
  }, [initialData]);

  // Suggestions for the category field — whatever other articles already use.
  useEffect(() => {
    let cancelled = false;
    listBlogs({ limit: 100 })
      .then(({ blogs }) => {
        if (cancelled) return;
        const unique = Array.from(
          new Set(blogs.map((b) => (b.category || '').trim()).filter(Boolean)),
        ).sort((a, b) => a.localeCompare(b));
        setCategories(unique);
      })
      .catch(() => {
        /* suggestions are optional */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => { if (preview.startsWith('blob:')) URL.revokeObjectURL(preview); };
  }, [preview]);

  const handleImageChange = (file: File | null) => {
    setImage(file);

    if (!file) {
      setPreview('');
      // Only meaningful when editing: tells us the existing cover was cleared.
      setRemoveImage(true);
      return;
    }

    setRemoveImage(false);
    setPreview(URL.createObjectURL(file));
  };

  // Stable identities — BlogUrlField reports status back through these on every
  // keystroke, and unstable callbacks would restart its debounce each render.
  const handleAvailabilityChange = useCallback(
    (available: boolean) => setIsSlugAvailable(available),
    [],
  );
  const handleCheckingChange = useCallback(
    (checking: boolean) => setIsSlugChecking(checking),
    [],
  );
  const handleValidityChange = useCallback((valid: boolean) => setIsSlugValid(valid), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving || !isSlugValid || isSlugChecking || !isSlugAvailable) return;
    setSaveError('');

    const trimmedTitle = title.trim();
    const trimmedMetaDescription = metaDescription.trim();
    const trimmedContent = content.trim();
    const trimmedCategory = category.trim();
    const resolvedUrl = url.trim() || slugify(trimmedTitle);

    if (!trimmedTitle) {
      toast.error('Title is required');
      return;
    }
    if (!trimmedCategory) {
      toast.error('Category is required');
      return;
    }
    if (!hasContent(trimmedContent)) {
      toast.error('Content is required');
      return;
    }

    const formData = new FormData();
    formData.append('title', trimmedTitle);
    formData.append('metaDescription', trimmedMetaDescription);
    formData.append('content', trimmedContent);
    formData.append('url', resolvedUrl);
    formData.append('category', trimmedCategory);

    if (image) {
      formData.append('image', image);
    } else if (isEdit && removeImage) {
      formData.append('removeImage', 'true');
    }

    setSaving(true);
    try {
      const saved =
        isEdit && initialData?.id
          ? await updateBlog(initialData.id, formData)
          : await createBlog(formData);

      toast.success(isEdit ? 'Blog updated successfully' : 'Blog created successfully');
      onSuccess?.(saved);
    } catch (error) {
      const message = blogErrorMessage(error, 'Failed to save blog. Please try again.');
      setSaveError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const isSubmitDisabled =
    saving ||
    !title.trim() ||
    !category.trim() ||
    !hasContent(content) ||
    !isSlugValid ||
    isSlugChecking ||
    !isSlugAvailable;

  return (
    <form onSubmit={handleSubmit} noValidate className='flex min-w-0 flex-col gap-6'>
      <fieldset disabled={saving} inert={saving} className='m-0 grid min-w-0 grid-cols-1 items-start gap-6 border-0 p-0 xl:grid-cols-[minmax(0,1fr)_340px]'>
        <legend className='sr-only'>Blog details, content and images</legend>
        <div className='flex min-w-0 flex-col gap-6'>
          <section aria-labelledby='blog-details-title' className={SECTION_CLASS}>
            <h2 id='blog-details-title' className={HEADING_CLASS}>Article details</h2>
            <div className='flex min-w-0 flex-col gap-2'>
              <label htmlFor='blog-title' className='text-sm font-medium text-midnight'>Blog title <span aria-hidden='true'>*</span></label>
              <input id='blog-title' required value={title} onChange={(event) => {
                setTitle(event.target.value);
                if (!isSlugManuallyEdited) setUrl(slugify(event.target.value));
              }} placeholder='Enter blog title' className={INPUT_CLASS} />
            </div>
            <div className='flex min-w-0 flex-col gap-2'>
              <label htmlFor='blog-url' className='text-sm font-medium text-midnight'>Blog URL</label>
              <BlogUrlField url={url} setUrl={(nextValue) => { setIsSlugManuallyEdited(true); setUrl(nextValue); }}
                currentId={initialData?.id} onAvailabilityChange={handleAvailabilityChange}
                onCheckingChange={handleCheckingChange} onValidityChange={handleValidityChange} disabled={saving} />
            </div>
            <BlogCategoryCombobox value={category} onChange={setCategory} options={categories} disabled={saving} />
            <div className='flex min-w-0 flex-col gap-2'>
              <label htmlFor='blog-description' className='text-sm font-medium text-midnight'>Meta description <span className='font-normal text-ink'>(optional)</span></label>
              <p id='blog-description-hint' className='m-0 text-xs leading-[1.75] text-ink'>Shown in search results. Around 150–160 characters works best.</p>
              <textarea id='blog-description' aria-describedby='blog-description-hint' rows={3} value={metaDescription} onChange={(event) => setMetaDescription(event.target.value)}
                placeholder='Enter meta description' className={cn(INPUT_CLASS, 'h-auto min-h-24 resize-y py-3 leading-[1.75]')} />
            </div>
          </section>

          <section aria-labelledby='blog-content-title' className={SECTION_CLASS}>
            <div className='flex flex-col gap-2'>
              <h2 id='blog-content-title' className={HEADING_CLASS}>Article content</h2>
              <p className='m-0 text-sm leading-[1.75] text-ink'>Write and format your article, including links and images.</p>
            </div>
            <BlogEditor value={content} onChange={setContent} disabled={saving} />
          </section>
        </div>

        <aside aria-label='Blog images' className='flex min-w-0 flex-col gap-6'>
          <section aria-labelledby='blog-cover-title' className={SECTION_CLASS}>
            <div className='flex flex-col gap-2'>
              <h2 id='blog-cover-title' className={HEADING_CLASS}>Cover image</h2>
              <p className='m-0 text-sm leading-[1.75] text-ink'>Choose a clear landscape image for the article.</p>
            </div>
            <ImageField preview={preview} onChange={handleImageChange} disabled={saving} />
            {isEdit && removeImage && <p role='status' className='m-0 text-xs leading-[1.75] text-amber-800'>The cover image will be removed when you save.</p>}
          </section>
          <section aria-labelledby='blog-quick-upload-title' className={SECTION_CLASS}>
            <div className='flex flex-col gap-2'>
              <h2 id='blog-quick-upload-title' className={HEADING_CLASS}>Quick upload</h2>
              <p className='m-0 text-sm leading-[1.75] text-ink'>Upload an image and copy its URL to use elsewhere.</p>
            </div>
            <BlogPhotoUploader value={quickUploadUrl} onUploaded={setQuickUploadUrl} disabled={saving} />
          </section>
        </aside>
      </fieldset>

      {saveError && <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{saveError}</p>}
      <footer className='flex flex-col gap-5 border border-advisory-rule bg-white p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
        <div className='flex flex-col gap-1'>
          <p className='m-0 text-sm leading-[1.75] text-ink'>{isEdit ? 'Review your changes before updating the blog.' : 'Review your article before publishing it.'}</p>
          <p className='m-0 text-xs leading-[1.75] text-ink'>Title, category and article content are required.</p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <LandingButton variant='outline' size='compact' onClick={onCancel} disabled={saving}>Cancel</LandingButton>
          <LandingButton type='submit' size='compact' disabled={isSubmitDisabled}>
            {saving && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}
            {saving ? isEdit ? 'Updating…' : 'Publishing…' : isEdit ? 'Update blog' : 'Publish blog'}
          </LandingButton>
        </div>
        {saving && <span role='status' className='sr-only'>Saving blog.</span>}
      </footer>
    </form>
  );
}

export function BlogFormSkeleton() {
  return (
    <div aria-busy='true' className='flex min-w-0 flex-col gap-6'>
      <p role='status' className='sr-only'>Loading the blog editor.</p>
      <div aria-hidden='true' className='grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]'>
        <div className='flex min-w-0 flex-col gap-6'>
          <section className={SECTION_CLASS}>
            <h2 className={HEADING_CLASS}>Article details</h2>
            {['Blog title', 'Blog URL', 'Category', 'Meta description (optional)'].map((label, index) => (
              <div key={label} className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-midnight'>{label}</span>
                {index === 2 && <p className='m-0 text-xs leading-[1.75] text-ink'>Pick an existing category or type a new one.</p>}
                {index === 3 && <p className='m-0 text-xs leading-[1.75] text-ink'>Shown in search results. Around 150–160 characters works best.</p>}
                <div className={index === 3 ? 'h-24 border border-advisory-rule bg-canvas/30' : 'h-10 border border-advisory-rule bg-canvas/30'} />
                {index === 1 && <span className='h-[21px] w-48 animate-pulse bg-canvas motion-reduce:animate-none' />}
              </div>
            ))}
          </section>
          <section className={SECTION_CLASS}>
            <div className='flex flex-col gap-2'><h2 className={HEADING_CLASS}>Article content</h2><p className='m-0 text-sm leading-[1.75] text-ink'>Write and format your article, including links and images.</p></div>
            <div className='border border-advisory-rule'><div className='h-[54px] border-b border-advisory-rule bg-canvas' /><div className='min-h-[420px] p-5'><div className='h-4 w-3/4 bg-canvas' /></div></div>
          </section>
        </div>
        <div className='flex flex-col gap-6'>
          <section className={SECTION_CLASS}>
            <div className='flex flex-col gap-2'><h2 className={HEADING_CLASS}>Cover image</h2><p className='m-0 text-sm leading-[1.75] text-ink'>Choose a clear landscape image for the article.</p></div>
            <div className='flex flex-col gap-3'><div className='aspect-[16/10] w-full border border-advisory-rule bg-canvas/30' /><p className='m-0 text-xs leading-[1.75] text-ink'>PNG, JPG or WebP — max 10MB.</p></div>
          </section>
          <section className={SECTION_CLASS}>
            <div className='flex flex-col gap-2'><h2 className={HEADING_CLASS}>Quick upload</h2><p className='m-0 text-sm leading-[1.75] text-ink'>Upload an image and copy its URL to use elsewhere.</p></div>
            <div className='h-10 border border-advisory-rule bg-canvas/30' />
          </section>
        </div>
      </div>
      <div aria-hidden='true' className='flex flex-wrap items-center justify-between gap-5 border border-advisory-rule bg-white p-6'><div className='h-5 w-64 bg-canvas' /><div className='h-10 w-56 bg-canvas' /></div>
    </div>
  );
}
