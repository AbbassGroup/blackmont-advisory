'use client';

import {
  Document,
  Text,
  View,
  PageShell,
  TitleBlock,
  CTA,
  styles,
  type PdfAssets,
} from './shared';

export interface BenchmarksPdfProps {
  assets: PdfAssets;
  industryName: string;
  demand: string;
  multi: string;
  price: string;
  days: string;
  drivers: string[];
  insight: string;
}

export function BenchmarksPdf(props: BenchmarksPdfProps) {
  const { assets, industryName, demand, multi, price, days, drivers, insight } =
    props;

  return (
    <Document
      title={`${industryName} Benchmark Report`}
      author='Blackmont Advisory'
    >
      <PageShell assets={assets}>
        <TitleBlock title={`${industryName} Benchmark Report`} />

        <View style={styles.rowHead}>
          <View style={styles.rowHeadLeft}>
            <Text style={styles.rowHeadEyebrow}>INDUSTRY</Text>
            <Text style={styles.rowHeadTitle}>{industryName}</Text>
          </View>
          <Text style={styles.badge}>Buyer demand: {demand}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaCard}>
            <Text style={styles.metaCardValue}>{multi}</Text>
            <Text style={styles.metaCardLabel}>EBITDA MULTIPLE</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaCardValue}>{price}</Text>
            <Text style={styles.metaCardLabel}>TYPICAL PRICE RANGE</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaCardValue}>{days}</Text>
            <Text style={styles.metaCardLabel}>AVERAGE TIME TO SELL</Text>
          </View>
        </View>

        <Text style={styles.h2}>What buyers are looking at</Text>
        <View style={styles.list}>
          {drivers.map((d, i) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.listBulletDot} />
              <Text style={styles.listText}>{d}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>ABBASS market insight</Text>
        <Text style={styles.paragraph}>{insight}</Text>

        <CTA />
      </PageShell>
    </Document>
  );
}
