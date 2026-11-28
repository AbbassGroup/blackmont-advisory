/**
 * Real Blackmont case studies (Resources → Case Studies) grouped by the
 * /selling-a/<industry> page they belong to. Shown as "Recent deals in this
 * sector" on the industry page, which also gives each case study a relevant
 * internal link beyond the case-studies hub.
 *
 * Only add a case study here for a deal that genuinely matches the sector.
 */
export type IndustryCaseStudy = { slug: string; title: string; summary: string };

export const INDUSTRY_CASE_STUDIES: Record<string, IndustryCaseStudy[]> = {
  'allied-health-practice': [
    {
      slug: 'allied-health-practice-acquisition-sydney',
      title: 'Allied health practice acquired in Sydney',
      summary: 'How we guided a first-time buyer through acquiring an established Sydney allied health practice for $475,000.',
    },
  ],
  'trades-business': [
    {
      slug: 'trade-services-acquisition-melbourne',
      title: '$1.32M trade services acquisition, Melbourne',
      summary: 'Buy-side advisory on a $1.32M Melbourne trade services acquisition, helping an owner scale through a bolt-on deal.',
    },
    {
      slug: 'trade-services-acquisition-melbourne-810k',
      title: '$810k trade services acquisition, Melbourne',
      summary: 'How a Melbourne owner grew through acquisition, buying an $810,000 trade services business.',
    },
    {
      slug: 'fencing-business-acquisition-melbourne',
      title: 'Fencing business acquired in Melbourne',
      summary: 'A first-time owner acquired a Melbourne fencing business for $445,000 on strong earnings.',
    },
  ],
  'transport-logistics-business': [
    {
      slug: 'transport-business-acquisition-melbourne',
      title: 'Transport business acquired in Melbourne',
      summary: 'A first-time owner bought a Melbourne transport business for $740,000: the search, finance and handover.',
    },
  ],
};
