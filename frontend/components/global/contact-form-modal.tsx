'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

interface ContactFormModalProps {
  children: React.ReactNode;
}

export function ContactFormModal({ children }: ContactFormModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    industryInterest: '',
    budget: '',
    timeline: '',
  });

  const handleChange =
    (field: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await apiClient.post('/api/partnership-contact-form', formData);

      toast.success(
        'Thank you! Your enquiry has been submitted successfully. We will contact you soon.',
      );

      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        industryInterest: '',
        budget: '',
        timeline: '',
      });

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error(
        'Sorry, there was an error submitting your form. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[500px] p-6'>
        <DialogHeader className='pb-4 border-b border-gray-100 mb-4'>
          <DialogTitle className='text-xl font-bold text-brand-black'>
            Get Started Today
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-sm font-medium'>
              Name <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='name'
              value={formData.name}
              onChange={handleChange('name')}
              disabled={loading}
              className={errors.name ? 'border-red-500 ' : ''}
              placeholder='Enter your full name'
            />
            {errors.name && (
              <p className='text-sm text-red-500 font-medium'>{errors.name}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='contactNumber' className='text-sm font-medium'>
              Contact Number <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='contactNumber'
              value={formData.contactNumber}
              onChange={handleChange('contactNumber')}
              disabled={loading}
              className={errors.contactNumber ? 'border-red-500 ' : ''}
              placeholder='Enter your phone number'
            />
            {errors.contactNumber && (
              <p className='text-sm text-red-500 font-medium'>
                {errors.contactNumber}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email' className='text-sm font-medium'>
              Email <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={handleChange('email')}
              disabled={loading}
              className={errors.email ? 'border-red-500 ' : ''}
              placeholder='Enter your email address'
            />
            {errors.email && (
              <p className='text-sm text-red-500 font-medium'>{errors.email}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='industryInterest' className='text-sm font-medium'>
              Industry Interest
            </Label>
            <Input
              id='industryInterest'
              value={formData.industryInterest}
              onChange={handleChange('industryInterest')}
              disabled={loading}
              placeholder='Enter the industry you are interested in'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='budget' className='text-sm font-medium'>
              Budget
            </Label>
            <Input
              id='budget'
              value={formData.budget}
              onChange={handleChange('budget')}
              disabled={loading}
              placeholder='Enter your budget'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='timeline' className='text-sm font-medium'>
              Timeline To Buy
            </Label>
            <Input
              id='timeline'
              value={formData.timeline}
              onChange={handleChange('timeline')}
              disabled={loading}
              placeholder='Enter your timeline to buy'
            />
          </div>

          <div className='pt-4 flex justify-end gap-3 border-t border-gray-100'>
            <Button
              type='button'
              variant='ghost'
              onClick={() => setOpen(false)}
              disabled={loading}
              className='text-gray-500'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={loading}
              className='bg-brand-primary hover:bg-brand-primary-dark text-white px-6'
            >
              {loading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
