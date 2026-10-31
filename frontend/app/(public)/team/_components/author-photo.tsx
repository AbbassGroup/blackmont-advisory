import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Round headshot with an icon fallback. Decorative — the name is always beside it. */
export function AuthorPhoto({ src, className, eager }: { src: string | null; className?: string; eager?: boolean }) {
  return (
    <div className={cn('flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-canvas', className)}>
      {src ? (
        // API-hosted uploads are absolute URLs next/image isn't configured for.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt='' loading={eager ? 'eager' : 'lazy'} className='h-full w-full object-cover' />
      ) : (
        <UserRound aria-hidden='true' className='size-1/3 text-ink/50' />
      )}
    </div>
  );
}
