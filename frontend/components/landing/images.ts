import businessMeeting from '@/public/buy-a-business.webp';
import privateDiscussion from '@/public/business_consulting.webp';
import businessDocuments from '@/public/landing/selling-advisory-work.png';
import personalAdvice from '@/public/landing/two-business-partners-working-office.webp';
import lookingToBuy from '@/public/landing/looking-to-buy-business.jpeg';
import networkBuildings from '@/public/abbass.avif';
import alliedHealth from '@/public/carousel/allied-health.webp';
import fencing from '@/public/carousel/fencing.webp';
import tradeServices from '@/public/carousel/trade-services.webp';
import tradeServicesManaged from '@/public/carousel/trade-services-managed.jpg';
import transport from '@/public/carousel/transport.webp';

/**
 * Illustrative imagery from the project, including a generated companion photo.
 * Static imports let next/image infer each image's intrinsic dimensions.
 */
export const landingImages = {
  hero: {
    src: businessMeeting,
    alt: 'Illustrative photograph of business professionals shaking hands during a meeting',
  },
  sellingConversation: {
    src: privateDiscussion,
    alt: 'Illustrative photograph of an advisor discussing plans with two clients',
  },
  sellingWork: {
    src: businessDocuments,
    alt: 'Illustrative photograph of an advisor reviewing financial reports with two business owners in a bright office',
  },
  alliedHealth: {
    src: alliedHealth,
    alt: 'Illustrative photograph accompanying the allied health acquisition',
  },
  fencing: {
    src: fencing,
    alt: 'Illustrative photograph of a tradesperson constructing a timber fence',
  },
  tradeServices: {
    src: tradeServices,
    alt: 'Illustrative photograph of an industrial trade services business',
  },
  tradeServicesManaged: {
    src: tradeServicesManaged,
    alt: 'Illustrative photograph of electrical maintenance work on a circuit breaker panel',
  },
  transport: {
    src: transport,
    alt: 'Illustrative photograph of a transport worker inspecting a truck at a freight depot',
  },
  about: {
    src: personalAdvice,
    alt: 'Illustrative photograph of two business partners reviewing a tablet together in an office',
  },
  lookingToBuy: {
    src: lookingToBuy,
    alt: 'Illustrative photograph of a business advisor reviewing documents with two workers in a manufacturing workshop',
  },
  network: {
    src: networkBuildings,
    alt: 'Looking up at glass office buildings against the sky',
  },
} as const;
