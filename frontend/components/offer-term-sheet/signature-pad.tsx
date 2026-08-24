'use client';

import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, PenLine, Type } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const PAD_HEIGHT = 180;
const INK = '#1f2937';
const TYPED_FONT = "56px 'Brush Script MT', 'Segoe Script', 'Apple Chancery', cursive";

// The library owns the canvas; typed names are painted onto it, so output is always a PNG.
export function SignaturePad({
  onChange,
  invalid = false,
}: {
  onChange: (dataUrl: string) => void;
  invalid?: boolean;
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
    <div className='space-y-2.5'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex gap-1 rounded-md border border-gray-200 bg-gray-50 p-1'>
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
          className='flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-800 disabled:opacity-40'
        >
          <Eraser className='h-3.5 w-3.5' /> Clear
        </button>
      </div>

      {mode === 'type' && (
        <Input
          value={typed}
          placeholder='Type your full name'
          onChange={(e) => {
            setTyped(e.target.value);
            paintTyped(e.target.value);
          }}
          className='border-gray-200'
        />
      )}

      <div
        className={cn(
          'relative rounded-md border bg-white transition-colors',
          invalid ? 'border-red-400' : 'border-gray-200',
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
            className: cn(
              'w-full rounded-md',
              mode === 'draw' ? 'cursor-crosshair' : 'pointer-events-none',
            ),
            style: { height: PAD_HEIGHT, touchAction: 'none' },
          }}
        />
        <span className='pointer-events-none absolute inset-x-8 bottom-8 border-b border-dashed border-gray-300' />
        {empty && (
          <span className='pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-gray-400'>
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
      className={cn(
        'flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium transition-colors',
        active
          ? 'bg-white text-accent'
          : 'text-gray-500 hover:text-gray-800',
      )}
    >
      {children}
    </button>
  );
}
