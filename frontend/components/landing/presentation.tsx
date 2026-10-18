import type { ComponentProps, ReactNode } from 'react';
import { LandingLink } from './landing-link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Shared 1340px content shell with 19px / 36px / 52px gutters. */
export function LandingContainer({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'mx-auto w-[calc(100%_-_38px)] max-w-advisory min-[681px]:w-[calc(100%_-_72px)] min-[1121px]:w-[calc(100%_-_104px)]',
        className,
      )}
      {...props}
    />
  );
}

type LandingSectionIntroProps = {
  headingId: string;
  heading: ReactNode;
  description?: ReactNode;
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
};

export function LandingSectionIntro({
  headingId,
  heading,
  description,
  className,
  headingClassName,
  descriptionClassName,
}: LandingSectionIntroProps) {
  return (
    <div
      className={cn(
        'mb-[30px] grid items-start gap-[22px] min-[681px]:mb-[35px]',
        description &&
          'min-[681px]:grid-cols-[1.05fr_0.78fr] min-[681px]:gap-[35px] min-[931px]:gap-[60px]',
        className,
      )}
    >
      <h2
        data-landing-reveal
        id={headingId}
        className={cn(
          'm-0 font-advisory-heading text-[clamp(29px,6.5vw,38px)] leading-[1.25] font-bold tracking-normal text-midnight min-[681px]:text-[clamp(32px,3.4vw,43px)]',
          description ? 'max-w-[600px]' : 'max-w-none',
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            'm-0 max-w-[505px] text-base leading-[1.75] min-[681px]:mt-3 min-[681px]:ml-auto min-[681px]:text-[17px]',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export const landingButtonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-none border font-advisory-body text-center text-sm leading-[1.45] font-bold tracking-normal no-underline transition-colors duration-200 ease-out focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'min-h-[51px] px-[23px] py-[13px]',
        compact: 'h-auto min-h-10 px-5 py-2',
      },
      variant: {
        midnight: 'border-midnight bg-midnight text-white hover:bg-deep-navy',
        gilt: 'border-gilt bg-gilt text-midnight hover:bg-white',
        outline:
          'border-midnight bg-transparent text-midnight hover:bg-midnight hover:text-white focus-visible:bg-midnight focus-visible:text-white',
      },
    },
    defaultVariants: {
      variant: 'midnight',
      size: 'default',
    },
  },
);

type LandingButtonProps = ComponentProps<'button'> &
  VariantProps<typeof landingButtonVariants>;

export function LandingButton({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: LandingButtonProps) {
  return (
    <button
      type={type}
      className={cn(landingButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type LandingButtonLinkProps = ComponentProps<typeof LandingLink> &
  VariantProps<typeof landingButtonVariants>;

export function LandingButtonLink({
  className,
  variant,
  size,
  ...props
}: LandingButtonLinkProps) {
  return (
    <LandingLink
      className={cn(landingButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type LandingTextLinkProps = ComponentProps<typeof LandingLink> & {
  tone?: 'midnight' | 'gilt' | 'white';
};

export function LandingTextLink({
  className,
  tone = 'midnight',
  ...props
}: LandingTextLinkProps) {
  return (
    <LandingLink
      className={cn(
        'font-advisory-body text-[15px] font-bold tracking-normal underline decoration-1 underline-offset-[5px] transition-colors duration-200 ease-out hover:text-gilt hover:decoration-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gilt motion-reduce:transition-none',
        {
          'text-midnight': tone === 'midnight',
          'text-gilt': tone === 'gilt',
          'text-white': tone === 'white',
        },
        className,
      )}
      {...props}
    />
  );
}
