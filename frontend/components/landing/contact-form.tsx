'use client';

import {
  useId,
  useRef,
  useState,
  type ChangeEventHandler,
  type FormEvent,
  type HTMLInputTypeAttribute,
} from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { LandingButton } from './presentation';

type EnquiryType = 'sell' | 'buy';

const NEXAR_API_URL =
  process.env.NEXT_PUBLIC_NEXAR_API_URL ||
  'https://blackmont-api.nexartechnologies.com';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  industry: '',
  location: '',
  turnover: '',
  comments: '',
  contactNumber: '',
  industryInterest: '',
  budget: '',
  timeline: '',
};

type FormField = keyof typeof EMPTY_FORM;
type FormErrors = Partial<Record<FormField, string>>;
type Feedback = { kind: 'success' | 'error'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFieldProps = {
  field: FormField;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled: boolean;
  error?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  multiline?: boolean;
};

function ContactField({
  field,
  label,
  value,
  onChange,
  disabled,
  error,
  required = false,
  type = 'text',
  autoComplete,
  multiline = false,
}: ContactFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const inputProps = {
    id,
    name: field,
    value,
    onChange,
    disabled,
    required,
    autoComplete,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: cn(
      'block min-h-[42px] w-full rounded-none border border-advisory-input bg-white px-3 py-2.5 text-[15px] leading-[1.65] text-ink outline-none transition-colors duration-150 focus:border-midnight motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-destructive',
    ),
  };

  return (
    <div className='mb-[17px] min-w-0'>
      <label htmlFor={id} className='mb-1.5 block text-sm font-semibold'>
        {label}
        {required && <span aria-hidden='true'> *</span>}
      </label>
      {multiline ? (
        <textarea
          {...inputProps}
          rows={4}
          className={cn(inputProps.className, 'min-h-[108px] resize-y')}
        />
      ) : (
        <input {...inputProps} type={type} />
      )}
      {error && (
        <p id={errorId} className='m-0 mt-1.5 text-xs text-destructive'>
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const headingId = useId();
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('sell');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const submissionPending = useRef(false);
  const phoneField = enquiryType === 'sell' ? 'phone' : 'contactNumber';

  const update =
    (field: FormField): ContactFieldProps['onChange'] =>
    (event) => {
      const value = event.target.value;
      setForm((previous) => ({ ...previous, [field]: value }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
      setFeedback(null);
    };

  const fieldProps = (field: FormField) => ({
    field,
    value: form[field],
    onChange: update(field),
    error: errors[field],
    disabled: loading,
  });

  function switchEnquiryType(next: EnquiryType) {
    if (next === enquiryType || submissionPending.current) return;
    setEnquiryType(next);
    setErrors({});
    setFeedback(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionPending.current) return;

    const next: FormErrors = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!EMAIL_RE.test(form.email))
      next.email = 'Please enter a valid email address';
    if (!form[phoneField].trim())
      next[phoneField] = 'Please enter your phone number';
    if (enquiryType === 'sell') {
      if (!form.industry.trim()) next.industry = 'Please enter your industry';
      if (!form.location.trim()) next.location = 'Please enter your location';
      if (!form.turnover.trim())
        next.turnover = 'Please enter your annual turnover';
    }
    setErrors(next);
    setFeedback(null);

    const firstError = Object.keys(next)[0];
    if (firstError) {
      const input = event.currentTarget.elements.namedItem(firstError);
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    submissionPending.current = true;
    setLoading(true);
    try {
      if (enquiryType === 'sell') {
        const turnover = form.turnover.trim();
        const comments = form.comments.trim();
        const mergedComments = comments ? `${turnover} - ${comments}` : turnover;

        await axios.put(`${NEXAR_API_URL}/deals/update/by-email`, {
          stage: 'Enquiry',
          email: form.email,
          phone: form.phone,
          industry: form.industry,
          location: form.location,
          comments: mergedComments,
          businessUnit: 'Business Sellers',
          name: form.name.trim(),
        });
      } else {
        await apiClient.post('/api/partnership-contact-form', {
          name: form.name,
          contactNumber: form.contactNumber,
          email: form.email,
          industryInterest: form.industryInterest,
          budget: form.budget,
          timeline: form.timeline,
        });
      }

      const message =
        'Thank you. Your enquiry has been submitted. A senior advisor will be in touch shortly.';
      setFeedback({ kind: 'success', message });
      toast.success(message);
      setForm(EMPTY_FORM);
    } catch {
      const message =
        'Your enquiry could not be sent. Please try again or email info@blackmontadvisory.com.';
      setFeedback({ kind: 'error', message });
      toast.error(message);
    } finally {
      submissionPending.current = false;
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={headingId}
      aria-busy={loading}
      className='min-w-0 bg-canvas px-[23px] py-[29px] min-[681px]:p-[clamp(27px,3vw,44px)]'
    >
      <h3
        id={headingId}
        className='m-0 mb-[7px] font-advisory-heading text-[23px] leading-[1.25] font-bold tracking-normal text-midnight'
      >
        Get in touch
      </h3>
      <p className='m-0 mb-[19px] text-sm leading-[1.65]'>
        Tell us a little about what you have in mind. A senior advisor will be in
        touch.
      </p>
      <div
        role='group'
        aria-label='Type of enquiry'
        className='mb-6 grid grid-cols-2 gap-2'
      >
        {(['sell', 'buy'] as const).map((type) => (
          <button
            key={type}
            type='button'
            aria-pressed={enquiryType === type}
            disabled={loading}
            onClick={() => switchEnquiryType(type)}
            className='min-h-[42px] cursor-pointer border border-midnight bg-transparent p-2.5 text-[13px] font-semibold text-midnight focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-50 aria-pressed:bg-midnight aria-pressed:text-white'
          >
            {type === 'sell' ? 'Sell a business' : 'Buy a business'}
          </button>
        ))}
      </div>
      <div className='grid min-[426px]:grid-cols-2 min-[426px]:gap-x-[13px]'>
        <ContactField
          {...fieldProps('name')}
          label='Your name'
          autoComplete='name'
          required
        />
        <ContactField
          {...fieldProps('email')}
          label='Email address'
          type='email'
          autoComplete='email'
          required
        />
      </div>
      <ContactField
        {...fieldProps(phoneField)}
        label='Phone number'
        type='tel'
        autoComplete='tel'
        required
      />
      {enquiryType === 'sell' ? (
        <>
          <ContactField {...fieldProps('industry')} label='Industry' required />
          <ContactField {...fieldProps('location')} label='Location' required />
          <ContactField
            {...fieldProps('turnover')}
            label='Annual turnover'
            required
          />
          <ContactField
            {...fieldProps('comments')}
            label='Tell us about your business or enquiry'
            multiline
          />
        </>
      ) : (
        <>
          <ContactField
            {...fieldProps('industryInterest')}
            label='Industry interest'
          />
          <ContactField {...fieldProps('budget')} label='Budget' />
          <ContactField {...fieldProps('timeline')} label='Timeline to buy' />
        </>
      )}
      <LandingButton type='submit' disabled={loading} className='mt-0.5 w-full'>
        {loading ? 'Sending enquiry…' : 'Send confidential enquiry'}
      </LandingButton>
      {feedback && (
        <p
          role={feedback.kind === 'error' ? 'alert' : 'status'}
          className={cn(
            'm-0 mt-[15px] text-sm leading-[1.6]',
            feedback.kind === 'error' ? 'text-destructive' : 'text-midnight',
          )}
        >
          {feedback.message}
        </p>
      )}
      <p className='m-0 mt-[15px] text-xs leading-[1.6]'>
        Your details will only be used to respond to your enquiry.
      </p>
    </form>
  );
}
