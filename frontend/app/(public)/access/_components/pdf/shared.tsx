'use client';

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';

export const CONTACT_URL = 'https://www.blackmontadvisory.com/contact';

export interface PdfAssets {
  logo: string;
  mark: string;
}

const C = {
  brand: '#c9a84c', // Gilt — accent
  brandDark: '#1b2535', // Deep Navy — accent text on light
  brandLight: '#faf5e8', // Gilt — faint wash
  midnight: '#0f1623', // Primary — text on gilt
  text: '#2e2c28', // Ink — body
  textDark: '#1b2535', // Deep Navy — headings
  muted: '#6b6560', // Ink, muted
  light: '#9c958c',
  border: '#e6e1d6',
  borderStrong: '#d8d2c6',
  bg: '#f7f5f1',
  white: '#ffffff',
};

export const styles = StyleSheet.create({
  page: {
    paddingTop: 100,
    paddingBottom: 78,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 10.5,
    color: C.text,
    lineHeight: 1.5,
  },

  // Header — fixed on every page
  header: {
    position: 'absolute',
    top: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.brand,
  },
  headerLogo: {
    height: 38,
    objectFit: 'contain',
  },
  headerContact: {
    fontSize: 9,
    color: C.muted,
    textAlign: 'right',
    lineHeight: 1.55,
  },

  // Footer — fixed on every page
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  footerMark: {
    height: 30,
    width: 30,
    objectFit: 'contain',
  },

  // Title block
  titleBlock: {
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5,
    color: C.brand,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: C.textDark,
    marginBottom: 8,
    lineHeight: 1.2,
  },
  // Callout
  callout: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: C.borderStrong,
    borderRadius: 4,
    backgroundColor: C.bg,
    alignItems: 'center',
  },
  calloutLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5,
    color: C.muted,
    marginBottom: 6,
  },
  calloutValue: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: C.brand,
    lineHeight: 1.1,
  },
  calloutMeta: {
    fontSize: 10,
    color: C.muted,
    marginTop: 6,
  },

  // Headings
  h2: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: C.textDark,
    marginTop: 14,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },
  h3: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: C.textDark,
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 10,
    color: C.text,
    lineHeight: 1.55,
  },

  // Tables (key / value)
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },
  tableLabel: {
    width: '42%',
    fontSize: 10,
    color: C.muted,
    paddingRight: 12,
  },
  tableValue: {
    flex: 1,
    fontSize: 10,
    color: C.textDark,
  },
  tableValueRight: {
    width: 80,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: C.textDark,
    textAlign: 'right',
  },

  // Lists
  list: {
    marginTop: 4,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 4,
  },
  listBulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.brand,
    marginTop: 5,
    marginRight: 8,
  },
  listNumber: {
    width: 16,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: C.brand,
  },
  listText: {
    flex: 1,
    fontSize: 10,
    color: C.text,
    lineHeight: 1.5,
  },

  // 3-up metric cards
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  metaCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: 4,
    backgroundColor: C.bg,
    alignItems: 'center',
  },
  metaCardValue: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: C.textDark,
    textAlign: 'center',
  },
  metaCardLabel: {
    fontSize: 7,
    color: C.light,
    letterSpacing: 0.9,
    marginTop: 5,
    textAlign: 'center',
  },

  // Badge
  badge: {
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 5,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: C.brand,
    backgroundColor: C.brandLight,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.brandDark,
    lineHeight: 1,
  },

  // Row head (title left, meta right)
  rowHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },
  rowHeadLeft: {
    flex: 1,
    paddingRight: 12,
  },
  rowHeadEyebrow: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.2,
    color: C.brand,
    marginBottom: 2,
  },
  rowHeadTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: C.textDark,
  },
  rowHeadMeta: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C.muted,
  },

  // Checklist
  checklist: {
    marginBottom: 6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  checkBox: {
    width: 10,
    height: 10,
    borderWidth: 0.7,
    borderColor: C.light,
    borderRadius: 1.5,
    marginTop: 2,
    marginRight: 8,
  },
  checkBoxDone: {
    backgroundColor: C.brand,
    borderColor: C.brand,
  },
  checkText: {
    flex: 1,
    fontSize: 10,
    color: C.text,
    lineHeight: 1.5,
  },
  checkTextDone: {
    color: C.light,
  },

  // CTA
  cta: {
    marginTop: 26,
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: C.brand,
    borderRadius: 6,
    backgroundColor: C.brandLight,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: C.textDark,
    marginBottom: 10,
  },
  ctaButton: {
    paddingTop: 8,
    paddingBottom: 9,
    paddingHorizontal: 26,
    backgroundColor: C.brand,
    color: C.midnight,
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    borderRadius: 999,
    textDecoration: 'none',
    lineHeight: 1,
    textAlign: 'center',
  },

  // Disclaimer at the bottom of the report
  disclaimer: {
    marginTop: 16,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Oblique',
    color: C.light,
    lineHeight: 1.55,
    textAlign: 'left',
  },
});

interface PageShellProps {
  assets: PdfAssets;
  children: React.ReactNode;
}

export function PageShell({ assets, children }: PageShellProps) {
  return (
    <Page size='A4' style={styles.page}>
      <View style={styles.header} fixed>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={assets.logo} style={styles.headerLogo} />
        <View style={styles.headerContact}>
          <Text>info@blackmontadvisory.com</Text>
          <Text>www.blackmontadvisory.com</Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={assets.mark} style={styles.footerMark} />
      </View>

      {children}
    </Page>
  );
}

interface TitleBlockProps {
  title: string;
}

export function TitleBlock({ title }: TitleBlockProps) {
  return (
    <View style={styles.titleBlock}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

interface CalloutProps {
  label: string;
  value: string;
  meta?: string;
}

export function Callout({ label, value, meta }: CalloutProps) {
  return (
    <View style={styles.callout} wrap={false}>
      <Text style={styles.calloutLabel}>{label}</Text>
      <Text style={styles.calloutValue}>{value}</Text>
      {meta && <Text style={styles.calloutMeta}>{meta}</Text>}
    </View>
  );
}

const DISCLAIMER =
  'The information in this document is for general informational purposes only and does not constitute financial, legal, or investment advice. Blackmont Advisory, its directors, employees, and representatives accept no liability for any loss or damage arising from reliance on the contents of this document. Readers should seek independent professional advice before making any decisions in relation to the sale or valuation of a business.';

export function CTA() {
  return (
    <>
      <View style={styles.cta} wrap={false}>
        <Text style={styles.ctaText}>Ready to talk to our team?</Text>
        <Link src={CONTACT_URL} style={styles.ctaButton}>
          Schedule a Call
        </Link>
      </View>
      <Text style={styles.disclaimer}>{DISCLAIMER}</Text>
    </>
  );
}

export { Document, Page, Text, View, Image, Link };
