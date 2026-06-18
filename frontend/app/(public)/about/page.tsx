'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Trophy,
  Handshake,
  Clock,
  Star,
  CheckCircle,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewsCarousel } from '@/components/global/reviews-carousel';
import Title from '@/components/global/title';

// ─── Data ────────────────────────────────────────────────────────────────────

const ourStory = `ABBASS Business Brokers was founded to raise the standard in an industry where too many brokers focus on volume over value, listing dozens of businesses with little intention or ability to sell them. We do things differently. We're a boutique firm that works with a select number of clients at a time, ensuring every business we represent receives the attention, care, and strategic focus it deserves.

Our approach is grounded in five core values: trust, earned through transparency; expertise, developed through real market experience; excellence, delivered in every detail; commitment, to seeing each deal through with dedication; and convenience, by making the process as smooth and stress-free as possible.`;

const values = [
  {
    icon: <Shield className='w-7 h-7' />,
    title: 'Trust',
    desc: 'Earned through transparency and honest communication.',
  },
  {
    icon: <Trophy className='w-7 h-7' />,
    title: 'Excellence',
    desc: 'Delivered in every detail of the process.',
  },
  {
    icon: <Handshake className='w-7 h-7' />,
    title: 'Commitment',
    desc: 'To seeing each deal through with dedication.',
  },
  {
    icon: <Clock className='w-7 h-7' />,
    title: 'Convenience',
    desc: 'Making the process as smooth and stress-free as possible.',
  },
  {
    icon: <Star className='w-7 h-7' />,
    title: 'Expertise',
    desc: 'Developed through real market experience.',
  },
];

const whyUs = [
  {
    title: 'Proven Track Record',
    description:
      'Our successful track record is backed by our no sale no fee business model.',
  },
  {
    title: 'Comprehensive Network',
    description:
      'Access to a vast network of qualified buyers and industry connections.',
  },
  {
    title: 'Confidential Process',
    description:
      'Strict confidentiality measures to protect your business interests.',
  },
  {
    title: 'Market Knowledge',
    description:
      'Deep understanding of local and national market trends and valuations.',
  },
];

const director = {
  name: 'Sadeq Abbass',
  title: 'Managing Director',
  image: '/businessbrokers/IMG_3392.webp',
  bio: [
    `Sadeq Abbass is a licensed business broker, finance broker, and real estate agent with a rare mix of frontline experience and strategic thinking. As a strategic deal maker and business and wealth builder, Sadeq has bought and sold businesses of his own, giving him a firsthand understanding of what's at stake when entrepreneurs decide to exit.`,
    `That frustration became fuel. Determined to raise the bar, Sadeq founded ABBASS Business Brokers — a boutique firm designed to do what traditional agencies can't or won't. Rather than chasing listings, he focuses on results, working with a select group of clients to deliver tailored, high-impact outcomes.`,
  ],
  contact: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sadeqabbass/',
      icon: <Linkedin className='w-4 h-4' />,
    },
    {
      label: 'Email',
      href: 'mailto:sadeq@abbass.group',
      icon: <Mail className='w-4 h-4' />,
    },
    {
      label: 'Call',
      href: 'tel:0391031317',
      icon: <Phone className='w-4 h-4' />,
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className='inline-block text-brand-primary font-semibold text-xs uppercase tracking-widest mb-3'>
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* ── Hero ─────────────────────────────────────── */}
      <div className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] bg-brand-black text-center overflow-hidden flex items-center justify-center'>
        <div className='absolute inset-0 bg-[url("/businessbrokers/about-us.webp")] bg-cover bg-center' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 max-w-[900px] mx-auto px-6'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow'
          >
            A boutique business brokerage built on trust, expertise, and
            results.
          </motion.p>
        </div>
      </div>

      {/* ── Our Story ──────────────────────────────────── */}
      <section className='max-w-[1260px] mx-auto px-4 lg:px-8 py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionBadge>Who We Are</SectionBadge>
            <Title>Our Story</Title>
            <div className='w-16 h-1 bg-brand-primary rounded-full mb-8' />
            {ourStory.split('\n\n').map((p, i) => (
              <p
                key={i}
                className='text-gray-500 text-[1.06rem] leading-[1.9] mb-5'
              >
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div className='relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/60 aspect-4/3'>
              <Image
                src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
                alt='Our Office'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
              />
              {/* Stats overlay */}
              <div className='absolute bottom-6 left-6 right-6 flex gap-3'>
                {[
                  { num: '30+', label: 'Years Experience' },
                  { num: '500+', label: 'Businesses Sold' },
                  { num: '98%', label: 'Client Satisfaction' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className='flex-1 bg-white/95 backdrop-blur-sm rounded-2xl p-3 text-center shadow-lg'
                  >
                    <div className='text-xl font-bold text-brand-primary'>
                      {s.num}
                    </div>
                    <div className='text-[10px] font-semibold text-gray-500 uppercase tracking-wide'>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Values ─────────────────────────────────── */}
      <section className='bg-brand-black py-24'>
        <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
          <div className='text-center mb-16'>
            <SectionBadge>What Drives Us</SectionBadge>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Our Core Values
            </h2>
            <p className='text-white/60 text-lg max-w-[560px] mx-auto'>
              The principles that guide us in delivering exceptional service to
              every client.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className='group bg-white/8 hover:bg-white/15 border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1'
              >
                <div className='w-14 h-14 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mx-auto mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300'>
                  {v.icon}
                </div>
                <h3 className='text-white font-bold text-base mb-2'>
                  {v.title}
                </h3>
                <p className='text-white/55 text-xs leading-relaxed'>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Managing Director ──────────────────────────── */}
      <section className='max-w-[1260px] mx-auto px-6 py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='relative order-2 lg:order-1'
          >
            <div className='relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/60 aspect-3/4 max-w-[420px] mx-auto'>
              <Image
                src={director.image}
                alt={director.name}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover object-top'
              />
              <div className='absolute inset-0 bg-linear-to-t from-[#1c2434]/80 via-transparent to-transparent' />
              <div className='absolute bottom-6 left-6'>
                <p className='text-white font-bold text-xl'>{director.name}</p>
                <p className='text-brand-primary font-semibold'>
                  {director.title}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='order-1 lg:order-2'
          >
            <Title>Meet Our Managing Director</Title>

            <div className='w-16 h-1 bg-brand-primary rounded-full mb-4' />
            <p className='text-brand-primary font-semibold text-3xl mb-6'>
              Sadeq Abbass
            </p>
            {director.bio.map((p, i) => (
              <p
                key={i}
                className='text-gray-500 text-[1.06rem] leading-[1.9] mb-5'
              >
                {p}
              </p>
            ))}
            <div className='flex flex-wrap gap-3 mt-8'>
              {director.contact.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={c.label === 'LinkedIn' ? 'noreferrer' : undefined}
                  className='flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-200 text-sm font-semibold'
                >
                  {c.icon}
                  {c.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────────────────────── */}
      <section className='bg-brand-offwhite py-24'>
        <div className='max-w-[1260px] mx-auto px-4 lg:px-8'>
          <div className='text-center mb-16'>
            <Title>Why Choose Us</Title>
            <div className='w-16 h-1 bg-brand-primary rounded-full mx-auto' />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center'
              >
                <div className='w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-primary transition-colors duration-300'>
                  <CheckCircle className='w-7 h-7 text-brand-primary group-hover:text-white transition-colors duration-300' />
                </div>
                <h3 className='text-lg font-bold text-brand-primary-dark mb-3'>
                  {item.title}
                </h3>
                <p className='text-gray-500 text-sm leading-relaxed'>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <ReviewsCarousel className='py-24' />

      {/* ── CTA ────────────────────────────────────────── */}
      <section className='bg-brand-primary py-20'>
        <div className='max-w-[800px] mx-auto px-6 text-center'>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-bold text-white mb-4'
          >
            Ready to Take the Next Step?
          </motion.h2>
          <p className='text-white/70 text-lg mb-10'>
            Whether you&apos;re buying or selling a business, our team is here
            to guide you every step of the way.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <Button
              asChild
              className='bg-brand-black hover:bg-brand-primary text-white px-8 py-6 text-base rounded-full shadow-lg shadow-brand-primary/30 font-semibold'
            >
              <Link href='/contact'>Get in Touch</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              className='border-white/30 text-brand-black hover:bg-white/10 px-8 py-6 text-base rounded-full font-semibold'
            >
              <Link href='/listings'>Browse Listings</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
