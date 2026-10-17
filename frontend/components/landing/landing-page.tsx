import { JsonLd } from '@/components/seo/json-ld';
import { About } from './about';
import { Buying } from './buying';
import { Contact } from './contact';
import { DualPath } from './dual-path';
import { Hero } from './hero';
import { landingStructuredData } from './metadata';
import { Network } from './network';
import { Selling } from './selling';
import { Transactions } from './transactions';
import { LandingScrollMotion } from './scroll-motion';

export function LandingPage() {
  return (
    <>
      <JsonLd data={landingStructuredData} />
      <Hero />
      <LandingScrollMotion>
        <DualPath />
        <Selling />
        <Transactions />
        <About />
        <Buying />
        <Network />
        <Contact />
      </LandingScrollMotion>
    </>
  );
}
