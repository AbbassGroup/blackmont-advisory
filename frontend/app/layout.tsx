import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';
import './(public)/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abbass.com.au'),
  title: 'Buy & Sell Businesses in Australia | ABBASS Business Brokers',
  description:
    'Australia’s trusted boutique business brokerage, helping owners achieve the best outcomes when buying or selling businesses across Melbourne, Sydney, and beyond.',
  icons: {
    icon: '/businessbrokers/mark.webp',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'ABBASS Business Brokers',
    images: [
      {
        url: 'https://www.abbass.com.au/businessbrokers/bb-og.png',
        width: 1200,
        height: 630,
        alt: 'ABBASS Business Brokers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABBASS Business Brokers',
    description:
      'Australia’s trusted boutique business brokerage, helping owners achieve the best outcomes when buying or selling businesses across Melbourne, Sydney, and beyond.',
    images: ['https://www.abbass.com.au/businessbrokers/bb-og.png'],
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
    <html lang='en' className={poppins.variable}>
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
