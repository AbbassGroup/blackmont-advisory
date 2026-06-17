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
    <section className='py-24 bg-brand-offwhite'>
      <div className='max-w-[800px] mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='bg-white rounded-3xl p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-gray-100'
        >
          <div className='text-center mb-10'>
            <Title>Contact Us To Learn More</Title>
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
                Message / Questions
              </label>
              <Textarea
                rows={4}
                name='message'
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                className='h-12 min-h-[120px]'
                placeholder='Tell us briefly about your background and interest...'
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
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-center font-medium mt-6 border ${
                  status === 'success'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {status === 'success'
                  ? 'Thank you! We have received your enquiry and will be in touch shortly.'
                  : status}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
