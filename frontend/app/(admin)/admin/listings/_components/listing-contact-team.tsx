import { MultiSelectCombobox } from './multi-select-combobox';
import { BROKERS } from '@/lib/data/brokers-list';
import { ListingSection, ListingField, ListingInput } from './form-presentation';

interface ContactTeamProps {
  contactName: string; setContactName: (value: string) => void;
  contactPhone: string; setContactPhone: (value: string) => void;
  contactEmail: string; setContactEmail: (value: string) => void;
  selectedBrokers: string[]; setSelectedBrokers: (value: string[]) => void;
  errors?: Record<string, string>;
}

export function ListingContactTeam({ contactName, setContactName, contactPhone, setContactPhone, contactEmail, setContactEmail, selectedBrokers, setSelectedBrokers, errors = {} }: ContactTeamProps) {
  return (
    <ListingSection id='contact-team' title='Contact & team'>
      <div className='grid gap-6 min-[681px]:grid-cols-2 min-[1121px]:grid-cols-3'>
        <ListingField id='contactName' label='Contact name'><ListingInput id='contactName' name='contactName' value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder='John Doe' /></ListingField>
        <ListingField id='contactPhone' label='Contact phone'><ListingInput id='contactPhone' name='contactPhone' type='tel' value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} placeholder='0400 000 000' /></ListingField>
        <ListingField id='contactEmail' label='Contact email'><ListingInput id='contactEmail' name='contactEmail' type='email' value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder='john@example.com' /></ListingField>
      </div>
      <ListingField id='brokers' label='Assigned brokers' required error={errors.brokers}>
        <MultiSelectCombobox id='brokers' options={BROKERS.map((broker) => ({ label: broker.name, value: broker.email, description: broker.email }))} selectedValues={selectedBrokers} onChange={setSelectedBrokers} hasError={Boolean(errors.brokers)} placeholder='Select brokers…' emptyText='No brokers found.' />
      </ListingField>
    </ListingSection>
  );
}
