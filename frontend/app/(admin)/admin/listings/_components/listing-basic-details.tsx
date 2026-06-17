import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/proposal/rich-text-editor';

const LOCATIONS = [
  'Australia',
  'Adelaide',
  'Perth',
  'Melbourne',
  'Geelong',
  'Ballarat',
  'Launceston',
  'Brisbane',
  'Hobart',
  'Sydney',
];

interface BasicDetailsProps {
  title: string;
  setTitle: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  suburb: string;
  setSuburb: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  mapLink: string;
  setMapLink: (v: string) => void;
  summary: string;
  setSummary: (v: string) => void;
  about: string;
  setAbout: (v: string) => void;
  errors?: Record<string, string>;
}

export function ListingBasicDetails({
  title,
  setTitle,
  category,
  setCategory,
  location,
  setLocation,
  suburb,
  setSuburb,
  price,
  setPrice,
  mapLink,
  setMapLink,
  summary,
  setSummary,
  about,
  setAbout,
  errors = {},
}: BasicDetailsProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6'>
      <div className='flex items-center gap-2 border-b border-gray-100 pb-4 mb-4'>
        <h2 className='text-lg font-semibold text-brand-black'>
          Basic Details
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='title' className={errors.title ? 'text-red-500' : ''}>
            Title <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g. Turnkey Cafe in CBD'
            className={
              errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''
            }
          />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='category'>Category</Label>
          <Input
            id='category'
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='e.g. Hospitality'
          />
        </div>

        <div className='space-y-2'>
          <Label
            htmlFor='location'
            className={errors.location ? 'text-red-500' : ''}
          >
            Location <span className='text-red-500'>*</span>
          </Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger
              id='location'
              name='location'
              data-field='location'
              className={
                errors.location ? 'border-red-500 focus:ring-red-500' : ''
              }
            >
              <SelectValue placeholder='Select Location' />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.location && (
            <p className='text-sm text-red-500'>{errors.location}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='suburb'>Suburb / Town</Label>
          <Input
            id='suburb'
            name='suburb'
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            placeholder='e.g. Richmond'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='price' className={errors.price ? 'text-red-500' : ''}>
            Price <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='price'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='e.g. $250,000'
            className={
              errors.price ? 'border-red-500 focus-visible:ring-red-500' : ''
            }
          />
          {errors.price && (
            <p className='text-sm text-red-500'>{errors.price}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='mapLink'>Map Link (Google Maps Embed URL)</Label>
          <Input
            id='mapLink'
            name='mapLink'
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            placeholder='https://www.google.com/maps/embed?...'
          />
        </div>

        <div className='md:col-span-2 space-y-2'>
          <Label
            htmlFor='summary'
            className={errors.summary ? 'text-red-500' : ''}
          >
            Summary <span className='text-red-500'>*</span>
          </Label>
          <Textarea
            id='summary'
            name='summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder='Short summary for the listing card preview...'
            className={`h-20 ${errors.summary ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {errors.summary && (
            <p className='text-sm text-red-500'>{errors.summary}</p>
          )}
        </div>
        <div className='md:col-span-2 space-y-2'>
          <Label htmlFor='about' className={errors.about ? 'text-red-500' : ''}>
            About <span className='text-red-500'>*</span>
          </Label>
          <div
            className={`prose-editor-container rounded-lg ${errors.about ? 'ring-2 ring-red-500 ring-offset-1' : ''}`}
            data-field='about'
          >
            <RichTextEditor value={about} onChange={setAbout} />
          </div>
          {errors.about && (
            <p className='text-sm text-red-500'>{errors.about}</p>
          )}
        </div>
      </div>
    </div>
  );
}
