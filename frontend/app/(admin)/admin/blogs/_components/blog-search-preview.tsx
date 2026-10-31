'use client';

import { CircleAlert, CircleCheck, CircleX, Search } from 'lucide-react';
import { slugify } from '@/lib/blogs';
import { cn } from '@/lib/utils';

// Google cuts by pixel width, not characters; these are the usual safe limits.
const TITLE_LIMIT = 60;
const DESCRIPTION_MIN = 120;
const DESCRIPTION_LIMIT = 160;
const MIN_WORDS = 600;

type Status = 'good' | 'warn' | 'bad';
type Check = { label: string; status: Status };

interface BlogSearchPreviewProps {
  /** The full <title>, suffix included — exactly what the page will publish. */
  pageTitle: string;
  slug: string;
  metaDescription: string;
  focusKeyword: string;
  content: string;
}

const toText = (html: string) =>
  html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

const includesPhrase = (haystack: string, phrase: string) =>
  haystack.toLowerCase().replace(/\s+/g, ' ').includes(phrase);

const truncate = (text: string, limit: number) =>
  text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;

function runChecks({ pageTitle, slug, metaDescription, focusKeyword, content }: BlogSearchPreviewProps): Check[] {
  const checks: Check[] = [];
  const description = metaDescription.trim();
  const text = toText(content);
  const words = text ? text.split(' ').length : 0;

  checks.push(
    pageTitle.length > TITLE_LIMIT
      ? { status: 'warn', label: `Title is ${pageTitle.length} characters — Google usually cuts off after about ${TITLE_LIMIT}. Use a shorter SEO title.` }
      : { status: 'good', label: `Title length is good (${pageTitle.length}/${TITLE_LIMIT}).` },
  );

  if (!description) {
    checks.push({ status: 'bad', label: 'No meta description — Google will pick its own snippet from the page.' });
  } else if (description.length < DESCRIPTION_MIN) {
    checks.push({ status: 'warn', label: `Meta description is short (${description.length}). Aim for ${DESCRIPTION_MIN}–${DESCRIPTION_LIMIT} characters.` });
  } else if (description.length > DESCRIPTION_LIMIT) {
    checks.push({ status: 'warn', label: `Meta description is ${description.length} characters — it will be cut off after about ${DESCRIPTION_LIMIT}.` });
  } else {
    checks.push({ status: 'good', label: `Meta description length is good (${description.length}).` });
  }

  checks.push(
    words >= MIN_WORDS
      ? { status: 'good', label: `Article is ${words} words.` }
      : { status: 'warn', label: `Article is ${words} words. In-depth articles (${MIN_WORDS}+) tend to rank better.` },
  );

  const keyword = focusKeyword.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!keyword) {
    checks.push({ status: 'warn', label: 'Add a focus keyword to check how well the article targets it.' });
    return checks;
  }

  const firstParagraph = text.split(' ').slice(0, 100).join(' ');
  const subheadings = [...content.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi)].map((m) => toText(m[1])).join(' ');
  const keywordSlug = slugify(keyword);

  const keywordCheck = (found: boolean, where: string, missing: Status = 'bad'): Check =>
    found
      ? { status: 'good', label: `Focus keyword appears in the ${where}.` }
      : { status: missing, label: `Focus keyword is missing from the ${where}.` };

  checks.push(
    keywordCheck(includesPhrase(pageTitle, keyword), 'title'),
    keywordCheck(includesPhrase(description, keyword), 'meta description'),
    keywordCheck(Boolean(keywordSlug) && slug.includes(keywordSlug), 'URL', 'warn'),
    keywordCheck(includesPhrase(firstParagraph, keyword), 'first 100 words', 'warn'),
    keywordCheck(includesPhrase(subheadings, keyword), 'subheadings (H2–H4)', 'warn'),
  );

  return checks;
}

const STATUS_STYLE: Record<Status, { icon: typeof CircleCheck; className: string; label: string }> = {
  good: { icon: CircleCheck, className: 'text-green-700', label: 'Passed' },
  warn: { icon: CircleAlert, className: 'text-amber-700', label: 'Improve' },
  bad: { icon: CircleX, className: 'text-red-700', label: 'Problem' },
};

/** Live Google-result preview plus on-page SEO checks for the article being edited. */
export default function BlogSearchPreview(props: BlogSearchPreviewProps) {
  const { pageTitle, slug, metaDescription } = props;
  const checks = runChecks(props);
  const passed = checks.filter((check) => check.status === 'good').length;

  return (
    <div className='flex min-w-0 flex-col gap-5'>
      <div className='min-w-0 border border-advisory-rule bg-white p-5'>
        <p className='m-0 mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-ink uppercase'>
          <Search aria-hidden='true' className='size-3.5' />How this looks in Google
        </p>
        <p className='m-0 truncate text-[13px] leading-[1.5] text-[#4d5156]'>
          blackmontadvisory.com › resources{slug ? ` › ${slug}` : ''}
        </p>
        <p className='m-0 mt-1 text-[19px] leading-[1.35] break-words text-[#1a0dab]'>{truncate(pageTitle, TITLE_LIMIT)}</p>
        <p className='m-0 mt-1 text-sm leading-[1.6] break-words text-[#4d5156]'>
          {metaDescription.trim() ? truncate(metaDescription.trim(), DESCRIPTION_LIMIT) : <span className='italic'>No meta description — Google will choose text from the page.</span>}
        </p>
      </div>

      <div className='flex min-w-0 flex-col gap-3'>
        <p className='m-0 text-sm font-medium text-midnight'>SEO checks <span className='font-normal text-ink'>— {passed} of {checks.length} passed</span></p>
        <ul className='m-0 flex list-none flex-col gap-2 p-0'>
          {checks.map((check) => {
            const { icon: Icon, className, label } = STATUS_STYLE[check.status];
            return (
              <li key={check.label} className='flex items-start gap-2 text-xs leading-[1.75] text-ink'>
                <Icon aria-hidden='true' className={cn('mt-0.5 size-4 shrink-0', className)} />
                <span><span className='sr-only'>{label}: </span>{check.label}</span>
              </li>
            );
          })}
        </ul>
        <p className='m-0 text-xs leading-[1.75] text-ink/80'>
          Guidance, not a ranking guarantee — Google may also rewrite the title or snippet.
        </p>
      </div>
    </div>
  );
}
