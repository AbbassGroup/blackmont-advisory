'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Container, Eyebrow, Reveal } from './primitives';
import { apiClient } from '@/lib/api';
import { trackAccessEvent } from '@/lib/track';

type Tab = 'sell' | 'buy';

const NEXAR_API_URL =
  process.env.NEXT_PUBLIC_NEXAR_API_URL ||
  'https://blackmont-api.nexartechnologies.com';

const fieldClass =
  'w-full border border-accent/20 bg-white/5 px-4 py-3 text-sm font-light text-parchment outline-none transition-colors placeholder:text-parchment/25 focus:border-accent disabled:opacity-50';

const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.18em] text-accent';

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className={labelClass}>
        {label}
        {required && <span className='text-red-400'> *</span>}
      </label>
      {children}
      {error && <p className='text-xs font-medium text-red-400'>{error}</p>}
    </div>
  );
}

const EMPTY_FORM = {
  name: '',
  email: '',
  // sell (GetStarted)
  phone: '',
  industry: '',
  location: '',
  turnover: '',
  comments: '',
  // buy (ContactFormModal)
  contactNumber: '',
  industryInterest: '',
  budget: '',
  timeline: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [tab, setTab] = useState<Tab>('sell');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update =
    (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const switchTab = (next: Tab) => {
    if (next === tab) return;
    setTab(next);
    setErrors({});
  };

  async function submitSell() {
    const next: Record<string, string> = {};
    if (!form.phone.trim()) next.phone = 'Please enter your phone number';
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!EMAIL_RE.test(form.email))
      next.email = 'Please enter a valid email address';
    if (!form.industry.trim()) next.industry = 'Please enter your industry';
    if (!form.location.trim()) next.location = 'Please enter your location';
    if (!form.turnover.trim())
      next.turnover = 'Please enter your annual turnover';
    setErrors(next);
    if (Object.keys(next).length) return;

    const turnover = form.turnover.trim();
    const userComment = form.comments.trim();
    const mergedComments =
      turnover && userComment
        ? `${turnover} - ${userComment}`
        : turnover || userComment;

    setLoading(true);
    try {
      await axios.put(`${NEXAR_API_URL}/deals/update/by-email`, {
        stage: 'Enquiry',
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        location: form.location,
        comments: mergedComments,
        businessUnit: 'Business Sellers',
        ...(form.name.trim() ? { name: form.name.trim() } : {}),
      });

      toast.success(
        'Thank you. Your enquiry is held in confidence — a senior advisor will be in touch shortly.',
      );
      setForm(EMPTY_FORM);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function submitBuy() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.contactNumber.trim())
      next.contactNumber = 'Contact number is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!EMAIL_RE.test(form.email))
      next.email = 'Please enter a valid email address';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await apiClient.post('/api/partnership-contact-form', {
        name: form.name,
        contactNumber: form.contactNumber,
        email: form.email,
        industryInterest: form.industryInterest,
        budget: form.budget,
        timeline: form.timeline,
      });
      toast.success(
        'Thank you! Your enquiry has been submitted successfully. We will contact you soon.',
      );
      setForm(EMPTY_FORM);
    } catch {
      toast.error(
        'Sorry, there was an error submitting your form. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (tab === 'sell') void submitSell();
    else void submitBuy();
  }

  return (
    <section id='contact' className='bg-background py-20 lg:py-28'>
      <Container className='grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20'>
        {/* Form */}
        <Reveal>
          <div className='relative border-[1.5px] border-secondary bg-secondary px-7 py-10 sm:px-11'>
            <span
              aria-hidden
              className='absolute inset-x-6 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
            />
            <h2 className='mb-1.5 text-[22px] font-bold tracking-tight text-parchment'>
              Begin confidentially
            </h2>
            <p className='mb-7 text-sm leading-relaxed text-parchment/50'>
              All enquiries held in strict confidence. A senior advisor will be
              in touch shortly.
            </p>

            <div className='mb-7 grid grid-cols-2 border border-accent/25'>
              {(['sell', 'buy'] as Tab[]).map((t, i) => (
                <button
                  key={t}
                  type='button'
                  onClick={() => switchTab(t)}
                  className={[
                    'py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors',
                    i === 0 ? 'border-r border-accent/20' : '',
                    tab === t
                      ? 'bg-accent text-primary'
                      : 'text-parchment/40 hover:text-parchment/70',
                  ].join(' ')}
                >
                  {t === 'sell' ? 'I want to sell' : 'I want to acquire'}
                </button>
              ))}
            </div>

            {tab === 'sell' ? (
              <form onSubmit={handleSubmit} className='flex flex-col gap-3.5'>
                <Field label='Name' required error={errors.name}>
                  <input
                    className={`${fieldClass} ${errors.name ? 'border-red-400' : ''}`}
                    type='text'
                    placeholder='Your full name'
                    value={form.name}
                    onChange={update('name')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Email' required error={errors.email}>
                  <input
                    className={`${fieldClass} ${errors.email ? 'border-red-400' : ''}`}
                    type='email'
                    placeholder='you@business.com.au'
                    value={form.email}
                    onChange={update('email')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Phone' required error={errors.phone}>
                  <input
                    className={`${fieldClass} ${errors.phone ? 'border-red-400' : ''}`}
                    type='tel'
                    placeholder='Enter your phone number'
                    value={form.phone}
                    onChange={update('phone')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Industry' required error={errors.industry}>
                  <input
                    className={`${fieldClass} ${errors.industry ? 'border-red-400' : ''}`}
                    type='text'
                    placeholder='Enter industry'
                    value={form.industry}
                    onChange={update('industry')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Location' required error={errors.location}>
                  <input
                    className={`${fieldClass} ${errors.location ? 'border-red-400' : ''}`}
                    type='text'
                    placeholder='Enter your location'
                    value={form.location}
                    onChange={update('location')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Annual Turnover' required error={errors.turnover}>
                  <input
                    className={`${fieldClass} ${errors.turnover ? 'border-red-400' : ''}`}
                    type='text'
                    placeholder='Enter revenue'
                    value={form.turnover}
                    onChange={update('turnover')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Comments'>
                  <input
                    className={fieldClass}
                    type='text'
                    placeholder='Enter your comments'
                    value={form.comments}
                    onChange={update('comments')}
                    disabled={loading}
                  />
                </Field>

                <button
                  type='submit'
                  disabled={loading}
                  className='mt-2 w-full bg-accent py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {loading ? 'Submitting…' : 'Submit Confidentially'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-3.5'>
                <Field label='Name' required error={errors.name}>
                  <input
                    className={`${fieldClass} ${errors.name ? 'border-red-400' : ''}`}
                    type='text'
                    placeholder='Enter your full name'
                    value={form.name}
                    onChange={update('name')}
                    disabled={loading}
                  />
                </Field>
                <Field
                  label='Contact Number'
                  required
                  error={errors.contactNumber}
                >
                  <input
                    className={`${fieldClass} ${errors.contactNumber ? 'border-red-400' : ''}`}
                    type='tel'
                    placeholder='Enter your phone number'
                    value={form.contactNumber}
                    onChange={update('contactNumber')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Email' required error={errors.email}>
                  <input
                    className={`${fieldClass} ${errors.email ? 'border-red-400' : ''}`}
                    type='email'
                    placeholder='Enter your email address'
                    value={form.email}
                    onChange={update('email')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Industry Interest'>
                  <input
                    className={fieldClass}
                    type='text'
                    placeholder='Enter the industry you are interested in'
                    value={form.industryInterest}
                    onChange={update('industryInterest')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Budget'>
                  <input
                    className={fieldClass}
                    type='text'
                    placeholder='Enter your budget'
                    value={form.budget}
                    onChange={update('budget')}
                    disabled={loading}
                  />
                </Field>
                <Field label='Timeline To Buy'>
                  <input
                    className={fieldClass}
                    type='text'
                    placeholder='Enter your timeline to buy'
                    value={form.timeline}
                    onChange={update('timeline')}
                    disabled={loading}
                  />
                </Field>

                <button
                  type='submit'
                  disabled={loading}
                  className='mt-2 w-full bg-accent py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {loading ? 'Submitting…' : 'Submit Acquisition Brief'}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* CTA copy */}
        <Reveal delay={120}>
          <Eyebrow className='mb-5'>Get in touch</Eyebrow>
          <h2 className='mb-6 text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-[3.4rem]'>
            Every transaction begins with a{' '}
            <span className='font-light text-accent'>
              private conversation.
            </span>
          </h2>
          <p className='mb-11 text-lg font-light leading-loose text-muted-foreground'>
            Considering a sale, looking to acquire, or simply exploring your
            options. We are available for a confidential, no-obligation
            discussion.
          </p>
          <dl className='flex flex-col gap-6'>
            <div>
              <dt className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Email
              </dt>
              <dd className='text-[1.15rem] font-semibold text-secondary'>
                <a
                  href='mailto:info@blackmontadvisory.com'
                  className='transition-colors hover:text-accent'
                >
                  info@blackmontadvisory.com
                </a>
              </dd>
            </div>
            <div>
              <dt className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Based in
              </dt>
              <dd className='text-[1.15rem] font-semibold text-secondary'>
                Australia, with global reach
              </dd>
            </div>
            <div>
              <dt className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Confidentiality
              </dt>
              <dd className='text-[1.15rem] font-semibold text-secondary'>
                NDA from the first conversation
              </dd>
            </div>
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
