'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { trackAccessEvent } from '@/lib/track';

const NEXAR_API_URL =
  process.env.NEXT_PUBLIC_NEXAR_API_URL ||
  'https://api.nexartechnologies.com/api/v1';

async function submitResourceLead({
  email,
  resource,
}: {
  email: string;
  resource: string;
}) {
  await axios.put(`${NEXAR_API_URL}/deals/update/by-email`, {
    stage: 'Resource Access',
    businessUnit: 'Business Brokers',
    office: 'Head Office',
    resource,
    email,
  });
}

interface ResourceGateProps {
  href: string;
  resourceTitle: string;
  className: string;
  index: number;
  children: React.ReactNode;
}

export function ResourceGate({
  href,
  resourceTitle,
  className,
  index,
  children,
}: ResourceGateProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [failed, setFailed] = useState(false);

  const updateEmail = (value: string) => {
    setEmail(value);
    if (failed) setFailed(false);
    if (error) setError(undefined);
  };

  const submit = async () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError(undefined);

    setLoading(true);
    setFailed(false);
    try {
      await submitResourceLead({ email, resource: resourceTitle });
      trackAccessEvent('lead_submitted', {
        resource: resourceTitle,
        lead: { email, leadType: 'resource_gate' },
      });
      router.push(href);
    } catch {
      setLoading(false);
      setFailed(true);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          trackAccessEvent('resource_open', { resource: resourceTitle });
        } else {
          setError(undefined);
          setFailed(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <motion.button
          type='button'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
          className={className}
        >
          {children}
        </motion.button>
      </DialogTrigger>

      <DialogContent className='gap-0 overflow-hidden p-0 sm:max-w-md'>
        <div className='px-6 pt-7 pb-2 sm:px-7'>
          <DialogHeader className='text-left'>
            <DialogTitle className='text-lg leading-snug font-semibold text-brand-black sm:text-xl'>
              Unlock {resourceTitle}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className='space-y-4 px-6 pt-6 pb-7 sm:px-7'
          noValidate
        >
          <div className='space-y-1.5'>
            <Label
              htmlFor='rg-email'
              className='text-[13px] font-medium text-brand-black'
            >
              Email <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='rg-email'
              type='email'
              autoComplete='email'
              inputMode='email'
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              placeholder='you@business.com.au'
              disabled={loading}
              className={`h-11 rounded-lg ${error ? 'border-red-500' : ''}`}
            />
            {error && (
              <p className='text-xs font-medium text-red-500'>{error}</p>
            )}
          </div>

          {failed && (
            <p className='rounded-lg bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600'>
              Something went wrong. Please try again.
            </p>
          )}

          <Button
            type='submit'
            disabled={loading}
            className='h-12 w-full rounded-lg bg-brand-primary text-base font-semibold hover:bg-brand-primary-dark'
          >
            {loading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Unlocking…
              </>
            ) : (
              'Access Resource'
            )}
          </Button>

          <p className='text-center text-[11px] leading-relaxed text-gray-400'>
            By submitting, you agree to our{' '}
            <Link
              href='/privacy'
              target='_blank'
              className='text-brand-primary underline-offset-2 hover:underline'
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href='/terms-and-conditions'
              target='_blank'
              className='text-brand-primary underline-offset-2 hover:underline'
            >
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
