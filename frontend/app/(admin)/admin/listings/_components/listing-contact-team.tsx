import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelectCombobox } from './multi-select-combobox';

const BROKERS = [
  { name: 'Tester', email: 'mohammadjahid0007@gmail.com' },
  { name: 'Sadeq Abbass', email: 'sadeq@abbass.group' },
  { name: 'Asif Ahammed', email: 'asif.ahammed@abbass.group' },
  { name: 'Christine Lamani', email: 'christine.lamani@abbass.group' },
  { name: 'Freddie Wong', email: 'freddie.wong@abbass.group' },
  { name: 'Igor Vasiliev', email: 'igor.vasiliev@abbass.group' },
  { name: 'Hicham Nahas', email: 'hicham.nahas@abbass.group' },
  { name: 'Fiona Johns', email: 'fiona@abbass.group' },
];

interface ContactTeamProps {
  contactName: string;
  setContactName: (v: string) => void;
  contactPhone: string;
  setContactPhone: (v: string) => void;
  contactEmail: string;
  setContactEmail: (v: string) => void;
  selectedBrokers: string[];
  setSelectedBrokers: (v: string[]) => void;
  errors?: Record<string, string>;
}

export function ListingContactTeam({
  contactName,
  setContactName,
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  selectedBrokers,
  setSelectedBrokers,
  errors = {},
}: ContactTeamProps) {
  return (
    <div className='border border-border bg-card p-6 space-y-6'>
      <div className='flex items-center gap-2 border-b border-border pb-4 mb-4'>
        <h2 className='text-lg font-semibold text-secondary'>Contact & Team</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='space-y-2'>
          <Label htmlFor='contactName'>Contact Name</Label>
          <Input
            id='contactName'
            name='contactName'
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder='John Doe'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='contactPhone'>Contact Phone</Label>
          <Input
            id='contactPhone'
            name='contactPhone'
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder='0400 000 000'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='contactEmail'>Contact Email</Label>
          <Input
            id='contactEmail'
            name='contactEmail'
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder='john@example.com'
          />
        </div>
      </div>

      <div className='space-y-4 max-w-2xl'>
        <Label className={errors.brokers ? 'text-red-500' : ''}>
          Assigned Brokers <span className='text-red-500'>*</span>
        </Label>
        <MultiSelectCombobox
          options={BROKERS.map((b) => ({
            label: b.name,
            value: b.email,
            description: b.email,
          }))}
          selectedValues={selectedBrokers}
          onChange={setSelectedBrokers}
          hasError={!!errors.brokers}
          placeholder='Select brokers...'
          emptyText='No brokers found.'
        />
        {errors.brokers && (
          <p className='text-sm text-red-500'>{errors.brokers}</p>
        )}
      </div>
    </div>
  );
}
