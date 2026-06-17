'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Title from '@/components/global/title';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await apiClient.post('/api/franchise-eoi', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Form submission error:', err);
      setStatus(err.response?.data?.error || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='join-contact-form' className='py-24 bg-white'>
      <div className='max-w-[800px] mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='bg-white rounded-3xl p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-gray-100'
        >
          <div className='text-center mb-10'>
            <Title>Submit your EOI</Title>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='space-y-1.5'>
                <label className='text-sm font-bold text-gray-700 ml-1'>
                  Full Name *
                </label>
                <Input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className='h-12'
                  placeholder='John Doe'
                />
              </div>

              <div className='space-y-1.5'>
                <label className='text-sm font-bold text-gray-700 ml-1'>
                  Contact Number *
                </label>
                <Input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className='h-12'
                  placeholder='0400 000 000'
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-bold text-gray-700 ml-1'>
                Email Address *
              </label>
              <Input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className='h-12'
                placeholder='john@example.com'
              />
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-bold text-gray-700 ml-1'>
                Message / Background *
              </label>
              <Textarea
                rows={5}
                name='message'
                required
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                className='w-full px-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-brand-primary focus-visible:border-brand-primary placeholder:text-gray-400 resize-y min-h-[140px]'
                placeholder='Share your interest in joining our team...'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-4 px-6 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(86,193,188,0.3)] hover:shadow-[0_8px_25px_rgba(86,193,188,0.5)] transition-all hover:-translate-y-0.5 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  <span>Submitting EOI...</span>
                </>
              ) : (
                'Submit EOI'
              )}
            </button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-center font-medium mt-6 border flex flex-col items-center gap-1 ${
                  status === 'success'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {status === 'success' ? (
                  <>
                    <span className='font-bold text-lg'>
                      Thank you! Your EOI has been submitted successfully.
                    </span>
                    <span className='text-green-600/90 text-sm'>
                      We&apos;ll be in touch with you soon to discuss the next
                      steps.
                    </span>
                  </>
                ) : (
                  status
                )}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
