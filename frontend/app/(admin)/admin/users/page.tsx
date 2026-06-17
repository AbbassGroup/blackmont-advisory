'use client';

import { useEffect, useState, useMemo } from 'react';
import { Loader2, Search, Plus, Trash2, Pencil, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import DashboardLayout from '@/components/global/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

const EMPTY_FORM = { username: '', email: '', password: '', role: 'admin' };

export default function AdminUsersPage() {
  const { user } = useAdminAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Create / edit form state
  const [form, setForm] = useState(EMPTY_FORM);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (u: User) => {
    setEditingId(u._id);
    setForm({ username: u.username, email: u.email, password: '', role: u.role });
    setFormOpen(true);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  const fetchUsers = async () => {
    if (!user?.token) return;
    try {
      const res = await apiClient.get('/api/auth/admins', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Password is required when creating; optional when editing (blank = keep).
    if (!form.email || !form.username || (!editingId && !form.password)) {
      alert('Please fill in all required fields');
      return;
    }
    if (!user?.token) return;

    setActionLoading(true);
    try {
      if (editingId) {
        // Email is intentionally not updatable.
        const payload: Record<string, string> = {
          username: form.username,
          role: form.role,
        };
        if (form.password) payload.password = form.password;
        await apiClient.put(`/api/auth/update/user/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await apiClient.post('/api/auth/register', form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setFormOpen(false);
      fetchUsers();
    } catch (err) {
      console.error('Failed to save user', err);
      alert(
        editingId
          ? 'Failed to update user. Email or username might already exist.'
          : 'Failed to create user. Email or username might already exist.',
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId || !user?.token) return;
    setActionLoading(true);
    try {
      await apiClient.delete(`/api/auth/delete/user/${deleteId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDeleteId(null);
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user', err);
      alert('Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lower = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower) ||
        u.role.toLowerCase().includes(lower),
    );
  }, [users, searchTerm]);

  return (
    <DashboardLayout
      title='User Management'
      description='Manage admin access and system users.'
      button={
        <Button
          className='bg-brand-primary hover:bg-brand-primary/90 text-white gap-2'
          onClick={openCreate}
        >
          <Plus className='w-4 h-4' /> Add User
        </Button>
      }
    >
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6'>
        <div className='relative max-w-sm'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-9 bg-gray-50 border-gray-200'
          />
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='bg-gray-50/80 border-b border-gray-100'>
                <th className='px-6 py-4 font-semibold text-gray-600'>
                  Username
                </th>
                <th className='px-6 py-4 font-semibold text-gray-600'>Email</th>
                <th className='px-6 py-4 font-semibold text-gray-600'>Role</th>
                <th className='px-6 py-4 font-semibold text-gray-600'>
                  Created
                </th>
                <th className='px-6 py-4 font-semibold text-gray-600 text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {loading ? (
                <tr>
                  <td colSpan={5} className='text-center py-12 text-gray-400'>
                    <Loader2 className='w-6 h-6 animate-spin mx-auto mb-2 text-brand-primary' />
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className='text-center py-12 text-gray-500'>
                    {searchTerm
                      ? 'No users found matching your search.'
                      : 'No users found.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u._id}
                    className='hover:bg-gray-50/60 transition-colors'
                  >
                    <td className='px-6 py-4 font-medium text-gray-900 flex items-center gap-2'>
                      {u.role === 'superadmin' && (
                        <ShieldAlert className='w-4 h-4 text-brand-primary' />
                      )}
                      {u.username}
                    </td>
                    <td className='px-6 py-4 text-gray-600'>{u.email}</td>
                    <td className='px-6 py-4'>
                      <Badge
                        variant={
                          u.role === 'superadmin' ? 'default' : 'secondary'
                        }
                        className={
                          u.role === 'superadmin'
                            ? 'bg-red-100 text-red-700 hover:bg-red-100'
                            : ''
                        }
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className='px-6 py-4 text-gray-500'>
                      {u.createdAt
                        ? format(new Date(u.createdAt), 'MMM dd, yyyy')
                        : '—'}
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => openEdit(u)}
                          className='text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10'
                          title='Edit user'
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => setDeleteId(u._id)}
                          disabled={
                            u.role === 'superadmin' ||
                            u.email === user?.user?.email
                          }
                          className='text-gray-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400'
                          title={
                            u.role === 'superadmin'
                              ? 'Cannot delete superadmin'
                              : 'Delete user'
                          }
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit User Modal */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit User' : 'Create New User'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>
                Username <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='username'
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>
                Email Address{' '}
                {editingId ? (
                  <span className='text-xs font-normal text-gray-400'>
                    (cannot be changed)
                  </span>
                ) : (
                  <span className='text-red-500'>*</span>
                )}
              </Label>
              <Input
                id='email'
                type='email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required={!editingId}
                disabled={!!editingId}
                className={editingId ? 'bg-gray-50 text-gray-500' : ''}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>
                Password{' '}
                {editingId ? (
                  <span className='text-xs font-normal text-gray-400'>
                    (leave blank to keep current)
                  </span>
                ) : (
                  <span className='text-red-500'>*</span>
                )}
              </Label>
              <Input
                id='password'
                type='password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required={!editingId}
                placeholder={editingId ? 'Set a new password' : ''}
                autoComplete='new-password'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='role'>Role</Label>
              <select
                id='role'
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <option value='admin'>Admin</option>
                <option value='superadmin'>Super Admin</option>
              </select>
            </div>

            <DialogFooter className='mt-6 border-t pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={actionLoading}
                className='bg-brand-primary text-white hover:bg-brand-primary/90 w-24'
              >
                {actionLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : editingId ? (
                  'Save'
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle className='text-lg font-bold'>
              Delete User?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. The user will lose all access to the
              admin dashboard immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='mt-4 sm:justify-end gap-2'>
            <Button variant='outline' onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={actionLoading}
              className='bg-red-600 hover:bg-red-700 text-white w-24'
            >
              {actionLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
