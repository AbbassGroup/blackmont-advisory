import React from 'react';
import { Facebook, Instagram, Linkedin, Globe } from 'lucide-react';

export function AboutBlackmont() {
  const services = [
    'Business Sales',
    'Business Appraisals',
    'Business Advisory',
    'Strategic Sales Marketing',
    'Exit Strategy',
  ];

  const socialLinks = [
    {
      icon: Facebook,
      url: 'http://facebook.com/abbassbusinessbrokers',
    },
    {
      icon: Instagram,
      url: 'http://instagram.com/abbassbusinessbrokers',
    },
    {
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/abbassbusinessbrokers/',
    },
    {
      icon: Globe,
      url: 'https://www.blackmontadvisory.com',
    },
  ];

  return (
    <div className='mt-16 mb-12 bg-transparent'>
      <div className='mb-6 pb-4 border-b border-border'>
        <h2 className='text-2xl font-bold text-secondary'>
          About Blackmont Advisory
        </h2>
      </div>

      <div>
        <p className='text-foreground text-base leading-relaxed mb-6 text-justify'>
          At Blackmont Advisory, we specialise in facilitating the seamless sale
          and acquisition of businesses across Australia. With deep market
          knowledge and a personalised approach, we guide business owners and
          aspiring business owners through every step of the process, ensuring
          that transactions are smooth, efficient, and successful. Whether
          you&apos;re looking to sell your business or invest in a new
          opportunity, our team is dedicated to helping you achieve your goals
          with confidence and ease.
        </p>

        <p className='text-secondary font-medium text-base mb-4'>
          We help Business Owners with the following services:
        </p>

        <ul className='space-y-3 mb-8'>
          {services.map((service, index) => (
            <li key={index} className='flex items-start'>
              <div className='w-2 h-2 rounded-full bg-accent mt-2 mr-3 shrink-0' />
              <span className='text-foreground text-base'>{service}</span>
            </li>
          ))}
        </ul>

        <div className='flex gap-4 mt-6'>
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target='_blank'
                rel='noreferrer'
                className='w-11 h-11 rounded-full bg-secondary text-parchment flex items-center justify-center hover:bg-accent hover:text-primary hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <Icon className='w-5 h-5' />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
