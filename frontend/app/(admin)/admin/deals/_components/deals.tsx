'use client';

import { useEffect, useState } from 'react';
import { Loader2, Briefcase, Eye, Bell, BellOff } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import DashboardLayout from '@/components/global/dashboard-layout';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImHistoryDialog } from '@/components/admin/im-history-dialog';
import { toast } from 'sonner';

type Deal = {
  _id: string;
  title: string;
  image: string;
  businessName?: string;
  deal?: string;
};

export type ImViewLog = {
  _id: string;
  name?: string;
  email: string;
  enquiryId?: string;
  imRevoked?: boolean;
  imSharedAt?: string;
  autoExpired?: boolean;
  createdAt: string;
};
export default function Deals() {
  const { user } = useAdminAuth();
  const [deals, setDeals] = useState<Deal[]>([]);

  const [loading, setLoading] = useState(true);
  // IM History State
  const [imDialogOpen, setImDialogOpen] = useState(false);
  const [imLogs, setImLogs] = useState<ImViewLog[]>([]);
  const [imLoading, setImLoading] = useState(false);
  // IM Notification Prefs
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>({});
  const [togglingNotif, setTogglingNotif] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchDeals = async () => {
      if (!user?.token) return;
      setLoading(true);
      try {
        const dealRes = await apiClient.get('/api/deals');
        setDeals(dealRes.data || []);
      } catch (error) {
        console.error('Failed to fetch deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [user?.token]);

  // Fetch notification prefs once deals are loaded
  useEffect(() => {
    const fetchNotifPrefs = async () => {
      if (!user?.token || deals.length === 0) return;
      try {
        const res = await apiClient.get('/api/deals/im-notifications/bulk', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setNotifPrefs(res.data || {});
      } catch (error) {
        console.error('Failed to fetch notification prefs:', error);
      }
    };

    fetchNotifPrefs();
  }, [user?.token, deals.length]);

  const toggleNotification = async (e: React.MouseEvent, listingId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.token) return;

    const currentEnabled = notifPrefs[listingId] || false;
    const newEnabled = !currentEnabled;

    // Optimistic update
    setNotifPrefs((prev) => ({ ...prev, [listingId]: newEnabled }));
    setTogglingNotif((prev) => new Set(prev).add(listingId));

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      await apiClient.put(
        `/api/deals/${listingId}/im-notifications`,
        { enabled: newEnabled, timezone: tz },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      toast.success(
        newEnabled
          ? 'IM view email notifications enabled'
          : 'IM view email notifications disabled',
      );
    } catch (error) {
      console.error('Failed to toggle notification:', error);
      // Revert on failure
      setNotifPrefs((prev) => ({ ...prev, [listingId]: currentEnabled }));
      toast.error('Failed to update notification preference');
    } finally {
      setTogglingNotif((prev) => {
        const next = new Set(prev);
        next.delete(listingId);
        return next;
      });
    }
  };

  const openImHistory = async (e?: React.MouseEvent, listingId?: string) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!user?.token) return;
    setImDialogOpen(true);
    setImLoading(true);
    try {
      const url = listingId
        ? `/api/listings/im-views/all?listingId=${listingId}`
        : `/api/listings/im-views/all`;
      const res = await apiClient.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setImLogs(res.data || []);
    } catch (error) {
      console.error('Failed to fetch IM View History', error);
      setImLogs([]);
    } finally {
      setImLoading(false);
    }
  };

  console.log({ deals });

  return (
    <DashboardLayout
      title='Deals & Prospects'
      description='Manage business deals and view their prospects'
      button={
        <Button
          variant='outline'
          onClick={(e) => openImHistory(e)}
          className='gap-2 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/5 hover:text-brand-primary'
        >
          <Eye className='w-4 h-4' /> View All IM History
        </Button>
      }
    >
      {loading ? (
        <div className='flex items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100'>
          <Loader2 className='w-8 h-8 animate-spin text-brand-primary' />
        </div>
      ) : deals.length === 0 ? (
        <div className='flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100'>
          <Briefcase className='w-12 h-12 text-gray-300 mb-4' />
          <h3 className='text-lg font-semibold text-brand-black'>
            No Deals Found
          </h3>
          <p className='text-gray-500'>
            There are currently no deals available.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {deals.map((deal) => {
            const isNotifEnabled = notifPrefs[deal._id] || false;
            const isToggling = togglingNotif.has(deal._id);

            return (
              <Link
                key={deal._id}
                href={`/admin/deals/${deal._id}?dealId=${deal.deal}`}
              >
                <div className='group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-brand-primary/30 transition-all duration-300 h-full flex flex-col cursor-pointer'>
                  {/* Image container */}
                  <div className='aspect-4/3 w-full bg-gray-100 relative overflow-hidden'>
                    {deal.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <Image
                        loading='eager'
                        priority
                        unoptimized
                        width={500}
                        height={500}
                        src={deal.image}
                        alt={deal.businessName || 'Deal Image'}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-gray-50'>
                        <Briefcase className='w-10 h-10 text-gray-300' />
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className='grow mx-4 py-4 flex justify-between items-start gap-2'>
                    <h3 className='font-semibold text-brand-black line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors'>
                      {deal.businessName}
                    </h3>
                    <div className='flex items-center gap-1 shrink-0'>
                      <button
                        onClick={(e) => toggleNotification(e, deal._id)}
                        disabled={isToggling}
                        className={`p-1.5 rounded-full transition-colors ${
                          isNotifEnabled
                            ? 'text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20'
                            : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                        }`}
                        title={
                          isNotifEnabled
                            ? 'IM notifications ON — Click to disable'
                            : 'IM notifications OFF — Click to enable'
                        }
                      >
                        {isToggling ? (
                          <Loader2 className='w-4 h-4 animate-spin' />
                        ) : isNotifEnabled ? (
                          <Bell className='w-4 h-4' />
                        ) : (
                          <BellOff className='w-4 h-4' />
                        )}
                      </button>
                      <button
                        onClick={(e) => openImHistory(e, deal._id)}
                        className='p-1.5 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors shrink-0'
                        title='View IM History for this Deal'
                      >
                        <Eye className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {/* IM History Dialog */}
      <ImHistoryDialog
        open={imDialogOpen}
        onOpenChange={setImDialogOpen}
        logs={imLogs}
        loading={imLoading}
        token={user?.token || ''}
      />
    </DashboardLayout>
  );
}
