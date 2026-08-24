import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';
import './(public)/globals.css';
import { PostHogProvider } from './provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

const GTAG_ID = 'AW-17295080699';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.blackmontadvisory.com'),
  title: 'M&A Advisory Australia | Blackmont Advisory',
  description:
    'Australia’s trusted boutique business brokerage, helping owners achieve the best outcomes when buying or selling businesses across Melbourne, Sydney, and beyond.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Blackmont Advisory',
    images: [
      {
        url: '/assets/blackmont-og.png',
        width: 1200,
        height: 630,
        alt: 'Blackmont Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blackmont Advisory',
    description:
      'Australia’s trusted boutique business brokerage, helping owners achieve the best outcomes when buying or selling businesses across Melbourne, Sydney, and beyond.',
    images: ['/assets/blackmont-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en-AU' className={inter.variable}>
      <body className='min-h-full flex flex-col'>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          strategy='afterInteractive'
        />
        <Script id='google-gtag-init' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(GTAG_ID)});
          `}
        </Script>
        <PostHogProvider>
          {children}
          <Toaster position='top-center' />
        </PostHogProvider>
      </body>
    </html>
  );
}
