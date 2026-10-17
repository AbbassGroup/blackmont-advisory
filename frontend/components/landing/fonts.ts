import { Merriweather, Public_Sans } from 'next/font/google';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-merriweather',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-public-sans',
});

export const landingFontVariables = `${merriweather.variable} ${publicSans.variable}`;
