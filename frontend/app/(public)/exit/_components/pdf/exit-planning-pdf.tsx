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

export interface ExitPhase {
  label: string;
  title: string;
  tasks: { text: string; done: boolean }[];
}

export interface ExitPlanningPdfProps {
  assets: PdfAssets;
  progressPct: number;
  progressLabel: string;
  phases: ExitPhase[];
}

export function ExitPlanningPdf(props: ExitPlanningPdfProps) {
  const { assets, progressPct, progressLabel, phases } = props;

  return (
    <Document title='Exit Planning Guide' author='Blackmont Advisory'>
      <PageShell assets={assets}>
        <TitleBlock title='Exit Planning Guide' />

        <Callout
          label='OVERALL PROGRESS'
          value={`${progressPct}%`}
          meta={progressLabel}
        />

        {phases.map((phase, pi) => {
          const doneCount = phase.tasks.filter((t) => t.done).length;
          return (
            <View key={pi}>
              <View style={styles.rowHead}>
                <View style={styles.rowHeadLeft}>
                  <Text style={styles.rowHeadEyebrow}>
                    {phase.label.toUpperCase()}
                  </Text>
                  <Text style={styles.rowHeadTitle}>
                    {pi + 1}. {phase.title}
                  </Text>
                </View>
                <Text style={styles.rowHeadMeta}>
                  {doneCount} / {phase.tasks.length} done
                </Text>
              </View>

              <View style={styles.checklist}>
                {phase.tasks.map((task, ti) => (
                  <View key={ti} style={styles.checkItem} wrap={false}>
                    <View
                      style={[
                        styles.checkBox,
                        task.done ? styles.checkBoxDone : {},
                      ]}
                    />
                    <Text
                      style={[
                        styles.checkText,
                        task.done ? styles.checkTextDone : {},
                      ]}
                    >
                      {task.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <CTA />
      </PageShell>
    </Document>
  );
}
