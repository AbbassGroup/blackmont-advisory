import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  Upload,
  FileText,
  GripVertical,
  X,
  Image as ImageIcon,
  LayoutTemplate,
  Info,
} from 'lucide-react';

interface ImTemplateOption {
  _id: string;
  businessName?: string;
  status?: string;
}

interface MediaDocumentsProps {
  isNew: boolean;
  imagePreview: string;
  imageFileRef: React.RefObject<HTMLInputElement | null>;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;

  docInputRef: React.RefObject<HTMLInputElement | null>;
  docUploading: boolean;
  handleDocUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;

  documents: any[];
  handleDocDelete: (id: string) => void;
  handleDragStart: (idx: number) => void;
  handleDragOver: (e: React.DragEvent, idx: number) => void;
  handleDrop: () => void;

  newDocs: File[];
  onRemoveNewDoc: (idx: number) => void;

  // IM web template assignment (mutually exclusive with PDF documents).
  imTemplates: ImTemplateOption[];
  imTemplateId: string;
  setImTemplateId: (v: string) => void;
}

const NO_TEMPLATE = '__none__';

export function ListingMediaDocuments({
  isNew,
  imagePreview,
  imageFileRef,
  handleImageSelect,
  docInputRef,
  docUploading,
  handleDocUpload,
  documents,
  handleDocDelete,
  handleDragStart,
  handleDragOver,
  handleDrop,
  newDocs,
  onRemoveNewDoc,
  imTemplates,
  imTemplateId,
  setImTemplateId,
}: MediaDocumentsProps) {
  console.log('🚀 ~ ListingMediaDocuments ~ imTemplates:', imTemplates);
  // Only one IM source at a time: a web template OR uploaded PDFs.
  const hasPdfs = documents.length > 0 || newDocs.length > 0;
  const hasTemplate = !!imTemplateId;
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6'>
      <div className='flex items-center gap-2 border-b border-gray-100 pb-4 mb-4'>
        <h2 className='text-lg font-semibold text-brand-black'>
          Media & Documents
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Image */}
        <div className='space-y-4'>
          <Label>Listing Image</Label>
          <div
            className='border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden h-48'
            onClick={() => imageFileRef.current?.click()}
          >
            <input
              type='file'
              ref={imageFileRef}
              hidden
              accept='image/*'
              onChange={handleImageSelect}
            />

            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt='Preview'
                className='w-full h-full object-cover rounded-lg'
              />
            ) : (
              <div className='text-center flex flex-col items-center pointer-events-none'>
                <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'>
                  <ImageIcon className='w-6 h-6 text-brand-primary' />
                </div>
                <p className='text-sm font-medium text-brand-black mb-1'>
                  Click to upload image
                </p>
                <p className='text-xs text-gray-500'>
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
            )}

            {imagePreview && (
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                <p className='text-white font-medium flex items-center gap-2'>
                  <Upload className='w-4 h-4' /> Change Image
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Memorandum: web template OR uploaded PDFs (one at a time) */}
        <div className='space-y-4'>
          <div>
            <Label>Information Memorandum</Label>
            <p className='mt-1 text-xs text-gray-500'>
              Assign a web template or upload PDF documents — only one applies
              at a time.
            </p>
          </div>

          {/* Web template selector */}
          <div className='space-y-2'>
            <Label className='flex items-center gap-1.5 text-sm font-medium'>
              <LayoutTemplate className='h-4 w-4 text-brand-primary' /> Web
              template
            </Label>
            <Select
              value={imTemplateId || NO_TEMPLATE}
              onValueChange={(v) => setImTemplateId(v === NO_TEMPLATE ? '' : v)}
              disabled={hasPdfs}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='None — use PDF documents' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_TEMPLATE}>
                  None — use PDF documents
                </SelectItem>
                {imTemplates.map((t) => (
                  <SelectItem key={t._id} value={t._id}>
                    {t.businessName || 'Untitled memorandum'}
                    {t.status ? ` · ${t.status}` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasPdfs && (
              <p className='flex items-center gap-1.5 text-xs text-gray-500'>
                <Info className='h-3.5 w-3.5 shrink-0' />
                Remove the uploaded PDF(s) below to assign a web template
                instead.
              </p>
            )}
          </div>

          {/* PDF documents — disabled while a web template is assigned */}
          <div className='space-y-3'>
            <Label className='text-sm font-medium'>PDF documents</Label>
            {hasTemplate ? (
              <div className='rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-4 text-center text-xs text-gray-400'>
                PDF upload is disabled while a web template is assigned. Clear
                the template above to upload PDFs.
              </div>
            ) : (
              <>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => docInputRef.current?.click()}
                  disabled={docUploading}
                  className='w-full border-dashed border-2 py-8 text-gray-500 hover:text-brand-primary'
                >
                  {docUploading ? (
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  ) : (
                    <Upload className='w-4 h-4 mr-2' />
                  )}
                  {docUploading ? 'Uploading...' : 'Upload PDF Document(s)'}
                </Button>
                <input
                  type='file'
                  ref={docInputRef}
                  hidden
                  multiple
                  accept='application/pdf'
                  onChange={handleDocUpload}
                />

                {/* Existing Docs */}
                {documents.length > 0 && (
                  <div className='border border-gray-100 rounded-lg overflow-hidden bg-white'>
                    {documents.map((doc, idx) => (
                      <div
                        key={doc._id}
                        draggable
                        onDragStart={() => handleDragStart(idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnter={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className={`flex items-center gap-3 p-3 bg-white hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing ${
                          idx < documents.length - 1
                            ? 'border-b border-gray-50'
                            : ''
                        }`}
                      >
                        <GripVertical className='w-4 h-4 text-gray-400' />
                        <FileText className='w-4 h-4 text-red-500' />
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-gray-700 truncate'>
                            {doc.name}
                          </p>
                        </div>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => handleDocDelete(doc._id)}
                          className='text-gray-400 hover:text-red-500 h-8 w-8 z-10'
                        >
                          <X className='w-4 h-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Docs waiting to upload (Create Mode) */}
                {isNew && newDocs.length > 0 && (
                  <div className='border border-blue-100 rounded-lg overflow-hidden bg-blue-50/30'>
                    {newDocs.map((doc, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 p-3 ${idx < newDocs.length - 1 ? 'border-b border-blue-100/50' : ''}`}
                      >
                        <FileText className='w-4 h-4 text-blue-400' />
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-gray-700 truncate'>
                            {doc.name}
                          </p>
                        </div>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => onRemoveNewDoc(idx)}
                          className='text-gray-400 hover:text-red-500 h-8 w-8'
                        >
                          <X className='w-4 h-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
