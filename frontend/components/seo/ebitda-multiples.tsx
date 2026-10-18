import { EBITDA_BRACKETS } from '@/lib/data/valuation-brackets';

/** Shared presentation of the existing EBITDA brackets, in ascending order. */
export function EbitdaMultiples() {
  const brackets = [...EBITDA_BRACKETS].reverse();
  const midpoint = Math.ceil(brackets.length / 2);
  const groups = [brackets.slice(0, midpoint), brackets.slice(midpoint)];

  return (
    <div className='mt-8 grid gap-8 min-[681px]:mt-10 min-[931px]:grid-cols-2 min-[931px]:gap-12 min-[1121px]:gap-16'>
      {groups.map((group, index) => (
        <table key={group[0].label} className='w-full table-fixed border-collapse text-left'>
          <caption className='sr-only'>
            Typical business sale multiples by annual EBITDA, part {index + 1} of 2,
            from {group[0].label} to {group[group.length - 1].label}.
          </caption>
          <thead className='border-y border-advisory-rule text-sm text-midnight'>
            <tr>
              <th scope='col' className='w-1/2 py-4 pr-3 font-semibold'>
                Annual EBITDA
              </th>
              <th scope='col' className='py-4 pl-3 text-right font-semibold'>
                Typical multiple
              </th>
            </tr>
          </thead>
          <tbody>
            {group.map(({ label, min, max }) => (
              <tr key={label} className='border-b border-advisory-rule'>
                <th
                  scope='row'
                  className='py-5 pr-3 text-[15px] leading-relaxed font-medium text-midnight min-[681px]:text-[17px]'
                >
                  {label}
                </th>
                <td className='py-5 pl-3 text-right font-advisory-heading text-[19px] leading-relaxed font-bold whitespace-nowrap text-midnight min-[681px]:text-[23px]'>
                  {min}× – {max}×
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
