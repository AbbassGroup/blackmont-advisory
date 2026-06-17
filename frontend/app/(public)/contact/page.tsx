'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiClient } from '@/lib/api';
import Title from '@/components/global/title';

const contactInfo = [
  {
    icon: <MapPin className='w-8 h-8 text-brand-primary' />,
    title: 'Visit Us',
    details: [
      '101 Moray St, South Melbourne VIC 3205',
      '388 George St, Sydney, NSW 2000',
    ],
  },
  {
    icon: <Phone className='w-8 h-8 text-brand-primary' />,
    title: 'Call Us',
    details: ['(03) 9103 1317', 'Monday - Friday: 9am - 5pm'],
  },
  {
    icon: <Mail className='w-8 h-8 text-brand-primary' />,
    title: 'Email Us',
    details: ['info@abbass.group'],
  },
];

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/abbassbusinessbrokers',
    icon: <Linkedin className='w-6 h-6' />,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.facebook.com/abbassbusinessbrokers',
    icon: <Facebook className='w-6 h-6' />,
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/abbassbusinessbrokers',
    icon: <Instagram className='w-6 h-6' />,
    label: 'Instagram',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    success: string | null;
    error: string | null;
  }>({
    success: null,
    error: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ success: null, error: null });

    try {
      await apiClient.post('/api/contact', formData);
      setFeedback({
        success: 'Your message has been sent! We will get back to you soon.',
        error: null,
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setFeedback({
        success: null,
        error:
          'There was an error sending your message. Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Banner */}
      <div className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] bg-[#1c2434] text-center overflow-hidden flex items-center justify-center'>
        <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1920&q=80")] bg-cover bg-center' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 max-w-[1000px] mx-auto px-6 mt-10'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white/90 text-xl md:text-2xl font-light max-w-[600px] mx-auto drop-shadow-md'
          >
            Get in touch with our expert team of business brokers.
          </motion.p>
        </div>
      </div>

      <div className='max-w-[1260px] mx-auto px-4 lg:px-8 py-20'>
        {/* Contact Information Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className='bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow hover:border-brand-primary/30 group'
            >
              <div className='w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                {info.icon}
              </div>
              <h3 className='text-xl font-bold text-[#1c2434] mb-4'>
                {info.title}
              </h3>
              <div className='flex flex-col gap-1'>
                {info.details.map((detail, idx) => (
                  <p key={idx} className='text-gray-500 font-medium'>
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2-Column Contact Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Title>Send Us a Message</Title>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
              {feedback.success && (
                <div className='p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium'>
                  {feedback.success}
                </div>
              )}
              {feedback.error && (
                <div className='p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium'>
                  {feedback.error}
                </div>
              )}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='name'
                    className='text-sm font-medium text-gray-700'
                  >
                    Your Name *
                  </label>
                  <Input
                    id='name'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className='bg-gray-50 border-gray-200 h-12'
                    placeholder='John Doe'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='email'
                    className='text-sm font-medium text-gray-700'
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
                    className='bg-gray-50 border-gray-200 h-12'
                    placeholder='john@example.com'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='phone'
                  className='text-sm font-medium text-gray-700'
                >
                  Phone Number
                </label>
                <Input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={handleChange}
                  className='bg-gray-50 border-gray-200 h-12'
                  placeholder='(03) 9103 1317'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='subject'
                  className='text-sm font-medium text-gray-700'
                >
                  Subject *
                </label>
                <Input
                  id='subject'
                  name='subject'
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className='bg-gray-50 border-gray-200 h-12'
                  placeholder='How can we help you?'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='message'
                  className='text-sm font-medium text-gray-700'
                >
                  Message *
                </label>
                <Textarea
                  id='message'
                  name='message'
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className='bg-gray-50 border-gray-200 resize-none'
                  placeholder='Tell us more about your inquiry...'
                />
              </div>

              <Button
                type='submit'
                disabled={submitting}
                className='mt-4 w-full md:w-auto md:self-start bg-brand-primary hover:bg-brand-primary/90 text-white px-8 h-12 shadow-lg shadow-brand-primary/20 transition-all duration-300 transform hover:-translate-y-1'
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Connect With Us Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='flex flex-col justify-center'
          >
            <Title>Connect With Us</Title>

            <div className='flex flex-col gap-6 text-gray-600 text-lg leading-relaxed mb-12'>
              <p>
                Looking to buy or sell a business? Our experienced team of
                business brokers is ready to guide you through every step of the
                process. We offer confidential consultations and personalised
                solutions tailored to your specific needs.
              </p>
              <p>
                Visit our office in South Melbourne for a face-to-face
                discussion, or connect with us through your preferred channel.
                We&apos;re here to help you achieve your business goals.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold text-[#1c2434] mb-6 tracking-wide'>
                Follow Us
              </h3>
              <div className='flex gap-4'>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={social.label}
                    className='w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300 hover:shadow-md'
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='w-full h-[500px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative'
        >
          <iframe
            title='Office Location'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.2916628073284!2d144.97034987616652!3d-37.832439472037504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642a814af8833%3A0xfc0f0b8e1d8f4a9b!2s101%20Moray%20St%2C%20South%20Melbourne%20VIC%203205!5e0!3m2!1sen!2sau!4v1746160838419!5m2!1sen!2sau'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen={false}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='absolute inset-0 grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-700'
          />
        </motion.div>
      </div>
    </main>
  );
}
