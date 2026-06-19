'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Edit, Loader2, Trash2, Plus, Star } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '@/components/global/dashboard-layout';

type Listing = {
  _id: string;
  title: string;
  location: string;
  price: string | number;
  featured: boolean;
  partnerShared: boolean;
  referenceId: string;
};

export default function ListingsPage() {
  const router = useRouter();
  const { user } = useAdminAuth();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const featuredCount = listings.filter((l) => l.featured).length;

  const fetchListings = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res = await apiClient.get('/api/listings?featuredOnly=false', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setListings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load listings', err);
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user?.token]);

  const handleDelete = async (id: string, title: string) => {
    if (!user?.token) return;
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await apiClient.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error('Failed to delete listing', err);
      alert('Failed to delete listing');
    }
  };

  const handleToggleFeatured = async (listing: Listing) => {
    if (!user?.token) return;

    const willBeFeatured = !listing.featured;
    if (willBeFeatured && featuredCount >= 4) {
      alert('Maximum 4 featured listings allowed.');
      return;
    }

    // Optimistic update
    setListings((prev) =>
      prev.map((l) =>
        l._id === listing._id ? { ...l, featured: willBeFeatured } : l,
      ),
    );

    try {
      await apiClient.put(
        // Assuming put to /api/listings/:id updates it. If it's PATCH, change to patch.
        // Old app used listingsApi.update(id, obj). Usually put/patch
        `/api/listings/${listing._id}`,
        { featured: willBeFeatured },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
    } catch (err) {
      console.error('Failed to update featured status', err);
      // Revert on error
      fetchListings();
    }
  };

  const handleToggleShared = async (listing: Listing) => {
    if (!user?.token) return;
    const willBeShared = !listing.partnerShared;

    // Optimistic update
    setListings((prev) =>
      prev.map((l) =>
        l._id === listing._id ? { ...l, partnerShared: willBeShared } : l,
      ),
    );

    try {
      await apiClient.put(
        `/api/listings/${listing._id}`,
        { partnerShared: willBeShared },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
    } catch (err) {
      console.error('Failed to update shared status', err);
      fetchListings();
    }
  };

  return (
    <DashboardLayout
      title='Manage Listings'
      description='View, edit, and manage all business listings'
      button={
        <Link href='/admin/listings/new'>
          <Button className='gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'>
            <Plus className='w-4 h-4' /> Add New Listing
          </Button>
        </Link>
      }
    >
      <div className='overflow-hidden border border-border bg-card'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='bg-muted/60 border-b border-border text-xs uppercase tracking-wider text-muted-foreground'>
                <th className='px-6 py-4 font-semibold'>Reference ID</th>
                <th className='px-6 py-4 font-semibold'>Title</th>
                <th className='px-6 py-4 font-semibold'>Location</th>
                <th className='px-6 py-4 font-semibold'>Price</th>
                <th className='px-6 py-4 font-semibold text-center'>Featured</th>
                <th className='px-6 py-4 font-semibold text-center'>Shared</th>
                <th className='px-6 py-4 font-semibold text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {loading ? (
                <tr>
                  <td colSpan={7} className='text-center py-16'>
                    <Loader2 className='w-8 h-8 animate-spin text-accent mx-auto mb-4' />
                    <p className='text-muted-foreground font-medium'>
                      Loading listings...
                    </p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className='text-center py-16 text-red-500'>
                    {error}
                  </td>
                </tr>
              ) : listings.length === 0 ? (
                <tr>
                  <td colSpan={7} className='text-center py-16'>
                    <Building2 className='w-12 h-12 text-border mx-auto mb-4' />
                    <h3 className='text-lg font-semibold text-secondary mb-1'>
                      No Listings Found
                    </h3>
                    <p className='text-muted-foreground mb-6'>
                      Get started by adding your first business listing.
                    </p>
                    <Link href='/admin/listings/new'>
                      <Button variant='outline' className='gap-2 rounded-none'>
                        <Plus className='w-4 h-4' /> Add Listing
                      </Button>
                    </Link>
                  </td>
                </tr>
              ) : (
                listings.map((listing) => (
                  <tr
                    key={listing._id}
                    className='hover:bg-muted/50 transition-colors'
                  >
                    <td className='px-6 py-4 font-medium text-secondary max-w-xs truncate'>
                      {listing.referenceId || '—'}
                    </td>
                    <td className='px-6 py-4 font-medium text-secondary max-w-xs truncate'>
                      {listing.title || 'Untitled'}
                    </td>
                    <td className='px-6 py-4 text-muted-foreground'>
                      {listing.location || '—'}
                    </td>
                    <td className='px-6 py-4 text-muted-foreground'>
                      {listing.price === 0 || listing.price
                        ? String(listing.price)
                        : '—'}
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <div className='flex items-center justify-center'>
                        <button
                          onClick={() => handleToggleFeatured(listing)}
                          disabled={!listing.featured && featuredCount >= 4}
                          className={`p-1.5 rounded flex items-center gap-1.5 transition-colors ${
                            listing.featured
                              ? 'text-accent hover:bg-accent/10'
                              : !listing.featured && featuredCount >= 4
                                ? 'text-muted-foreground/50 cursor-not-allowed opacity-50'
                                : 'text-muted-foreground/70 hover:text-accent hover:bg-muted'
                          }`}
                          title={
                            !listing.featured && featuredCount >= 4
                              ? 'Max 4 featured listings allowed'
                              : 'Toggle Featured'
                          }
                        >
                          <Star
                            className={`w-5 h-5 ${listing.featured ? 'fill-current' : ''}`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <Switch
                        checked={!!listing.partnerShared}
                        onCheckedChange={() => handleToggleShared(listing)}
                      />
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-muted-foreground hover:text-accent hover:bg-accent/10'
                          onClick={() =>
                            router.push(`/admin/listings/${listing._id}`)
                          }
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-muted-foreground hover:text-red-600 hover:bg-red-50'
                          onClick={() =>
                            handleDelete(listing._id, listing.title)
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
    </DashboardLayout>
  );
}
