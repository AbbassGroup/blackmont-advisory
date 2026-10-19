import { Loader2, Upload, FileText, GripVertical, X, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { LandingButton } from '@/components/landing/presentation';
import { cn } from '@/lib/utils';
import { ListingSection, LISTING_INPUT_CLASS, LISTING_ICON_CLASS } from './form-presentation';

export interface ListingDocument { _id: string; name: string; filename?: string; url?: string }
export interface ImTemplateOption { _id: string; businessName?: string; status?: string }

interface MediaDocumentsProps {
  isNew: boolean;
  imagePreview: string;
  imageFileRef: React.RefObject<HTMLInputElement | null>;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  docInputRef: React.RefObject<HTMLInputElement | null>;
  docUploading: boolean;
  busy?: boolean;
  documentError?: string;
  handleDocUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  documents: ListingDocument[];
  handleDocDelete: (id: string) => void;
  handleDragStart: (index: number) => void;
  handleDragOver: (event: React.DragEvent, index: number) => void;
  handleDrop: () => void;
  onMoveDocument: (index: number, direction: -1 | 1) => void;
  newDocs: File[];
  onRemoveNewDoc: (index: number) => void;
  imTemplates: ImTemplateOption[];
  imTemplateId: string;
  setImTemplateId: (value: string) => void;
  templatesLoading?: boolean;
  templatesError?: boolean;
  onRetryTemplates?: () => void;
}

export function ListingMediaDocuments({
  isNew, imagePreview, imageFileRef, handleImageSelect, docInputRef, docUploading, busy = false, documentError,
  handleDocUpload, documents, handleDocDelete, handleDragStart, handleDragOver, handleDrop,
  onMoveDocument, newDocs, onRemoveNewDoc, imTemplates, imTemplateId, setImTemplateId,
  templatesLoading = false, templatesError = false, onRetryTemplates,
}: MediaDocumentsProps) {
  const hasPdfs = documents.length > 0 || newDocs.length > 0;
  const hasTemplate = Boolean(imTemplateId);

  return (
    <ListingSection id='media-documents' title='Media & documents'>
      <div className='grid items-start gap-8 min-[931px]:grid-cols-2'>
        <div className='flex min-w-0 flex-col gap-3'>
          <h3 className='m-0 text-sm font-semibold text-midnight'>Listing image</h3>
          <input id='listing-image' type='file' ref={imageFileRef} hidden accept='image/*' onChange={handleImageSelect} disabled={busy} />
          <button type='button' disabled={busy} onClick={() => imageFileRef.current?.click()} aria-label={imagePreview ? 'Change listing image' : 'Choose listing image'} aria-describedby='listing-image-hint' className='relative flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden border border-advisory-rule bg-canvas p-0 text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-60'>
            {imagePreview ? <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt='Listing image preview' className='absolute inset-0 h-full w-full object-cover' />
              <span className='absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 border-t border-advisory-rule bg-white px-4 py-3 text-sm font-semibold'><Upload aria-hidden='true' className='size-4' />Change image</span>
            </> : <><ImageIcon aria-hidden='true' className='size-7 text-ink/60' /><span className='text-sm font-semibold'>Choose listing image</span></>}
          </button>
          <p id='listing-image-hint' className='m-0 text-xs leading-[1.75] text-ink'>Choose an image for the public listing.</p>
        </div>

        <div className='flex min-w-0 flex-col gap-6'>
          <div>
            <h3 className='m-0 text-sm font-semibold text-midnight'>Information Memorandum</h3>
            <p className='mt-2 mb-0 text-xs leading-[1.75] text-ink'>Assign a web template or upload PDF documents. Only one applies at a time.</p>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='imTemplateId' className='text-sm font-medium text-midnight'>Web template</label>
            <select id='imTemplateId' value={imTemplateId} onChange={(event) => setImTemplateId(event.target.value)} disabled={hasPdfs || templatesLoading || templatesError || busy} className={LISTING_INPUT_CLASS} aria-describedby='template-source-hint'>
              <option value=''>{templatesLoading ? 'Loading templates…' : templatesError ? 'Templates unavailable' : 'None — use PDF documents'}</option>
              {imTemplateId && !imTemplates.some((template) => template._id === imTemplateId) && <option value={imTemplateId}>Selected memorandum</option>}
              {imTemplates.map((template) => <option key={template._id} value={template._id}>{template.businessName || 'Untitled memorandum'}{template.status ? ` · ${template.status}` : ''}</option>)}
            </select>
            <p id='template-source-hint' className='m-0 text-xs leading-[1.75] text-ink'>{hasPdfs ? 'Remove the uploaded PDFs below to assign a web template.' : 'Select a template, or leave this empty to use PDF documents.'}</p>
            {templatesError && <div role='alert' className='flex flex-col items-start gap-3'><p className='m-0 text-xs leading-[1.75] text-red-800'>We couldn&apos;t load the available templates.</p>{onRetryTemplates && <LandingButton variant='outline' size='compact' onClick={onRetryTemplates} disabled={busy}>Try again</LandingButton>}</div>}
          </div>
          <div className='flex min-w-0 flex-col gap-3'>
            <h3 className='m-0 text-sm font-medium text-midnight'>PDF documents</h3>
            {documentError && <p role='alert' className='m-0 text-xs leading-[1.75] text-red-800'>{documentError}</p>}
            {hasTemplate ? (
              <p className='m-0 bg-canvas p-4 text-xs leading-[1.75] text-ink'>Clear the web template above to upload PDF documents.</p>
            ) : <>
              <LandingButton variant='outline' size='compact' onClick={() => docInputRef.current?.click()} disabled={docUploading || busy} className='w-fit'>
                {docUploading ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Upload aria-hidden='true' className='size-4' />}{docUploading ? 'Uploading…' : 'Upload PDFs'}
              </LandingButton>
              <input type='file' ref={docInputRef} hidden multiple accept='application/pdf' onChange={handleDocUpload} disabled={busy || docUploading} />
              <p className='m-0 text-xs leading-[1.75] text-ink'>{isNew ? 'Selected PDFs upload when you create the listing.' : 'Document uploads, removal and ordering are saved immediately.'}</p>

              {documents.length > 0 && <>
                <p className='m-0 text-xs leading-[1.75] text-ink'>Drag documents or use the arrows to change their order.</p>
                <ul className='m-0 flex list-none flex-col divide-y divide-advisory-rule border-y border-advisory-rule p-0'>
                  {documents.map((document, index) => (
                    <li key={document._id} draggable={!busy && !docUploading} onDragStart={() => handleDragStart(index)} onDragOver={(event) => handleDragOver(event, index)} onDragEnter={(event) => event.preventDefault()} onDrop={handleDrop} className='flex min-w-0 items-center gap-2 py-3'>
                      <GripVertical aria-hidden='true' className='size-4 shrink-0 cursor-grab text-ink/60' />
                      <FileText aria-hidden='true' className='size-4 shrink-0 text-ink' />
                      <span className='min-w-0 flex-1 break-words text-sm leading-[1.65] text-midnight'>{document.name}</span>
                      <div role='group' aria-label={`Actions for ${document.name}`} className='flex shrink-0'>
                        <button type='button' onClick={() => onMoveDocument(index, -1)} disabled={busy || index === 0} className={LISTING_ICON_CLASS} title='Move up' aria-label={`Move ${document.name} up`}><ChevronUp aria-hidden='true' className='size-4' /></button>
                        <button type='button' onClick={() => onMoveDocument(index, 1)} disabled={busy || index === documents.length - 1} className={LISTING_ICON_CLASS} title='Move down' aria-label={`Move ${document.name} down`}><ChevronDown aria-hidden='true' className='size-4' /></button>
                        <button type='button' onClick={() => handleDocDelete(document._id)} disabled={busy} className={cn(LISTING_ICON_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')} title='Delete document' aria-label={`Delete ${document.name}`}><X aria-hidden='true' className='size-4' /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>}
              {isNew && newDocs.length > 0 && <ul className='m-0 flex list-none flex-col divide-y divide-advisory-rule border-y border-advisory-rule p-0'>{newDocs.map((document, index) => <li key={index} className='flex min-w-0 items-center gap-3 py-3'><FileText aria-hidden='true' className='size-4 shrink-0 text-ink' /><div className='min-w-0 flex-1'><p className='m-0 break-words text-sm leading-[1.65] text-midnight'>{document.name}</p><p className='mt-1 mb-0 text-xs text-ink'>Pending upload</p></div><button type='button' onClick={() => onRemoveNewDoc(index)} disabled={busy} className={LISTING_ICON_CLASS + ' text-red-700 hover:bg-red-50 hover:text-red-800'} aria-label={`Remove ${document.name} from upload`}><X aria-hidden='true' className='size-4' /></button></li>)}</ul>}
            </>}
          </div>
        </div>
      </div>
    </ListingSection>
  );
}
