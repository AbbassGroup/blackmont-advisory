'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { trackAccessEvent } from '@/lib/track';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { GetStarted } from '../../_components/get-started';
import { PrintButton } from '../../_components/print-button';
import { ValuationPdf } from '../../_components/pdf/valuation-pdf';

const MANAGEMENT_TYPES = ['Fully Managed', 'Semi-Managed', 'Owner Operated'];

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

  let bracketMin = 0.8;
  let bracketMax = 1.8;

  if (ebitda >= 10000000) {
    bracketMin = 6.0;
    bracketMax = 10.0;
  } else if (ebitda >= 5000000) {
    bracketMin = 5.0;
    bracketMax = 8.0;
  } else if (ebitda >= 2500000) {
    bracketMin = 3.8;
    bracketMax = 6.5;
  } else if (ebitda >= 1000000) {
    bracketMin = 3.0;
    bracketMax = 5.0;
  } else if (ebitda >= 500000) {
    bracketMin = 2.2;
    bracketMax = 4.0;
  } else if (ebitda >= 250000) {
    bracketMin = 1.6;
    bracketMax = 3.0;
  } else if (ebitda >= 100000) {
    bracketMin = 1.2;
    bracketMax = 2.4;
  }

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
        <SelectTrigger className='h-11 w-full  border-secondary/15 bg-background px-3 shadow-none'>
          <SelectValue placeholder='Select industry' />
        </SelectTrigger>
        <SelectContent position='popper' className='max-h-80'>
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
        <SelectTrigger className='h-11 w-full  border-secondary/15 bg-background px-3 shadow-none'>
          <SelectValue placeholder='Select location' />
        </SelectTrigger>
        <SelectContent position='popper'>
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
        <SelectTrigger className='h-11 w-full  border-secondary/15 bg-background px-3 shadow-none'>
          <SelectValue placeholder='Choose one' />
        </SelectTrigger>
        <SelectContent position='popper'>
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
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      placeholder='e.g. 850000'
      className='h-11  border-secondary/15 bg-background text-base shadow-none placeholder:italic'
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
      <section className='py-12 lg:py-16'>
        <div className='mx-auto max-w-2xl px-5 lg:px-8'>
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className=' border border-secondary/15 bg-background p-7 text-center sm:p-9'
            >
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10'>
                <Calculator className='h-8 w-8 text-accent' />
              </div>
              <h2 className='mt-5 text-2xl font-semibold text-secondary'>
                Your Estimated Business Value
              </h2>
              <div className='mt-4 text-3xl font-extrabold tracking-tight text-accent sm:text-4xl'>
                {formatMoney(result.min)} - {formatMoney(result.max)}
              </div>
              <p className='mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground'>
                This is an indicative range based on your revenue, profit,
                industry, and management structure.
              </p>

              <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center'>
                <GetStarted resourceTitle='Valuation Tool'>
                  <Button className='rounded-full px-6 py-4'>
                    Schedule a Confidential Call
                  </Button>
                </GetStarted>
                <Button
                  type='button'
                  variant='outline'
                  onClick={startOver}
                  className='rounded-full px-6 py-4'
                >
                  Start Over
                </Button>
                <PrintButton
                  label='Print Appraisal'
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
            </motion.div>
          ) : (
            <div className=' border border-secondary/15 bg-background p-7 sm:p-9'>
              <div className='mb-7'>
                <div className='mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em]'>
                  <span className='text-accent'>
                    Question {step + 1} of {valuationQuestions.length}
                  </span>
                  <span className='text-muted-foreground'>{progress}%</span>
                </div>
                <div className='h-1.5 overflow-hidden rounded-full bg-secondary/10'>
                  <motion.div
                    className='h-full rounded-full bg-accent'
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className='text-xl font-semibold leading-snug text-secondary'>
                  {current.question}
                </h2>
                <div className='mt-6'>
                  <ValuationFieldInput
                    field={current.id}
                    value={data[current.id]}
                    onChange={(value) => update(current.id, value)}
                  />
                </div>
              </motion.div>

              <div className='mt-7 flex gap-3'>
                {step > 0 && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                    className='px-6 rounded-full py-4'
                  >
                    <ArrowLeft className='h-4 w-4' />
                    Back
                  </Button>
                )}
                <Button
                  type='button'
                  onClick={next}
                  disabled={!canContinue}
                  className='bg-accent px-6 rounded-full py-4'
                >
                  {step === valuationQuestions.length - 1
                    ? 'Get Your Appraisal'
                    : 'Next'}
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Suspense>
  );
}
