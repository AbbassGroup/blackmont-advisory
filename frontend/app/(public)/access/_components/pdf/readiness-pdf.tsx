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

export interface ReadinessRow {
  category: string;
  pts: number;
  isNa: boolean;
}

export interface ReadinessPdfProps {
  assets: PdfAssets;
  total: number;
  tierGrade: string;
  blurb: string;
  breakdown: ReadinessRow[];
  recommendations: string[];
}

export function ReadinessPdf(props: ReadinessPdfProps) {
  const { assets, total, tierGrade, blurb, breakdown, recommendations } = props;

  return (
    <Document
      title='Sale Readiness Checklist'
      author='ABBASS Business Brokers'
    >
      <PageShell assets={assets}>
        <TitleBlock title='Sale Readiness Checklist' />

        <Callout
          label='YOUR OVERALL SCORE'
          value={`${total} / 100`}
          meta={tierGrade}
        />

        <Text style={styles.paragraph}>{blurb}</Text>

        <Text style={styles.h2}>Score breakdown by category</Text>
        <View>
          {breakdown.map((row, i) => (
            <View
              key={i}
              style={[
                styles.tableRow,
                i === breakdown.length - 1 ? { borderBottomWidth: 0 } : {},
              ]}
            >
              <Text style={[styles.tableValue, { color: '#4b5563' }]}>
                {row.category}
              </Text>
              <Text style={styles.tableValueRight}>
                {row.isNa ? 'N/A' : `${row.pts} / 10`}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>Your personalised next steps</Text>
        <View style={styles.list}>
          {recommendations.map((r, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listNumber}>{i + 1}.</Text>
              <Text style={styles.listText}>{r}</Text>
            </View>
          ))}
        </View>

        <CTA />
      </PageShell>
    </Document>
  );
}
