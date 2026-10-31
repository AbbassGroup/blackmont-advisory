/** Class strings shared by the blog form and its field components. */
export const INPUT_CLASS = 'h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-50 min-[681px]:text-sm';
export const TEXTAREA_CLASS = `${INPUT_CLASS} h-auto min-h-24 resize-y py-3 leading-[1.75]`;
export const LABEL_CLASS = 'text-sm font-medium text-midnight';
export const HINT_CLASS = 'm-0 text-xs leading-[1.75] text-ink';
export const HEADING_CLASS = 'm-0 font-advisory-heading text-[23px] leading-[1.4] font-bold text-midnight';
export const SECTION_CLASS = 'flex min-w-0 flex-col gap-6 border border-advisory-rule bg-white p-5 min-[681px]:p-8';
/** Small inline text action — "Add question", "Remove", etc. */
export const TEXT_ACTION_CLASS = 'inline-flex min-h-8 w-fit cursor-pointer items-center gap-2 text-xs font-medium text-midnight underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-50';
export const REMOVE_ACTION_CLASS = TEXT_ACTION_CLASS.replace('text-midnight', 'text-red-800');
