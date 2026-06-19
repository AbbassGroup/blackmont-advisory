'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Mail, Phone, Linkedin, Star } from 'lucide-react';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

const agents = [
  {
    name: 'Freddie Wong',
    title: 'Business Broker',
    image: '/Freddie Wong.webp',
    location: 'Victoria',
    specialization: 'SME Businesses',
    bio: `I'm a Business Broker who is proficient in business valuation, analysing financial statements, market trends, and industry benchmarks to estimate a business's fair market value. I focus on maintaining strict confidentiality to protect sensitive business details and have experience in marketing businesses strategically to obtain the best ultimate selling price.`,
    tags: ['Financial Analysis & Valuations', 'SME Business Sales'],
    email: 'freddie.wong@blackmontadvisory.com',
    phone: '0452 655 608',
    linkedin: 'https://www.linkedin.com/in/freddie-wong-3926b388/',
  },
  {
    name: 'Igor Vasiliev',
    title: 'Business Broker',
    image: '/igor.webp',
    location: 'Sydney',
    specialization: 'SME Businesses',
    bio: `I'm a Business Broker with over 25 years of experience leading and advising businesses across local and international markets. With a strong background in strategy, finance, and investment analysis, I help sellers position their business for the best possible outcome. My focus is on finding the right buyer, protecting your legacy, and guiding you through a smooth, successful sale.`,
    tags: ['Financial Analysis & Valuations', 'International Network'],
    email: 'igor.vasiliev@blackmontadvisory.com',
    phone: '0424 407 612',
    linkedin: 'https://www.linkedin.com/in/igorvasilievgia/',
  },
  {
    name: 'Fiona Johns',
    title: 'Business Broker',
    image: '/fiona.jpg',
    location: 'Queensland',
    specialization: 'Service Based & SME Businesses',
    bio: `I bring more than 30 years of experience, giving me a practical and client-focused approach to business sales. Having run a business, I understand how SMEs operate, how buyers think, and how to guide people through major financial decisions. I help owners prepare for the market, attract quality buyers, and manage negotiations with professionalism, clarity, and genuine care.`,
    tags: ['Negotiation', 'Stakeholder Management'],
    email: 'fiona@blackmontadvisory.com',
    phone: '0412223179',
    linkedin: 'https://www.linkedin.com/in/fiona-johns-161a44268/',
  },

  {
    name: 'Asif Ahammed',
    title: 'Business Broker',
    image: '/Asif.jpg',
    location: 'Victoria & Tasmania',
    specialization: 'Hospitality & Service Based Businesses',
    bio: `I'm a results-focused Business Broker with hands-on experience in business sales across various sectors. My strengths lie in understanding both the financial and emotional aspects of business transitions, ensuring a smooth and rewarding experience for all parties involved. With deep knowledge of Victoria and Tasmania markets, I help connect serious buyers with the right opportunities.`,
    tags: ['International Network', 'SME Business Sales'],
    email: 'asif.ahammed@blackmontadvisory.com',
    phone: '0451 918 152',
    linkedin: 'https://www.linkedin.com/in/asif-a-61412b1a1',
  },

  {
    name: 'Hicham Nahas',
    title: 'Business Broker',
    image: '/IMG_3531.webp',
    location: 'Melbourne',
    specialization: 'SME Businesses',
    bio: `I'm a Business Broker who has had a successful track record of selling businesses in the SME space. I have a strong financial and valuation background and focus on providing exceptional customer service.`,
    tags: ['Financial Analysis', 'SME Business Sales'],
    email: 'hicham.nahas@blackmontadvisory.com',
    phone: '0423 241 225',
    linkedin: 'https://www.linkedin.com/in/hicham-nahas-9a1bb5202/',
  },
];

function AgentCard({
  agent,
  index,
}: {
  agent: (typeof agents)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const BIO_LIMIT = 110;
  const isLong = agent.bio.length > BIO_LIMIT;
  const displayBio =
    expanded || !isLong ? agent.bio : agent.bio.slice(0, BIO_LIMIT).trimEnd();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className='group bg-card overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col'
    >
      {/* Photo */}
      <div className='relative h-72 w-full bg-muted overflow-hidden'>
        <Image
          src={agent.image}
          alt={agent.name}
          fill
          className='object-contain group-hover:scale-105 transition-transform duration-500'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />
        {/* Name overlay on image */}
        <div className='absolute bottom-0 left-0 right-0 p-5'>
          <h3 className='text-xl font-bold text-white drop-shadow-md'>
            {agent.name}
          </h3>
          <p className='text-accent font-semibold text-sm'>{agent.title}</p>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-6'>
        <div className='flex flex-col items-start gap-1.5 text-muted-foreground/60 text-sm mb-4'>
          <div className='flex items-center gap-1.5'>
            <MapPin className='w-4 h-4 shrink-0 text-accent' />
            <span className='font-medium text-muted-foreground'>
              {agent.location}
            </span>
          </div>
          {/* <span className='mx-1 text-gray-300'>•</span> */}
          <div className='flex items-center gap-1.5'>
            <Star className='w-3.5 h-3.5 shrink-0 text-accent' />
            <span className='font-medium text-muted-foreground truncate'>
              {agent.specialization}
            </span>
          </div>
        </div>

        <p className='text-muted-foreground text-sm leading-relaxed mb-5'>
          {displayBio}
          {isLong && !expanded && (
            <>
              {'… '}
              <button
                onClick={() => setExpanded(true)}
                className='text-accent font-semibold hover:underline whitespace-nowrap cursor-pointer'
              >
                Show more
              </button>
            </>
          )}
          {isLong && expanded && (
            <>
              {' '}
              <button
                onClick={() => setExpanded(false)}
                className='text-accent font-semibold hover:underline whitespace-nowrap cursor-pointer'
              >
                Show less
              </button>
            </>
          )}
        </p>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {agent.tags.map((tag, i) => (
            <span
              key={i}
              className='bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/25'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Contact buttons */}
        <div className='flex gap-2 pt-4 border-t border-border mt-auto'>
          <a
            href={`tel:${agent.phone.replace(/\s/g, '')}`}
            aria-label={`Call ${agent.name}`}
            className='flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-[#28A745] hover:text-white hover:border-[#28A745] transition-all duration-200 text-sm font-medium'
          >
            <Phone className='w-4 h-4' />
            <span>Call</span>
          </a>
          <a
            href={`mailto:${agent.email}`}
            aria-label={`Email ${agent.name}`}
            className='flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-accent hover:text-primary hover:border-accent transition-all duration-200 text-sm font-medium'
          >
            <Mail className='w-4 h-4' />
            <span>Email</span>
          </a>
          {agent.linkedin && (
            <a
              href={agent.linkedin}
              target='_blank'
              rel='noreferrer'
              aria-label={`${agent.name} LinkedIn`}
              className='flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-[#0077B5] hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-200 text-sm font-medium'
            >
              <Linkedin className='w-4 h-4' />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentsPage() {
  return (
    <main className='min-h-screen bg-background pb-24'>
      {/* Hero Banner */}
      <div className='relative pt-[80px] min-h-[500px] lg:min-h-[580px] bg-secondary text-center overflow-hidden flex items-center justify-center'>
        <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80")] bg-cover bg-center' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='relative z-10 max-w-[1000px] mx-auto px-6 mt-10'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight'
          >
            Meet Our Agents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white/85 text-xl md:text-2xl font-light max-w-[600px] mx-auto'
          >
            Expert business brokers dedicated to your success
          </motion.p>
        </div>

        <ScrollIndicator />
      </div>

      {/* Agents Grid */}
      <div className='max-w-[1260px] mx-auto px-4 lg:px-8 py-20'>
        <div className='text-center mb-14'>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-bold text-secondary mb-3'
          >
            Our Expert Brokers
          </motion.h2>
          <p className='text-muted-foreground text-lg max-w-[560px] mx-auto'>
            A dedicated team bringing decades of combined experience to every
            deal.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {agents.map((agent, index) => (
            <AgentCard key={agent.name} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
