'use client';

import {
  Document,
  Text,
  View,
  PageShell,
  TitleBlock,
  Callout,
  CTA,
  styles,
  type PdfAssets,
} from './shared';

export interface ValuationPdfProps {
  assets: PdfAssets;
  industry: string;
  location: string;
  revenue: string;
  management: string;
  ebitda: string;
  valueRange: string;
}

export function ValuationPdf(props: ValuationPdfProps) {
  const {
    assets,
    industry,
    location,
    revenue,
    management,
    ebitda,
    valueRange,
  } = props;

  return (
    <Document title='Business Appraisal' author='Blackmont Advisory'>
      <PageShell assets={assets}>
        <TitleBlock title='Business Appraisal' />

        <Callout
          label='ESTIMATED BUSINESS VALUE'
          value={valueRange}
          meta='Indicative range (AUD)'
        />

        <Text style={styles.h2}>Your inputs</Text>
        <View>
          <Row label='Industry' value={industry} />
          <Row label='Location' value={location} />
          <Row label='Annual revenue' value={revenue} />
          <Row label='Management structure' value={management} />
          <Row label='Adjusted Net Profit (EBITDA)' value={ebitda} last />
        </View>

        <CTA />
      </PageShell>
    </Document>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.tableRow, last ? { borderBottomWidth: 0 } : {}]}>
      <Text style={styles.tableLabel}>{label}</Text>
      <Text style={styles.tableValue}>{value || '-'}</Text>
    </View>
  );
}
