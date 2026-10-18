'use client';

import { Suspense, useEffect, useState } from 'react';
import { trackAccessEvent } from '@/lib/track';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LandingButton, landingButtonVariants } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { industries } from '@/lib/data/industries';
import { locations } from '@/lib/data/locations';
import { bracketFor } from '@/lib/data/valuation-brackets';
import { GetStarted } from '../../_components/get-started';
import { PrintButton } from '../../_components/print-button';
import { ValuationPdf } from '../../_components/pdf/valuation-pdf';

const MANAGEMENT_TYPES = ['Fully Managed', 'Semi-Managed', 'Owner Operated'];

const FIELD_CLASS =
  'h-12 w-full rounded-none border-advisory-input bg-white px-3 text-base text-ink shadow-none transition-colors duration-150 focus:border-midnight focus-visible:border-midnight focus-visible:ring-0 data-[size=default]:h-12 md:text-base motion-reduce:transition-none';
const SELECT_PANEL_CLASS = `${landingFontVariables} max-h-80 rounded-none border border-advisory-rule bg-white font-advisory-body text-ink ring-0`;

const valuationQuestions = [
  { id: 'industry', question: 'What industry are you in?' },
  { id: 'location', question: 'Where is your business located?' },
  { id: 'revenue', question: 'What revenue is your business generating?' },
  { id: 'management', question: 'How is your business managed?' },
  { id: 'ebitda', question: 'What is your Net Profit (EBITDA)?' },
] as const;

type ValuationField = (typeof valuationQuestions)[number]['id'];

interface ValuationData {
  industry: string;
  revenue: string;
  management: string;
  location: string;
  ebitda: string;
}

const initialValuationData: ValuationData = {
  industry: '',
  revenue: '',
  management: '',
  location: '',
  ebitda: '',
};

function parseMoney(value: string) {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
}

function formatMoney(num: number) {
  return num.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  });
}

function calculateValuationRange(data: ValuationData) {
  const revenue = parseMoney(data.revenue);
  const profit = parseMoney(data.ebitda);
  const ebitda = profit > 0 ? profit : revenue * 0.15;

  const { min: bracketMin, max: bracketMax } = bracketFor(ebitda);

  let managementScore = 0.5;
  if (data.management === 'Fully Managed') managementScore = 1.0;
  else if (data.management === 'Semi-Managed') managementScore = 0.5;
  else if (data.management === 'Owner Operated') managementScore = 0.0;

  let industryScore = 0.5;
  const parentIndustry = industries.find((industry) =>
    industry.sub_industries.some((sub) => sub.id === data.industry),
  );

  if (parentIndustry) {
    const industryScoreMap: Record<string, number> = {
      'Hospitality & Food': 0.0,
      'Automotive & Transport': 0.125,
      'Miscellaneous & Other': 0.125,
      'Trades, Construction & Property Services': 0.25,
      'Retail & E-Commerce': 0.375,
      'Manufacturing, Wholesale & Industrial': 0.375,
      Services: 0.45,
      'Health, Fitness & Beauty': 0.625,
      'Professional & Business Services': 1.0,
    };

    industryScore = industryScoreMap[parentIndustry.industry_name] ?? 0.5;
  }

  const combinedScore = (managementScore + industryScore) / 2;
  const rangeSpan = bracketMax - bracketMin;
  const minMultiple = bracketMin + combinedScore * rangeSpan * 0.8;
  const maxMultiple = minMultiple + rangeSpan * 0.2;

  return {
    min: Math.floor(ebitda * minMultiple),
    max: Math.floor(ebitda * maxMultiple),
  };
}

function ValuationFieldInput({
  field,
  value,
  onChange,
}: {
  field: ValuationField;
  value: string;
  onChange: (value: string) => void;
}) {
  if (field === 'industry') {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-labelledby='valuation-question' className={FIELD_CLASS}>
          <SelectValue placeholder='Select industry' />
        </SelectTrigger>
        <SelectContent position='popper' className={SELECT_PANEL_CLASS}>
          {industries.map((industry) => (
            <SelectGroup key={industry.id}>
              <SelectLabel>{industry.industry_name}</SelectLabel>
              {industry.sub_industries.map((subIndustry) => (
                <SelectItem key={subIndustry.id} value={subIndustry.id}>
                  {subIndustry.title}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field === 'location') {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-labelledby='valuation-question' className={FIELD_CLASS}>
          <SelectValue placeholder='Select location' />
        </SelectTrigger>
        <SelectContent position='popper' className={SELECT_PANEL_CLASS}>
          {locations.map((location) => (
            <SelectItem key={location.id} value={location.location}>
              {location.location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field === 'management') {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-labelledby='valuation-question' className={FIELD_CLASS}>
          <SelectValue placeholder='Choose one' />
        </SelectTrigger>
        <SelectContent position='popper' className={SELECT_PANEL_CLASS}>
          {MANAGEMENT_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      type='text'
      inputMode='numeric'
      aria-labelledby='valuation-question'
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      placeholder='e.g. 850000'
      className={FIELD_CLASS}
    />
  );
}

export function ValuationTool() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ValuationData>(initialValuationData);
  const [result, setResult] = useState<{ min: number; max: number } | null>(
    null,
  );

  useEffect(() => {
    if (result) {
      trackAccessEvent('tool_completed', { resource: 'Valuation Tool' });
    }
  }, [result]);

  const current = valuationQuestions[step];
  const progress = Math.round(((step + 1) / valuationQuestions.length) * 100);
  const canContinue = data[current.id].trim().length > 0;

  const update = (field: ValuationField, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const startOver = () => {
    setStep(0);
    setData(initialValuationData);
    setResult(null);
  };

  const next = () => {
    if (!canContinue) return;
    if (step < valuationQuestions.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }
    setResult(calculateValuationRange(data));
  };

  const industryLabel = (() => {
    for (const ind of industries) {
      const sub = ind.sub_industries.find((s) => s.id === data.industry);
      if (sub) return `${sub.title} — ${ind.industry_name}`;
    }
    return data.industry || '—';
  })();

  return (
    <Suspense>
        <div className='min-w-0'>
          {result ? (
            <div
              role='region'
              aria-labelledby='valuation-result-title'
              className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'
            >
              <h2 id='valuation-result-title' className='m-0 mb-5 font-advisory-heading text-[26px] leading-[1.35] font-bold tracking-normal text-midnight min-[681px]:text-[30px]'>
                Your estimated business value
              </h2>
              <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 font-advisory-heading text-[clamp(24px,5vw,36px)] leading-[1.4] font-bold tracking-normal text-midnight'>
                <span>{formatMoney(result.min)}</span>
                <span>–</span>
                <span>{formatMoney(result.max)}</span>
              </div>
              <p className='m-0 mt-4 max-w-[540px] text-[15px] leading-[1.75] text-ink'>
                This is an indicative range based on your revenue, profit,
                industry, and management structure.
              </p>

              <div className='mt-7 flex flex-wrap items-start gap-3 border-t border-advisory-rule pt-6'>
                <GetStarted resourceTitle='Valuation Tool' className={landingButtonVariants({ size: 'compact' })}>
                  Schedule a confidential call
                </GetStarted>
                <LandingButton
                  type='button'
                  variant='outline'
                  onClick={startOver}
                  size='compact'
                >
                  Start over
                </LandingButton>
                <PrintButton
                  resource='Valuation Tool'
                  label='Print appraisal'
                  className={landingButtonVariants({ variant: 'outline', size: 'compact' })}
                  fileName='Blackmont-Business-Valuation.pdf'
                  buildDocument={(assets) => (
                    <ValuationPdf
                      assets={assets}
                      industry={industryLabel}
                      location={data.location || '-'}
                      revenue={
                        data.revenue
                          ? formatMoney(parseMoney(data.revenue))
                          : '-'
                      }
                      management={data.management || '-'}
                      ebitda={
                        data.ebitda ? formatMoney(parseMoney(data.ebitda)) : '-'
                      }
                      valueRange={`${formatMoney(result.min)} – ${formatMoney(result.max)}`}
                    />
                  )}
                />
              </div>
            </div>
          ) : (
            <form
              aria-labelledby='valuation-question'
              onSubmit={(event) => { event.preventDefault(); next(); }}
              className='border border-advisory-rule bg-white p-6 min-[681px]:p-8'
            >
              <div className='mb-7'>
                <div className='mb-3 flex items-center justify-between gap-3 text-sm leading-[1.5]'>
                  <span role='status' className='font-semibold text-midnight'>
                    Question {step + 1} of {valuationQuestions.length}
                  </span>
                  <span className='text-ink'>{progress}%</span>
                </div>
                <div
                  role='progressbar'
                  aria-label='Valuation questionnaire progress'
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  className='h-1 overflow-hidden bg-advisory-rule'
                >
                  <div
                    className='h-full w-full origin-left bg-gilt transition-transform duration-200 ease-out motion-reduce:transition-none'
                    style={{ transform: `scaleX(${progress / 100})` }}
                  />
                </div>
              </div>

              <div
                key={current.id}
              >
                <h2 id='valuation-question' className='m-0 font-advisory-heading text-[24px] leading-[1.4] font-bold tracking-normal text-midnight min-[681px]:text-[28px]'>
                  {current.question}
                </h2>
                <div className='mt-5'>
                  <ValuationFieldInput
                    field={current.id}
                    value={data[current.id]}
                    onChange={(value) => update(current.id, value)}
                  />
                </div>
              </div>

              <div className='mt-6 flex flex-wrap items-center gap-3 border-t border-advisory-rule pt-6'>
                {step > 0 && (
                  <LandingButton
                    type='button'
                    variant='outline'
                    onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                    size='compact'
                  >
                    <ArrowLeft aria-hidden='true' className='size-4' />
                    Back
                  </LandingButton>
                )}
                <LandingButton
                  type='submit'
                  disabled={!canContinue}
                  size='compact'
                >
                  {step === valuationQuestions.length - 1
                    ? 'Get your appraisal'
                    : 'Next'}
                  <ArrowRight aria-hidden='true' className='size-4' />
                </LandingButton>
              </div>
            </form>
          )}
        </div>
    </Suspense>
  );
}
