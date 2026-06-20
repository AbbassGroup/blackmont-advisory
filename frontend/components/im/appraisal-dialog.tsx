'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  comments: 'IM - Business Appraisal Request',
};

/** "Get an Appraisal" dialog — same fields + endpoint as the marketing hero. */
export function AppraisalDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await apiClient.post('/api/valuations', form);
      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setStatus('idle');
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get an Appraisal</DialogTitle>
          <DialogDescription>
            Share a few details and one of our brokers will be in touch.
          </DialogDescription>
        </DialogHeader>

        {status === 'success' ? (
          <div className='flex flex-col items-center gap-3 py-6 text-center'>
            <CheckCircle2 className='h-10 w-10 text-accent' />
            <p className='font-semibold text-secondary'>Request received</p>
            <p className='text-sm text-muted-foreground'>
              Thanks, we&apos;ll reach out shortly about your appraisal.
            </p>
            <Button
              variant='outline'
              className='mt-2'
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <Field label='First Name'>
                <Input
                  name='firstName'
                  value={form.firstName}
                  onChange={change}
                  required
                />
              </Field>
              <Field label='Last Name'>
                <Input
                  name='lastName'
                  value={form.lastName}
                  onChange={change}
                  required
                />
              </Field>
            </div>
            <Field label='Phone Number'>
              <Input
                name='phone'
                type='tel'
                value={form.phone}
                onChange={change}
                required
              />
            </Field>
            <Field label='Your Email'>
              <Input
                name='email'
                type='email'
                value={form.email}
                onChange={change}
                required
              />
            </Field>
            <Button
              type='submit'
              disabled={status === 'loading'}
              className='w-full gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
            >
              {status === 'loading' && (
                <Loader2 className='h-4 w-4 animate-spin' />
              )}
              {status === 'loading' ? 'Sending...' : 'Send'}
            </Button>
            {status === 'error' && (
              <p className='text-center text-sm font-medium text-red-500'>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-1.5'>
      <label className='block text-sm font-medium text-muted-foreground'>{label}</label>
      {children}
    </div>
  );
}
