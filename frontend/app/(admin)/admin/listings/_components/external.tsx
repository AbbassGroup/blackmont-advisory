import { DealSelect } from '../../_reports/deal-select';
import { ListingSection, ListingField, ListingInput } from './form-presentation';

interface ExternalProps {
  businessType: string; setBusinessType: (value: string) => void;
  priceRange: string; setPriceRange: (value: string) => void;
  selectedDeal: string; setSelectedDeal: (value: string) => void;
  referenceId: string; setReferenceId: (value: string) => void;
  errors?: Record<string, string>;
}

export function External({ businessType, setBusinessType, priceRange, setPriceRange, selectedDeal, setSelectedDeal, referenceId, setReferenceId, errors = {} }: ExternalProps) {
  return (
    <ListingSection id='external' title='External' description='Business classification and linked deal details.'>
      <div className='grid gap-6 min-[681px]:grid-cols-2'>
        <ListingField id='businessType' label='Business type' required error={errors.businessType}>
          <ListingInput id='businessType' name='businessType' value={businessType} onChange={(event) => setBusinessType(event.target.value)} aria-required='true' aria-invalid={Boolean(errors.businessType)} aria-describedby={errors.businessType ? 'businessType-hint' : undefined} />
        </ListingField>
        <ListingField id='priceRange' label='Price range' required error={errors.priceRange}>
          <ListingInput id='priceRange' name='priceRange' type='number' value={priceRange} onChange={(event) => setPriceRange(event.target.value)} aria-required='true' aria-invalid={Boolean(errors.priceRange)} aria-describedby={errors.priceRange ? 'priceRange-hint' : undefined} />
        </ListingField>
        <ListingField id='deal' label='Deal' required error={errors.deal}>
          <DealSelect id='deal' businessUnit='Business Sellers' value={selectedDeal} hasError={Boolean(errors.deal)} describedBy={errors.deal ? 'deal-hint' : undefined} onChange={(dealId) => setSelectedDeal(dealId)} />
        </ListingField>
        <ListingField id='referenceId' label='Reference ID' error={errors.referenceId}>
          <ListingInput id='referenceId' name='referenceId' value={referenceId} onChange={(event) => setReferenceId(event.target.value)} placeholder='Generated when the listing is saved' disabled />
        </ListingField>
      </div>
    </ListingSection>
  );
}
