'use client';

import { useId } from 'react';
import { ArrowUpRight, Globe, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SectionHeading } from '../section-chrome';
import { makeUid, type SocialLink, type SocialPlatform, type SocialsData } from '../types';

/** Original brand glyphs (Simple Icons paths) + brand colours. The `website`
 * entry has no path and falls back to a globe. */
const CATALOG: Record<SocialPlatform, { name: string; color: string; path?: string }> = {
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  x: {
    name: 'X',
    color: '#000000',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.29 19.51h2.039L6.486 3.24H4.298l13.313 17.423z',
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  tiktok: {
    name: 'TikTok',
    color: '#000000',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  whatsapp: {
    name: 'WhatsApp',
    color: '#25D366',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413',
  },
  website: { name: 'Website', color: '#0F9D8C' },
};

const PLATFORM_ORDER: SocialPlatform[] = [
  'facebook',
  'instagram',
  'x',
  'linkedin',
  'youtube',
  'tiktok',
  'whatsapp',
  'website',
];

/** Platforms whose logo is a full-colour tile (rendered edge-to-edge, no
 * brand-coloured backing square). */
const FULL_COLOR = new Set<SocialPlatform>(['instagram']);

/** Instagram's official gradient glyph (fills its own rounded tile). */
function InstagramIcon({ className }: { className?: string }) {
  const uid = useId();
  const g0 = `ig0-${uid}`;
  const g1 = `ig1-${uid}`;
  const g2 = `ig2-${uid}`;
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="6" fill={`url(#${g0})`} />
      <rect x="2" y="2" width="28" height="28" rx="6" fill={`url(#${g1})`} />
      <rect x="2" y="2" width="28" height="28" rx="6" fill={`url(#${g2})`} />
      <path
        d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id={g0}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
        >
          <stop stopColor="#B13589" />
          <stop offset="0.79309" stopColor="#C62F94" />
          <stop offset="1" stopColor="#8A3AC8" />
        </radialGradient>
        <radialGradient
          id={g1}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
        >
          <stop stopColor="#E0E8B7" />
          <stop offset="0.444662" stopColor="#FB8A2E" />
          <stop offset="0.71474" stopColor="#E2425C" />
          <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={g2}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
        >
          <stop offset="0.156701" stopColor="#406ADC" />
          <stop offset="0.467799" stopColor="#6A45BE" />
          <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function BrandGlyph({
  platform,
  className,
  color,
}: {
  platform: SocialPlatform;
  className?: string;
  /** Override the glyph colour (e.g. white on a brand-coloured tile). */
  color?: string;
}) {
  if (platform === 'instagram') return <InstagramIcon className={className} />;
  const entry = CATALOG[platform];
  const tint = color ?? entry.color;
  if (!entry.path) return <Globe className={className} style={{ color: tint }} />;
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ color: tint }} fill="currentColor" aria-hidden>
      <path d={entry.path} />
    </svg>
  );
}

/** Strip protocol / trailing slash for a tidy secondary line. */
function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

export function SocialsSection({
  data,
  editable,
  onChange,
  onCommit,
}: {
  data: SocialsData;
  editable?: boolean;
  onChange?: (patch: Partial<SocialsData>) => void;
  onCommit?: () => void;
}) {
  const links = data.links ?? [];

  const writeLinks = (next: SocialLink[], commit = true) => {
    onChange?.({ links: next });
    if (commit) onCommit?.();
  };
  const updateLink = (id: string, patch: Partial<SocialLink>, commit = false) =>
    writeLinks(
      links.map((l) => (l.id === id ? { ...l, ...patch } : l)),
      commit,
    );
  const addLink = () =>
    writeLinks([
      ...links,
      { id: makeUid('soc'), platform: 'facebook', label: CATALOG.facebook.name, url: '' },
    ]);
  const removeLink = (id: string) => writeLinks(links.filter((l) => l.id !== id));

  const changePlatform = (id: string, platform: SocialPlatform) => {
    const link = links.find((l) => l.id === id);
    const patch: Partial<SocialLink> = { platform };
    // Keep the label in sync unless the broker customised it.
    if (link && (!link.label.trim() || link.label === CATALOG[link.platform].name)) {
      patch.label = CATALOG[platform].name;
    }
    updateLink(id, patch, true);
  };

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder="Social Media"
      />

      {/* Linked profiles — open in a new tab */}
      {links.some((l) => l.url && l.label) && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links
            .filter((l) => l.url && l.label)
            .map((l) => {
              const color = CATALOG[l.platform].color;
              return (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ['--accent' as string]: color }}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3.5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md"
                >
                  {/* Accent wash that fades in on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-[0.06]"
                    style={{ backgroundColor: color }}
                  />
                  <span
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: FULL_COLOR.has(l.platform) ? undefined : color }}
                  >
                    {FULL_COLOR.has(l.platform) ? (
                      <BrandGlyph platform={l.platform} className="h-full w-full" />
                    ) : (
                      <BrandGlyph platform={l.platform} color="#ffffff" className="h-6 w-6" />
                    )}
                  </span>
                  <div className="relative min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-brand-black">{l.label}</p>
                    <p className="truncate text-xs text-gray-400">{prettyUrl(l.url)}</p>
                  </div>
                  <ArrowUpRight className="relative h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-[var(--accent)]" />
                </a>
              );
            })}
        </div>
      )}

      {/* Editor controls */}
      {editable && (
        <div className="mt-6 space-y-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-4">
          {links.length > 0 && (
            <div className="space-y-3">
              {links.map((l) => (
                <div
                  key={l.id}
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white p-3"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
                      FULL_COLOR.has(l.platform) ? '' : 'bg-gray-50'
                    }`}
                  >
                    <BrandGlyph
                      platform={l.platform}
                      className={FULL_COLOR.has(l.platform) ? 'h-full w-full' : 'h-5 w-5'}
                    />
                  </span>
                  <Select
                    value={l.platform}
                    onValueChange={(v) => changePlatform(l.id, v as SocialPlatform)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PLATFORM_ORDER.map((p) => (
                        <SelectItem key={p} value={p}>
                          {CATALOG[p].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={l.label}
                    onChange={(e) => updateLink(l.id, { label: e.target.value })}
                    placeholder="Label"
                    className="w-full sm:w-40"
                  />
                  <Input
                    value={l.url}
                    onChange={(e) => updateLink(l.id, { url: e.target.value })}
                    placeholder="https://…"
                    className="w-full flex-1 sm:min-w-48"
                  />
                  <button
                    type="button"
                    onClick={() => removeLink(l.id)}
                    title="Remove"
                    className="ml-auto rounded-lg p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button variant="outline" className="gap-2" onClick={addLink}>
            <Plus className="h-4 w-4" /> Add social
          </Button>
        </div>
      )}
    </>
  );
}
