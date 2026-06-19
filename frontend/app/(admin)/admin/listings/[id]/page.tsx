'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/global/dashboard-layout';
import { scrollToError } from '@/lib/scroll-to-error';

import { ListingBasicDetails } from '../_components/listing-basic-details';
import { ListingMediaDocuments } from '../_components/listing-media-documents';
import { ListingContactTeam } from '../_components/listing-contact-team';
import { External } from '../_components/external';

const BROKERS = [
  { name: 'Tester', email: 'mohammadjahid0007@gmail.com' },
  { name: 'Sadeq Abbass', email: 'sadeq@blackmontadvisory.com' },
  { name: 'Asif Ahammed', email: 'asif.ahammed@blackmontadvisory.com' },
  { name: 'Christine Lamani', email: 'christine.lamani@blackmontadvisory.com' },
  { name: 'Freddie Wong', email: 'freddie.wong@blackmontadvisory.com' },
  { name: 'Igor Vasiliev', email: 'igor.vasiliev@blackmontadvisory.com' },
  { name: 'Hicham Nahas', email: 'hicham.nahas@blackmontadvisory.com' },
  { name: 'Fiona Johns', email: 'fiona@blackmontadvisory.com' },
];

export default function ListingFormPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAdminAuth();
  const idParam = params?.id as string;
  const isNew = idParam === 'new';

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [docUploading, setDocUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [suburb, setSuburb] = useState('');
  const [price, setPrice] = useState('');
  const [summary, setSummary] = useState('');
  const [about, setAbout] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [businessType, setBusinessType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [selectedDeal, setSelectedDeal] = useState('');
  const [referenceId, setReferenceId] = useState('');

  // Media State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Documents State (For existing list)
  const [documents, setDocuments] = useState<any[]>([]);
  // Documents State (For new ones waiting to be uploaded alongside new listing)
  const [newDocs, setNewDocs] = useState<File[]>([]);

  // IM web template assignment (mutually exclusive with PDF documents)
  const [imTemplateId, setImTemplateId] = useState('');
  const [imTemplates, setImTemplates] = useState<any[]>([]);

  // Drag state
  const dragItemIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);

  useEffect(() => {
    if (!isNew && user?.token) {
      const fetchListing = async () => {
        setLoading(true);
        try {
          const res = await apiClient.get(`/api/listings/${idParam}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const data = res.data;

          setTitle(data.title || '');
          setCategory(data.category || '');
          setLocation(data.location || '');
          setSuburb(data.suburb || '');
          setPrice(data.price?.toString() || '');
          setSummary(data.summary || '');
          setAbout(data.about || '');
          setContactName(data.contact?.name || '');
          setContactPhone(data.contact?.phone || '');
          setContactEmail(data.contact?.email || '');
          setMapLink(data.mapLink || '');
          setImagePreview(data.image || '');
          setDocuments(data.documents || []);
          setImTemplateId(data.imTemplateId || '');
          setBusinessType(data.businessType || '');
          setPriceRange(data.priceRange || '');
          setSelectedDeal(data.deal || '');
          setReferenceId(data.referenceId || '');

          if (data.brokers && Array.isArray(data.brokers)) {
            setSelectedBrokers(
              data.brokers.map((b: any) =>
                typeof b === 'string' ? b : b.email,
              ),
            );
          }
        } catch (error) {
          console.error('Failed to load listing', error);
          alert('Failed to load listing details.');
          router.push('/admin/listings');
        } finally {
          setLoading(false);
        }
      };
      fetchListing();
    }
  }, [idParam, isNew, user?.token, router]);

  // Load the IM web templates this broker can assign (superadmins see all).
  useEffect(() => {
    if (!user?.token) return;
    apiClient
      .get('/api/im-templates?limit=100', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setImTemplates(res.data?.templates || []))
      .catch(() => setImTemplates([]));
  }, [user?.token]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let firstErrorField = '';

    const required = [
      { name: 'title', value: title, label: 'Title' },
      { name: 'location', value: location, label: 'Location' },
      { name: 'price', value: price, label: 'Price' },
      { name: 'summary', value: summary, label: 'Summary' },
      { name: 'about', value: about, label: 'About' },
      {
        name: 'brokers',
        value: selectedBrokers.length > 0 ? 'yes' : '',
        label: 'Assigned Brokers',
      },
      { name: 'businessType', value: businessType, label: 'Business Type' },
      { name: 'priceRange', value: priceRange, label: 'Price Range' },
      { name: 'deal', value: selectedDeal, label: 'Deal' },
    ];
    for (const field of required) {
      if (!field.value) {
        newErrors[field.name] = `${field.label} is required`;
        if (!firstErrorField) firstErrorField = field.name;
      }
    }

    setErrors(newErrors);

    if (firstErrorField) {
      scrollToError(firstErrorField, formRef.current);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm() || !user?.token) return;

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('category', category);
      fd.append('location', location);
      fd.append('suburb', suburb);
      fd.append('price', price);
      fd.append('summary', summary);
      fd.append('about', about);
      fd.append('mapLink', mapLink);
      fd.append('businessType', businessType);
      fd.append('priceRange', priceRange);
      fd.append('deal', selectedDeal);
      fd.append('referenceId', referenceId);
      // IM source: a web template id, or empty to fall back to PDF documents.
      fd.append('imTemplateId', imTemplateId);

      const contactData = {
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
      };
      fd.append('contact', JSON.stringify(contactData));

      const brokerObjects = selectedBrokers
        .map((email) => BROKERS.find((b) => b.email === email))
        .filter(Boolean);
      fd.append('brokers', JSON.stringify(brokerObjects));

      if (imageFile) {
        fd.append('image', imageFile);
      }

      let listingId = idParam;

      if (isNew) {
        const res = await apiClient.post('/api/listings', fd, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        listingId = res.data._id;

        // Upload new docs if any
        if (newDocs.length > 0) {
          const docFd = new FormData();
          newDocs.forEach((f) => docFd.append('documents', f));
          await apiClient.post(`/api/listings/${listingId}/documents`, docFd, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
        }
      } else {
        await apiClient.put(`/api/listings/${idParam}`, fd, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      router.push('/admin/listings');
      router.refresh();
    } catch (error) {
      console.error('Failed to save listing', error);
      alert('Failed to save listing');
    } finally {
      setSaving(false);
    }
  };

  // --- Document Handling (Edit Mode) ---
  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (isNew) {
      setNewDocs((prev) => [...prev, ...files]);
      if (docInputRef.current) docInputRef.current.value = '';
      return;
    }

    if (!user?.token) return;
    setDocUploading(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append('documents', f));
      await apiClient.post(`/api/listings/${idParam}/documents`, fd, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // The API typically returns the updated listing or just the array of docs, lets re-fetch or use response
      // Fetching the whole thing to be safe
      const updated = await apiClient.get(`/api/listings/${idParam}`);
      setDocuments(updated.data.documents || []);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setDocUploading(false);
      if (docInputRef.current) docInputRef.current.value = '';
    }
  };

  const handleDocDelete = async (docId: string) => {
    if (!user?.token || !idParam) return;
    if (!confirm('Delete this document?')) return;
    try {
      await apiClient.delete(`/api/listings/${idParam}/documents/${docId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDocuments((prev) => prev.filter((d) => d._id !== docId));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleDragStart = (idx: number) => {
    dragItemIdx.current = idx;
  };
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    dragOverIdx.current = idx;
  };
  const handleDrop = async () => {
    const from = dragItemIdx.current;
    const to = dragOverIdx.current;
    if (from === null || to === null || from === to) return;
    dragItemIdx.current = null;
    dragOverIdx.current = null;

    const docs = [...documents];
    const [moved] = docs.splice(from, 1);
    docs.splice(to, 0, moved);
    setDocuments(docs);

    if (!isNew && user?.token) {
      try {
        await apiClient.put(
          `/api/listings/${idParam}/documents/reorder`,
          { order: docs.map((d) => d._id) },
          { headers: { Authorization: `Bearer ${user.token}` } },
        );
      } catch (err) {
        alert('Reorder failed, please refresh');
      }
    }
  };

  // Helper to clear errors when a field is edited
  const updateField =
    <T,>(setter: (val: T) => void, field: string) =>
    (val: T) => {
      setter(val);
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  if (loading) {
    return (
      <DashboardLayout
        title='Manage Listings'
        description='Loading listing details...'
      >
        <div className='flex items-center justify-center p-24 border border-border bg-card'>
          <Loader2 className='w-8 h-8 animate-spin text-accent' />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={isNew ? 'Add New Listing' : 'Edit Listing'}
      description={
        isNew
          ? 'Create a new business listing'
          : `Update listing details for ${title}`
      }
      button={
        <Button
          variant='outline'
          onClick={() => router.push('/admin/listings')}
          className='gap-2 rounded-none'
        >
          <ArrowLeft className='w-4 h-4' /> Back to Listings
        </Button>
      }
    >
      <form ref={formRef} onSubmit={handleSubmit} className='space-y-8'>
        <ListingBasicDetails
          title={title}
          setTitle={updateField(setTitle, 'title')}
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={updateField(setLocation, 'location')}
          suburb={suburb}
          setSuburb={setSuburb}
          price={price}
          setPrice={updateField(setPrice, 'price')}
          mapLink={mapLink}
          setMapLink={setMapLink}
          summary={summary}
          setSummary={updateField(setSummary, 'summary')}
          about={about}
          setAbout={updateField(setAbout, 'about')}
          errors={errors}
        />

        <ListingContactTeam
          contactName={contactName}
          setContactName={setContactName}
          contactPhone={contactPhone}
          setContactPhone={setContactPhone}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          selectedBrokers={selectedBrokers}
          setSelectedBrokers={updateField(setSelectedBrokers, 'brokers')}
          errors={errors}
        />

        <External
          businessType={businessType}
          setBusinessType={setBusinessType}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedDeal={selectedDeal}
          setSelectedDeal={setSelectedDeal}
          referenceId={referenceId}
          setReferenceId={setReferenceId}
          errors={errors}
        />

        <ListingMediaDocuments
          isNew={isNew}
          imagePreview={imagePreview}
          imageFileRef={fileInputRef}
          handleImageSelect={handleImageSelect}
          docInputRef={docInputRef}
          docUploading={docUploading}
          handleDocUpload={handleDocUpload}
          documents={documents}
          handleDocDelete={handleDocDelete}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          newDocs={newDocs}
          onRemoveNewDoc={(idx) =>
            setNewDocs((prev) => prev.filter((_, i) => i !== idx))
          }
          imTemplates={imTemplates}
          imTemplateId={imTemplateId}
          setImTemplateId={setImTemplateId}
        />

        {/* Submit Actions */}
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push('/admin/listings')}
            disabled={saving}
            className='rounded-none'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='px-8 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
            disabled={saving}
          >
            {saving ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
            {saving ? 'Saving...' : isNew ? 'Create Listing' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
