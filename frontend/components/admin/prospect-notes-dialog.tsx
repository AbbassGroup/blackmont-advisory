'use client';

import { useId, useState } from 'react';
import { Loader2, Pencil, Trash2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LandingButton } from '@/components/landing/presentation';
import { landingFontVariables } from '@/components/landing/fonts';
import { cn } from '@/lib/utils';

export type ProspectNote = {
  _id: string;
  body: string;
  authorName?: string;
  createdAt: string;
  updatedAt?: string;
};

interface ProspectNotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prospectName: string;
  notes: ProspectNote[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  /** When true the dialog is view-only (vendor). */
  readOnly?: boolean;
  saving?: boolean;
  onCreate?: (body: string) => Promise<void | boolean>;
  onUpdate?: (noteId: string, body: string) => Promise<void | boolean>;
  onDelete?: (noteId: string) => Promise<void | boolean>;
}

const TEXTAREA_CLASS = 'block w-full min-w-0 resize-y rounded-none border border-advisory-input bg-white px-3 py-2 font-advisory-body text-base leading-[1.75] text-midnight outline-none transition-colors duration-150 placeholder:text-ink/65 focus:border-gilt disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none min-[681px]:text-sm';
const ICON_CLASS = 'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-advisory-rule hover:bg-canvas hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none';

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString('en-AU', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
}

export function ProspectNotesDialog({
  open, onOpenChange, prospectName, notes, loading = false, error = false, onRetry,
  readOnly = false, saving = false, onCreate, onUpdate, onDelete,
}: ProspectNotesDialogProps) {
  const prefix = useId();
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState('');
  const [pending, setPending] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');
  const busy = saving || Boolean(pending);

  const run = async (key: string, operation: () => Promise<void | boolean>) => {
    if (busy || readOnly) return false;
    setPending(key);
    setActionError('');
    try {
      if (await operation() === false) {
        setActionError('That note change could not be completed. Please try again.');
        return false;
      }
      return true;
    } catch {
      setActionError('That change could not be completed. Please try again.');
      return false;
    } finally {
      setPending(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!busy) onOpenChange(next); }}>
      <DialogContent showCloseButton={false} className={cn(landingFontVariables, 'flex max-h-[85dvh] min-h-0 w-full flex-col gap-0 overflow-hidden rounded-none border border-advisory-rule bg-white p-0 font-advisory-body text-sm text-ink ring-0 sm:max-w-[560px]')}>
        <DialogHeader className='shrink-0 border-b border-advisory-rule p-6 pr-16 min-[681px]:p-8 min-[681px]:pr-20'>
          <DialogTitle className='m-0 font-advisory-heading text-[23px] leading-[1.35] font-bold tracking-normal text-midnight'>Prospect notes</DialogTitle>
          <DialogDescription className='mt-2 break-words text-sm leading-[1.75] text-ink'>{prospectName || 'Notes for this prospect'}</DialogDescription>
        </DialogHeader>
        <button type='button' disabled={busy} aria-label='Close prospect notes' onClick={() => onOpenChange(false)} className={cn(ICON_CLASS, 'absolute top-4 right-4 size-10')}><X aria-hidden='true' className='size-4' /></button>

        <div aria-busy={loading} className='min-h-0 flex-1 overflow-y-auto px-6 min-[681px]:px-8'>
          {loading ? (
            <div className='py-6'>
              <p role='status' className='sr-only'>Loading notes.</p>
              <div aria-hidden='true' className='flex flex-col gap-4'>{[0, 1].map((index) => <div key={index} className='flex flex-col gap-3'><div className='h-4 w-full animate-pulse bg-canvas motion-reduce:animate-none' /><div className='h-4 w-2/3 animate-pulse bg-canvas motion-reduce:animate-none' /><div className='mb-4 h-3 w-40 animate-pulse bg-canvas motion-reduce:animate-none' /></div>)}</div>
            </div>
          ) : error ? (
            <div role='alert' className='py-6'><p className='mt-0 mb-4 text-sm leading-[1.75] text-ink'>We couldn&apos;t load the notes.</p>{onRetry && <LandingButton variant='outline' size='compact' onClick={onRetry}>Try again</LandingButton>}</div>
          ) : notes.length === 0 ? (
            <div className='py-6'><p className='m-0 font-semibold text-midnight'>No notes yet</p><p className='mt-2 mb-0 text-sm leading-[1.75] text-ink'>{readOnly ? 'Notes shared for this prospect will appear here.' : 'Add a note below to record a conversation or follow-up.'}</p></div>
          ) : (
            <ul className='m-0 flex list-none flex-col divide-y divide-advisory-rule p-0'>
              {notes.map((note) => (
                <li key={note._id} className='min-w-0 py-5'>
                  {editingId === note._id && !readOnly ? (
                    <div className='flex flex-col gap-3'>
                      <label htmlFor={`${prefix}-edit`} className='text-sm font-medium text-midnight'>Edit note</label>
                      <textarea id={`${prefix}-edit`} value={editBody} disabled={busy} onChange={(event) => setEditBody(event.target.value)} rows={3} className={TEXTAREA_CLASS} />
                      <div className='flex flex-wrap justify-end gap-2'>
                        <LandingButton variant='outline' size='compact' disabled={busy} onClick={() => { setEditingId(null); setEditBody(''); setActionError(''); }}>Cancel</LandingButton>
                        <LandingButton size='compact' disabled={busy || !editBody.trim() || !onUpdate} onClick={async () => { if (onUpdate && await run('edit', () => onUpdate(note._id, editBody.trim()))) { setEditingId(null); setEditBody(''); } }}>
                          {pending === 'edit' && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{pending === 'edit' ? 'Saving…' : 'Save changes'}
                        </LandingButton>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className='m-0 break-words whitespace-pre-wrap text-sm leading-[1.8] text-midnight'>{note.body}</p>
                      <div className='mt-3 flex flex-wrap items-center justify-between gap-2'>
                        <p className='m-0 text-xs leading-[1.75] text-ink'>{note.authorName ? `${note.authorName} · ` : ''}{formatDate(note.createdAt)}</p>
                        {!readOnly && <div role='group' aria-label='Note actions' className='flex gap-1'>
                          <button type='button' disabled={busy || !onUpdate} onClick={() => { setEditingId(note._id); setEditBody(note.body); setActionError(''); }} className={ICON_CLASS} title='Edit note' aria-label='Edit note'><Pencil aria-hidden='true' className='size-4' /></button>
                          <button type='button' disabled={busy || !onDelete} onClick={() => { if (onDelete) void run(note._id, () => onDelete(note._id)); }} className={cn(ICON_CLASS, 'text-red-700 hover:bg-red-50 hover:text-red-800')} title='Delete note' aria-label='Delete note'>{pending === note._id ? <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> : <Trash2 aria-hidden='true' className='size-4' />}</button>
                        </div>}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {actionError && <p role='alert' className='m-0 shrink-0 bg-red-50 px-6 py-3 text-sm leading-[1.75] text-red-800 min-[681px]:px-8'>{actionError}</p>}
        {!readOnly && (
          <div className='flex shrink-0 flex-col gap-3 border-t border-advisory-rule p-6 min-[681px]:p-8'>
            <label htmlFor={`${prefix}-new`} className='text-sm font-medium text-midnight'>New note</label>
            <textarea id={`${prefix}-new`} placeholder='Add a note…' value={draft} disabled={busy || loading || error} onChange={(event) => setDraft(event.target.value)} rows={2} className={TEXTAREA_CLASS} />
            <div className='flex justify-end'><LandingButton size='compact' disabled={busy || loading || error || !draft.trim() || !onCreate} onClick={async () => { if (onCreate && await run('create', () => onCreate(draft.trim()))) setDraft(''); }}>
              {pending === 'create' && <Loader2 aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' />}{pending === 'create' ? 'Adding…' : 'Add note'}
            </LandingButton></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
