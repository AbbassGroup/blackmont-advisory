'use client';

import { useState, type ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  useXAxisScale,
  useYAxisScale,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AreaChart as AreaIcon,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Gauge,
  LayoutGrid,
  LineChart as LineIcon,
  PieChart as PieChartIcon,
  Plus,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { InlineText } from '../inline-text';
import { SectionHeading } from '../section-chrome';
import {
  makeFinanceChart,
  makeFinanceRow,
  makeGrowthChart,
  makeGrowthRow,
  makeKpiChart,
  makeKpiRow,
  makePieChart,
  makePieSlice,
  makeRoiChart,
  type ChartItem,
  type ChartsData,
  type ChartUnit,
  type ChartVariant,
  type FinanceRow,
  type GrowthPhase,
  type GrowthRow,
  type KpiRow,
  type KpiStyle,
  type PieSlice,
} from '../types';

// ─── Series definition (single source of truth for keys, labels, colours) ─────
const SERIES = [
  { key: 'revenue', label: 'Revenue', color: '#1d3557' },
  { key: 'grossProfit', label: 'Gross Profit', color: '#56C1BC' },
  { key: 'sde', label: 'SDE', color: '#E9A23B' },
] as const;

type SeriesKey = (typeof SERIES)[number]['key'];

const CHART_CONFIG: ChartConfig = Object.fromEntries(
  SERIES.map((s) => [s.key, { label: s.label, color: s.color }]),
);
const COLOR: Record<SeriesKey, string> = Object.fromEntries(
  SERIES.map((s) => [s.key, s.color]),
) as Record<SeriesKey, string>;

// ROI doughnut colours.
const ROI_ARC = '#56C1BC'; // brand teal — the achieved ROI
const ROI_TRACK = '#EDEFF2'; // light grey — the remainder
const ROI_CONFIG: ChartConfig = { roi: { label: 'ROI', color: ROI_ARC } };

// Growth-trajectory colours: actual results vs future projection, plus the
// trend line/arrow drawn over the bars.
const PHASE: Record<GrowthPhase, string> = { actual: '#1f2937', trajectory: '#56C1BC' };
const PHASE_LABEL: Record<GrowthPhase, string> = { actual: 'Actual', trajectory: 'Trajectory' };
const TREND = '#1f2937';
const GROWTH_CONFIG: ChartConfig = { value: { label: 'Value' } };

// Pie breakdown: a distinct colour per slice, by index.
const PIE_PALETTE = [
  '#1d3557',
  '#56C1BC',
  '#E9A23B',
  '#9b2226',
  '#577590',
  '#80B918',
  '#7251b5',
  '#e76f51',
  '#2a9d8f',
  '#bc6c25',
];

// KPI row colour presets (card background + text shades + sideways-label bar).
const KPI_STYLES: Record<KpiStyle, { card: string; big: string; sub: string; side: string; div: string }> = {
  plain: {
    card: 'bg-card ring-1 ring-border',
    big: 'text-secondary',
    sub: 'text-muted-foreground/60',
    side: 'bg-muted text-muted-foreground',
    div: 'border-border',
  },
  dark: {
    card: 'bg-[#1f3a5f]',
    big: 'text-white',
    sub: 'text-white/60',
    side: 'bg-black/20 text-white/80',
    div: 'border-white/15',
  },
  gold: {
    card: 'bg-[#b08a46]',
    big: 'text-white',
    sub: 'text-white/75',
    side: 'bg-black/15 text-white/85',
    div: 'border-white/20',
  },
  teal: {
    card: 'bg-accent',
    big: 'text-primary',
    sub: 'text-primary/70',
    side: 'bg-black/10 text-primary/80',
    div: 'border-primary/15',
  },
};
const KPI_STYLE_OPTIONS: { value: KpiStyle; label: string }[] = [
  { value: 'plain', label: 'Light' },
  { value: 'dark', label: 'Navy' },
  { value: 'gold', label: 'Gold' },
  { value: 'teal', label: 'Gilt' },
];

const MAX_ROWS = 12;

const VARIANTS: { value: ChartVariant; label: string; icon: typeof BarChart3 }[] = [
  { value: 'bar', label: 'Bars', icon: BarChart3 },
  { value: 'line', label: 'Lines', icon: LineIcon },
  { value: 'area', label: 'Area', icon: AreaIcon },
];

// Unit drives both the axis suffix and how a figure expands in the tooltip.
const UNIT_SUFFIX: Record<ChartUnit, string> = { plain: '', k: 'k', m: 'M' };
const UNIT_FACTOR: Record<ChartUnit, number> = { plain: 1, k: 1_000, m: 1_000_000 };
const UNIT_OPTIONS: { value: ChartUnit; label: string }[] = [
  { value: 'plain', label: 'Dollars ($)' },
  { value: 'k', label: 'Thousands (k)' },
  { value: 'm', label: 'Millions (M)' },
];

// ─── Number helpers ───────────────────────────────────────────────────────────
function strip(n: number): string {
  return String(Math.round(n * 100) / 100);
}
/** Compact number, e.g. 700000 → "700k", 1500000 → "1.5M". Used when no unit
 * scale is set, so large raw dollar amounts still read nicely. */
function fmtCompact(v: number): string {
  const n = Math.abs(v);
  if (n >= 1_000_000) return `${strip(v / 1_000_000)}M`;
  if (n >= 1_000) return `${strip(v / 1_000)}k`;
  return strip(v);
}
/** Axis tick honouring the chosen unit: in 'k'/'M' the entered figure keeps its
 * value and gets a suffix ("600" → "600k"); in 'plain' it auto-compacts. */
function fmtTick(v: number, unit: ChartUnit): string {
  if (unit === 'plain') return fmtCompact(v);
  return `${v.toLocaleString()}${UNIT_SUFFIX[unit]}`;
}
/** Full money value for tooltips, expanding by the unit, e.g. 600 (k) → "$600,000". */
function fmtMoney(v: number, unit: ChartUnit): string {
  return `$${Math.round(v * UNIT_FACTOR[unit]).toLocaleString()}`;
}
/** Compact money for on-bar labels, e.g. 910000 → "$910k", 1090000 → "$1.09m". */
function fmtMoneyCompact(v: number): string {
  const n = Math.abs(v);
  if (n >= 1_000_000) return `$${strip(v / 1_000_000)}m`;
  if (n >= 1_000) return `$${strip(v / 1_000)}k`;
  return `$${Math.round(v)}`;
}
/** ROI percentage. One decimal when reasonable (40.816 → "40.8%"); for very
 * large ratios drop the decimal and group digits so it stays readable. */
function fmtPct(v: number): string {
  if (Math.abs(v) >= 1000) return `${Math.round(v).toLocaleString()}%`;
  return `${Math.round(v * 10) / 10}%`;
}
/** Parse user input into a non-negative number (strips $, commas, spaces). */
function parseNum(raw: string): number {
  const n = Number(raw.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function rowHasData(r: FinanceRow): boolean {
  return Boolean(r.revenue || r.grossProfit || r.sde);
}
function rowHasContent(r: KpiRow): boolean {
  return Boolean(r.category.trim() || r.cells.some((c) => c.big.trim() || c.small.trim()));
}
function chartHasData(c: ChartItem): boolean {
  if (c.type === 'roi') return Boolean(c.askingPrice && c.sde);
  if (c.type === 'growth') return (c.growthRows ?? []).some((r) => r.value);
  if (c.type === 'pie') return (c.pieSlices ?? []).some((s) => s.value > 0);
  if (c.type === 'kpi') return (c.kpiRows ?? []).some(rowHasContent);
  return (c.rows ?? []).some(rowHasData);
}

// ─── Finance tooltip ──────────────────────────────────────────────────────────
interface TipPoint {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
}
function MoneyTooltip({
  active,
  label,
  payload,
  unit = 'plain',
}: {
  active?: boolean;
  label?: string | number;
  payload?: TipPoint[];
  unit?: ChartUnit;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="grid min-w-44 gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-xs shadow-xl">
      <div className="font-semibold text-secondary">{label}</div>
      {payload.map((p) => {
        const key = String(p.dataKey) as SeriesKey;
        return (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span
                className="h-2.5 w-2.5 rounded-[3px]"
                style={{ background: COLOR[key] ?? '#999' }}
              />
              {p.name}
            </span>
            <span className="font-mono font-medium tabular-nums text-secondary">
              {fmtMoney(Number(p.value) || 0, unit)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Finance chart (shared by editor preview and reader) ─────────────────────
function FinanceChartView({ chart }: { chart: ChartItem }) {
  const rows = chart.rows ?? [];
  const variant = chart.variant ?? 'bar';
  const unit = chart.unit ?? 'k';
  const data = rows.map((r) => ({
    label: r.label || '—',
    revenue: r.revenue || 0,
    grossProfit: r.grossProfit || 0,
    sde: r.sde || 0,
  }));

  const axis = (
    <>
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
      <YAxis
        tickLine={false}
        axisLine={false}
        width={48}
        tickFormatter={(v: number) => fmtTick(v, unit)}
      />
      <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} content={<MoneyTooltip unit={unit} />} />
    </>
  );

  const chartEl =
    variant === 'line' ? (
      <LineChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        {axis}
        {SERIES.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    ) : variant === 'area' ? (
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          {SERIES.map((s) => (
            <linearGradient key={s.key} id={`fill-${chart.id}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${s.key})`} stopOpacity={0.35} />
              <stop offset="95%" stopColor={`var(--color-${s.key})`} stopOpacity={0.04} />
            </linearGradient>
          ))}
        </defs>
        {axis}
        {SERIES.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            fill={`url(#fill-${chart.id}-${s.key})`}
            isAnimationActive={false}
          />
        ))}
      </AreaChart>
    ) : (
      <BarChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        {axis}
        {SERIES.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={`var(--color-${s.key})`}
            radius={[4, 4, 0, 0]}
            maxBarSize={46}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    );

  return (
    <ChartContainer config={CHART_CONFIG} className="aspect-auto h-70 w-full sm:h-90">
      {chartEl}
    </ChartContainer>
  );
}

/** Coloured legend chips below a finance chart. */
function FinanceLegend() {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {SERIES.map((s) => (
        <span key={s.key} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: s.color }} />
          {s.label}
        </span>
      ))}
    </div>
  );
}

// ─── ROI doughnut (shared by editor preview and reader) ──────────────────────
function RoiChartView({ chart }: { chart: ChartItem }) {
  const asking = chart.askingPrice || 0;
  const sde = chart.sde || 0;
  const unit = chart.unit ?? 'm';
  const roi = asking > 0 ? (sde / asking) * 100 : 0;
  const arc = Math.max(0, Math.min(100, roi));
  const data = [
    { name: 'roi', value: arc },
    { name: 'rest', value: 100 - arc },
  ];

  // Shrink the centre figure as it gets longer so it never spills the ring.
  const pctStr = fmtPct(roi);
  const pctSize =
    pctStr.length <= 6
      ? 'text-4xl sm:text-5xl'
      : pctStr.length <= 8
        ? 'text-3xl sm:text-4xl'
        : pctStr.length <= 11
          ? 'text-2xl sm:text-3xl'
          : 'text-lg sm:text-xl';

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
      <div className="relative h-56 w-56 shrink-0 sm:h-64 sm:w-64">
        <ChartContainer config={ROI_CONFIG} className="aspect-auto h-full w-full">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="74%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              cornerRadius={8}
              isAnimationActive={false}
            >
              <Cell fill="var(--color-roi)" />
              <Cell fill={ROI_TRACK} />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className={cn('font-bold leading-none tabular-nums text-secondary', pctSize)}>
            {pctStr}
          </span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            ROI
          </span>
        </div>
      </div>

      <div className="min-w-0 flex-1 text-center sm:text-left">
        {chart.caption?.trim() && (
          <p className="text-base leading-relaxed text-muted-foreground">{chart.caption}</p>
        )}
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
          <span className="text-sm text-muted-foreground">
            Asking Price{' '}
            <b className="font-semibold text-secondary">{fmtMoney(asking, unit)}</b>
          </span>
          <span className="text-sm text-muted-foreground">
            SDE <b className="font-semibold text-secondary">{fmtMoney(sde, unit)}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Growth trajectory chart (shared by editor preview and reader) ───────────
/** On-bar value label, cloned by recharts with x/y/width/value. */
function ValueLabel({
  x,
  y,
  width,
  value,
  unit = 'k',
}: {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  value?: number | string;
  unit?: ChartUnit;
}) {
  const v = Number(value) || 0;
  if (!v || x == null || y == null || width == null) return null;
  return (
    <text
      x={Number(x) + Number(width) / 2}
      y={Number(y) - 8}
      textAnchor="middle"
      fill="#1f2937"
      fontSize={12}
      fontWeight={700}
    >
      {fmtMoneyCompact(v * UNIT_FACTOR[unit])}
    </text>
  );
}

/** Trend line + arrow drawn as an SVG overlay INSIDE the chart, floating a fixed
 * distance above every bar's value label (so it never sits on the numbers). Uses
 * recharts' coordinate hooks so it lines up exactly with the bars. */
function GrowthTrendArrow({ data }: { data: { label: string; value: number }[] }) {
  const xScale = useXAxisScale();
  const yScale = useYAxisScale();
  if (!xScale || !yScale || data.length === 0) return null;

  const LIFT = 28; // px above each bar top — clears the ~20px-tall label
  const pts = data
    .map((d) => {
      const cx = xScale(d.label, { position: 'middle' });
      const topY = yScale(d.value || 0);
      if (cx == null || topY == null) return null;
      return [cx, topY - LIFT] as [number, number];
    })
    .filter((p): p is [number, number] => p !== null);
  if (pts.length === 0) return null;

  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const [lx, ly] = pts[pts.length - 1];
  const ex = lx + 18; // extend the arrow up-and-right past the last bar
  const ey = ly - 18;

  return (
    <g>
      <circle cx={pts[0][0]} cy={pts[0][1]} r={3.5} fill={TREND} />
      <path
        d={`${path} L${ex},${ey}`}
        stroke={TREND}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform={`translate(${ex}, ${ey}) rotate(45)`}>
        <path d="M0,-9 L6,4 L-6,4 Z" fill={TREND} />
      </g>
    </g>
  );
}

function GrowthTooltip({
  active,
  label,
  payload,
  unit = 'k',
}: {
  active?: boolean;
  label?: string | number;
  payload?: { value?: number | string; payload?: { phase?: GrowthPhase } }[];
  unit?: ChartUnit;
}) {
  if (!active || !payload?.length) return null;
  const v = Number(payload[0]?.value) || 0;
  const phase: GrowthPhase = payload[0]?.payload?.phase === 'trajectory' ? 'trajectory' : 'actual';
  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2 text-xs shadow-xl">
      <div className="font-semibold text-secondary">{label}</div>
      <div className="mt-1 flex items-center gap-1.5 text-muted-foreground">
        <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: PHASE[phase] }} />
        {PHASE_LABEL[phase]}
        <b className="ml-2 font-mono font-medium text-secondary">{fmtMoney(v, unit)}</b>
      </div>
    </div>
  );
}

function GrowthChartView({ chart }: { chart: ChartItem }) {
  const rows = chart.growthRows ?? [];
  const unit = chart.unit ?? 'k';
  const data = rows.map((r) => ({
    label: r.label || '—',
    value: r.value || 0,
    phase: r.phase === 'trajectory' ? 'trajectory' : 'actual',
  }));

  return (
    <ChartContainer config={GROWTH_CONFIG} className="aspect-auto h-70 w-full sm:h-90">
      <ComposedChart data={data} margin={{ left: 8, right: 30, top: 52 }}>
        <XAxis
          dataKey="label"
          tickLine={false}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#1f2937' }}
          tickMargin={8}
        />
        <YAxis hide domain={[0, (max: number) => max * 1.45]} />
        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} content={<GrowthTooltip unit={unit} />} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56} isAnimationActive={false}>
          {data.map((d, i) => (
            <Cell key={i} fill={PHASE[d.phase as GrowthPhase]} />
          ))}
          <LabelList content={<ValueLabel unit={unit} />} />
        </Bar>
        <GrowthTrendArrow data={data} />
      </ComposedChart>
    </ChartContainer>
  );
}

/** Actual / Trajectory legend chips. */
function GrowthLegend() {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {(['actual', 'trajectory'] as const).map((p) => (
        <span key={p} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: PHASE[p] }} />
          {PHASE_LABEL[p]}
        </span>
      ))}
    </div>
  );
}

// ─── Pie breakdown (shared by editor preview and reader) ─────────────────────
const RADIAN = Math.PI / 180;
/** White percentage label centred in each slice. */
function renderSliceLabel(props: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    innerRadius == null ||
    outerRadius == null ||
    !percent ||
    percent < 0.05
  ) {
    return null;
  }
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {Math.round(percent * 100)}%
    </text>
  );
}

function PieTooltip({
  active,
  payload,
  total = 0,
}: {
  active?: boolean;
  payload?: { name?: string | number; value?: number | string }[];
  total?: number;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  const v = Number(p?.value) || 0;
  const pct = total > 0 ? (v / total) * 100 : 0;
  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2 text-xs shadow-xl">
      <span className="font-semibold text-secondary">{p?.name}</span>
      <span className="ml-2 text-muted-foreground">
        {fmtPct(pct)} · {v.toLocaleString()}
      </span>
    </div>
  );
}

function PieChartView({ chart }: { chart: ChartItem }) {
  const slices = (chart.pieSlices ?? []).filter((s) => (s.value || 0) > 0);
  const total = slices.reduce((a, s) => a + (s.value || 0), 0);
  const data = slices.map((s) => ({ name: s.label || '—', value: s.value || 0 }));

  if (data.length === 0) {
    return (
      <div className="flex h-70 items-center justify-center text-center text-sm text-muted-foreground/60 sm:h-90">
        Enter options with values to preview the chart.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
      <ChartContainer config={{}} className="aspect-auto h-60 w-60 shrink-0 sm:h-72 sm:w-72">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="88%"
            paddingAngle={2}
            cornerRadius={5}
            stroke="none"
            labelLine={false}
            label={renderSliceLabel}
            isAnimationActive={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip total={total} />} />
        </PieChart>
      </ChartContainer>

      <ul className="w-full space-y-1 sm:w-auto sm:min-w-45 sm:max-w-60">
        {slices.map((s, i) => {
          const pct = total > 0 ? (s.value / total) * 100 : 0;
          return (
            <li
              key={s.id}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: PIE_PALETTE[i % PIE_PALETTE.length] }}
              />
              <span className="min-w-0 flex-1 truncate text-foreground">{s.label || '—'}</span>
              <span className="shrink-0 font-semibold tabular-nums text-secondary">
                {fmtPct(pct)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── KPI grid (shared by editor preview and reader) ──────────────────────────
function KpiView({ chart }: { chart: ChartItem }) {
  const rows = (chart.kpiRows ?? []).filter(rowHasContent);
  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-center text-sm text-muted-foreground/60">
        Fill in the rows below to preview the indicators.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const st = KPI_STYLES[row.style] ?? KPI_STYLES.plain;
        return (
          <div
            key={row.id}
            className={cn('relative flex min-h-24 overflow-hidden rounded-xl', st.card)}
          >
            {/* The sideways label is absolutely positioned so its length can't
                stretch the row — every row keeps the same (cell-driven) height. */}
            <div className={cn('relative w-10 shrink-0 sm:w-11', st.side)}>
              <div className="absolute inset-0 flex items-center justify-center px-1 py-2">
                <span className="max-h-full wrap-break-word text-center text-[10px] font-bold uppercase leading-tight tracking-wide [writing-mode:vertical-rl] rotate-180">
                  {row.category}
                </span>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-3">
              {row.cells.map((c, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex flex-col items-center justify-center px-2 py-4 text-center sm:px-4',
                    i > 0 && `border-l ${st.div}`,
                  )}
                >
                  <div className={cn('text-lg font-bold leading-tight sm:text-2xl', st.big)}>
                    {c.big || '—'}
                  </div>
                  {c.small.trim() && (
                    <div
                      className={cn(
                        'mt-1 text-[10px] uppercase leading-snug tracking-wide sm:text-[11px]',
                        st.sub,
                      )}
                    >
                      {c.small}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared editor controls ───────────────────────────────────────────────────
/** Numeric input that keeps a local text draft while editing so partial decimals
 * ("3.", "0.5") survive; stores the parsed number. Optional currency prefix. */
function NumberInput({
  value,
  onChange,
  prefix = '$',
  placeholder = '0',
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  placeholder?: string;
  className?: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft ?? (value ? String(value) : '');
  return (
    <div className="relative">
      {prefix ? (
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60">
          {prefix}
        </span>
      ) : null}
      <input
        inputMode="decimal"
        value={display}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
          setDraft(cleaned);
          onChange(parseNum(cleaned));
        }}
        onBlur={() => setDraft(null)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-border bg-white py-1.5 text-sm tabular-nums text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15',
          prefix ? 'pl-6 pr-2.5' : 'px-2.5',
          className,
        )}
      />
    </div>
  );
}

function NumField({
  label,
  color,
  value,
  onChange,
}: {
  label: string;
  color: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <NumberInput value={value} onChange={onChange} prefix="$" />
    </label>
  );
}

function UnitSelect({ unit, onChange }: { unit: ChartUnit; onChange: (u: ChartUnit) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>Figures in</span>
      <select
        value={unit}
        onChange={(e) => onChange(e.target.value as ChartUnit)}
        className="rounded-lg border border-border bg-white px-2 py-1 text-xs font-medium text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
      >
        {UNIT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function VariantSwitch({
  variant,
  onChange,
}: {
  variant: ChartVariant;
  onChange: (v: ChartVariant) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted p-0.5">
      {VARIANTS.map((v) => {
        const Icon = v.icon;
        const active = variant === v.value;
        return (
          <button
            key={v.value}
            type="button"
            title={v.label}
            onClick={() => onChange(v.value)}
            className={cn(
              'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition',
              active ? 'bg-card text-accent shadow-xs' : 'text-muted-foreground/60 hover:text-foreground',
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{v.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PhaseToggle({
  phase,
  onChange,
}: {
  phase: GrowthPhase;
  onChange: (p: GrowthPhase) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5 rounded-lg border border-border bg-muted p-0.5">
      {(['actual', 'trajectory'] as const).map((p) => {
        const active = phase === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition',
              active ? 'bg-white shadow-xs' : 'text-muted-foreground/60 hover:text-foreground',
            )}
            style={active ? { color: PHASE[p] } : undefined}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: PHASE[p] }} />
            {PHASE_LABEL[p]}
          </button>
        );
      })}
    </div>
  );
}

// ─── Editor bodies ────────────────────────────────────────────────────────────
function FinanceBody({
  chart,
  onChange,
  onCommit,
}: {
  chart: ChartItem;
  onChange: (patch: Partial<ChartItem>) => void;
  onCommit?: () => void;
}) {
  const rows = chart.rows ?? [];
  const unit = chart.unit ?? 'k';

  const writeRows = (next: FinanceRow[]) => onChange({ rows: next });
  const updateRow = (id: string, patch: Partial<FinanceRow>) =>
    writeRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addRow = () => {
    if (rows.length >= MAX_ROWS) return;
    writeRows([...rows, makeFinanceRow(`Year ${rows.length + 1}`)]);
    onCommit?.();
  };
  const removeRow = (id: string) => {
    writeRows(rows.filter((r) => r.id !== id));
    onCommit?.();
  };

  return (
    <>
      <FinanceChartView chart={chart} />
      <FinanceLegend />

      <div className="mt-5 border-t border-border pt-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
            Financial figures
          </p>
          <UnitSelect
            unit={unit}
            onChange={(u) => {
              onChange({ unit: u });
              onCommit?.();
            }}
          />
        </div>

        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center gap-2">
                <input
                  value={r.label}
                  onChange={(e) => updateRow(r.id, { label: e.target.value })}
                  placeholder="Period (e.g. 2024)"
                  className="min-w-0 flex-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-sm font-semibold text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
                />
                <button
                  type="button"
                  onClick={() => removeRow(r.id)}
                  disabled={rows.length <= 1}
                  title="Remove period"
                  className="shrink-0 rounded-lg p-1.5 text-muted-foreground/50 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <NumField
                  label="Revenue"
                  color={COLOR.revenue}
                  value={r.revenue}
                  onChange={(v) => updateRow(r.id, { revenue: v })}
                />
                <NumField
                  label="Gross Profit"
                  color={COLOR.grossProfit}
                  value={r.grossProfit}
                  onChange={(v) => updateRow(r.id, { grossProfit: v })}
                />
                <NumField
                  label="SDE"
                  color={COLOR.sde}
                  value={r.sde}
                  onChange={(v) => updateRow(r.id, { sde: v })}
                />
              </div>
            </div>
          ))}

          {rows.length < MAX_ROWS && (
            <button
              type="button"
              onClick={addRow}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <Plus className="h-4 w-4" /> Add period
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function RoiBody({
  chart,
  onChange,
  onCommit,
}: {
  chart: ChartItem;
  onChange: (patch: Partial<ChartItem>) => void;
  onCommit?: () => void;
}) {
  const unit = chart.unit ?? 'm';

  return (
    <>
      <RoiChartView chart={chart} />

      <div className="mt-5 space-y-3 border-t border-border pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">Figures</p>
          <UnitSelect
            unit={unit}
            onChange={(u) => {
              onChange({ unit: u });
              onCommit?.();
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <NumField
            label="Asking Price"
            color="#1d3557"
            value={chart.askingPrice || 0}
            onChange={(v) => onChange({ askingPrice: v })}
          />
          <NumField
            label="SDE"
            color={ROI_ARC}
            value={chart.sde || 0}
            onChange={(v) => onChange({ sde: v })}
          />
        </div>

        <label className="block">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            Caption
          </span>
          <textarea
            value={chart.caption || ''}
            onChange={(e) => onChange({ caption: e.target.value })}
            rows={2}
            placeholder="e.g. R.O.I (Return on Owner's Investment) Rate, calculated based on Average SDE between FY 2023–2025"
            className="w-full resize-y rounded-lg border border-border bg-white px-2.5 py-1.5 text-sm leading-relaxed text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>
      </div>
    </>
  );
}

function GrowthBody({
  chart,
  onChange,
  onCommit,
}: {
  chart: ChartItem;
  onChange: (patch: Partial<ChartItem>) => void;
  onCommit?: () => void;
}) {
  const rows = chart.growthRows ?? [];
  const unit = chart.unit ?? 'k';

  const writeRows = (next: GrowthRow[]) => onChange({ growthRows: next });
  const updateRow = (id: string, patch: Partial<GrowthRow>) =>
    writeRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addRow = () => {
    if (rows.length >= MAX_ROWS) return;
    // Continue the last row's phase so a run of actuals/projections extends naturally.
    const phase = rows[rows.length - 1]?.phase ?? 'actual';
    writeRows([...rows, makeGrowthRow(`Year ${rows.length + 1}`, phase)]);
    onCommit?.();
  };
  const removeRow = (id: string) => {
    writeRows(rows.filter((r) => r.id !== id));
    onCommit?.();
  };

  return (
    <>
      <GrowthChartView chart={chart} />
      <GrowthLegend />

      <div className="mt-5 border-t border-border pt-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
            Figures &amp; phases
          </p>
          <UnitSelect
            unit={unit}
            onChange={(u) => {
              onChange({ unit: u });
              onCommit?.();
            }}
          />
        </div>

        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center gap-2">
                <input
                  value={r.label}
                  onChange={(e) => updateRow(r.id, { label: e.target.value })}
                  placeholder="Year (e.g. 2024)"
                  className="min-w-0 flex-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-sm font-semibold text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
                />
                <PhaseToggle
                  phase={r.phase}
                  onChange={(p) => {
                    updateRow(r.id, { phase: p });
                    onCommit?.();
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeRow(r.id)}
                  disabled={rows.length <= 1}
                  title="Remove year"
                  className="shrink-0 rounded-lg p-1.5 text-muted-foreground/50 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <NumField
                label="Value"
                color={PHASE[r.phase]}
                value={r.value}
                onChange={(v) => updateRow(r.id, { value: v })}
              />
            </div>
          ))}

          {rows.length < MAX_ROWS && (
            <button
              type="button"
              onClick={addRow}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <Plus className="h-4 w-4" /> Add year
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function PieBody({
  chart,
  onChange,
  onCommit,
}: {
  chart: ChartItem;
  onChange: (patch: Partial<ChartItem>) => void;
  onCommit?: () => void;
}) {
  const slices = chart.pieSlices ?? [];
  const writeSlices = (next: PieSlice[]) => onChange({ pieSlices: next });
  const updateSlice = (id: string, patch: Partial<PieSlice>) =>
    writeSlices(slices.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const addSlice = () => {
    writeSlices([...slices, makePieSlice()]);
    onCommit?.();
  };
  const removeSlice = (id: string) => {
    writeSlices(slices.filter((s) => s.id !== id));
    onCommit?.();
  };

  return (
    <>
      <PieChartView chart={chart} />

      <div className="mt-5 border-t border-border pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">Options</p>
        <div className="space-y-2">
          {slices.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-[3px]"
                style={{ background: PIE_PALETTE[i % PIE_PALETTE.length] }}
              />
              <input
                value={s.label}
                onChange={(e) => updateSlice(s.id, { label: e.target.value })}
                placeholder="Option name"
                className="min-w-0 flex-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-sm text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <div className="w-24 shrink-0">
                <NumberInput
                  value={s.value}
                  onChange={(v) => updateSlice(s.id, { value: v })}
                  prefix=""
                />
              </div>
              <button
                type="button"
                onClick={() => removeSlice(s.id)}
                disabled={slices.length <= 1}
                title="Remove option"
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground/50 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSlice}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent"
          >
            <Plus className="h-4 w-4" /> Add option
          </button>
        </div>
      </div>
    </>
  );
}

function KpiBody({
  chart,
  onChange,
  onCommit,
}: {
  chart: ChartItem;
  onChange: (patch: Partial<ChartItem>) => void;
  onCommit?: () => void;
}) {
  const rows = chart.kpiRows ?? [];
  const writeRows = (next: KpiRow[]) => onChange({ kpiRows: next });
  const updateRow = (id: string, patch: Partial<KpiRow>) =>
    writeRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updateCell = (rowId: string, idx: number, patch: Partial<KpiRow['cells'][number]>) =>
    writeRows(
      rows.map((r) =>
        r.id === rowId
          ? { ...r, cells: r.cells.map((c, i) => (i === idx ? { ...c, ...patch } : c)) }
          : r,
      ),
    );
  const addRow = () => {
    writeRows([...rows, makeKpiRow('', 'plain')]);
    onCommit?.();
  };
  const removeRow = (id: string) => {
    writeRows(rows.filter((r) => r.id !== id));
    onCommit?.();
  };

  return (
    <>
      <KpiView chart={chart} />

      <div className="mt-5 space-y-3 border-t border-border pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">Rows</p>
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl border border-border bg-muted/40 p-3">
            <div className="mb-2 flex items-center gap-2">
              <input
                value={row.category}
                onChange={(e) => updateRow(row.id, { category: e.target.value })}
                placeholder="Row label (shown sideways)"
                className="min-w-0 flex-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-sm font-semibold text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <select
                value={row.style}
                onChange={(e) => {
                  updateRow(row.id, { style: e.target.value as KpiStyle });
                  onCommit?.();
                }}
                className="shrink-0 rounded-lg border border-border bg-white px-2 py-1.5 text-xs font-medium text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                {KPI_STYLE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                disabled={rows.length <= 1}
                title="Remove row"
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground/50 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {row.cells.map((c, i) => (
                <div key={i} className="space-y-1.5 rounded-lg border border-border bg-white p-2">
                  <input
                    value={c.big}
                    onChange={(e) => updateCell(row.id, i, { big: e.target.value })}
                    placeholder="Value (e.g. 20%)"
                    className="w-full rounded-md border border-border bg-white px-2 py-1.5 text-sm font-bold text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
                  />
                  <input
                    value={c.small}
                    onChange={(e) => updateCell(row.id, i, { small: e.target.value })}
                    placeholder="Caption"
                    className="w-full rounded-md border border-border bg-white px-2 py-1.5 text-xs text-muted-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent"
        >
          <Plus className="h-4 w-4" /> Add row
        </button>
      </div>
    </>
  );
}

// ─── Chart card (editor) ──────────────────────────────────────────────────────
function ChartEditor({
  chart,
  index,
  total,
  onChange,
  onMove,
  onRemove,
  onCommit,
}: {
  chart: ChartItem;
  index: number;
  total: number;
  onChange: (patch: Partial<ChartItem>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  onCommit?: () => void;
}) {
  return (
    <div className="border border-border bg-card p-4 shadow-xs sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <InlineText
            as="h3"
            singleLine
            editable
            value={chart.title}
            onChange={(v) => onChange({ title: v })}
            placeholder="Chart title"
            className="text-lg font-semibold text-secondary sm:text-xl"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {chart.type === 'finance' && (
            <VariantSwitch
              variant={chart.variant ?? 'bar'}
              onChange={(v) => {
                onChange({ variant: v });
                onCommit?.();
              }}
            />
          )}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onMove(-1)}
              disabled={index === 0}
              title="Move up"
              className="rounded-lg p-1.5 text-muted-foreground/60 transition hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/60"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onMove(1)}
              disabled={index === total - 1}
              title="Move down"
              className="rounded-lg p-1.5 text-muted-foreground/60 transition hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground/60"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              title="Remove chart"
              className="rounded-lg p-1.5 text-muted-foreground/60 transition hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {chart.type === 'roi' ? (
        <RoiBody chart={chart} onChange={onChange} onCommit={onCommit} />
      ) : chart.type === 'growth' ? (
        <GrowthBody chart={chart} onChange={onChange} onCommit={onCommit} />
      ) : chart.type === 'pie' ? (
        <PieBody chart={chart} onChange={onChange} onCommit={onCommit} />
      ) : chart.type === 'kpi' ? (
        <KpiBody chart={chart} onChange={onChange} onCommit={onCommit} />
      ) : (
        <FinanceBody chart={chart} onChange={onChange} onCommit={onCommit} />
      )}
    </div>
  );
}

function AddChartButton({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-3 py-3 text-sm font-medium text-muted-foreground transition hover:border-accent hover:bg-accent/5 hover:text-accent"
    >
      {icon} {label}
    </button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ChartsSection({
  data,
  editable,
  onChange,
  onCommit,
}: {
  data: ChartsData;
  editable?: boolean;
  onChange?: (patch: Partial<ChartsData>) => void;
  onCommit?: () => void;
}) {
  const charts = data.charts ?? [];

  const writeCharts = (next: ChartItem[], commit = true) => {
    onChange?.({ charts: next });
    if (commit) onCommit?.();
  };
  const updateChart = (id: string, patch: Partial<ChartItem>) =>
    writeCharts(
      charts.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      false,
    );
  const addFinance = () => writeCharts([...charts, makeFinanceChart()]);
  const addRoi = () => writeCharts([...charts, makeRoiChart()]);
  const addGrowth = () => writeCharts([...charts, makeGrowthChart()]);
  const addPie = () => writeCharts([...charts, makePieChart()]);
  const addKpi = () => writeCharts([...charts, makeKpiChart()]);
  const removeChart = (id: string) => writeCharts(charts.filter((c) => c.id !== id));
  const moveChart = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= charts.length) return;
    const next = [...charts];
    [next[index], next[j]] = [next[j], next[index]];
    writeCharts(next);
  };

  // Reader: only show charts that actually have data.
  const shown = editable ? charts : charts.filter(chartHasData);

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder="Charts"
      />

      <div className="space-y-6">
        {editable
          ? charts.map((c, i) => (
              <ChartEditor
                key={c.id}
                chart={c}
                index={i}
                total={charts.length}
                onChange={(patch) => updateChart(c.id, patch)}
                onMove={(dir) => moveChart(i, dir)}
                onRemove={() => removeChart(c.id)}
                onCommit={onCommit}
              />
            ))
          : shown.map((c) => (
              <figure
                key={c.id}
                className="border border-border bg-card p-4 shadow-xs sm:p-6"
              >
                {c.title?.trim() && (
                  <figcaption className="mb-4 text-lg font-semibold text-secondary sm:text-xl">
                    {c.title}
                  </figcaption>
                )}
                {c.type === 'roi' ? (
                  <RoiChartView chart={c} />
                ) : c.type === 'growth' ? (
                  <>
                    <GrowthChartView chart={c} />
                    <GrowthLegend />
                  </>
                ) : c.type === 'pie' ? (
                  <PieChartView chart={c} />
                ) : c.type === 'kpi' ? (
                  <KpiView chart={c} />
                ) : (
                  <>
                    <FinanceChartView chart={c} />
                    <FinanceLegend />
                  </>
                )}
              </figure>
            ))}
      </div>

      {editable && (
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          <AddChartButton icon={<BarChart3 className="h-4 w-4" />} label="Finance" onClick={addFinance} />
          <AddChartButton icon={<TrendingUp className="h-4 w-4" />} label="Growth" onClick={addGrowth} />
          <AddChartButton icon={<PieChartIcon className="h-4 w-4" />} label="Pie" onClick={addPie} />
          <AddChartButton icon={<Gauge className="h-4 w-4" />} label="ROI doughnut" onClick={addRoi} />
          <AddChartButton icon={<LayoutGrid className="h-4 w-4" />} label="KPIs" onClick={addKpi} />
        </div>
      )}
    </>
  );
}
