'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Loader2, Search, Plus, Trash2, Pencil, X } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AuthField, AuthPasswordField, authInputClass, AuthMessage } from '../../_components/auth-shell';
import { ADMIN_PAGE_OPTIONS } from '@/lib/admin-pages';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  allowedPages?: string[];
  createdAt: string;
}

const EMPTY_FORM = { username: '', email: '', password: '', role: 'admin', allowedPages: [] as string[] };
const ICON_CLASS = 'inline-flex size-10 shrink-0 items-center justify-center text-midnight transition-colors duration-150 hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none';
const MODAL_CLASS = cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-sm leading-[1.65] text-ink ring-0 sm:max-w-[600px] min-[681px]:p-8');

function userDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminUsersPage() {
  const { user } = useAdminAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setLoading(true);
    setLoadError(false);
    apiClient.get('/api/auth/admins', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => { if (active) setUsers(Array.isArray(data.data) ? data.data : []); })
      .catch(() => { if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.token, attempt]);

  const openCreate = () => { setEditingId(null); setForm(EMPTY_FORM); setActionError(''); setFormOpen(true); };
  const openEdit = (target: User) => {
    setEditingId(target._id);
    setForm({ username: target.username, email: target.email, password: '', role: target.role, allowedPages: target.allowedPages ?? [] });
    setActionError('');
    setFormOpen(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (actionLoading || !user?.token) return;
    setActionError('');
    if (!form.email || !form.username || (!editingId && !form.password)) { setActionError('Please fill in all required fields.'); return; }
    const allowedPages = form.role === 'superadmin' ? [] : form.allowedPages;
    setActionLoading(true);
    try {
      if (editingId) {
        const payload: Record<string, unknown> = { username: form.username, role: form.role, allowedPages };
        if (form.password) payload.password = form.password;
        await apiClient.put(`/api/auth/update/user/${editingId}`, payload, { headers: { Authorization: `Bearer ${user.token}` } });
      } else {
        await apiClient.post('/api/auth/register', { ...form, allowedPages }, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setFormOpen(false);
      setAttempt((value) => value + 1);
    } catch {
      setActionError(editingId ? 'Failed to update user. Email or username might already exist.' : 'Failed to create user. Email or username might already exist.');
    } finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    if (!deleteId || !user?.token || actionLoading) return;
    const target = users.find((item) => item._id === deleteId);
    if (!target || target.role === 'superadmin' || target.email === user.user?.email) return;
    setActionLoading(true);
    setActionError('');
    try {
      await apiClient.delete(`/api/auth/delete/user/${deleteId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setDeleteId(null);
      setAttempt((value) => value + 1);
    } catch { setActionError('Failed to delete user. Please try again.'); }
    finally { setActionLoading(false); }
  };

  const query = search.trim().toLowerCase();
  const filteredUsers = useMemo(() => users.filter((target) => [target.username, target.email, target.role].some((value) => value.toLowerCase().includes(query))), [users, query]);

  return (
    <AdminPageLayout title='User Management' description='Manage admin access and system users.'
      action={<LandingButton size='compact' onClick={openCreate}><Plus aria-hidden='true' className='size-4' />Add user</LandingButton>}>
      <section aria-label='System users' aria-busy={loading} className='min-w-0 border border-advisory-rule bg-white'>
        <div className='flex flex-col gap-4 border-b border-advisory-rule p-5 min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between min-[681px]:p-6'>
          <div className='relative w-full min-[681px]:max-w-md'>
            <label htmlFor='user-search' className='sr-only'>Search users by username, email or role</label>
            <Search aria-hidden='true' className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/60' />
            <input id='user-search' type='search' placeholder='Search users…' value={search} onChange={(event) => setSearch(event.target.value)} className={cn(authInputClass, 'pl-10')} />
          </div>
          <p aria-live='polite' className='m-0 shrink-0 text-sm text-ink'>{loading ? 'Loading users…' : loadError ? 'List unavailable' : query ? `${filteredUsers.length} of ${users.length} users` : `${users.length} ${users.length === 1 ? 'user' : 'users'}`}</p>
        </div>
        {loadError && !loading ? (
          <div role='alert' className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load your users.</h2><p className='mt-2 mb-5 text-sm leading-[1.75]'>Try again to refresh the list.</p><LandingButton variant='outline' size='compact' onClick={() => setAttempt((value) => value + 1)}>Try again</LandingButton></div>
        ) : !loading && filteredUsers.length === 0 ? (
          <div className='p-6 min-[681px]:p-8'><h2 className='m-0 text-base font-semibold text-midnight'>{query ? 'No matching users' : 'No users found'}</h2><p className='mt-2 mb-0 text-sm leading-[1.75]'>{query ? 'Try another username, email address or role.' : 'Create a user to give someone access to the admin portal.'}</p>{query && <LandingButton variant='outline' size='compact' className='mt-5' onClick={() => setSearch('')}>Clear search</LandingButton>}</div>
        ) : (
          <div role='region' aria-label='User table' tabIndex={0} className='min-w-0 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
            <table className='w-full min-w-[900px] text-left text-sm leading-[1.65]'>
              <caption className='sr-only'>System usernames, email addresses, roles, creation dates and actions.</caption>
              <UsersHead />
              <tbody className='divide-y divide-advisory-rule'>
                {loading ? [0, 1, 2, 3, 4].map((row) => <tr key={row} aria-hidden='true'>{[0, 1, 2, 3].map((column) => <td key={column} className='px-5 py-5'><div className='h-5 w-28 animate-pulse bg-canvas motion-reduce:animate-none' /></td>)}<td className='px-5 py-3'><div className='ml-auto h-10 w-20 animate-pulse bg-canvas motion-reduce:animate-none' /></td></tr>) : filteredUsers.map((target) => (
                  <tr key={target._id} className='hover:bg-canvas/50'>
                    <td className='px-5 py-5 align-top font-semibold text-midnight'>{target.username}</td>
                    <td className='break-all px-5 py-5 align-top text-ink'>{target.email}</td>
                    <td className='px-5 py-5 align-top'><span className={cn('inline-flex px-2.5 py-1 text-xs leading-[1.5] font-medium text-midnight', target.role === 'superadmin' ? 'bg-gilt/15' : 'bg-canvas')}>{target.role === 'superadmin' ? 'Super admin' : target.role === 'admin' ? 'Admin' : target.role}</span></td>
                    <td className='px-5 py-5 align-top whitespace-nowrap text-ink'>{userDate(target.createdAt)}</td>
                    <td className='px-5 py-3 align-top'><div className='flex justify-end gap-1'>
                      <button type='button' onClick={() => openEdit(target)} className={ICON_CLASS} aria-label={`Edit ${target.username}`} title='Edit user'><Pencil aria-hidden='true' className='size-4' /></button>
                      <button type='button' onClick={() => { setDeleteId(target._id); setActionError(''); }} disabled={target.role === 'superadmin' || target.email === user?.user?.email} className={cn(ICON_CLASS, 'text-red-800 hover:bg-red-50')} aria-label={`Delete ${target.username}`} title={target.role === 'superadmin' ? 'Cannot delete superadmin' : target.email === user?.user?.email ? 'Cannot delete your own account' : 'Delete user'}><Trash2 aria-hidden='true' className='size-4' /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={formOpen} onOpenChange={(open) => { if (!actionLoading) setFormOpen(open); }}>
        <DialogContent showCloseButton={false} className={MODAL_CLASS} onEscapeKeyDown={(event) => { if (actionLoading) event.preventDefault(); }} onInteractOutside={(event) => { if (actionLoading) event.preventDefault(); }}>
          <button type='button' aria-label='Close user form' disabled={actionLoading} onClick={() => setFormOpen(false)} className={cn(ICON_CLASS, 'absolute top-4 right-4')}><X aria-hidden='true' className='size-4' /></button>
          <DialogHeader className='pr-10'><DialogTitle className='font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>{editingId ? 'Edit user' : 'Create user'}</DialogTitle><DialogDescription className='text-sm leading-[1.75] text-ink'>Set account details, role and access to admin pages.</DialogDescription></DialogHeader>
          <form onSubmit={handleSubmit} className='flex min-w-0 flex-col gap-6'>
            <fieldset disabled={actionLoading} className='m-0 flex min-w-0 flex-col gap-5 border-0 p-0'>
              <legend className='sr-only'>Account details</legend>
              <AuthField id='user-username' label='Username' required value={form.username} autoComplete='off' onChange={(event) => setForm({ ...form, username: event.target.value })} />
              <AuthField id='user-email' type='email' label='Email address' required={!editingId} disabled={Boolean(editingId)} hint={editingId ? 'Email address cannot be changed.' : undefined} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              <AuthPasswordField id='user-password' label='Password' disabled={actionLoading} autoComplete='new-password' required={!editingId} hint={editingId ? 'Leave blank to keep the current password.' : undefined} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
              <div className='flex flex-col gap-2'><label htmlFor='user-role' className='text-sm font-medium text-midnight'>Role</label><select id='user-role' value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className={authInputClass}><option value='admin'>Admin</option><option value='superadmin'>Super admin</option></select></div>
              <fieldset className='m-0 flex min-w-0 flex-col gap-3 border-0 p-0'>
                <legend className='mb-3 text-sm font-medium text-midnight'>Page access</legend>
                {form.role === 'superadmin' ? <p className='m-0 bg-canvas px-4 py-3 text-sm leading-[1.75]'>Super admins have access to all pages.</p> : <>
                  <div className='grid grid-cols-1 gap-x-5 min-[481px]:grid-cols-2'>
                    {ADMIN_PAGE_OPTIONS.map((page) => <label key={page.value} className='flex min-h-10 cursor-pointer items-start gap-3 py-2 text-sm leading-[1.65] text-midnight'><input type='checkbox' className='mt-1 size-4 shrink-0 accent-midnight focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt' checked={form.allowedPages.includes(page.value)} onChange={(event) => setForm((previous) => ({ ...previous, allowedPages: event.target.checked ? [...previous.allowedPages, page.value] : previous.allowedPages.filter((value) => value !== page.value) }))} /><span>{page.label}</span></label>)}
                  </div>
                  <p className='m-0 text-xs leading-[1.75]'>Choose which pages this admin can access. If none are selected, the default pages are shown.</p>
                </>}
              </fieldset>
            </fieldset>
            {actionError && <AuthMessage>{actionError}</AuthMessage>}
            <div className='flex flex-wrap justify-end gap-3 border-t border-advisory-rule pt-5'>
              <LandingButton variant='outline' size='compact' disabled={actionLoading} onClick={() => setFormOpen(false)}>Cancel</LandingButton>
              <LandingButton type='submit' size='compact' disabled={actionLoading}>{actionLoading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{actionLoading ? 'Saving…' : editingId ? 'Save changes' : 'Create user'}</LandingButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteId)} onOpenChange={(open) => { if (!open && !actionLoading) setDeleteId(null); }}>
        <DialogContent showCloseButton={false} className={cn(MODAL_CLASS, 'sm:max-w-[480px]')} onEscapeKeyDown={(event) => { if (actionLoading) event.preventDefault(); }} onInteractOutside={(event) => { if (actionLoading) event.preventDefault(); }}>
          <button type='button' disabled={actionLoading} aria-label='Close delete confirmation' onClick={() => setDeleteId(null)} className={cn(ICON_CLASS, 'absolute top-4 right-4')}><X aria-hidden='true' className='size-4' /></button>
          <DialogHeader className='pr-10'><DialogTitle className='font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight'>Delete user?</DialogTitle><DialogDescription className='text-sm leading-[1.75] text-ink'>This action cannot be undone. {users.find((target) => target._id === deleteId)?.username || 'The user'} will lose access to the admin dashboard.</DialogDescription></DialogHeader>
          {actionError && <AuthMessage>{actionError}</AuthMessage>}
          <div className='flex flex-wrap justify-end gap-3'><LandingButton variant='outline' size='compact' disabled={actionLoading} onClick={() => setDeleteId(null)}>Cancel</LandingButton><LandingButton size='compact' disabled={actionLoading} className='border-red-800 bg-red-800 hover:bg-red-900' onClick={() => void handleDelete()}>{actionLoading && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{actionLoading ? 'Deleting…' : 'Delete user'}</LandingButton></div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}

function UsersHead() {
  return <thead className='border-b border-advisory-rule bg-canvas text-midnight'><tr>{['Username', 'Email', 'Role', 'Created', 'Actions'].map((column) => <th key={column} scope='col' className={cn('px-5 py-4 font-semibold', column === 'Actions' && 'text-right')}>{column}</th>)}</tr></thead>;
}
