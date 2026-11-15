import {
  BadgeCheck,
  Globe,
  Landmark,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import { LandingContainer } from './presentation';

/** Licence, memberships, office and reach: a thin trust strip under a banner. */
const CREDENTIALS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: BadgeCheck, label: 'Licensed', value: 'Business agent BLA 092153L' },
  { icon: Landmark, label: 'Member', value: 'AIBB and REIV' },
  { icon: MapPin, label: 'Based in', value: 'Toorak, Melbourne' },
  { icon: Globe, label: 'Clients', value: 'Across Australia' },
];

export function CredentialsBar() {
  return (
    <section aria-label='Credentials' className='border-b border-advisory-rule bg-white'>
      <LandingContainer>
        {/* gap-px over a rule-coloured background draws hairline dividers between cells only. */}
        <dl className='m-0 grid grid-cols-1 gap-px bg-advisory-rule min-[541px]:grid-cols-2 min-[1121px]:grid-cols-4'>
          {CREDENTIALS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className='flex items-center gap-4 bg-white py-5 min-[541px]:px-5 min-[1121px]:py-7'
            >
              <span className='flex size-11 shrink-0 items-center justify-center rounded-full bg-canvas text-gilt'>
                <Icon size={20} strokeWidth={1.75} aria-hidden='true' />
              </span>
              <div className='min-w-0'>
                <dt className='text-xs font-semibold tracking-[0.08em] text-ink uppercase'>{label}</dt>
                <dd className='m-0 font-advisory-heading text-[17px] font-bold text-midnight'>{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </LandingContainer>
    </section>
  );
}
