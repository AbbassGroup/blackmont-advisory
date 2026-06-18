import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';
import './(public)/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.blackmontadvisory.com'),
  title: 'Buy & Sell Businesses in Australia | Blackmont Advisory',
  description:
    'Australia’s trusted boutique business brokerage, helping owners achieve the best outcomes when buying or selling businesses across Melbourne, Sydney, and beyond.',
  icons: {
    icon: '/mark.webp',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Blackmont Advisory',
    images: [
      {
        url: '/blackmont-og.jpg',
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
    images: ['/blackmont-og.jpg'],
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
    <html lang='en' className={inter.variable}>
      <body className='min-h-full flex flex-col'>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy='afterInteractive'
        />
        <Script id='google-gtag-init' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)});
          `}
        </Script>
        {children}
        <Toaster richColors position='top-center' />
      </body>
    </html>
  );
}
