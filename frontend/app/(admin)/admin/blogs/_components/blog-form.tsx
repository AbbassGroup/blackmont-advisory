'use client';

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Loader2 } from 'lucide-react';
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

function FieldWrapper({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className='space-y-2'>
      <div>
        <label className='text-sm font-medium text-secondary'>{label}</label>
        {hint ? <p className='mt-0.5 text-xs text-muted-foreground'>{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

function TextField({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type='text'
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className='h-11 w-full border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60'
    />
  );
}

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

  useEffect(() => {
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
      console.error('Blog submit failed:', error);
      toast.error(blogErrorMessage(error, 'Failed to save blog'));
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
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]'>
        <div className='space-y-5 border border-border bg-card p-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FieldWrapper label='Blog Title'>
              <TextField
                value={title}
                disabled={saving}
                onChange={(nextValue) => {
                  setTitle(nextValue);
                  if (!isSlugManuallyEdited) setUrl(slugify(nextValue));
                }}
                placeholder='Enter blog title'
              />
            </FieldWrapper>

            <FieldWrapper label='Blog URL'>
              <BlogUrlField
                url={url}
                setUrl={(nextValue) => {
                  setIsSlugManuallyEdited(true);
                  setUrl(nextValue);
                }}
                currentId={initialData?.id}
                onAvailabilityChange={handleAvailabilityChange}
                onCheckingChange={handleCheckingChange}
                onValidityChange={handleValidityChange}
                disabled={saving}
              />
            </FieldWrapper>
          </div>

          <FieldWrapper
            label='Meta Description (Optional)'
            hint='Shown in search results — around 150–160 characters works best.'
          >
            <TextField
              value={metaDescription}
              onChange={setMetaDescription}
              disabled={saving}
              placeholder='Enter meta description'
            />
          </FieldWrapper>

          <BlogCategoryCombobox
            value={category}
            onChange={setCategory}
            options={categories}
            disabled={saving}
          />

          <FieldWrapper label='Blog Content'>
            <BlogEditor value={content} onChange={setContent} />
          </FieldWrapper>
        </div>

        <div className='space-y-6'>
          <div className='border border-border bg-card p-5'>
            <FieldWrapper
              label='Cover Image'
              hint='Recommended: clean landscape image.'
            >
              <div className='space-y-3'>
                <ImageField
                  preview={preview}
                  onChange={handleImageChange}
                  disabled={saving}
                />

                <div className='space-y-2 border border-dashed border-border bg-muted/40 p-3'>
                  <div>
                    <p className='text-sm font-medium text-secondary'>Quick upload</p>
                    <p className='text-xs text-muted-foreground'>
                      Upload one image and copy its URL to use wherever you need it.
                    </p>
                  </div>
                  <BlogPhotoUploader
                    value={quickUploadUrl}
                    onUploaded={setQuickUploadUrl}
                  />
                </div>
              </div>
            </FieldWrapper>
          </div>

          <div className='border border-border bg-card p-5'>
            <p className='mb-4 text-sm text-muted-foreground'>
              {isEdit
                ? 'Update the blog when everything looks correct.'
                : 'Publish the blog after reviewing the content.'}
            </p>

            {isEdit && removeImage && (
              <p className='mb-4 text-xs text-amber-600'>
                The cover image will be removed when you save.
              </p>
            )}

            <div className='flex flex-col gap-3'>
              <button
                type='submit'
                disabled={isSubmitDisabled}
                className='flex h-11 items-center justify-center gap-2 bg-accent px-4 text-sm font-semibold text-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {saving && <Loader2 className='h-4 w-4 animate-spin' />}
                {saving
                  ? isEdit
                    ? 'Updating...'
                    : 'Publishing...'
                  : isEdit
                    ? 'Update Blog'
                    : 'Publish Blog'}
              </button>

              <button
                type='button'
                onClick={onCancel}
                disabled={saving}
                className='h-11 border border-border bg-card px-4 text-sm font-medium text-secondary transition-colors hover:bg-muted disabled:opacity-60'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
