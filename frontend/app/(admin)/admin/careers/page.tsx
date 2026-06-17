'use client';

import { useEffect, useState, useMemo } from 'react';
import { Loader2, Search, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import DashboardLayout from '@/components/global/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface CareerApp {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  coverLetter?: string;
  resumeFile?: string;
  status?: string;
  createdAt: string;
}

export default function AdminCareersPage() {
  const { user } = useAdminAuth();
  const [apps, setApps] = useState<CareerApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCareers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  const fetchCareers = async () => {
    if (!user?.token) return;
    try {
      const res = await apiClient.get('/api/careers/applications', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setApps(res.data);
    } catch (err) {
      console.error('Failed to load career applications', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Interviewed':
        return (
          <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-100'>
            Interviewed
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge className='bg-red-100 text-red-700 hover:bg-red-100'>
            Rejected
          </Badge>
        );
      case 'Hired':
        return (
          <Badge className='bg-green-100 text-green-700 hover:bg-green-100'>
            Hired
          </Badge>
        );
      default:
        return (
          <Badge className='bg-gray-100 text-gray-700 hover:bg-gray-100'>
            {status || 'Received'}
          </Badge>
        );
    }
  };

  const filteredApps = useMemo(() => {
    if (!searchTerm) return apps;
    const lower = searchTerm.toLowerCase();
    return apps.filter((app) => {
      return (
        app.name?.toLowerCase().includes(lower) ||
        app.email?.toLowerCase().includes(lower) ||
        app.phone?.toLowerCase().includes(lower) ||
        app.status?.toLowerCase().includes(lower)
      );
    });
  }, [apps, searchTerm]);

  return (
    <DashboardLayout
      title='Career Applications'
      description='Manage job applicants and recruiting submissions.'
    >
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6'>
        <div className='relative max-w-sm'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <Input
            placeholder='Search applications...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-9 bg-gray-50 border-gray-200'
          />
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left align-top'>
            <thead>
              <tr className='bg-gray-50/80 border-b border-gray-100'>
                <th className='px-6 py-4 font-semibold text-gray-600'>Name</th>
                <th className='px-6 py-4 font-semibold text-gray-600'>
                  Email & Phone
                </th>
                <th className='px-6 py-4 font-semibold text-gray-600 w-1/3'>
                  Cover Letter
                </th>
                <th className='px-6 py-4 font-semibold text-gray-600'>
                  Resume
                </th>
                <th className='px-6 py-4 font-semibold text-gray-600'>Date</th>
                <th className='px-6 py-4 font-semibold text-gray-600'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {loading ? (
                <tr>
                  <td colSpan={6} className='text-center py-12 text-gray-400'>
                    <Loader2 className='w-6 h-6 animate-spin mx-auto mb-2 text-brand-primary' />
                    Loading applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center py-12 text-gray-500'>
                    {searchTerm
                      ? 'No applications found matching your search.'
                      : 'No applications found.'}
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr
                    key={app._id}
                    className='hover:bg-gray-50/60 transition-colors'
                  >
                    <td className='px-6 py-4 font-medium text-gray-900'>
                      {app.name || 'N/A'}
                    </td>
                    <td className='px-6 py-4'>
                      <p className='text-gray-900'>{app.email || '—'}</p>
                      <p className='text-gray-500 text-xs mt-0.5'>
                        {app.phone || '—'}
                      </p>
                    </td>
                    <td className='px-6 py-4 text-gray-600 text-xs text-wrap break-all wrap-break-word'>
                      <div className='max-h-24 overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap max-w-sm'>
                        {app.coverLetter || '—'}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      {app.resumeFile ? (
                        <a
                          href={app.resumeFile}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1.5 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors'
                        >
                          <ExternalLink className='w-4 h-4' /> View
                        </a>
                      ) : (
                        <span className='text-gray-400'>—</span>
                      )}
                    </td>
                    <td className='px-6 py-4 text-gray-500 text-sm whitespace-nowrap'>
                      {app.createdAt
                        ? format(new Date(app.createdAt), 'MMM dd, yyyy')
                        : '—'}
                    </td>
                    <td className='px-6 py-4'>{getStatusBadge(app.status)}</td>
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
