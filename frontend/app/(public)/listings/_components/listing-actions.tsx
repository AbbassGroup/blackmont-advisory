'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  Facebook,
  Linkedin,
  Copy,
  Check,
  MessageCircle,
  FileDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import NDAForm from './nda-form';
import EOIForm from './eoi-form';

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
        <DialogHeader className='px-6 pt-6 pb-4 border-b border-gray-100'>
          <DialogTitle className='text-base font-bold text-brand-black'>
            Share Listing
          </DialogTitle>
        </DialogHeader>
        <div className='px-6 py-5 flex flex-col gap-4'>
          <div className='flex gap-3'>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors'
            >
              <Facebook className='w-4 h-4' />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 flex items-center justify-center gap-2 bg-[#0a66c2] hover:bg-[#0958a8] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors'
            >
              <Linkedin className='w-4 h-4' />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5b] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors'
            >
              <MessageCircle className='w-4 h-4' />
            </a>
          </div>
          <button
            onClick={handleCopy}
            className='w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-brand-primary hover:text-brand-primary text-sm font-semibold py-2.5 rounded-xl transition-all text-gray-600'
          >
            {copied ? (
              <Check className='w-4 h-4 text-brand-primary' />
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
  const [ndaOpen, setNdaOpen] = useState(false);
  const [eoiOpen, setEoiOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <div className='flex flex-wrap gap-3 mb-8'>
        <Button
          asChild
          variant='outline'
          className='gap-2 rounded-xl border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary font-semibold'
        >
          <Link href='/listings'>
            <ArrowLeft className='w-4 h-4' /> Back to Listings
          </Link>
        </Button>
        <Button
          onClick={() => setNdaOpen(true)}
          className='bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl px-5'
        >
          Sign NDA
        </Button>
        {/* <Button onClick={() => setEoiOpen(true)}
          className='bg-[#1c2434] hover:bg-[#1c2434]/90 text-white font-semibold rounded-xl px-5'>
          Express Interest (EOI)
        </Button> */}
        <Button
          variant='outline'
          onClick={() => setShareOpen(true)}
          className='gap-2 rounded-xl border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary font-semibold'
        >
          <Share2 className='w-4 h-4' /> Share
        </Button>
        <Button
          variant='outline'
          onClick={() => window.print()}
          className='gap-2 rounded-xl border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary font-semibold'
        >
          <FileDown className='w-4 h-4' /> Download PDF
        </Button>
      </div>

      <NDAForm
        open={ndaOpen}
        onClose={() => setNdaOpen(false)}
        listingTitle={listingTitle}
        listingId={listingId}
      />
      <EOIForm
        open={eoiOpen}
        onClose={() => setEoiOpen(false)}
        listingTitle={listingTitle}
      />
      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={shareUrl}
        title={listingTitle}
      />
    </>
  );
}
