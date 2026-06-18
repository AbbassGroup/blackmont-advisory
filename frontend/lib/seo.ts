import type { Metadata } from 'next';

// Absolute URLs: the site runs under the /businessbrokers basePath, but
// metadataBase is the bare domain, so relative canonicals would resolve wrong.
export const SITE_URL = 'https://abbass.com.au/businessbrokers';
export const ORG_NAME = 'Blackmont Advisory';
export const OG_IMAGE = 'https://www.abbass.com.au/businessbrokers/bb-og.png';

export function absoluteUrl(path = ''): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

interface BuildMetadataArgs {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
}

export function buildMetadata({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      siteName: ORG_NAME,
      url,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: ORG_NAME },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [OG_IMAGE],
    },
  };
}

type Json = Record<string, unknown>;

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function webAppJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
    provider: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: absoluteUrl(),
    },
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; description: string; path: string }[],
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      description: it.description,
      url: absoluteUrl(it.path),
    })),
  };
}
