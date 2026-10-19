'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { apiClient } from '@/lib/api';
import { useAdminAuth } from '@/context/admin-auth-context';
import { AdminPageLayout } from '@/components/admin/page-layout';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ListingSection } from '../_components/form-presentation';
import { scrollToError } from '@/lib/scroll-to-error';
import { cn, formatReferenceId } from '@/lib/utils';

import { ListingBasicDetails } from '../_components/listing-basic-details';
import { ListingMediaDocuments, type ListingDocument, type ImTemplateOption } from '../_components/listing-media-documents';
import { ListingContactTeam } from '../_components/listing-contact-team';
import { External } from '../_components/external';
import { BROKERS } from '@/lib/data/brokers-list';

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
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [formError, setFormError] = useState('');
  const [docError, setDocError] = useState('');
  const [docDeleteTarget, setDocDeleteTarget] = useState<ListingDocument | null>(null);
  const [docDeleting, setDocDeleting] = useState(false);
  const [docOrdering, setDocOrdering] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templatesError, setTemplatesError] = useState(false);
  const [templatesAttempt, setTemplatesAttempt] = useState(0);
  const createdListingId = useRef<string | null>(null);
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
  const [documents, setDocuments] = useState<ListingDocument[]>([]);
  // Documents State (For new ones waiting to be uploaded alongside new listing)
  const [newDocs, setNewDocs] = useState<File[]>([]);

  // IM web template assignment (mutually exclusive with PDF documents)
  const [imTemplateId, setImTemplateId] = useState('');
  const [imTemplates, setImTemplates] = useState<ImTemplateOption[]>([]);

  // Drag state
  const dragItemIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);

  const busy = saving || docUploading || docDeleting || docOrdering;

  useEffect(() => { createdListingId.current = null; }, [idParam]);

  useEffect(() => {
    let active = true;
    if (!isNew && user?.token) {
      const fetchListing = async () => {
        setLoading(true);
        setLoadError(false);
        try {
          const res = await apiClient.get(`/api/listings/${idParam}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          if (!active) return;
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
          setReferenceId(formatReferenceId(data.referenceId));

          if (data.brokers && Array.isArray(data.brokers)) {
            setSelectedBrokers(
              data.brokers.map((b: string | { email: string }) =>
                typeof b === 'string' ? b : b.email,
              ),
            );
          }
        } catch (error) {
          if (active) setLoadError(true);
        } finally {
          if (active) setLoading(false);
        }
      };
      fetchListing();
    }
    return () => { active = false; };
  }, [idParam, isNew, user?.token, loadAttempt]);

  // Only templates available to this signed-in broker may be assigned.
  useEffect(() => {
    if (!user?.token) return;
    let active = true;
    setTemplatesLoading(true);
    setTemplatesError(false);
    apiClient.get('/api/im-templates?limit=100', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => { if (active) setImTemplates(data?.templates || []); })
      .catch(() => { if (active) setTemplatesError(true); })
      .finally(() => { if (active) setTemplatesLoading(false); });
    return () => { active = false; };
  }, [user?.token, templatesAttempt]);

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
    if (busy) return;
    setFormError('');
    setErrors({});
    if (!validateForm() || !user?.token) return;

    setSaving(true);
    let uploadingNewDocs = false;
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

      let listingId = createdListingId.current || idParam;
      if (isNew && !createdListingId.current) {
        const res = await apiClient.post('/api/listings', fd, {
          headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' },
        });
        listingId = res.data._id;
        createdListingId.current = listingId;
        setReferenceId(formatReferenceId(res.data.referenceId));
        setImageFile(null);
      } else {
        await apiClient.put(`/api/listings/${listingId}`, fd, {
          headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' },
        });
      }

      if (isNew && newDocs.length > 0) {
        uploadingNewDocs = true;
        const docFd = new FormData();
        newDocs.forEach((file) => docFd.append('documents', file));
        await apiClient.post(`/api/listings/${listingId}/documents`, docFd, {
          headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' },
        });
        setNewDocs([]);
        uploadingNewDocs = false;
      }

      router.push('/admin/listings');
      router.refresh();
    } catch (error) {
      setFormError(uploadingNewDocs ? 'The listing was created, but its PDFs could not be uploaded. Save again to retry the upload.' : 'The listing could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // --- Document Handling (Edit Mode) ---
  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || busy) return;
    setDocError('');

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
      setDocError('The PDFs could not be uploaded. Please try again.');
    } finally {
      setDocUploading(false);
      if (docInputRef.current) docInputRef.current.value = '';
    }
  };

  const handleDocDelete = (docId: string) => {
    if (busy) return;
    setDocError('');
    setDocDeleteTarget(documents.find((document) => document._id === docId) || null);
  };

  const deleteDocument = async () => {
    if (!user?.token || !docDeleteTarget || busy) return;
    const docId = docDeleteTarget._id;
    setDocDeleting(true);
    setDocError('');
    try {
      await apiClient.delete(`/api/listings/${idParam}/documents/${docId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setDocuments((previous) => previous.filter((document) => document._id !== docId));
      setDocDeleteTarget(null);
    } catch { setDocError('The document could not be deleted. Please try again.'); }
    finally { setDocDeleting(false); }
  };

  const moveDocument = async (from: number, to: number) => {
    if (busy || from === to || from < 0 || to < 0 || from >= documents.length || to >= documents.length) return;
    const previous = documents;
    const next = [...documents];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setDocuments(next);
    setDocOrdering(true);
    setDocError('');
    try {
      if (!isNew && user?.token) await apiClient.put(
        `/api/listings/${idParam}/documents/reorder`,
        { order: next.map((document) => document._id) },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
    } catch {
      setDocuments(previous);
      setDocError('The document order could not be saved. Please try again.');
    } finally { setDocOrdering(false); }
  };

  const handleDragStart = (index: number) => { dragItemIdx.current = index; dragOverIdx.current = index; };
  const handleDragOver = (event: React.DragEvent, index: number) => { event.preventDefault(); dragOverIdx.current = index; };
  const handleDrop = () => {
    const from = dragItemIdx.current;
    const to = dragOverIdx.current;
    dragItemIdx.current = null;
    dragOverIdx.current = null;
    if (from !== null && to !== null) void moveDocument(from, to);
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

  const pageTitle = isNew ? 'Add listing' : 'Edit listing';
  const pageDescription = isNew ? 'Create a business listing with its contact team and IM documents.' : 'Update the listing details, contact team and IM documents.';
  const backLink = <LandingButtonLink href='/admin/listings' variant='outline' size='compact'><ArrowLeft aria-hidden='true' className='size-4' /> All listings</LandingButtonLink>;

  if (loading) {
    return (
      <AdminPageLayout title={pageTitle} description={pageDescription} action={backLink}>
        <p role='status' className='sr-only'>Loading listing details.</p>
        <ListingFormSkeleton />
      </AdminPageLayout>
    );
  }

  if (loadError) return (
    <AdminPageLayout title={pageTitle} description={pageDescription} action={backLink}>
      <section role='alert' className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'>
        <h2 className='m-0 text-base font-semibold text-midnight'>We couldn&apos;t load this listing.</h2>
        <p className='mt-2 mb-5 text-sm leading-[1.75] text-ink'>Please try again to open its details.</p>
        <LandingButton variant='outline' size='compact' onClick={() => setLoadAttempt((value) => value + 1)}>Try again</LandingButton>
      </section>
    </AdminPageLayout>
  );

  return (
    <AdminPageLayout title={pageTitle} description={pageDescription} action={backLink}>
      {formError && <p role='alert' className='m-0 border border-red-200 bg-red-50 px-5 py-4 text-sm leading-[1.75] text-red-800'>{formError}</p>}
      <form ref={formRef} onSubmit={handleSubmit} noValidate className='flex min-w-0 flex-col gap-8'>
        <fieldset disabled={busy} inert={busy} className='m-0 flex min-w-0 flex-col gap-8 border-0 p-0'>
          <legend className='sr-only'>Listing details</legend>
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
            setBusinessType={updateField(setBusinessType, 'businessType')}
            priceRange={priceRange}
            setPriceRange={updateField(setPriceRange, 'priceRange')}
            selectedDeal={selectedDeal}
            setSelectedDeal={updateField(setSelectedDeal, 'deal')}
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
            busy={busy}
            documentError={docError && !docDeleteTarget ? docError : ''}
            onMoveDocument={(index, direction) => void moveDocument(index, index + direction)}
            templatesLoading={templatesLoading}
            templatesError={templatesError}
            onRetryTemplates={() => setTemplatesAttempt((value) => value + 1)}
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

        </fieldset>
        <div className='flex flex-wrap items-center justify-end gap-3 border-t border-advisory-rule bg-white p-5 min-[681px]:p-6'>
          <LandingButton variant='outline' size='compact' disabled={busy} onClick={() => router.push('/admin/listings')}>Cancel</LandingButton>
          <LandingButton type='submit' size='compact' disabled={busy}>
            {saving && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}
            {saving ? 'Saving…' : docOrdering ? 'Saving document order…' : isNew ? 'Create listing' : 'Save changes'}
          </LandingButton>
        </div>
      </form>
      <Dialog open={Boolean(docDeleteTarget)} onOpenChange={(open) => { if (!open && !docDeleting) { setDocDeleteTarget(null); setDocError(''); } }}>
        <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'max-h-[85dvh] overflow-y-auto rounded-none border border-advisory-rule bg-white p-6 font-advisory-body text-midnight ring-0 sm:max-w-[460px] min-[681px]:p-8')}>
          <DialogHeader>
            <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Delete document?</DialogTitle>
            <DialogDescription className='mt-3 text-sm leading-[1.8] text-ink'><span className='mb-2 block break-words font-semibold text-midnight'>{docDeleteTarget?.name}</span>This removes the PDF from the listing immediately.</DialogDescription>
          </DialogHeader>
          {docError && <p role='alert' className='m-0 text-sm leading-[1.75] text-red-800'>{docError}</p>}
          <div className='flex flex-wrap justify-end gap-3'>
            <LandingButton variant='outline' size='compact' disabled={docDeleting} onClick={() => { setDocDeleteTarget(null); setDocError(''); }}>Cancel</LandingButton>
            <LandingButton size='compact' disabled={docDeleting} onClick={() => void deleteDocument()} className='border-red-700 bg-red-700 text-white hover:bg-red-800'>{docDeleting && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{docDeleting ? 'Deleting…' : 'Delete document'}</LandingButton>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}

function SkeletonField({ className, height = 'h-10' }: { className?: string; height?: string }) {
  return <div className={cn('flex min-w-0 flex-col gap-2', className)}><div className='h-[23px] w-28 animate-pulse bg-canvas motion-reduce:animate-none' /><div className={cn('w-full animate-pulse bg-canvas motion-reduce:animate-none', height)} /></div>;
}

function ListingFormSkeleton() {
  return (
    <div aria-hidden='true' className='flex min-w-0 flex-col gap-8'>
      <ListingSection id='basic-loading' title='Basic details'>
        <div className='grid gap-6 min-[681px]:grid-cols-2'>
          {[0, 1, 2, 3, 4, 5].map((index) => <SkeletonField key={index} />)}
          <SkeletonField className='min-[681px]:col-span-2' height='h-[88px]' />
          <SkeletonField className='min-[681px]:col-span-2' height='h-44' />
        </div>
      </ListingSection>
      <ListingSection id='contact-loading' title='Contact & team'>
        <div className='grid gap-6 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3'>{[0, 1, 2].map((index) => <SkeletonField key={index} />)}</div>
        <SkeletonField />
      </ListingSection>
      <ListingSection id='external-loading' title='External' description='Business classification and linked deal details.'>
        <div className='grid gap-6 min-[681px]:grid-cols-2'>{[0, 1, 2, 3].map((index) => <SkeletonField key={index} />)}</div>
      </ListingSection>
      <ListingSection id='media-loading' title='Media & documents'>
        <div className='grid items-start gap-8 min-[931px]:grid-cols-2'>
          <div className='flex flex-col gap-3'><div className='h-[23px] w-28 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='aspect-[16/10] animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-5 w-3/4 animate-pulse bg-canvas motion-reduce:animate-none' /></div>
          <div className='flex flex-col gap-6'><div className='flex flex-col gap-2'><div className='h-[23px] w-44 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-10 animate-pulse bg-canvas motion-reduce:animate-none' /></div><SkeletonField /><div className='h-5 w-3/4 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-10 w-36 animate-pulse bg-canvas motion-reduce:animate-none' /></div>
        </div>
      </ListingSection>
      <div className='flex justify-end gap-3 border-t border-advisory-rule bg-white p-5 min-[681px]:p-6'><div className='h-10 w-20 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-10 w-36 animate-pulse bg-canvas motion-reduce:animate-none' /></div>
    </div>
  );
}
