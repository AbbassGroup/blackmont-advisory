'use client';

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiClient } from '@/lib/api';
import { JsonLd } from '@/components/seo/json-ld';
import { PageBanner } from '@/components/global/page-banner';
import { Container, Reveal } from '@/components/landing/primitives';

const SITE_URL = 'https://blackmontadvisory.com';

const contactInfo: {
  icon: LucideIcon;
  title: string;
  details: string[];
}[] = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      '101 Moray St, South Melbourne VIC 3205',
      '388 George St, Sydney, NSW 2000',
    ],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['(03) 9103 1317', 'Monday - Friday: 9am - 5pm'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@blackmontadvisory.com'],
  },
];

const socialLinks: { href: string; icon: LucideIcon; label: string }[] = [
  {
    href: 'https://www.linkedin.com/company/abbassbusinessbrokers',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.facebook.com/abbassbusinessbrokers',
    icon: Facebook,
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/abbassbusinessbrokers',
    icon: Instagram,
    label: 'Instagram',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blackmont Advisory',
  url: SITE_URL,
  email: 'info@blackmontadvisory.com',
  telephone: '(03) 9103 1317',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '101 Moray St',
      addressLocality: 'South Melbourne',
      addressRegion: 'VIC',
      postalCode: '3205',
      addressCountry: 'AU',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '388 George St',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+61-3-9103-1317',
    contactType: 'customer service',
    email: 'info@blackmontadvisory.com',
    areaServed: 'AU',
  },
};

const fieldClass =
  'h-12 border-accent/20 bg-white/5 text-parchment placeholder:text-parchment/30 focus-visible:border-accent focus-visible:ring-0';
const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.18em] text-accent';

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
    } catch {
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
    <>
      <JsonLd data={structuredData} />

      <PageBanner
        title={
          <>
            Contact <span className='font-light text-accent'>Us</span>
          </>
        }
        description='Get in touch with our expert team of business brokers.'
        image='https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1920&q=80'
      />

      <section className='bg-background py-20 lg:py-28'>
        <Container>
          {/* 2-Column Contact Section: navy form panel + info */}
          <div className='mb-16 grid grid-cols-1 gap-12 lg:mb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-20'>
            {/* Contact Form — navy panel */}
            <Reveal>
              <div className='relative border-[1.5px] border-secondary bg-secondary px-6 py-10 sm:px-10'>
                <span
                  aria-hidden
                  className='absolute inset-x-8 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
                />
                <h2 className='mb-7 text-2xl font-bold tracking-tight text-parchment'>
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                  {feedback.success && (
                    <div className='border border-accent/40 bg-accent/15 p-4 text-sm font-medium text-parchment'>
                      {feedback.success}
                    </div>
                  )}
                  {feedback.error && (
                    <div className='border border-destructive/40 bg-destructive/15 p-4 text-sm font-medium text-destructive'>
                      {feedback.error}
                    </div>
                  )}

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='flex flex-col gap-1.5'>
                      <label htmlFor='name' className={labelClass}>
                        Your Name *
                      </label>
                      <Input
                        id='name'
                        name='name'
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder='John Doe'
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label htmlFor='email' className={labelClass}>
                        Email Address *
                      </label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder='john@example.com'
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label htmlFor='phone' className={labelClass}>
                      Phone Number
                    </label>
                    <Input
                      id='phone'
                      name='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder='(03) 9103 1317'
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label htmlFor='subject' className={labelClass}>
                      Subject *
                    </label>
                    <Input
                      id='subject'
                      name='subject'
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder='How can we help you?'
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label htmlFor='message' className={labelClass}>
                      Message *
                    </label>
                    <Textarea
                      id='message'
                      name='message'
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className='resize-none border-accent/20 bg-white/5 text-parchment placeholder:text-parchment/30 focus-visible:border-accent focus-visible:ring-0'
                      placeholder='Tell us more about your inquiry...'
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={submitting}
                    className='mt-2 h-12 w-full bg-accent px-8 font-bold uppercase tracking-[0.14em] text-primary hover:bg-accent-light'
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </Reveal>

            {/* Connect With Us Info */}
            <Reveal delay={120}>
              <h2 className='mb-6 text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl'>
                Connect With Us
              </h2>

              <div className='mb-10 flex flex-col gap-5 leading-relaxed text-muted-foreground'>
                <p>
                  Looking to buy or sell a business? Our experienced team of
                  business brokers is ready to guide you through every step of
                  the process. We offer confidential consultations and
                  personalised solutions tailored to your specific needs.
                </p>
                <p>
                  Visit our office in South Melbourne for a face-to-face
                  discussion, or connect with us through your preferred channel.
                  We&apos;re here to help you achieve your business goals.
                </p>
              </div>

              {/* Contact details */}
              <div className='flex flex-col border-t border-secondary/10'>
                {contactInfo.map(({ icon: Icon, title, details }) => (
                  <div
                    key={title}
                    className='flex items-start gap-4 border-b border-secondary/10 py-5'
                  >
                    <span className='flex h-11 w-11 shrink-0 items-center justify-center border-[1.5px] border-accent/30 text-accent'>
                      <Icon className='h-5 w-5' strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className='mb-1 text-sm font-bold uppercase tracking-[0.12em] text-secondary'>
                        {title}
                      </h3>
                      {details.map((detail) => (
                        <p
                          key={detail}
                          className='text-sm leading-relaxed text-muted-foreground'
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-8'>
                <h3 className='mb-4 text-xs font-bold uppercase tracking-[0.16em] text-accent'>
                  Follow Us
                </h3>
                <div className='flex gap-3'>
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target='_blank'
                      rel='noreferrer'
                      aria-label={label}
                      className='flex h-11 w-11 items-center justify-center border border-secondary/15 text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-primary'
                    >
                      <Icon className='h-5 w-5' />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Google Map */}
          <Reveal className='relative h-[500px] w-full overflow-hidden border border-secondary/10'>
            <iframe
              title='Office Location'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.2916628073284!2d144.97034987616652!3d-37.832439472037504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642a814af8833%3A0xfc0f0b8e1d8f4a9b!2s101%20Moray%20St%2C%20South%20Melbourne%20VIC%203205!5e0!3m2!1sen!2sau!4v1746160838419!5m2!1sen!2sau'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={false}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='absolute inset-0 grayscale-[20%] contrast-125 transition-all duration-700 hover:grayscale-0'
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
