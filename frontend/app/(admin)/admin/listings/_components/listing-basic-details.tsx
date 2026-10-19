import { RichTextEditor } from '@/components/proposal/rich-text-editor';
import { cn } from '@/lib/utils';
import { ListingSection, ListingField, ListingInput, LISTING_INPUT_CLASS } from './form-presentation';

const LOCATIONS = ['Australia', 'Adelaide', 'Perth', 'Melbourne', 'Geelong', 'Ballarat', 'Launceston', 'Brisbane', 'Hobart', 'Sydney'];

interface BasicDetailsProps {
  title: string; setTitle: (value: string) => void;
  category: string; setCategory: (value: string) => void;
  location: string; setLocation: (value: string) => void;
  suburb: string; setSuburb: (value: string) => void;
  price: string; setPrice: (value: string) => void;
  mapLink: string; setMapLink: (value: string) => void;
  summary: string; setSummary: (value: string) => void;
  about: string; setAbout: (value: string) => void;
  errors?: Record<string, string>;
}

export function ListingBasicDetails({
  title, setTitle, category, setCategory, location, setLocation, suburb, setSuburb,
  price, setPrice, mapLink, setMapLink, summary, setSummary, about, setAbout, errors = {},
}: BasicDetailsProps) {
  return (
    <ListingSection id='basic-details' title='Basic details'>
      <div className='grid gap-6 min-[681px]:grid-cols-2'>
        <ListingField id='title' label='Title' required error={errors.title}>
          <ListingInput id='title' name='title' value={title} onChange={(event) => setTitle(event.target.value)} placeholder='e.g. Turnkey Cafe in CBD' aria-required='true' aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-hint' : undefined} />
        </ListingField>
        <ListingField id='category' label='Category'>
          <ListingInput id='category' name='category' value={category} onChange={(event) => setCategory(event.target.value)} placeholder='e.g. Hospitality' />
        </ListingField>
        <ListingField id='location' label='Location' required error={errors.location}>
          <select id='location' name='location' value={location} onChange={(event) => setLocation(event.target.value)} aria-required='true' aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? 'location-hint' : undefined} className={LISTING_INPUT_CLASS}>
            <option value='' disabled>Select location</option>
            {location && !LOCATIONS.includes(location) && <option value={location}>{location}</option>}
            {LOCATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </ListingField>
        <ListingField id='suburb' label='Suburb / town'>
          <ListingInput id='suburb' name='suburb' value={suburb} onChange={(event) => setSuburb(event.target.value)} placeholder='e.g. Richmond' />
        </ListingField>
        <ListingField id='price' label='Price' required error={errors.price}>
          <ListingInput id='price' name='price' value={price} onChange={(event) => setPrice(event.target.value)} placeholder='e.g. $250,000' aria-required='true' aria-invalid={Boolean(errors.price)} aria-describedby={errors.price ? 'price-hint' : undefined} />
        </ListingField>
        <ListingField id='mapLink' label='Google Maps embed URL'>
          <ListingInput id='mapLink' name='mapLink' value={mapLink} onChange={(event) => setMapLink(event.target.value)} placeholder='https://www.google.com/maps/embed?...' />
        </ListingField>
        <ListingField id='summary' label='Summary' required error={errors.summary} className='min-[681px]:col-span-2'>
          <textarea id='summary' name='summary' value={summary} onChange={(event) => setSummary(event.target.value)} placeholder='Short summary for the listing card preview…' rows={3} aria-required='true' aria-invalid={Boolean(errors.summary)} aria-describedby={errors.summary ? 'summary-hint' : undefined} className={cn(LISTING_INPUT_CLASS, 'h-auto resize-y leading-[1.75]')} />
        </ListingField>
        <ListingField id='about' label='About' required error={errors.about} className='min-[681px]:col-span-2'>
          <div id='about' role='group' aria-labelledby='about-label' aria-describedby={errors.about ? 'about-hint' : undefined} tabIndex={-1} className={cn('min-w-0 outline-none', errors.about && 'border border-red-700')}>
            <RichTextEditor value={about} onChange={setAbout} />
          </div>
        </ListingField>
      </div>
    </ListingSection>
  );
}
