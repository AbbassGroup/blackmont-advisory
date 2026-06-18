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
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { PageBanner } from '@/components/global/page-banner';
import { Container, Eyebrow, Reveal } from '@/components/landing/primitives';
import { ReviewsCarousel } from '@/components/global/reviews-carousel';

// ─── Data ────────────────────────────────────────────────────────────────────
// ─── Data ────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://blackmontadvisory.com';

const ourStory = `Blackmont Advisory was founded to raise the standard in an industry where too many brokers focus on volume over value, listing dozens of businesses with little intention or ability to sell them. We do things differently. We're a boutique firm that works with a select number of clients at a time, ensuring every business we represent receives the attention, care, and strategic focus it deserves.

Our approach is grounded in five core values: trust, earned through transparency; expertise, developed through real market experience; excellence, delivered in every detail; commitment, to seeing each deal through with dedication; and convenience, by making the process as smooth and stress-free as possible.`;

const stats = [
  { num: '30+', label: 'Years Experience' },
  { num: '500+', label: 'Businesses Sold' },
  { num: '98%', label: 'Client Satisfaction' },
];

const values: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Shield,
    title: 'Trust',
    desc: 'Earned through transparency and honest communication.',
  },
  {
    icon: Trophy,
    title: 'Excellence',
    desc: 'Delivered in every detail of the process.',
  },
  {
    icon: Handshake,
    title: 'Commitment',
    desc: 'To seeing each deal through with dedication.',
  },
  {
    icon: Clock,
    title: 'Convenience',
    desc: 'Making the process as smooth and stress-free as possible.',
  },
  {
    icon: Star,
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
  image: '/IMG_3392.webp',
  bio: [
    `Sadeq Abbass is a licensed business broker, finance broker, and real estate agent with a rare mix of frontline experience and strategic thinking. As a strategic deal maker and business and wealth builder, Sadeq has bought and sold businesses of his own, giving him a firsthand understanding of what's at stake when entrepreneurs decide to exit.`,
    `That frustration became fuel. Determined to raise the bar, Sadeq founded Blackmont Advisory — a boutique firm designed to do what traditional agencies can't or won't. Rather than chasing listings, he focuses on results, working with a select group of clients to deliver tailored, high-impact outcomes.`,
  ],
  contact: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sadeqabbass/',
      icon: Linkedin,
    },
    { label: 'Email', href: 'mailto:sadeq@abbass.group', icon: Mail },
    { label: 'Call', href: 'tel:0391031317', icon: Phone },
  ],
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${SITE_URL}/about`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blackmont Advisory',
    url: SITE_URL,
    description:
      'A boutique business brokerage built on trust, expertise, and results.',
    founder: {
      '@type': 'Person',
      name: director.name,
      jobTitle: director.title,
    },
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <PageBanner
        title={
          <>
            About <span className='font-light text-accent'>Us</span>
          </>
        }
        description='A boutique business brokerage built on trust, expertise, and results.'
        image='/about-us.webp'
      />

      {/* ── Our Story ──────────────────────────────────── */}
      <section className='bg-background py-20 lg:py-28'>
        <Container className='grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
          <Reveal>
            <Eyebrow className='mb-5'>Who We Are</Eyebrow>
            <h2 className='mb-6 text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
              Our Story
            </h2>
            {ourStory.split('\n\n').map((p, i) => (
              <p
                key={i}
                className='mb-5 text-[1.06rem] leading-[1.9] text-muted-foreground'
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <div className='relative aspect-4/3 overflow-hidden border border-secondary/10'>
              <Image
                src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
                alt='Our Office'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
              />
              {/* Stats overlay */}
              <div className='absolute inset-x-6 bottom-6 flex gap-3'>
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className='flex-1 border border-secondary/10 bg-background/95 p-3 text-center backdrop-blur-sm'
                  >
                    <div className='text-xl font-bold text-accent'>{s.num}</div>
                    <div className='text-[10px] font-semibold uppercase tracking-wide text-muted-foreground'>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Our Values ─────────────────────────────────── */}
      <section className='bg-secondary py-20 lg:py-28'>
        <Container>
          <Reveal className='mb-14 text-center'>
            <p className='mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent'>
              What Drives Us
            </p>
            <h2 className='mb-5 text-3xl font-bold leading-tight tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
              Our Core Values
            </h2>
            <p className='mx-auto max-w-xl text-lg font-light leading-relaxed text-parchment/60'>
              The principles that guide us in delivering exceptional service to
              every client.
            </p>
          </Reveal>

          <Reveal className='grid grid-cols-2 gap-px border border-parchment/10 bg-parchment/10 md:grid-cols-3 lg:grid-cols-5'>
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className='bg-secondary p-7 text-center transition-colors hover:bg-white/[0.03]'
              >
                <span className='mx-auto mb-5 flex h-14 w-14 items-center justify-center border-[1.5px] border-accent/30 text-accent'>
                  <Icon className='h-6 w-6' strokeWidth={1.5} />
                </span>
                <h3 className='mb-2 text-base font-bold text-parchment'>
                  {title}
                </h3>
                <p className='text-xs leading-relaxed text-parchment/55'>
                  {desc}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ── Managing Director ──────────────────────────── */}
      <section className='bg-background py-20 lg:py-28'>
        <Container className='grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
          <Reveal className='order-2 lg:order-1'>
            <div className='relative mx-auto aspect-3/4 max-w-[420px] overflow-hidden border border-secondary/10'>
              <Image
                src={director.image}
                alt={director.name}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover object-top'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent' />
              <div className='absolute bottom-6 left-6'>
                <p className='text-xl font-bold text-parchment'>
                  {director.name}
                </p>
                <p className='text-sm font-semibold uppercase tracking-[0.12em] text-accent'>
                  {director.title}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className='order-1 lg:order-2'>
            <Eyebrow className='mb-5'>Leadership</Eyebrow>
            <h2 className='mb-3 text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
              Meet Our Managing Director
            </h2>
            <p className='mb-6 text-2xl font-light text-accent'>Sadeq Abbass</p>
            {director.bio.map((p, i) => (
              <p
                key={i}
                className='mb-5 text-[1.06rem] leading-[1.9] text-muted-foreground'
              >
                {p}
              </p>
            ))}
            <div className='mt-8 flex flex-wrap gap-3'>
              {director.contact.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'LinkedIn' ? '_blank' : undefined}
                  rel={label === 'LinkedIn' ? 'noreferrer' : undefined}
                  className='flex items-center gap-2.5 border border-secondary/15 px-5 py-2.5 text-sm font-semibold text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-primary'
                >
                  <Icon className='h-4 w-4' />
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Why Choose Us ──────────────────────────────── */}
      <section className='bg-muted py-20 lg:py-28'>
        <Container>
          <Reveal className='mb-14 text-center'>
            <h2 className='text-3xl font-bold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl'>
              Why Choose Us
            </h2>
          </Reveal>
          <Reveal className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {whyUs.map((item) => (
              <div
                key={item.title}
                className='group border border-secondary/10 bg-background p-8 text-center transition-colors hover:border-accent/40'
              >
                <span className='mx-auto mb-6 flex h-16 w-16 items-center justify-center border-[1.5px] border-accent/30 text-accent transition-colors group-hover:bg-accent group-hover:text-primary'>
                  <CheckCircle className='h-7 w-7' strokeWidth={1.5} />
                </span>
                <h3 className='mb-3 text-lg font-bold tracking-tight text-secondary'>
                  {item.title}
                </h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {item.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <ReviewsCarousel className='py-20 lg:py-28' />

      {/* ── CTA ────────────────────────────────────────── */}
      <section className='bg-background pb-20 lg:pb-28'>
        <Container>
          <Reveal className='relative border-[1.5px] border-secondary bg-secondary px-6 py-16 text-center sm:px-10 lg:py-20'>
            <span
              aria-hidden
              className='absolute inset-x-10 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent'
            />
            <h2 className='mx-auto mb-4 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-parchment sm:text-4xl lg:text-5xl'>
              Ready to Take the Next Step?
            </h2>
            <p className='mx-auto mb-10 max-w-xl text-lg font-light leading-relaxed text-parchment/60'>
              Whether you&apos;re buying or selling a business, our team is here
              to guide you every step of the way.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link
                href='/contact'
                className='group inline-flex items-center gap-2 bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent-light'
              >
                Get in Touch
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
              <Link
                href='/listings'
                className='inline-flex items-center border border-accent/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-parchment transition-colors hover:bg-accent hover:text-primary'
              >
                Browse Listings
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
