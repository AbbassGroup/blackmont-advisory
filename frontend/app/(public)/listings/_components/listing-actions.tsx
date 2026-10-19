'use client';

import { useState } from 'react';
import {
  Share2,
  Facebook,
  Linkedin,
  Copy,
  Check,
  MessageCircle,
  FileDown,
} from 'lucide-react';
import { LandingButton, LandingButtonLink } from '@/components/landing/presentation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  listingId: string;
  listingTitle: string;
}

function ShareDialog({
  open,
  onClose,
  shareUrl,
  title,
}: {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='sm:max-w-sm p-0 gap-0'>
        <DialogHeader className='px-6 pt-6 pb-4 border-b border-secondary/10'>
          <DialogTitle className='text-base font-bold text-secondary'>
            Share Listing
          </DialogTitle>
        </DialogHeader>
        <div className='px-6 py-5 flex flex-col gap-4'>
          <div className='flex gap-3'>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-semibold py-2.5  transition-colors'
            >
              <Facebook className='w-4 h-4' />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 flex items-center justify-center gap-2 bg-[#0a66c2] hover:bg-[#0958a8] text-white text-xs font-semibold py-2.5  transition-colors'
            >
              <Linkedin className='w-4 h-4' />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5b] text-white text-xs font-semibold py-2.5  transition-colors'
            >
              <MessageCircle className='w-4 h-4' />
            </a>
          </div>
          <button
            onClick={handleCopy}
            className='w-full flex items-center justify-center gap-2 border border-secondary/15 hover:border-accent hover:text-accent text-sm font-semibold py-2.5  transition-all text-muted-foreground'
          >
            {copied ? (
              <Check className='w-4 h-4 text-accent' />
            ) : (
              <Copy className='w-4 h-4' />
            )}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ListingActions({ listingId, listingTitle }: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <nav aria-label='Listing actions' className='flex flex-wrap items-center gap-3'>
        <LandingButtonLink href={`/listings/${listingId}/nda`}>Sign NDA</LandingButtonLink>
        <LandingButton variant='outline' onClick={() => setShareOpen(true)}>
          <Share2 aria-hidden='true' className='size-4 shrink-0' /> Share
        </LandingButton>
        <LandingButton variant='outline' onClick={() => window.print()}>
          <FileDown aria-hidden='true' className='size-4 shrink-0' /> Download PDF
        </LandingButton>
      </nav>

      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={shareUrl}
        title={listingTitle}
      />
    </>
  );
}
