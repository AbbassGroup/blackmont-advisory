import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/** Pair with a clipped `group/image` frame to keep hover motion contained. */
export function LandingImage({ className, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      className={cn(
        'transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/image:transform-[scale(1.04)] motion-reduce:transition-none',
        className,
      )}
    />
  );
}
