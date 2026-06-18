/**
 * Central broker directory — the single source of truth for the "Welcome
 * Message" section of an Information Memorandum and for the broker pickers in
 * the admin. Each broker's welcome copy mirrors their printed memorandum page.
 *
 * The IM welcome section is rendered by matching a template's `brokerEmail`
 * against `email` here. Emails are the join key everywhere, so keep them in
 * sync with the admin User accounts.
 */
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
    name: 'Tester',
    email: 'mohammadjahid0007@gmail.com',
    title: 'M&A Adviser',
    image: '/businessbrokers/abbass.jpeg',
    phone: OFFICE_PHONE,
    mobile: '0433 525 731',
    website: WEBSITE,
    welcome: [
      'With extensive experience as a Principal M&A Adviser and deal structuring, Sadeq helps clients identify, evaluate and acquire businesses that align with their strategic objectives. He manages the deal process end-to-end with insight, transparency and access to a trusted network of professionals.',
      'Sadeq is recognised for his business deal advisory and has successfully facilitated numerous transactions across Australia and UAE.',
    ],
  },
  {
    name: 'Sadeq Abbass',
    email: 'sadeq@abbass.group',
    title: 'M&A Adviser',
    image: '/businessbrokers/abbass.jpeg',
    phone: OFFICE_PHONE,
    mobile: '0433 525 731',
    website: WEBSITE,
    welcome: [
      'With extensive experience as a Principal M&A Adviser and deal structuring, Sadeq helps clients identify, evaluate and acquire businesses that align with their strategic objectives. He manages the deal process end-to-end with insight, transparency and access to a trusted network of professionals.',
      'Sadeq is recognised for his business deal advisory and has successfully facilitated numerous transactions across Australia and UAE.',
    ],
  },
  {
    name: 'Asif Ahammed',
    email: 'asif.ahammed@abbass.group',
    title: 'Business Broker',
    image: '/businessbrokers/Asif.jpg',
    phone: OFFICE_PHONE,
    mobile: '0451 918 152',
    website: WEBSITE,
    welcome: [
      "I work with business buyers who are looking for more than just numbers, they're looking for the right fit. As a business broker with experience across a wide range of industries, I understand the risks, questions, and emotions that come with buying a business. My role is to simplify the process, offer clear and honest advice, and help you uncover high-quality opportunities that align with your goals. Whether you're a first-time buyer or a seasoned investor, I leverage my deep understanding of the Victoria and Tasmania markets to ensure you make informed, confident decisions.",
    ],
  },
  {
    name: 'Freddie Wong',
    email: 'freddie.wong@abbass.group',
    title: 'Business Broker',
    image: '/businessbrokers/Freddie Wong.webp',
    phone: OFFICE_PHONE,
    mobile: '0452 655 608',
    website: WEBSITE,
    welcome: [
      "I help business buyers cut through the noise and find the right business that makes financial and strategic sense. With a strong background in business valuation, financial analysis, and market intelligence, I guide you through the due diligence process to ensure you're not just buying a business, you're making a sound investment. My approach is built on transparency, discretion, and precision, giving you the confidence to move forward with clarity. Whether you're looking for cash flow, growth potential, or a lifestyle business, I'll help you identify and secure the opportunity that fits.",
    ],
  },
  {
    name: 'Igor Vasiliev',
    email: 'igor.vasiliev@abbass.group',
    title: 'Business Broker',
    image: '/businessbrokers/igor.webp',
    phone: OFFICE_PHONE,
    mobile: '0424 407 612',
    website: WEBSITE,
    welcome: [
      'With over 25 years of experience running and investing in businesses across Australia and overseas, I help buyers cut through the noise and identify real opportunities that align with their goals.',
      'Having led companies through growth, restructuring, and sale, I know what makes a business genuinely valuable and what warning signs to look for. My background in financial analysis and hands-on operations means I assess each deal not just on paper, but in practice.',
      "Whether you're chasing strong cash flow, strategic growth, or long-term value, I'll help you secure a business that fits, with confidence, clarity, and commercial insight.",
    ],
  },
  {
    name: 'Hicham Nahas',
    email: 'hicham.nahas@abbass.group',
    title: 'Business Broker',
    image: '/businessbrokers/IMG_3531.webp',
    phone: OFFICE_PHONE,
    mobile: '0423 241 225',
    website: WEBSITE,
    welcome: [
      "Buying a business is a big move and I'm here to help you get it right. I work closely with buyers to understand what you're really looking for, from financial performance and growth potential to lifestyle fit and future plans. I'm not just about showing you listings; I'm about helping you spot genuine value, avoid common pitfalls, and negotiate a deal that works long-term. With experience across multiple industries and a practical understanding of what makes a business tick, I'll help you feel confident every step of the way, from first inquiry to handover.",
    ],
  },
  {
    name: 'Fiona Johns',
    email: 'fiona@abbass.group',
    title: 'Business Broker',
    image: '/businessbrokers/fiona.jpg',
    phone: OFFICE_PHONE,
    mobile: '0412 223 179',
    website: WEBSITE,
    welcome: [
      'With more than three decades of experience in various industries, I bring a grounded and practical perspective to buying a business.',
      'Today, I work closely with buyers to cut through the noise, provide clear market insights, and guide them toward opportunities that match their goals, budget, and appetite for operational involvement. I help you assess financials, identify red flags and conduct due diligence and settlement with clarity and structure.',
      'My approach is professional, communicative, and detail-driven. I aim to make the purchasing process smooth, transparent, and well-managed, with advice grounded in real operational experience and a genuine commitment to your long-term success as a business owner.',
    ],
  },
  {
    name: 'Christine Lamani',
    email: 'christine.lamani@abbass.group',
    title: 'Business Broker',
    image: '/businessbrokers/IMG_3391.webp',
    phone: OFFICE_PHONE,
    mobile: '',
    website: WEBSITE,
    welcome: [
      'I partner with buyers and sellers to make every transaction clear, considered and well-supported. From the first conversation to settlement, my focus is on honest advice, sharp attention to detail, and outcomes that genuinely serve your goals.',
      "Whether you're acquiring your first business or expanding an existing portfolio, I'll help you navigate the process with confidence and clarity.",
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
  image: '/businessbrokers/mark.webp',
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
