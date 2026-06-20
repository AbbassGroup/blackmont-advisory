'use client';

import { useEffect, useState, useMemo } from 'react';
import { Loader2, Search } from 'lucide-react';

import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import DashboardLayout from '@/components/global/dashboard-layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Enquiry {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  createdAt: string;
  formCompleted?: boolean;
}

export default function AdminEnquiriesPage() {
  const { user } = useAdminAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEnquiries = useMemo(() => {
    if (!searchTerm) return enquiries;
    const lower = searchTerm.toLowerCase();
    return enquiries.filter(
      (e) =>
        e.name?.toLowerCase().includes(lower) ||
        e.firstName?.toLowerCase().includes(lower) ||
        e.lastName?.toLowerCase().includes(lower) ||
        e.email?.toLowerCase().includes(lower) ||
        e.phone?.toLowerCase().includes(lower) ||
        e.source?.toLowerCase().includes(lower),
    );
  }, [enquiries, searchTerm]);

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  const fetchEnquiries = async () => {
    if (!user?.token) return;
    try {
      const res = await apiClient.get('/api/enquiries', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEnquiries(res.data);
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompleted = async (doc: Enquiry) => {
    if (!user?.token) return;

    // Optimistic update
    setEnquiries((prev) =>
      prev.map((e) =>
        e._id === doc._id ? { ...e, formCompleted: !e.formCompleted } : e,
      ),
    );

    try {
      await apiClient.put(
        `/api/enquiries/${doc._id}`,
        { formCompleted: !doc.formCompleted },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
    } catch (err) {
      console.error('Failed to toggle status', err);
      // Revert on failure
      setEnquiries((prev) =>
        prev.map((e) =>
          e._id === doc._id ? { ...e, formCompleted: doc.formCompleted } : e,
        ),
      );
    }
  };

  const getSourceBadge = (source?: string) => {
    switch (source) {
      case 'Contact Form':
        return (
          <Badge className='rounded-none bg-secondary/10 text-secondary hover:bg-secondary/10'>
            Contact Form
          </Badge>
        );
      case 'Franchise Form':
        return (
          <Badge className='rounded-none bg-accent/15 text-accent hover:bg-accent/15'>
            Franchise Form
          </Badge>
        );
      case 'Listing EOI':
        return (
          <Badge className='rounded-none bg-emerald-100 text-emerald-700 hover:bg-emerald-100'>
            Listing EOI
          </Badge>
        );
      case 'Confidentiality Agreement':
        return (
          <Badge className='rounded-none bg-red-100 text-red-700 hover:bg-red-100'>
            Confidentiality
          </Badge>
        );
      default:
        return (
          <Badge className='rounded-none bg-muted text-muted-foreground hover:bg-muted'>
            {source || 'Valuations Form'}
          </Badge>
        );
    }
  };

  return (
    <DashboardLayout
      title='Enquiries'
      description='Manage all leads and form submissions.'
    >
      <div className='bg-card border border-border p-4 mb-6'>
        <div className='relative max-w-sm'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60' />
          <Input
            placeholder='Search enquiries...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-9 rounded-none border-secondary/15 bg-background shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15'
          />
        </div>
      </div>

      <div className='bg-card border border-border overflow-hidden'>
        {loading ? (
          <div className='flex items-center justify-center p-24'>
            <Loader2 className='w-8 h-8 animate-spin text-accent' />
          </div>
        ) : (
          <Table>
            <TableHeader className='bg-muted/60'>
              <TableRow>
                <TableHead className='font-semibold'>Name</TableHead>
                <TableHead className='font-semibold'>Phone</TableHead>
                <TableHead className='font-semibold'>Email</TableHead>
                <TableHead className='font-semibold'>Source</TableHead>
                <TableHead className='font-semibold'>Date</TableHead>
                <TableHead className='font-semibold text-center'>
                  Completed
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnquiries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='text-center py-12 text-muted-foreground'
                  >
                    {searchTerm
                      ? 'No enquiries found matching your search.'
                      : 'No enquiries found.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnquiries.map((enquiry) => {
                  const name =
                    enquiry.name ||
                    `${enquiry.firstName || ''} ${enquiry.lastName || ''}`.trim() ||
                    'N/A';

                  return (
                    <TableRow
                      key={enquiry._id}
                      className='hover:bg-muted/50 transition-colors'
                    >
                      <TableCell className='font-medium text-secondary max-w-[200px] truncate'>
                        {name}
                      </TableCell>
                      <TableCell className='text-muted-foreground max-w-[200px] truncate'>
                        {enquiry.phone || '—'}
                      </TableCell>
                      <TableCell className='text-muted-foreground max-w-[200px] truncate'>
                        {enquiry.email || '—'}
                      </TableCell>
                      <TableCell>{getSourceBadge(enquiry.source)}</TableCell>
                      <TableCell className='text-muted-foreground text-sm'>
                        {new Date(enquiry.createdAt).toLocaleString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='flex justify-center items-center'>
                          <Checkbox
                            checked={!!enquiry.formCompleted}
                            onCheckedChange={() =>
                              handleToggleCompleted(enquiry)
                            }
                            aria-label='Toggle completed'
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
}
