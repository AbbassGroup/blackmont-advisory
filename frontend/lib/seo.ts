import type { Metadata } from 'next';

// Absolute URLs: the site runs under the /businessbrokers basePath, but
// metadataBase is the bare domain, so relative canonicals would resolve wrong.
export const SITE_URL = 'https://blackmontadvisory.com';
export const ORG_NAME = 'Blackmont Advisory';
export const OG_IMAGE = 'https://blackmontadvisory.com/assets/blackmont-og.png';

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

/**
 * A free online tool page (calculator, scorecard, report).
 *
 * Deliberately a WebPage, not WebApplication/SoftwareApplication: Google
 * validates those as a Software App rich result, which REQUIRES
 * `aggregateRating` or `review`. We have no genuine ratings, so that markup
 * was reported as a structured-data error on every tool page.
 */
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
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: 'en-AU',
    isPartOf: { '@type': 'WebSite', name: ORG_NAME, url: absoluteUrl() },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * Summary-page list (Google's "carousel" format): each ListItem carries only
 * `position` and `url`. Mixing `name`/`description` in without an `item`
 * matches neither of Google's two ListItem shapes and gets flagged as an error.
 * `name`/`description` stay in the input type so callers needn't change.
 */
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
      url: absoluteUrl(it.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  updated,
}: {
  headline: string;
  description: string;
  path: string;
  updated: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    datePublished: updated,
    dateModified: updated,
    image: OG_IMAGE,
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: absoluteUrl(),
    },
  };
}

export function gatedMetadata(
  args: BuildMetadataArgs & { reviewed: boolean },
): Metadata {
  const { reviewed, ...rest } = args;
  const metadata = buildMetadata(rest);
  return reviewed
    ? metadata
    : { ...metadata, robots: { index: false, follow: false } };
}
