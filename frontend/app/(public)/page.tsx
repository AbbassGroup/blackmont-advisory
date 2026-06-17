import { Hero } from '@/components/global/hero';
import { FeaturedListings } from '@/components/global/featured-listings';
import { BusinessCategories } from '@/components/global/business-categories';
import { StatsSection } from '@/components/global/stats-section';
import { TestimonialsSection } from '@/components/global/testimonials-section';
import { InTheMediaSection } from '@/components/global/in-the-media';
import { TrustedBrands } from '@/components/global/trusted-brands';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <BusinessCategories />
      <StatsSection />
      <TestimonialsSection />
      <InTheMediaSection />
      <TrustedBrands />
    </>
  );
}
