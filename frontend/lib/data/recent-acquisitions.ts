export type RecentAcquisition = {
  id: 'alliedHealth' | 'fencing' | 'tradeServicesManaged' | 'tradeServices' | 'transport';
  image: string;
  sector: string;
  title: string;
  location: string;
  state: 'NSW' | 'VIC';
  structure: string;
  dealSize: string;
  sde?: string;
  outcome: string;
  description: string;
};

/** Shared transaction facts for the acquisitions carousels. */
export const RECENT_ACQUISITIONS: readonly RecentAcquisition[] = [
  {
    id: 'alliedHealth',
    image: '/carousel/allied-health.webp',
    sector: 'Allied Health',
    title: 'Allied health',
    location: 'Sydney',
    state: 'NSW',
    structure: 'Fully-Managed',
    dealSize: '$475,000',
    sde: '$151k',
    outcome: 'Acquired for First Time Business Owner',
    description: 'Fully managed. Acquired for a first-time business owner.',
  },
  {
    id: 'fencing',
    image: '/carousel/fencing.webp',
    sector: 'Fencing',
    title: 'Fencing',
    location: 'Melbourne',
    state: 'VIC',
    structure: 'Owner-Operated',
    dealSize: '$445,000',
    sde: '$248k',
    outcome: 'Acquired for First Time Business Owner',
    description: 'Owner-operated. Acquired for a first-time business owner.',
  },
  {
    id: 'tradeServicesManaged',
    image: '/carousel/trade-services-managed.jpg',
    sector: 'Trade Services',
    title: 'Trade services',
    location: 'Melbourne',
    state: 'VIC',
    structure: 'Fully-Managed',
    dealSize: '$1,320,000',
    outcome: 'Buy-side advisory for an owner scaling through acquisition',
    description:
      'Fully managed. Buy-side advisory for an owner scaling through acquisition.',
  },
  {
    id: 'tradeServices',
    image: '/carousel/trade-services.webp',
    sector: 'Trade Services',
    title: 'Trade services',
    location: 'Melbourne',
    state: 'VIC',
    structure: 'Semi-Managed',
    dealSize: '$810,000',
    outcome: 'Buy-side advisory for an owner scaling through acquisition',
    description:
      'Semi-managed. Buy-side advisory for an owner growing through acquisition.',
  },
  {
    id: 'transport',
    image: '/carousel/transport.webp',
    sector: 'Transport',
    title: 'Transport',
    location: 'Melbourne',
    state: 'VIC',
    structure: 'Owner-Operated',
    dealSize: '$740,000',
    sde: '$224k',
    outcome: 'Acquired for First Time Business Owner',
    description: 'Owner-operated. Acquired for a first-time business owner.',
  },
];
