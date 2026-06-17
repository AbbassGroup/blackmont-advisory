'use client';

import Title from '@/components/global/title';
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { BookDiscussionButton } from '../../partnership/_components/book-discussion-button';

const agents = [
  {
    name: 'Freddie Wong',
    title: 'Business Broker',
    image: '/businessbrokers/Freddie Wong.webp',
    location: 'Victoria',
    email: 'freddie.wong@abbass.group',
    phone: '0452655608',
    linkedin: 'https://www.linkedin.com/in/freddie-wong-3926b388/',
  },
  {
    name: 'Igor Vasiliev',
    title: 'Business Broker',
    image: '/businessbrokers/igor.webp',
    location: 'Sydney',
    email: 'igor.vasiliev@abbass.group',
    phone: '0424407612',
    linkedin: 'https://www.linkedin.com/in/igorvasilievgia/',
  },
  {
    name: 'Fiona Johns',
    title: 'Business Broker',
    image: '/businessbrokers/fiona.jpg',
    location: 'Queensland',
    email: 'fiona@abbass.group',
    phone: '0412223179',
    linkedin: 'https://www.linkedin.com/in/fiona-johns-161a44268/',
  },

  {
    name: 'Asif Ahammed',
    title: 'Business Broker',
    image: '/businessbrokers/Asif.jpg',
    location: 'Victoria & Tasmania',
    email: 'asif.ahammed@abbass.group',
    phone: '0451918152',
    linkedin: 'https://www.linkedin.com/in/asif-a-61412b1a1',
  },

  {
    name: 'Hicham Nahas',
    title: 'Business Broker',
    image: '/businessbrokers/IMG_3531.webp',
    location: 'Melbourne',
    email: 'hicham.nahas@abbass.group',
    phone: '0423241225',
    linkedin: 'https://www.linkedin.com/in/hicham-nahas-9a1bb5202/',
  },
];

export function AgentList() {
  return (
    <section className='py-20 lg:py-28 bg-white border-t border-gray-100'>
      <div className='max-w-[1400px] mx-auto px-6'>
        <div className='text-center mb-16 max-w-3xl mx-auto'>
          <Title>Meet Our Agents</Title>
          <div className='w-20 h-1.5 bg-linear-to-r from-brand-primary to-brand-primary-dark rounded-full mx-auto mt-4 mb-6' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
          {agents.map((agent, index) => (
            <div key={index}>
              <div className='bg-brand-offwhite rounded-3xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(86,193,188,0.15)] transition-all duration-300 hover:-translate-y-2 h-full flex flex-col border border-gray-100'>
                {/* Agent Image */}
                <div className='w-full aspect-[4/5] relative bg-gray-200 overflow-hidden'>
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className='object-cover'
                    unoptimized
                  />
                </div>

                {/* Agent Details */}
                <div className='p-6 text-center flex-1 flex flex-col'>
                  <h3 className='text-xl font-bold text-brand-black mb-1'>
                    {agent.name}
                  </h3>
                  <p className='text-sm text-brand-primary font-semibold mb-3'>
                    {agent.title}
                  </p>

                  <div className='flex items-center justify-center gap-1.5 text-gray-500 text-sm mb-6'>
                    <MapPin className='w-4 h-4 text-brand-primary' />
                    <span>{agent.location}</span>
                  </div>

                  <div className='mt-auto flex items-center justify-center gap-2'>
                    <a
                      href={`tel:${agent.phone}`}
                      className='w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors'
                    >
                      <Phone className='w-4 h-4' />
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className='w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors'
                    >
                      <Mail className='w-4 h-4' />
                    </a>
                    {agent.linkedin && (
                      <a
                        href={agent.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors'
                      >
                        <Linkedin className='w-4 h-4' />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <BookDiscussionButton />
      </div>
    </section>
  );
}
