'use client';

import {
  useRef,
  useState,
  type ElementType,
  type FocusEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  ChevronUp,
  Combine,
  ExternalLink,
  FileText,
  FileUp,
  Film,
  ImagePlus,
  Italic,
  Loader2,
  Minus,
  MousePointerClick,
  Plus,
  Split,
  Table2,
  Trash2,
  Type,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/proposal/rich-text-editor';
import { InlineText } from '../inline-text';
import { SectionHeading } from '../section-chrome';
import {
  makeUid,
  type CustomBlock,
  type CustomButton,
  type CustomData,
  type TableCell,
  type TableRow,
} from '../types';

type Rect = { r1: number; c1: number; r2: number; c2: number };
const rectOf = (
  a: { r: number; c: number },
  b: { r: number; c: number },
): Rect => ({
  r1: Math.min(a.r, b.r),
  c1: Math.min(a.c, b.c),
  r2: Math.max(a.r, b.r),
  c2: Math.max(a.c, b.c),
});

const cloneRows = (rows: TableRow[]): TableRow[] =>
  rows.map((row) => ({ ...row, cells: row.cells.map((c) => ({ ...c })) }));

/** Recompute a consistent grid: pad every row to the same width, clamp spans to
 * the grid bounds, and (re)derive the `hidden` flags from each cell's spans. */
function sanitizeTable(rows: TableRow[]): TableRow[] {
  const R = rows.length;
  const C = Math.max(1, ...rows.map((row) => row.cells.length));
  const grid = rows.map((row) => {
    const cells = row.cells.map((c) => ({ ...c, hidden: false }));
    while (cells.length < C) cells.push({ text: '', hidden: false });
    return { ...row, cells };
  });
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const cell = grid[r].cells[c];
      if (!cell || cell.hidden) continue;
      const cs = Math.max(1, Math.min(cell.colSpan ?? 1, C - c));
      const rs = Math.max(1, Math.min(cell.rowSpan ?? 1, R - r));
      cell.colSpan = cs > 1 ? cs : undefined;
      cell.rowSpan = rs > 1 ? rs : undefined;
      for (let rr = r; rr < r + rs; rr++) {
        for (let cc = c; cc < c + cs; cc++) {
          if (rr === r && cc === c) continue;
          const cov = grid[rr]?.cells[cc];
          if (cov) {
            cov.hidden = true;
            cov.colSpan = undefined;
            cov.rowSpan = undefined;
          }
        }
      }
    }
  }
  return grid;
}

/** Normalise table rows (handles the legacy `string[][]` and whole-row-merge
 * shapes) and return a consistent grid. */
function normRows(raw: unknown): TableRow[] {
  const arr = Array.isArray(raw) ? raw : [];
  const rows: TableRow[] = arr.map((row: unknown) => {
    if (Array.isArray(row)) {
      return {
        cells: row.map((t) => ({ text: typeof t === 'string' ? t : '' })),
      };
    }
    const r = (row ?? {}) as Partial<TableRow>;
    const cells: TableCell[] = (r.cells ?? []).map((c) => ({
      text: c?.text ?? '',
      bold: c?.bold,
      italic: c?.italic,
      align: c?.align,
      colSpan: c?.colSpan,
      rowSpan: c?.rowSpan,
    }));
    // Legacy whole-row merge → a colSpan across all columns on the first cell.
    if (r.merged && cells.length > 1)
      cells[0] = { ...cells[0], colSpan: cells.length };
    return { cells: cells.length ? cells : [{ text: '' }], bg: r.bg };
  });
  if (!rows.length) return [{ cells: [{ text: '' }] }];
  return sanitizeTable(rows);
}

/** Preset row background colours for the table toolbar. */
const ROW_COLORS: { label: string; value: string }[] = [
  { label: 'None', value: '' },
  { label: 'Brand', value: '#56C1BC' },
  { label: 'Teal', value: '#E6F7F6' },
  { label: 'Gray', value: '#F3F4F6' },
  { label: 'Amber', value: '#FEF3C7' },
  { label: 'Green', value: '#DCFCE7' },
];

const alignClass = (a?: 'left' | 'center' | 'right') =>
  a === 'center' ? 'text-center' : a === 'right' ? 'text-right' : 'text-left';

const HEADER_HEIGHT = 48;
function bodyRowHeight(rowCount: number): number {
  const bodyCount = Math.max(1, rowCount - 1); // exclude the header row
  const MAX = 44; // starting/comfortable height for a few rows
  const MIN = 36;
  const BUDGET = 460;
  return Math.max(MIN, Math.min(MAX, Math.round(BUDGET / bodyCount)));
}

// react-pdf is browser-only; load it client-side to avoid SSR issues.
const PdfPages = dynamic(() => import('../pdf-pages').then((m) => m.PdfPages), {
  ssr: false,
  loading: () => (
    <div className='flex items-center justify-center gap-2 py-10 text-gray-400'>
      <Loader2 className='h-5 w-5 animate-spin' /> Loading PDF...
    </div>
  ),
});

/** YouTube / Vimeo → embeddable iframe URL; null for direct video files. */
function getEmbedUrl(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/i,
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return null;
}

function VideoPlayer({ url }: { url: string }) {
  const embed = getEmbedUrl(url);
  if (embed) {
    return (
      <div className='aspect-video w-full overflow-hidden rounded-xl border border-gray-100 shadow-xs'>
        <iframe
          src={embed}
          title='Video'
          className='h-full w-full'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <video
      src={url}
      controls
      preload='metadata'
      className='w-full rounded-xl border border-gray-100 shadow-xs'
    />
  );
}

const RICH_READ_CLASS =
  'im-rich max-w-3xl text-[0.95rem] leading-relaxed text-gray-600 [&_a]:text-brand-primary [&_a]:underline [&_h1]:mt-4 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-brand-black [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-brand-black [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-3 [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6';

const LINK_CLASS =
  'inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary/90';

// PDF buttons open a download-protected viewer in a new tab (canvas render).
const pdfHref = (url: string) => `/im-pdf?src=${encodeURIComponent(url)}`;

const BLOCK_LABELS: Record<CustomBlock['type'], string> = {
  text: 'Text',
  table: 'Table',
  buttons: 'Buttons',
  photos: 'Photos',
  video: 'Video',
  pdf: 'PDF',
};

const BLOCK_ICONS: Record<CustomBlock['type'], typeof Type> = {
  text: Type,
  table: Table2,
  buttons: MousePointerClick,
  photos: ImagePlus,
  video: Film,
  pdf: FileText,
};

const BLOCK_TYPES = [
  'text',
  'table',
  'buttons',
  'photos',
  'video',
  'pdf',
] as const;

/** Build the working block list, migrating legacy custom-section data on the fly
 * (with deterministic ids so re-renders stay stable). */
function resolveBlocks(data: CustomData): CustomBlock[] {
  if (data.blocks && data.blocks.length) return data.blocks;
  const out: CustomBlock[] = [];
  if (data.body) out.push({ id: 'legacy-text', type: 'text', html: data.body });
  if (data.pdfUrl)
    out.push({ id: 'legacy-pdf', type: 'pdf', url: data.pdfUrl });
  if (data.photos?.length)
    out.push({ id: 'legacy-photos', type: 'photos', photos: data.photos });
  if (data.buttons?.length)
    out.push({ id: 'legacy-buttons', type: 'buttons', buttons: data.buttons });
  (data.videos ?? []).forEach((v, i) =>
    out.push({
      id: `legacy-video-${i}`,
      type: 'video',
      kind: v.kind,
      url: v.url,
    }),
  );
  if (!out.length) out.push({ id: 'legacy-text', type: 'text', html: '' });
  return out;
}

function newBlock(type: CustomBlock['type']): CustomBlock {
  const id = makeUid('blk');
  switch (type) {
    case 'text':
      return { id, type, html: '' };
    case 'table':
      return { id, type, rows: [{ cells: [{ text: '' }] }] };
    case 'buttons':
      return {
        id,
        type,
        buttons: [
          { id: makeUid('btn'), label: 'New Button', kind: 'link', url: '' },
        ],
      };
    case 'photos':
      return { id, type, photos: [] };
    case 'video':
      return { id, type, kind: 'link', url: '' };
    case 'pdf':
      return { id, type, url: '' };
  }
}

type Update = (patch: Record<string, unknown>, commit?: boolean) => void;

// ─── Read-only views ──────────────────────────────────────────────────────────
function TableView({ rows: raw }: { rows: unknown }) {
  const rows = normRows(raw);
  if (!rows.length) return null;
  const cols = rows[0]?.cells.length ?? 1;
  const rh = bodyRowHeight(rows.length);

  return (
    <div className='overflow-hidden rounded-xl border border-gray-100 shadow-xs'>
      <table className='w-full table-fixed border-collapse'>
        <colgroup>
          {Array.from({ length: cols }, (_, i) => (
            <col key={i} style={{ width: `${100 / cols}%` }} />
          ))}
        </colgroup>
        <tbody>
          {rows.map((row, r) => {
            const isHeader = r === 0;
            return (
              <tr
                key={r}
                style={{
                  height: isHeader ? HEADER_HEIGHT : rh,
                  ...(row.bg ? { backgroundColor: row.bg } : {}),
                }}
              >
                {row.cells.map((cell, c) => {
                  if (cell.hidden) return null;
                  if (isHeader) {
                    return (
                      <th
                        key={c}
                        colSpan={cell.colSpan}
                        rowSpan={cell.rowSpan}
                        style={row.bg ? { backgroundColor: row.bg } : undefined}
                        className={cn(
                          'whitespace-pre-wrap break-words bg-brand-primary px-4 py-3.5 align-middle text-sm text-white sm:text-base',
                          cell.bold ? 'font-bold' : 'font-semibold',
                          cell.italic && 'italic',
                          alignClass(cell.align),
                        )}
                      >
                        {cell.text}
                      </th>
                    );
                  }
                  return (
                    <td
                      key={c}
                      colSpan={cell.colSpan}
                      rowSpan={cell.rowSpan}
                      className={cn(
                        'whitespace-pre-wrap break-words border-t border-gray-100 px-4 py-1.5 align-middle text-sm',
                        cell.bold
                          ? 'font-semibold text-brand-black'
                          : 'text-gray-700',
                        cell.italic && 'italic',
                        alignClass(cell.align),
                      )}
                    >
                      {cell.text}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ButtonsView({ buttons }: { buttons: CustomButton[] }) {
  const valid = buttons.filter((b) => b.url && b.label);
  if (!valid.length) return null;
  return (
    <div className='flex flex-wrap gap-3'>
      {valid.map((b) =>
        b.kind === 'pdf' ? (
          <Link
            key={b.id}
            href={pdfHref(b.url)}
            target='_blank'
            rel='noopener noreferrer'
            className={LINK_CLASS}
          >
            <FileText className='h-4 w-4' />
            {b.label}
          </Link>
        ) : (
          <a
            key={b.id}
            href={b.url}
            target='_blank'
            rel='noopener noreferrer'
            className={LINK_CLASS}
          >
            <ExternalLink className='h-4 w-4' />
            {b.label}
          </a>
        ),
      )}
    </div>
  );
}

function PhotosView({ photos }: { photos: string[] }) {
  if (!photos.length) return null;
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
      {photos.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className='overflow-hidden rounded-xl border border-gray-100 bg-gray-50'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=''
            loading='lazy'
            decoding='async'
            className='aspect-[4/3] h-full w-full object-cover'
          />
        </div>
      ))}
    </div>
  );
}

function BlockRead({ block }: { block: CustomBlock }) {
  switch (block.type) {
    case 'text':
      return block.html ? (
        <div
          className={RICH_READ_CLASS}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      ) : null;
    case 'table':
      return <TableView rows={block.rows} />;
    case 'buttons':
      return <ButtonsView buttons={block.buttons} />;
    case 'photos':
      return <PhotosView photos={block.photos} />;
    case 'video':
      return block.url ? (
        <div className='max-w-3xl'>
          <VideoPlayer url={block.url} />
        </div>
      ) : null;
    case 'pdf':
      return block.url ? <PdfPages url={block.url} /> : null;
  }
}

// ─── Block editors ──────────────────────────────────────────────────────────
const TOGGLE_ON = 'bg-brand-primary text-white';
const TOGGLE_OFF = 'bg-white text-gray-500 hover:bg-gray-50';

/** A toolbar button styled for the dark (tooltip-like) formatting bar. */
function TBtn({
  children,
  onAct,
  active,
  title,
}: {
  children: ReactNode;
  onAct: () => void;
  active?: boolean;
  title?: string;
}) {
  return (
    <button
      type='button'
      title={title}
      // Keep the cell focused so the toolbar stays open and the caret survives.
      onMouseDown={(e) => {
        e.preventDefault();
        onAct();
      }}
      className={cn(
        'flex h-7 w-7 items-center justify-center rounded transition',
        active ? 'bg-white/25' : 'hover:bg-white/15',
      )}
    >
      {children}
    </button>
  );
}

function TableEditor({
  rows,
  onChange,
}: {
  rows: TableRow[];
  onChange: (rows: TableRow[], commit: boolean) => void;
}) {
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const [range, setRange] = useState<{ r: number; c: number } | null>(null);
  const [toolbarTop, setToolbarTop] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cols = rows[0]?.cells.length ?? 0;
  const rh = bodyRowHeight(rows.length);

  // Anchor the floating toolbar just above the focused cell, and start a new
  // single-cell selection.
  const focusCell = (e: FocusEvent<HTMLElement>, r: number, c: number) => {
    setActive({ r, c });
    setRange(null);
    const wrap = wrapRef.current;
    if (wrap) {
      setToolbarTop(
        e.currentTarget.getBoundingClientRect().top -
          wrap.getBoundingClientRect().top,
      );
    }
  };

  // Cell text edits keep the grid structure — no sanitise needed.
  const setCellText = (r: number, c: number, text: string) =>
    onChange(
      rows.map((row, ri) =>
        ri !== r
          ? row
          : {
              ...row,
              cells: row.cells.map((cell, ci) =>
                ci !== c ? cell : { ...cell, text },
              ),
            },
      ),
      false,
    );

  // Selection rectangle (single cell, or anchor→shift-clicked target).
  const sel: Rect | null = active ? rectOf(active, range ?? active) : null;
  const isMulti = !!sel && (sel.r1 !== sel.r2 || sel.c1 !== sel.c2);
  const aCell = active ? rows[active.r]?.cells[active.c] : undefined;
  const canUnmerge =
    !isMulti &&
    !!aCell &&
    ((aCell.colSpan ?? 1) > 1 || (aCell.rowSpan ?? 1) > 1);

  const inSel = (r: number, c: number) =>
    !!sel && r >= sel.r1 && r <= sel.r2 && c >= sel.c1 && c <= sel.c2;

  // ── Operations ──────────────────────────────────────────────────────────────
  const applyToSelection = (patch: Partial<TableCell>) => {
    if (!sel) return;
    onChange(
      rows.map((row, ri) => ({
        ...row,
        cells: row.cells.map((cell, ci) =>
          ri >= sel.r1 && ri <= sel.r2 && ci >= sel.c1 && ci <= sel.c2
            ? { ...cell, ...patch }
            : cell,
        ),
      })),
      true,
    );
  };

  const setSelectionBg = (value: string) => {
    if (!sel) return;
    onChange(
      rows.map((row, ri) =>
        ri >= sel.r1 && ri <= sel.r2 ? { ...row, bg: value || undefined } : row,
      ),
      true,
    );
  };

  const mergeSelection = () => {
    if (!sel || !isMulti) return;
    const next = cloneRows(rows);
    for (let r = sel.r1; r <= sel.r2; r++) {
      for (let c = sel.c1; c <= sel.c2; c++) {
        next[r].cells[c] = {
          ...next[r].cells[c],
          colSpan: undefined,
          rowSpan: undefined,
          hidden: false,
        };
      }
    }
    const w = sel.c2 - sel.c1 + 1;
    const h = sel.r2 - sel.r1 + 1;
    next[sel.r1].cells[sel.c1].colSpan = w > 1 ? w : undefined;
    next[sel.r1].cells[sel.c1].rowSpan = h > 1 ? h : undefined;
    onChange(sanitizeTable(next), true);
    setRange(null);
    setActive({ r: sel.r1, c: sel.c1 });
  };

  const unmergeActive = () => {
    if (!active) return;
    const next = cloneRows(rows);
    next[active.r].cells[active.c] = {
      ...next[active.r].cells[active.c],
      colSpan: undefined,
      rowSpan: undefined,
    };
    onChange(sanitizeTable(next), true);
  };

  const addRow = () => {
    onChange(
      sanitizeTable([
        ...rows,
        { cells: Array.from({ length: cols || 1 }, () => ({ text: '' })) },
      ]),
      true,
    );
  };
  const addCol = () =>
    onChange(
      sanitizeTable(
        rows.map((row) => ({ ...row, cells: [...row.cells, { text: '' }] })),
      ),
      true,
    );
  const removeRow = () => {
    if (rows.length > 1) {
      onChange(sanitizeTable(rows.slice(0, -1)), true);
      setActive(null);
      setRange(null);
    }
  };
  const removeCol = () => {
    if (cols > 1) {
      onChange(
        sanitizeTable(
          rows.map((row) => ({ ...row, cells: row.cells.slice(0, -1) })),
        ),
        true,
      );
      setActive(null);
      setRange(null);
    }
  };

  return (
    <div
      ref={wrapRef}
      className='relative space-y-2'
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setActive(null);
          setRange(null);
        }
      }}
    >
      {/* Floating toolbar (tooltip style) — acts on the selected cell(s) */}
      {active && aCell && (
        <div
          className='absolute left-1/2 z-20 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)]'
          style={{ top: toolbarTop }}
        >
          <div className='flex items-center gap-0.5 rounded-md bg-foreground px-1.5 py-1 text-background shadow-lg'>
            <TBtn
              title='Bold'
              active={aCell.bold}
              onAct={() => applyToSelection({ bold: !aCell.bold })}
            >
              <Bold className='h-3.5 w-3.5' />
            </TBtn>
            <TBtn
              title='Italic'
              active={aCell.italic}
              onAct={() => applyToSelection({ italic: !aCell.italic })}
            >
              <Italic className='h-3.5 w-3.5' />
            </TBtn>
            <span className='mx-0.5 h-4 w-px bg-white/20' />
            <TBtn
              title='Align left'
              active={(aCell.align ?? 'left') === 'left'}
              onAct={() => applyToSelection({ align: 'left' })}
            >
              <AlignLeft className='h-3.5 w-3.5' />
            </TBtn>
            <TBtn
              title='Align center'
              active={aCell.align === 'center'}
              onAct={() => applyToSelection({ align: 'center' })}
            >
              <AlignCenter className='h-3.5 w-3.5' />
            </TBtn>
            <TBtn
              title='Align right'
              active={aCell.align === 'right'}
              onAct={() => applyToSelection({ align: 'right' })}
            >
              <AlignRight className='h-3.5 w-3.5' />
            </TBtn>
            <span className='mx-0.5 h-4 w-px bg-white/20' />
            <TBtn
              title={
                isMulti
                  ? 'Merge cells'
                  : canUnmerge
                    ? 'Unmerge cell'
                    : 'Shift-click to select a range'
              }
              active={canUnmerge}
              onAct={() => {
                if (isMulti) mergeSelection();
                else if (canUnmerge) unmergeActive();
              }}
            >
              {canUnmerge ? (
                <Split className='h-3.5 w-3.5' />
              ) : (
                <Combine className='h-3.5 w-3.5' />
              )}
            </TBtn>
            <span className='mx-0.5 h-4 w-px bg-white/20' />
            {ROW_COLORS.map((col) => (
              <button
                key={col.value || 'none'}
                type='button'
                title={`Row colour: ${col.label}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSelectionBg(col.value);
                }}
                className={cn(
                  'relative h-5 w-5 rounded-full border border-white/40',
                  (rows[active.r]?.bg ?? '') === col.value &&
                    'ring-2 ring-white',
                )}
                style={{ backgroundColor: col.value || 'transparent' }}
              >
                {!col.value && (
                  <span className='absolute inset-0 m-auto h-px w-3.5 rotate-45 bg-white/70' />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className='overflow-hidden rounded-xl border border-gray-100 shadow-xs'>
        <table className='w-full table-fixed border-collapse'>
          <colgroup>
            {Array.from({ length: cols }, (_, i) => (
              <col key={i} style={{ width: `${100 / cols}%` }} />
            ))}
          </colgroup>
          <tbody>
            {rows.map((row, r) => {
              const isHeader = r === 0;
              return (
                <tr key={r} style={{ height: isHeader ? HEADER_HEIGHT : rh }}>
                  {row.cells.map((cell, c) => {
                    if (cell.hidden) return null;
                    const Tag = (isHeader ? 'th' : 'td') as ElementType;
                    const selected = inSel(r, c);
                    return (
                      <Tag
                        key={c}
                        colSpan={cell.colSpan}
                        rowSpan={cell.rowSpan}
                        onFocus={(e: FocusEvent<HTMLElement>) =>
                          focusCell(e, r, c)
                        }
                        onMouseDown={(e: ReactMouseEvent) => {
                          // Shift-click extends the selection without losing focus.
                          if (e.shiftKey && active) {
                            e.preventDefault();
                            setRange({ r, c });
                          }
                        }}
                        style={row.bg ? { backgroundColor: row.bg } : undefined}
                        className={cn(
                          'px-3 align-middle',
                          isHeader
                            ? 'bg-brand-primary py-2.5'
                            : 'border-t border-gray-100 py-1.5',
                          selected && 'ring-2 ring-inset ring-amber-300',
                        )}
                      >
                        <InlineText
                          as='div'
                          editable
                          hideEditIcon
                          value={cell.text}
                          onChange={(v) => setCellText(r, c, v)}
                          placeholder={isHeader ? 'Header' : 'Cell'}
                          className={cn(
                            'w-full',
                            isHeader
                              ? 'im-on-dark text-sm text-white sm:text-base'
                              : 'text-sm',
                            isHeader
                              ? cell.bold
                                ? 'font-bold'
                                : 'font-semibold'
                              : cell.bold
                                ? 'font-semibold text-brand-black'
                                : 'text-gray-700',
                            cell.italic && 'italic',
                            alignClass(cell.align),
                          )}
                        />
                      </Tag>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Button variant='outline' size='sm' className='gap-1' onClick={addRow}>
          <Plus className='h-3.5 w-3.5' /> Row
        </Button>
        <Button variant='outline' size='sm' className='gap-1' onClick={addCol}>
          <Plus className='h-3.5 w-3.5' /> Column
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='gap-1'
          onClick={removeRow}
          disabled={rows.length <= 1}
        >
          <Minus className='h-3.5 w-3.5' /> Row
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='gap-1'
          onClick={removeCol}
          disabled={cols <= 1}
        >
          <Minus className='h-3.5 w-3.5' /> Column
        </Button>
        <span className='text-xs text-gray-400'>
          Tip: click a cell, then{' '}
          <strong className='font-medium'>Shift-click</strong> another to select
          a range and merge.
        </span>
      </div>
    </div>
  );
}

function ButtonsBlockEditor({
  buttons,
  update,
  onUploadFile,
}: {
  buttons: CustomButton[];
  update: Update;
  onUploadFile?: (file: File) => Promise<string | null>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const pendingId = useRef<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const setBtns = (next: CustomButton[], commit = true) =>
    update({ buttons: next }, commit);
  const updBtn = (id: string, patch: Partial<CustomButton>, commit = false) =>
    setBtns(
      buttons.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      commit,
    );
  const addBtn = () =>
    setBtns([
      ...buttons,
      { id: makeUid('btn'), label: 'New Button', kind: 'link', url: '' },
    ]);
  const removeBtn = (id: string) => setBtns(buttons.filter((b) => b.id !== id));

  const handlePdf = async (id: string, file: File) => {
    if (!onUploadFile) return;
    setUploadingId(id);
    try {
      const url = await onUploadFile(file);
      if (url) updBtn(id, { kind: 'pdf', url }, true);
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className='space-y-3'>
      <input
        ref={fileRef}
        type='file'
        accept='application/pdf'
        className='hidden'
        onChange={(e) => {
          const f = e.target.files?.[0];
          const id = pendingId.current;
          if (f && id) handlePdf(id, f);
          pendingId.current = null;
          e.target.value = '';
        }}
      />
      {buttons.map((b) => (
        <div key={b.id} className='rounded-xl border border-gray-200 p-3'>
          <div className='flex flex-wrap items-center gap-2'>
            <Input
              value={b.label}
              onChange={(e) => updBtn(b.id, { label: e.target.value })}
              placeholder='Button text'
              className='w-full sm:w-44'
            />
            <div className='inline-flex overflow-hidden rounded-lg border border-gray-200'>
              <button
                type='button'
                onClick={() =>
                  b.kind !== 'link' &&
                  updBtn(b.id, { kind: 'link', url: '' }, true)
                }
                className={`px-3 py-1.5 text-xs font-medium ${b.kind === 'link' ? TOGGLE_ON : TOGGLE_OFF}`}
              >
                Link
              </button>
              <button
                type='button'
                onClick={() =>
                  b.kind !== 'pdf' &&
                  updBtn(b.id, { kind: 'pdf', url: '' }, true)
                }
                className={`px-3 py-1.5 text-xs font-medium ${b.kind === 'pdf' ? TOGGLE_ON : TOGGLE_OFF}`}
              >
                PDF
              </button>
            </div>
            <button
              type='button'
              onClick={() => removeBtn(b.id)}
              title='Remove button'
              className='ml-auto rounded-lg p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500'
            >
              <Trash2 className='h-4 w-4' />
            </button>
          </div>
          <div className='mt-2'>
            {b.kind === 'link' ? (
              <Input
                value={b.url}
                onChange={(e) => updBtn(b.id, { url: e.target.value })}
                placeholder='https://example.com/page'
              />
            ) : (
              <div className='flex flex-wrap items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'
                  disabled={uploadingId === b.id}
                  onClick={() => {
                    pendingId.current = b.id;
                    fileRef.current?.click();
                  }}
                >
                  {uploadingId === b.id ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    <FileUp className='h-4 w-4' />
                  )}
                  {b.url ? 'Replace PDF' : 'Upload PDF'}
                </Button>
                {b.url && (
                  <span className='inline-flex items-center gap-1.5 text-xs text-gray-500'>
                    <FileText className='h-3.5 w-3.5 text-brand-primary' /> PDF
                    attached
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      <Button variant='outline' size='sm' className='gap-2' onClick={addBtn}>
        <Plus className='h-4 w-4' /> Add button
      </Button>
    </div>
  );
}

function PhotosBlockEditor({
  photos,
  update,
  onUploadFile,
}: {
  photos: string[];
  update: Update;
  onUploadFile?: (file: File) => Promise<string | null>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const addPhotos = async (files: File[]) => {
    if (!onUploadFile) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const url = await onUploadFile(f);
        if (url) urls.push(url);
      }
      if (urls.length) update({ photos: [...photos, ...urls] }, true);
    } finally {
      setUploading(false);
    }
  };
  const removePhoto = (i: number) =>
    update({ photos: photos.filter((_, idx) => idx !== i) }, true);

  return (
    <div className='space-y-2'>
      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={(e) => {
          const fs = Array.from(e.target.files ?? []);
          if (fs.length) addPhotos(fs);
          e.target.value = '';
        }}
      />
      {photos.length > 0 && (
        <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
          {photos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className='group relative overflow-hidden rounded-lg border border-gray-200'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=''
                className='aspect-square w-full object-cover'
              />
              <button
                type='button'
                onClick={() => removePhoto(i)}
                title='Remove photo'
                className='absolute right-1 top-1 rounded-full bg-black/55 p-1 text-white opacity-0 transition group-hover:opacity-100'
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </div>
          ))}
        </div>
      )}
      <Button
        variant='outline'
        size='sm'
        className='gap-2'
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
      >
        {uploading ? (
          <Loader2 className='h-4 w-4 animate-spin' />
        ) : (
          <ImagePlus className='h-4 w-4' />
        )}
        Add photos
      </Button>
    </div>
  );
}

function VideoBlockEditor({
  block,
  update,
  onUploadFile,
}: {
  block: { kind: 'upload' | 'link'; url: string };
  update: Update;
  onUploadFile?: (file: File) => Promise<string | null>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (file: File) => {
    if (!onUploadFile) return;
    setUploading(true);
    try {
      const url = await onUploadFile(file);
      if (url) update({ kind: 'upload', url }, true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='space-y-2'>
      <input
        ref={fileRef}
        type='file'
        accept='video/*'
        className='hidden'
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handle(f);
          e.target.value = '';
        }}
      />
      <div className='inline-flex overflow-hidden rounded-lg border border-gray-200'>
        <button
          type='button'
          onClick={() =>
            block.kind !== 'link' && update({ kind: 'link', url: '' }, true)
          }
          className={`px-3 py-1.5 text-xs font-medium ${block.kind === 'link' ? TOGGLE_ON : TOGGLE_OFF}`}
        >
          Video link
        </button>
        <button
          type='button'
          onClick={() =>
            block.kind !== 'upload' && update({ kind: 'upload', url: '' }, true)
          }
          className={`px-3 py-1.5 text-xs font-medium ${block.kind === 'upload' ? TOGGLE_ON : TOGGLE_OFF}`}
        >
          Upload
        </button>
      </div>
      {block.kind === 'link' ? (
        <Input
          value={block.url}
          onChange={(e) => update({ url: e.target.value })}
          placeholder='YouTube, Vimeo or a direct .mp4 link'
        />
      ) : (
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='gap-2'
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <FileUp className='h-4 w-4' />
            )}
            {block.url ? 'Replace video' : 'Upload video'}
          </Button>
          {block.url && (
            <span className='inline-flex items-center gap-1.5 text-xs text-gray-500'>
              <Film className='h-3.5 w-3.5 text-brand-primary' /> Video attached
            </span>
          )}
        </div>
      )}
      {block.url && (
        <div className='mt-2 max-w-3xl'>
          <VideoPlayer url={block.url} />
        </div>
      )}
    </div>
  );
}

function PdfBlockEditor({
  url,
  update,
  onUploadFile,
}: {
  url: string;
  update: Update;
  onUploadFile?: (file: File) => Promise<string | null>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (file: File) => {
    if (!onUploadFile) return;
    setUploading(true);
    try {
      const u = await onUploadFile(file);
      if (u) update({ url: u }, true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='space-y-2'>
      <input
        ref={fileRef}
        type='file'
        accept='application/pdf'
        className='hidden'
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handle(f);
          e.target.value = '';
        }}
      />
      <div className='flex flex-wrap items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          className='gap-2'
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <FileUp className='h-4 w-4' />
          )}
          {url ? 'Replace PDF' : 'Upload PDF'}
        </Button>
        {url && (
          <Button
            variant='outline'
            size='sm'
            className='gap-2 text-red-500 hover:bg-red-50 hover:text-red-600'
            onClick={() => update({ url: '' }, true)}
          >
            <Trash2 className='h-4 w-4' /> Remove
          </Button>
        )}
      </div>
      {url && (
        <div className='mt-2'>
          <PdfPages url={url} />
        </div>
      )}
    </div>
  );
}

function BlockEdit({
  block,
  update,
  onUploadFile,
}: {
  block: CustomBlock;
  update: Update;
  onUploadFile?: (file: File) => Promise<string | null>;
}) {
  switch (block.type) {
    case 'text':
      return (
        <div className='max-w-3xl'>
          <RichTextEditor
            value={block.html}
            onChange={(html) => update({ html })}
            placeholder='Add your content...'
          />
        </div>
      );
    case 'table':
      return (
        <TableEditor
          rows={normRows(block.rows)}
          onChange={(rows, commit) => update({ rows }, commit)}
        />
      );
    case 'buttons':
      return (
        <ButtonsBlockEditor
          buttons={block.buttons}
          update={update}
          onUploadFile={onUploadFile}
        />
      );
    case 'photos':
      return (
        <PhotosBlockEditor
          photos={block.photos}
          update={update}
          onUploadFile={onUploadFile}
        />
      );
    case 'video':
      return (
        <VideoBlockEditor
          block={block}
          update={update}
          onUploadFile={onUploadFile}
        />
      );
    case 'pdf':
      return (
        <PdfBlockEditor
          url={block.url}
          update={update}
          onUploadFile={onUploadFile}
        />
      );
  }
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function CustomSection({
  data,
  editable,
  onChange,
  onUploadFile,
  onCommit,
}: {
  data: CustomData;
  editable?: boolean;
  onChange?: (patch: Partial<CustomData>) => void;
  onUploadFile?: (file: File) => Promise<string | null>;
  onCommit?: () => void;
}) {
  const blocks = resolveBlocks(data);

  const write = (next: CustomBlock[], commit = true) => {
    onChange?.({ blocks: next });
    if (commit) onCommit?.();
  };
  const updateBlock = (
    id: string,
    patch: Record<string, unknown>,
    commit = false,
  ) =>
    write(
      blocks.map((b) =>
        b.id === id ? ({ ...b, ...patch } as CustomBlock) : b,
      ),
      commit,
    );
  const moveBlock = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[j]] = [next[j], next[index]];
    write(next, true);
  };
  const removeBlock = (id: string) =>
    write(
      blocks.filter((b) => b.id !== id),
      true,
    );
  const addBlock = (type: CustomBlock['type']) =>
    write([...blocks, newBlock(type)], true);

  return (
    <>
      <SectionHeading
        title={data.title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder='Custom Section'
      />

      {editable ? (
        <div className='space-y-3'>
          {blocks.map((block, i) => {
            const Icon = BLOCK_ICONS[block.type];
            return (
              <div
                key={block.id}
                className='rounded-2xl border border-gray-200 bg-white p-3'
              >
                <div className='mb-2.5 flex items-center justify-between gap-2'>
                  <span className='flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400'>
                    <Icon className='h-3.5 w-3.5' /> {BLOCK_LABELS[block.type]}
                  </span>
                  <div className='flex items-center gap-0.5'>
                    <button
                      type='button'
                      onClick={() => moveBlock(i, -1)}
                      disabled={i === 0}
                      title='Move up'
                      className='rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-25'
                    >
                      <ChevronUp className='h-4 w-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => moveBlock(i, 1)}
                      disabled={i === blocks.length - 1}
                      title='Move down'
                      className='rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-25'
                    >
                      <ChevronDown className='h-4 w-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => removeBlock(block.id)}
                      title='Remove block'
                      className='rounded-lg p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </div>
                <BlockEdit
                  block={block}
                  update={(patch, commit) =>
                    updateBlock(block.id, patch, commit)
                  }
                  onUploadFile={onUploadFile}
                />
              </div>
            );
          })}

          {/* Add block */}
          <div className='rounded-2xl border border-dashed border-gray-300 p-3'>
            <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400'>
              Add block
            </p>
            <div className='flex flex-wrap gap-2'>
              {BLOCK_TYPES.map((t) => {
                const Icon = BLOCK_ICONS[t];
                return (
                  <Button
                    key={t}
                    variant='outline'
                    size='sm'
                    className='gap-1.5'
                    onClick={() => addBlock(t)}
                  >
                    <Icon className='h-4 w-4' /> {BLOCK_LABELS[t]}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='space-y-6'>
          {blocks.map((block) => (
            <BlockRead key={block.id} block={block} />
          ))}
        </div>
      )}
    </>
  );
}
