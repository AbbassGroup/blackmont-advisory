import type { ComponentProps, ReactNode } from 'react';
import { LandingLink } from './landing-link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Shared 1340px content shell with 20px / 36px / 52px gutters. */
export function LandingContainer({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'lp-container',
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
        'mb-8 min-[681px]:mb-10 grid items-start gap-6',
        description &&
          'min-[681px]:grid-cols-[1.05fr_0.78fr] min-[681px]:gap-10 min-[1121px]:gap-16',
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
  'lp-btn',
  {
    variants: {
      size: {
        default: 'min-h-[51px] px-[24px] py-[12px]',
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
        'lp-text-link',
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
