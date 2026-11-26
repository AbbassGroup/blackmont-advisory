
export type Broker = {
  name: string;
  email: string;
  title: string;
  /** Public path (under the `/businessbrokers` basePath) to the broker photo. */
  image: string;
  phone: string;
  mobile: string;
  website: string;
  /** Welcome message paragraphs shown on the memorandum welcome page. */
  welcome: string[];
};

const OFFICE_PHONE = '(03) 9103 1317';
const WEBSITE = 'www.blackmontadvisory.com';

export const BROKERS: Broker[] = [
  
  {
    name: 'Sadeq Abbass',
    email: 'sadeq@blackmontadvisory.com',
    title: 'M&A Adviser',
    image: '/abbass.jpeg',
    phone: OFFICE_PHONE,
    mobile: '0433 525 731',
    website: WEBSITE,
    welcome: [
      'With extensive experience as a Principal M&A Adviser and deal structuring, Sadeq helps clients identify, evaluate and acquire businesses that align with their strategic objectives. He manages the deal process end-to-end with insight, transparency and access to a trusted network of professionals.',
      'Sadeq is recognised for his business deal advisory and has successfully facilitated numerous transactions across Australia and UAE.',
    ],
  },
];

/** Find a broker by email (case-insensitive). */
export function getBrokerByEmail(email?: string | null): Broker | undefined {
  if (!email) return undefined;
  const target = email.toLowerCase().trim();
  return BROKERS.find((b) => b.email.toLowerCase() === target);
}

/** A neutral fallback used when no broker matches the selected email. */
export const FALLBACK_BROKER: Broker = {
  name: 'Blackmont Advisory',
  email: 'info@blackmontadvisory.com',
  title: 'Business Broker',
  image: '/mark.webp',
  phone: OFFICE_PHONE,
  mobile: '',
  website: WEBSITE,
  welcome: [
    'Welcome, and thank you for your interest. Our team is here to guide you through every step of the acquisition process with clarity, discretion and genuine commitment to your goals.',
  ],
};

/** Resolve a broker for rendering, always returning something usable. */
export function resolveBroker(email?: string | null): Broker {
  return getBrokerByEmail(email) ?? FALLBACK_BROKER;
}
