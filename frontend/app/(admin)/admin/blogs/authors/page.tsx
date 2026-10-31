'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ExternalLink, Loader2, Pencil, Plus, Trash2, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { blogErrorMessage, slugify } from '@/lib/blogs';
import { authorPath, createAuthor, deleteAuthor, listAuthors, updateAuthor, type Author } from '@/lib/authors';
import { HINT_CLASS, INPUT_CLASS, LABEL_CLASS, TEXTAREA_CLASS } from '../_components/form-styles';

const ACTION_CLASS = 'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none';
const DIALOG_CLASS = 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 min-[681px]:p-8';
const DIALOG_TITLE_CLASS = 'm-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight';

/** Authors credited on Resources articles. Lives under Blogs so it shares that page's access. */
export default function BlogAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  // `null` = closed, `'new'` = creating, an Author = editing.
  const [editing, setEditing] = useState<Author | 'new' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Author | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAuthors = useCallback(async () => {
    setListError('');
    try {
      setAuthors(await listAuthors());
    } catch (error) {
      setListError(blogErrorMessage(error, 'Failed to load authors'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    listAuthors()
      .then((list) => { if (active) setAuthors(list); })
      .catch((error) => { if (active) setListError(blogErrorMessage(error, 'Failed to load authors')); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await deleteAuthor(deleteTarget._id);
      toast.success('Author deleted');
      setDeleteTarget(null);
      await fetchAuthors();
    } catch (error) {
      toast.error(blogErrorMessage(error, 'Failed to delete author'));
    } finally { setDeleting(false); }
  };

  return (
    <AdminPageLayout title='Blog authors' description='The experts credited on Resources articles. Each gets a public profile page, which helps Google trust the advice.'
      action={<div className='flex flex-wrap gap-3'><LandingButtonLink href='/admin/blogs' variant='outline' size='compact'><ArrowLeft aria-hidden='true' className='size-4' />Back to blogs</LandingButtonLink><LandingButton size='compact' onClick={() => setEditing('new')}><Plus aria-hidden='true' className='size-4' />New author</LandingButton></div>}>
      <section aria-label='Authors' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        {loading ? (
          <div className='p-6 min-[681px]:p-8'><p role='status' className='m-0 text-sm text-ink'>Loading authors…</p></div>
        ) : listError ? (
          <div role='alert' className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load the authors.</h2><p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>{listError}</p><LandingButton variant='outline' size='compact' onClick={() => { setLoading(true); void fetchAuthors(); }}>Try again</LandingButton></div>
        ) : authors.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>No authors yet</h2><p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Add the brokers and advisers who write your articles, with their credentials. Articles without an author are credited to Blackmont Advisory.</p><LandingButton size='compact' onClick={() => setEditing('new')}>New author</LandingButton></div>
        ) : (
          <ul className='m-0 list-none divide-y divide-advisory-rule p-0'>
            {authors.map((author) => (
              <li key={author._id} className='flex items-center gap-4 px-5 py-4 min-[681px]:px-6'>
                <AuthorAvatar src={author.photo} />
                <div className='min-w-0 flex-1'>
                  <p className='m-0 font-semibold text-midnight'>{author.name}</p>
                  <p className='m-0 text-xs leading-[1.75] text-ink'>{[author.role, author.credentials.length ? `${author.credentials.length} credential${author.credentials.length === 1 ? '' : 's'}` : 'No credentials yet'].filter(Boolean).join(' · ')}</p>
                </div>
                <div role='group' aria-label={`Actions for ${author.name}`} className='flex items-center gap-1'>
                  <a href={authorPath(author)} target='_blank' rel='noreferrer' className={ACTION_CLASS} title='View public profile' aria-label={`View ${author.name}'s public profile (opens in a new tab)`}><ExternalLink aria-hidden='true' className='size-4' /></a>
                  <button type='button' onClick={() => setEditing(author)} className={ACTION_CLASS} title='Edit author' aria-label={`Edit ${author.name}`}><Pencil aria-hidden='true' className='size-4' /></button>
                  <button type='button' onClick={() => setDeleteTarget(author)} className={cn(ACTION_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')} title='Delete author' aria-label={`Delete ${author.name}`}><Trash2 aria-hidden='true' className='size-4' /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Dialog open={editing !== null} onOpenChange={(open) => { if (!open) setEditing(null); }}>
        <DialogContent className={cn(landingFontVariables, DIALOG_CLASS, 'sm:max-w-[640px]')}>
          {editing !== null && (
            <AuthorForm key={editing === 'new' ? 'new' : editing._id} author={editing === 'new' ? null : editing}
              onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); void fetchAuthors(); }} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open && !deleting) setDeleteTarget(null); }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, DIALOG_CLASS, 'sm:max-w-[460px]')}>
          <DialogHeader><DialogTitle className={DIALOG_TITLE_CLASS}>Delete this author?</DialogTitle><DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'><span className='mb-2 block font-semibold text-midnight'>{deleteTarget?.name}</span>Their profile page will be removed and their articles will be credited to Blackmont Advisory instead. This cannot be undone.</DialogDescription></DialogHeader>
          <div className='flex flex-wrap justify-end gap-3'><LandingButton variant='outline' size='compact' disabled={deleting} onClick={() => setDeleteTarget(null)}>Cancel</LandingButton><LandingButton size='compact' disabled={deleting} onClick={() => void handleDelete()} className='border-red-700 bg-red-700 text-white hover:bg-red-800'>{deleting && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{deleting ? 'Deleting…' : 'Delete author'}</LandingButton></div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}

function AuthorAvatar({ src, size = 'size-12' }: { src: string | null; size?: string }) {
  return (
    <div className={cn('flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-advisory-rule bg-canvas', size)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt='' className='h-full w-full object-cover' /> : <UserRound aria-hidden='true' className='size-5 text-ink/60' />}
    </div>
  );
}

function AuthorForm({ author, onCancel, onSaved }: { author: Author | null; onCancel: () => void; onSaved: () => void }) {
  const [name, setName] = useState(author?.name ?? '');
  const [slug, setSlug] = useState(author?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(author));
  const [role, setRole] = useState(author?.role ?? '');
  const [linkedin, setLinkedin] = useState(author?.linkedin ?? '');
  const [credentials, setCredentials] = useState((author?.credentials ?? []).join('\n'));
  const [bio, setBio] = useState(author?.bio ?? '');
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState(author?.photo ?? '');
  const [removePhoto, setRemovePhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (preview.startsWith('blob:')) URL.revokeObjectURL(preview); }, [preview]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    if (!name.trim()) { setError('Name is required'); return; }
    setError('');

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('slug', slug.trim() || slugify(name));
    formData.append('role', role.trim());
    formData.append('linkedin', linkedin.trim());
    formData.append('bio', bio.trim());
    formData.append('credentials', JSON.stringify(credentials.split('\n').map((c) => c.trim()).filter(Boolean)));
    if (photo) formData.append('photo', photo);
    else if (author && removePhoto) formData.append('removePhoto', 'true');

    setSaving(true);
    try {
      if (author) await updateAuthor(author._id, formData);
      else await createAuthor(formData);
      toast.success(author ? 'Author updated' : 'Author created');
      onSaved();
    } catch (cause) {
      setError(blogErrorMessage(cause, 'Failed to save author'));
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='flex min-w-0 flex-col gap-5'>
      <DialogHeader><DialogTitle className={DIALOG_TITLE_CLASS}>{author ? 'Edit author' : 'New author'}</DialogTitle><DialogDescription className='mt-2 text-sm leading-[1.75] text-ink'>Shown on their articles and on a public profile page.</DialogDescription></DialogHeader>
      <fieldset disabled={saving} className='m-0 flex min-w-0 flex-col gap-5 border-0 p-0'>
        <div className='flex items-center gap-4'>
          <AuthorAvatar src={preview || null} size='size-16' />
          <div className='flex flex-col gap-1'>
            <div className='flex flex-wrap gap-3'>
              <LandingButton variant='outline' size='compact' onClick={() => fileRef.current?.click()}>{preview ? 'Change photo' : 'Add photo'}</LandingButton>
              {preview && <LandingButton variant='outline' size='compact' onClick={() => { setPhoto(null); setPreview(''); setRemovePhoto(true); }}>Remove</LandingButton>}
            </div>
            <p className={HINT_CLASS}>A clear, professional headshot. Square works best — max 5MB.</p>
          </div>
          <input ref={fileRef} type='file' accept='image/*' hidden onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) { setPhoto(file); setPreview(URL.createObjectURL(file)); setRemovePhoto(false); }
            event.target.value = '';
          }} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='author-name' className={LABEL_CLASS}>Name <span aria-hidden='true'>*</span></label>
          <input id='author-name' required value={name} onChange={(event) => { setName(event.target.value); if (!slugTouched) setSlug(slugify(event.target.value)); }} className={INPUT_CLASS} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='author-slug' className={LABEL_CLASS}>Profile URL</label>
          <p id='author-slug-hint' className={HINT_CLASS}>blackmontadvisory.com/team/<span className='font-medium text-midnight'>{slug || 'name'}</span>. Changing it later breaks existing links.</p>
          <input id='author-slug' aria-describedby='author-slug-hint' value={slug} onChange={(event) => { setSlugTouched(true); setSlug(slugify(event.target.value)); }} className={INPUT_CLASS} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='author-role' className={LABEL_CLASS}>Role</label>
          <input id='author-role' value={role} onChange={(event) => setRole(event.target.value)} placeholder='e.g. Principal M&A Adviser' className={INPUT_CLASS} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='author-credentials' className={LABEL_CLASS}>Credentials</label>
          <p id='author-credentials-hint' className={HINT_CLASS}>One per line — qualifications, memberships, years of experience. Only list what can be verified.</p>
          <textarea id='author-credentials' aria-describedby='author-credentials-hint' rows={3} value={credentials} onChange={(event) => setCredentials(event.target.value)}
            placeholder={'AIBB Certified Practising Business Broker\n15+ years in business sales'} className={TEXTAREA_CLASS} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='author-bio' className={LABEL_CLASS}>Bio</label>
          <p id='author-bio-hint' className={HINT_CLASS}>2–3 short paragraphs on their experience. Leave a blank line between paragraphs.</p>
          <textarea id='author-bio' aria-describedby='author-bio-hint' rows={6} value={bio} onChange={(event) => setBio(event.target.value)} className={TEXTAREA_CLASS} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='author-linkedin' className={LABEL_CLASS}>LinkedIn profile</label>
          <input id='author-linkedin' type='url' value={linkedin} onChange={(event) => setLinkedin(event.target.value)} placeholder='https://www.linkedin.com/in/…' className={INPUT_CLASS} />
        </div>
      </fieldset>
      {error && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{error}</p>}
      <div className='flex flex-wrap justify-end gap-3'>
        <LandingButton variant='outline' size='compact' disabled={saving} onClick={onCancel}>Cancel</LandingButton>
        <LandingButton type='submit' size='compact' disabled={saving || !name.trim()}>{saving && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{saving ? 'Saving…' : author ? 'Update author' : 'Create author'}</LandingButton>
      </div>
    </form>
  );
}
