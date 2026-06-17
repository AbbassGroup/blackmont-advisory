'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiClient } from '@/lib/api';
import Title from '@/components/global/title';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

const benefits = [
  {
    icon: <Briefcase className='w-8 h-8 text-[#56C1BC]' />,
    title: 'Professional Growth',
    description:
      'Continuous learning and development opportunities in the business brokerage industry.',
  },
  {
    icon: <Users className='w-8 h-8 text-[#56C1BC]' />,
    title: 'Collaborative Environment',
    description:
      'Work with a dynamic team of professionals in a supportive and inclusive workplace.',
  },
  {
    icon: <TrendingUp className='w-8 h-8 text-[#56C1BC]' />,
    title: 'Career Advancement',
    description:
      'Clear path for career progression with mentorship and training programs.',
  },
];

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });
    setSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    if (resumeFile) {
      data.append('resume', resumeFile);
    }

    try {
      await apiClient.post('/api/careers/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your application has been successfully submitted.',
      });
      setFormData({ name: '', email: '', phone: '', coverLetter: '' });
      setResumeFile(null);
      // Reset file input
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      setSubmitStatus({
        type: 'error',
        message:
          err.response?.data?.error ||
          err.message ||
          'There was an error submitting your application.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className='min-h-screen bg-white pb-24'>
      {/* Hero Banner */}
      <div className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] bg-[#1c2434] text-center overflow-hidden flex items-center justify-center'>
        <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&q=80&w=2000&auto=format&fit=crop")] bg-cover bg-center' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 max-w-[1000px] mx-auto px-6 mt-10'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white/90 text-xl md:text-2xl font-light max-w-[600px] mx-auto drop-shadow-md'
          >
            Careers at ABBASS Business Brokers
          </motion.p>
        </div>

        <ScrollIndicator />
      </div>

      <div className='max-w-[1260px] mx-auto px-4 lg:px-8 mt-20'>
        {/* Why Work With Us Section */}
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-bold text-brand-black mb-4'
          >
            Why Work With Us
          </motion.h2>
          <div className='w-24 h-1 bg-[#56C1BC] mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-24'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className='bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-brand-primary/30 group'
            >
              <div className='w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors duration-300 [&>svg]:group-hover:text-white'>
                {benefit.icon}
              </div>
              <h3 className='text-xl font-bold text-brand-primary-dark mb-4'>
                {benefit.title}
              </h3>
              <p className='text-gray-500 font-medium leading-relaxed'>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Application Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-[800px] mx-auto bg-white rounded-3xl shadow-sm shadow-gray-200/50 border border-gray-100 p-8 md:p-12'
        >
          <div className='text-center mb-10'>
            <Title>Apply Now</Title>
            <p className='text-gray-500 font-medium'>
              Take the next step in your career. Fill out the form below to
              apply.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            {submitStatus.type === 'success' && (
              <div className='p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium'>
                {submitStatus.message}
              </div>
            )}
            {submitStatus.type === 'error' && (
              <div className='p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium'>
                {submitStatus.message}
              </div>
            )}

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='name'
                className='text-sm font-semibold text-gray-700'
              >
                Full Name *
              </label>
              <Input
                id='name'
                name='name'
                required
                value={formData.name}
                onChange={handleChange}
                className='bg-gray-50 border-gray-200  h-12 text-[1.05rem]'
                placeholder='John Doe'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-semibold text-gray-700'
                >
                  Email Address *
                </label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-gray-50 border-gray-200  h-12 text-[1.05rem]'
                  placeholder='john@example.com'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='phone'
                  className='text-sm font-semibold text-gray-700'
                >
                  Phone Number *
                </label>
                <Input
                  id='phone'
                  name='phone'
                  type='tel'
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className='bg-gray-50 border-gray-200  h-12 text-[1.05rem]'
                  placeholder='(03) 9103 1317'
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='resume'
                className='text-sm font-semibold text-gray-700'
              >
                Upload Resume (PDF, DOCX) *
              </label>
              <div className='relative'>
                <Input
                  id='resume'
                  name='resume'
                  type='file'
                  accept='.pdf,.doc,.docx'
                  required
                  onChange={handleFileChange}
                  className='bg-gray-50 border-gray-200  h-14 pt-[13px] pl-12 file:bg-brand-primary file:py-1 file:px-4 file:rounded-full file:border-0 file:text-white file:text-sm file:font-semibold file:mr-4 file:cursor-pointer hover:file:bg-brand-primary/90 cursor-pointer text-gray-500'
                />
                <UploadCloud className='absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none' />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='coverLetter'
                className='text-sm font-semibold text-gray-700'
              >
                Cover Letter
              </label>
              <Textarea
                id='coverLetter'
                name='coverLetter'
                rows={5}
                value={formData.coverLetter}
                onChange={handleChange}
                className='bg-gray-50 border-gray-200  resize-none text-[1.05rem]'
                placeholder="Tell us why you'd like to join our team..."
              />
            </div>

            <Button
              type='submit'
              disabled={submitting}
              className='mt-4 w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-6 text-[1.1rem] rounded-xl shadow-lg shadow-brand-primary/20 transition-all duration-300 transform hover:-translate-y-1'
            >
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
