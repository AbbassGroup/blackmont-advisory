import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/landing-page';
import { landingMetadata } from '@/components/landing/metadata';

export const metadata: Metadata = landingMetadata;

export default function HomePage() {
  return <LandingPage />;
}
