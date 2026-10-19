'use client';

import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, PenLine, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

const PAD_HEIGHT = 180;
const INK = '#1f2937';
const TYPED_FONT = "56px 'Brush Script MT', 'Segoe Script', 'Apple Chancery', cursive";

// The library owns the canvas; typed names are painted onto it, so output is always a PNG.
export function SignaturePad({
  onChange,
  invalid = false,
  id,
  labelledBy,
  describedBy,
}: {
  onChange: (dataUrl: string) => void;
  invalid?: boolean;
  id?: string;
  labelledBy?: string;
  describedBy?: string;
}) {
  const padRef = useRef<SignatureCanvas | null>(null);
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [typed, setTyped] = useState('');
  const [empty, setEmpty] = useState(true);

  // Held in a ref so a new callback identity from the parent never disturbs the pad.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const publish = (hasInk: boolean) => {
    setEmpty(!hasInk);
    const canvas = padRef.current?.getCanvas();
    onChangeRef.current(
      hasInk && canvas ? canvas.toDataURL('image/png') : '',
    );
  };

  const handleEnd = () => publish(!padRef.current?.isEmpty());

  const clear = () => {
    padRef.current?.clear();
    setTyped('');
    publish(false);
  };

  const paintTyped = (text: string) => {
    const canvas = padRef.current?.getCanvas();
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    padRef.current?.clear();
    const trimmed = text.trim();
    if (!trimmed) {
      publish(false);
      return;
    }
    ctx.font = TYPED_FONT;
    ctx.fillStyle = INK;
    ctx.textBaseline = 'middle';
    ctx.fillText(trimmed, 28, PAD_HEIGHT / 2);
    publish(true);
  };

  const switchMode = (next: 'draw' | 'type') => {
    if (next === mode) return;
    clear();
    setMode(next);
  };

  return (
    <div className='flex min-w-0 flex-col gap-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div role='group' aria-label='Signature method' className='flex gap-0.5 border border-advisory-rule bg-canvas p-0.5'>
          <ModeButton active={mode === 'draw'} onClick={() => switchMode('draw')}>
            <PenLine className='h-3.5 w-3.5' /> Draw
          </ModeButton>
          <ModeButton active={mode === 'type'} onClick={() => switchMode('type')}>
            <Type className='h-3.5 w-3.5' /> Type
          </ModeButton>
        </div>
        <button
          type='button'
          onClick={clear}
          disabled={empty}
          className='flex min-h-8 items-center gap-2 px-2 text-xs font-medium text-midnight hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40'
        >
          <Eraser className='h-3.5 w-3.5' /> Clear
        </button>
      </div>

      {mode === 'type' && (
        <div className='flex flex-col gap-2'>
          <label htmlFor={(id || 'signature') + '-typed'} className='text-sm font-medium text-midnight'>Type your full name</label>
          <input id={(id || 'signature') + '-typed'} value={typed} placeholder='Type your full name'
            onChange={(event) => { setTyped(event.target.value); paintTyped(event.target.value); }}
            className='h-10 w-full min-w-0 rounded-none border border-advisory-input bg-white px-3 text-base text-midnight outline-none placeholder:text-ink/65 focus:border-gilt min-[681px]:text-sm' />
        </div>
      )}

      <div
        className={cn(
          'relative border bg-white transition-colors duration-150 focus-within:border-gilt motion-reduce:transition-none',
          invalid ? 'border-red-800' : 'border-advisory-input',
        )}
      >
        <SignatureCanvas
          ref={padRef}
          penColor={INK}
          minWidth={0.7}
          maxWidth={2.4}
          velocityFilterWeight={0.7}
          onEnd={handleEnd}
          canvasProps={{
            id,
            tabIndex: 0,
            'aria-label': labelledBy ? undefined : 'Signature',
            'aria-labelledby': labelledBy,
            'aria-describedby': describedBy,
            'aria-invalid': invalid,
            className: cn(
              'w-full outline-none',
              mode === 'draw' ? 'cursor-crosshair' : 'pointer-events-none',
            ),
            style: { height: PAD_HEIGHT, touchAction: 'none' },
          }}
        />
        <span className='pointer-events-none absolute inset-x-8 bottom-8 border-b border-dashed border-advisory-input' />
        {empty && (
          <span className='pointer-events-none absolute inset-x-0 bottom-3 px-3 text-center text-xs text-ink/70'>
            {mode === 'draw'
              ? 'Sign above with your mouse or finger'
              : 'Your typed name appears here'}
          </span>
        )}
      </div>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex min-h-8 items-center gap-2 px-3 py-1 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none',
        active
          ? 'bg-midnight text-white'
          : 'text-ink hover:bg-white hover:text-midnight',
      )}
    >
      {children}
    </button>
  );
}
