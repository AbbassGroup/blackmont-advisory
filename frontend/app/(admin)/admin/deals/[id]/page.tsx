'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Loader2,
  ChevronDown,
  Eye,
  Bell,
  BellOff,
  UserCog,
  StickyNote,
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DashboardLayout from '@/components/global/dashboard-layout';
import { ImHistoryDialog } from '@/components/admin/im-history-dialog';
import { VendorAccessDialog } from '@/components/admin/vendor-access-dialog';
import {
  ProspectNotesDialog,
  type ProspectNote,
} from '@/components/admin/prospect-notes-dialog';
import { ImViewLog } from '../_components/deals';
import { toast } from 'sonner';

const CATEGORIES = [
  {
    label: 'Hot',
    color: 'bg-red-500 text-white',
    hover: 'hover:bg-red-600',
    dot: 'bg-red-500',
  },
  {
    label: 'Warm',
    color: 'bg-orange-500 text-white',
    hover: 'hover:bg-orange-600',
    dot: 'bg-orange-500',
  },
  {
    label: 'Cold',
    color: 'bg-blue-500 text-white',
    hover: 'hover:bg-blue-600',
    dot: 'bg-blue-500',
  },
];

const NEXAR_API = process.env.NEXT_PUBLIC_NEXAR_API_URL;

type Prospect = {
  _id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
};

export default function ProspectsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dealId = params?.id as string; // or listingId
  const nexarDealId = searchParams?.get('dealId') || '';

  // IM History State
  const [imDialogOpen, setImDialogOpen] = useState(false);
  const [imLogs, setImLogs] = useState<ImViewLog[]>([]);
  const [imLoading, setImLoading] = useState(false);
  // IM Notification State
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifToggling, setNotifToggling] = useState(false);

  const { user } = useAdminAuth();

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [dealTitle, setDealTitle] = useState('Deal');
  const [loading, setLoading] = useState(true);

  // Vendor access management
  const [vendorDialogOpen, setVendorDialogOpen] = useState(false);

  // Prospect notes
  const [notesMap, setNotesMap] = useState<Record<string, ProspectNote[]>>({});
  const [notesOpen, setNotesOpen] = useState(false);
  const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
  const [notesSaving, setNotesSaving] = useState(false);

  useEffect(() => {
    const fetchDealData = async () => {
      if (!user?.token || !dealId) return;
      setLoading(true);
      try {
        // Fetch prospects from Nexar API
        const prospectsRes = await fetch(
          `${NEXAR_API}/contacts/business-brokers/${nexarDealId}`,
          { headers: { Authorization: `Bearer ${user.token}` } },
        );

        const prospectsData = await prospectsRes.json();

        // Fetch categories from our backend API
        const categoriesRes = await apiClient.get(
          `/api/deals/${dealId}/categories`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );

        const businessNamesRes = await fetch(`${NEXAR_API}/contacts/business`, {
          method: 'POST',
          body: JSON.stringify({ dealIds: [nexarDealId] }),
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        const businessNames = (await businessNamesRes.json()).data;

        const businessInfo = businessNames?.find(
          (bn: any) => bn.dealId === nexarDealId,
        );

        setProspects(prospectsData || []);
        setCategories(categoriesRes.data || {});
        if (businessInfo) setDealTitle(businessInfo.businessName);
      } catch (error) {
        console.error('Failed to fetch prospects data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealData();
  }, [dealId, nexarDealId, user?.token]);

  // Fetch notification preference for this deal
  useEffect(() => {
    const fetchNotifPref = async () => {
      if (!user?.token || !dealId) return;
      try {
        const res = await apiClient.get(
          `/api/deals/${dealId}/im-notifications`,
          { headers: { Authorization: `Bearer ${user.token}` } },
        );
        setNotifEnabled(res.data?.enabled || false);
      } catch (error) {
        console.error('Failed to fetch notification pref:', error);
      }
    };
    fetchNotifPref();
  }, [dealId, user?.token]);

  const toggleNotification = async () => {
    if (!user?.token) return;
    const newEnabled = !notifEnabled;
    setNotifEnabled(newEnabled);
    setNotifToggling(true);
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      await apiClient.put(
        `/api/deals/${dealId}/im-notifications`,
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
      setNotifEnabled(!newEnabled);
      toast.error('Failed to update notification preference');
    } finally {
      setNotifToggling(false);
    }
  };

  // Fetch prospect notes for this deal
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?.token || !dealId) return;
      try {
        const res = await apiClient.get(`/api/deals/${dealId}/notes`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setNotesMap(res.data || {});
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    fetchNotes();
  }, [dealId, user?.token]);

  const handleCreateNote = async (body: string) => {
    if (!user?.token || !activeProspect) return;
    setNotesSaving(true);
    try {
      const res = await apiClient.post(
        `/api/deals/${dealId}/notes/${activeProspect._id}`,
        { body },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setNotesMap((prev) => ({
        ...prev,
        [activeProspect._id]: [res.data, ...(prev[activeProspect._id] || [])],
      }));
    } catch {
      toast.error('Failed to add note');
    } finally {
      setNotesSaving(false);
    }
  };

  const handleUpdateNote = async (noteId: string, body: string) => {
    if (!user?.token || !activeProspect) return;
    setNotesSaving(true);
    try {
      const res = await apiClient.put(
        `/api/deals/${dealId}/notes/${noteId}`,
        { body },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setNotesMap((prev) => ({
        ...prev,
        [activeProspect._id]: (prev[activeProspect._id] || []).map((n) =>
          n._id === noteId ? res.data : n,
        ),
      }));
    } catch {
      toast.error('Failed to update note');
    } finally {
      setNotesSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!user?.token || !activeProspect) return;
    setNotesSaving(true);
    try {
      await apiClient.delete(`/api/deals/${dealId}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setNotesMap((prev) => ({
        ...prev,
        [activeProspect._id]: (prev[activeProspect._id] || []).filter(
          (n) => n._id !== noteId,
        ),
      }));
    } catch {
      toast.error('Failed to delete note');
    } finally {
      setNotesSaving(false);
    }
  };

  const handleCategorySelect = async (prospectId: string, label: string) => {
    if (!user?.token) return;

    // Optimistic update
    setCategories((prev) => ({ ...prev, [prospectId]: label }));

    try {
      await apiClient.put(
        `/api/deals/${dealId}/categories/${prospectId}`,
        { category: label },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const getCategoryMeta = (prospectId: string) => {
    const label = categories[prospectId];
    if (!label) return null;
    return CATEGORIES.find((c) => c.label === label) || null;
  };

  const sortedProspects = prospects?.length
    ? [...prospects].sort((a, b) => {
        const priority: Record<string, number> = { Hot: 0, Warm: 1, Cold: 2 };
        const pa = priority[categories[a._id]] ?? 3;
        const pb = priority[categories[b._id]] ?? 3;
        return pa - pb;
      })
    : [];

  const openImHistory = async () => {
    if (!user?.token) return;
    setImDialogOpen(true);
    setImLoading(true);
    try {
      const res = await apiClient.get(
        `/api/listings/im-views/all?listingId=${dealId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      setImLogs(res.data || []);
    } catch (error) {
      console.error('Failed to fetch IM View History', error);
      setImLogs([]);
    } finally {
      setImLoading(false);
    }
  };

  return (
    <DashboardLayout
      title={`${dealTitle} Registered Buyers`}
      description=''
      button={
        <div className='flex gap-3'>
          <Button
            variant='outline'
            onClick={() => router.push('/admin/deals')}
            className='gap-2 rounded-none'
          >
            <ArrowLeft className='w-4 h-4' /> Back to Deals
          </Button>
          <Button
            variant='outline'
            onClick={openImHistory}
            className='gap-2 rounded-none text-accent border-accent/30 hover:bg-accent/5 hover:text-accent'
          >
            <Eye className='w-4 h-4' /> View IM History
          </Button>
          <Button
            variant='outline'
            onClick={() => setVendorDialogOpen(true)}
            className='gap-2 rounded-none'
          >
            <UserCog className='w-4 h-4' /> Vendor Access
          </Button>
          <Button
            variant='outline'
            onClick={toggleNotification}
            disabled={notifToggling}
            className={`gap-2 rounded-none ${
              notifEnabled
                ? 'text-accent border-accent/30 bg-accent/5 hover:bg-accent/10'
                : 'text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {notifToggling ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : notifEnabled ? (
              <Bell className='w-4 h-4' />
            ) : (
              <BellOff className='w-4 h-4' />
            )}
            {notifEnabled ? 'Notifications On' : 'Notifications Off'}
          </Button>
        </div>
      }
    >
      <div className='overflow-hidden border border-border bg-card'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='bg-muted/60 border-b border-border text-xs uppercase tracking-wider text-muted-foreground'>
                <th className='px-6 py-4 font-semibold'>Name</th>
                <th className='px-6 py-4 font-semibold'>Phone</th>
                <th className='px-6 py-4 font-semibold'>Email</th>
                <th className='px-6 py-4 font-semibold'>Category</th>
                <th className='px-6 py-4 font-semibold'>Notes</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {loading ? (
                <tr>
                  <td colSpan={5} className='text-center py-12'>
                    <Loader2 className='w-6 h-6 animate-spin text-accent mx-auto mb-2' />
                    <p className='text-muted-foreground'>Loading prospects...</p>
                  </td>
                </tr>
              ) : sortedProspects.length === 0 ? (
                <tr>
                  <td colSpan={5} className='text-center py-12 text-muted-foreground'>
                    No prospects found for this deal.
                  </td>
                </tr>
              ) : (
                sortedProspects.map((prospect) => {
                  const meta = getCategoryMeta(prospect._id);
                  return (
                    <tr
                      key={prospect._id}
                      className='hover:bg-muted/50 transition-colors'
                    >
                      <td className='px-6 py-4 font-medium text-secondary'>
                        {prospect.firstName} {prospect.lastName}
                      </td>
                      <td className='px-6 py-4 text-muted-foreground'>
                        {prospect.phone || '—'}
                      </td>
                      <td className='px-6 py-4 text-muted-foreground'>
                        {prospect.email || '—'}
                      </td>
                      <td className='px-6 py-4'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors focus:outline-none ${
                                meta
                                  ? meta.color
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                            >
                              {meta ? meta.label : 'Set Category'}
                              <ChevronDown
                                className={`w-3 h-3 ${meta ? 'opacity-80' : 'opacity-50'}`}
                              />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='start' className='w-32'>
                            {CATEGORIES.map((cat) => (
                              <DropdownMenuItem
                                key={cat.label}
                                onClick={() =>
                                  handleCategorySelect(prospect._id, cat.label)
                                }
                                className='gap-2 cursor-pointer'
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${cat.dot}`}
                                />
                                {cat.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className='px-6 py-4'>
                        <button
                          onClick={() => {
                            setActiveProspect(prospect);
                            setNotesOpen(true);
                          }}
                          className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent transition-colors'
                        >
                          <StickyNote className='w-4 h-4' />
                          {notesMap[prospect._id]?.length
                            ? `${notesMap[prospect._id].length} note${
                                notesMap[prospect._id].length > 1 ? 's' : ''
                              }`
                            : 'Add note'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ImHistoryDialog
        open={imDialogOpen}
        onOpenChange={setImDialogOpen}
        logs={imLogs}
        loading={imLoading}
        // dealId={dealId}
        token={user?.token || ''}
      />

      <VendorAccessDialog
        open={vendorDialogOpen}
        onOpenChange={setVendorDialogOpen}
        listingId={dealId}
        token={user?.token || ''}
      />

      <ProspectNotesDialog
        open={notesOpen}
        onOpenChange={setNotesOpen}
        prospectName={
          activeProspect
            ? `${activeProspect.firstName} ${activeProspect.lastName}`.trim()
            : ''
        }
        notes={activeProspect ? notesMap[activeProspect._id] || [] : []}
        saving={notesSaving}
        onCreate={handleCreateNote}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
      />
    </DashboardLayout>
  );
}
