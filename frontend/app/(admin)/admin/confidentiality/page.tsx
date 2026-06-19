'use client';

import { useEffect, useState, useMemo } from 'react';
import { Loader2, Download, Search } from 'lucide-react';

import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import DashboardLayout from '@/components/global/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ConfidentialityPDF {
  filename: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  businessTitle?: string;
  createdAt?: string;
  size?: number;
  hasEnquiryData?: boolean;
}

export default function AdminConfidentialityPage() {
  const { user } = useAdminAuth();
  const [pdfs, setPdfs] = useState<ConfidentialityPDF[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPdfs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  const fetchPdfs = async () => {
    if (!user?.token) return;
    try {
      const res = await apiClient.get('/api/confidentiality/list', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPdfs(res.data);
    } catch (err) {
      console.error('Failed to load confidentiality agreements', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (pdf: ConfidentialityPDF) => {
    try {
      const urlPath = `/api/confidentiality/download/${encodeURIComponent(
        pdf.filename,
      )}`;
      const res = await apiClient.get(urlPath, {
        responseType: 'blob', // Crucial for file downloads
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = pdf.filename || 'Confidentiality_Agreement.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed:', e);
      alert('Failed to download the PDF.');
    }
  };

  const filteredPdfs = useMemo(() => {
    if (!searchTerm) return pdfs;
    const lower = searchTerm.toLowerCase();
    return pdfs.filter((pdf) => {
      return (
        pdf.filename?.toLowerCase().includes(lower) ||
        pdf.firstName?.toLowerCase().includes(lower) ||
        pdf.lastName?.toLowerCase().includes(lower) ||
        pdf.email?.toLowerCase().includes(lower) ||
        pdf.phone?.toLowerCase().includes(lower) ||
        pdf.businessTitle?.toLowerCase().includes(lower)
      );
    });
  }, [pdfs, searchTerm]);

  return (
    <DashboardLayout
      title='Confidentiality Agreements'
      description='Manage and download signed NDAs and compliance agreements.'
    >
      <div className='bg-card border border-border p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div className='relative max-w-lg w-full'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60' />
          <Input
            placeholder='Search agreements...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-9 rounded-none border-secondary/15 bg-background shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15'
          />
        </div>
        <p className='text-sm text-muted-foreground shrink-0'>
          Showing{' '}
          <span className='font-semibold text-secondary'>
            {filteredPdfs.length}
          </span>{' '}
          of {pdfs.length}
        </p>
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
                <TableHead className='font-semibold'>Name & File</TableHead>
                <TableHead className='font-semibold'>Email</TableHead>
                <TableHead className='font-semibold'>Phone</TableHead>
                <TableHead className='font-semibold'>Business</TableHead>
                <TableHead className='font-semibold'>Created</TableHead>
                <TableHead className='font-semibold'>Size</TableHead>
                <TableHead className='font-semibold text-right'>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPdfs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='text-center py-12 text-muted-foreground'
                  >
                    {searchTerm
                      ? 'No confidentiality agreements found matching your search.'
                      : 'No confidentiality agreements found.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPdfs.map((pdf) => {
                  const name =
                    pdf.firstName || pdf.lastName
                      ? `${pdf.firstName || ''} ${pdf.lastName || ''}`.trim()
                      : 'Unknown';

                  return (
                    <TableRow
                      key={pdf.filename}
                      className='hover:bg-muted/50 transition-colors'
                    >
                      <TableCell>
                        <div>
                          <p className='font-medium text-secondary flex items-center gap-2'>
                            {name}
                            {!pdf.hasEnquiryData && (
                              <Badge
                                variant='outline'
                                className='text-[10px] h-5 bg-orange-50 text-orange-600 border-orange-200'
                              >
                                Legacy
                              </Badge>
                            )}
                          </p>
                          <p
                            className='text-xs text-muted-foreground/60 mt-1 max-w-[200px] truncate'
                            title={pdf.filename}
                          >
                            {pdf.filename}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className='text-muted-foreground'>
                        {pdf.email || '—'}
                      </TableCell>
                      <TableCell className='text-muted-foreground'>
                        {pdf.phone || '—'}
                      </TableCell>
                      <TableCell className='text-muted-foreground font-medium max-w-[200px] truncate'>
                        {pdf.businessTitle || '—'}
                      </TableCell>
                      <TableCell className='text-muted-foreground text-sm'>
                        {pdf.createdAt
                          ? new Date(pdf.createdAt).toLocaleString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '—'}
                      </TableCell>
                      <TableCell className='text-muted-foreground text-sm whitespace-nowrap'>
                        {typeof pdf.size === 'number'
                          ? `${(pdf.size / 1024).toFixed(2)} KB`
                          : '—'}
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='gap-2 rounded-none border-accent/30 text-accent transition-colors hover:bg-accent hover:text-primary'
                          onClick={() => handleDownload(pdf)}
                        >
                          <Download className='w-4 h-4' /> Download
                        </Button>
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
