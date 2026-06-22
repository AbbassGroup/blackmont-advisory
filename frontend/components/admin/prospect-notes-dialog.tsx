'use client';

import { useState } from 'react';
import { Loader2, StickyNote, Pencil, Trash2, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
  /** When true the dialog is view-only (vendor). */
  readOnly?: boolean;
  saving?: boolean;
  onCreate?: (body: string) => Promise<void>;
  onUpdate?: (noteId: string, body: string) => Promise<void>;
  onDelete?: (noteId: string) => Promise<void>;
}

const formatDate = (s: string) =>
  new Date(s).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

export function ProspectNotesDialog({
  open,
  onOpenChange,
  prospectName,
  notes,
  loading = false,
  readOnly = false,
  saving = false,
  onCreate,
  onUpdate,
  onDelete,
}: ProspectNotesDialogProps) {
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState('');

  const handleCreate = async () => {
    if (!draft.trim() || !onCreate) return;
    await onCreate(draft.trim());
    setDraft('');
  };

  const handleSaveEdit = async (noteId: string) => {
    if (!editBody.trim() || !onUpdate) return;
    await onUpdate(noteId, editBody.trim());
    setEditingId(null);
    setEditBody('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 bg-card'>
        <DialogHeader className='px-6 py-4 border-b border-border'>
          <DialogTitle className='flex items-center gap-2 text-lg text-secondary'>
            <StickyNote className='w-5 h-5 text-accent' />
            Notes — {prospectName}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto p-6 space-y-4'>
          {loading ? (
            <div className='flex justify-center py-8'>
              <Loader2 className='w-6 h-6 animate-spin text-accent' />
            </div>
          ) : notes.length === 0 ? (
            <p className='text-center text-muted-foreground py-8 text-sm'>
              No notes yet.
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className='border border-border bg-muted/40 p-3'
              >
                {editingId === note._id ? (
                  <div className='space-y-2'>
                    <Textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      rows={3}
                      className='text-sm'
                    />
                    <div className='flex justify-end gap-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setEditingId(null)}
                        disabled={saving}
                      >
                        <X className='w-4 h-4' />
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => handleSaveEdit(note._id)}
                        disabled={saving}
                        className='rounded-none bg-accent text-primary hover:bg-accent-light'
                      >
                        {saving ? (
                          <Loader2 className='w-4 h-4 animate-spin' />
                        ) : (
                          <Check className='w-4 h-4' />
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className='text-sm text-foreground whitespace-pre-wrap'>
                      {note.body}
                    </p>
                    <div className='mt-2 flex items-center justify-between'>
                      <span className='text-xs text-muted-foreground'>
                        {note.authorName ? `${note.authorName} · ` : ''}
                        {formatDate(note.createdAt)}
                      </span>
                      {!readOnly && (
                        <div className='flex items-center gap-1'>
                          <button
                            onClick={() => {
                              setEditingId(note._id);
                              setEditBody(note.body);
                            }}
                            className='p-1 text-muted-foreground hover:text-accent rounded'
                            title='Edit'
                          >
                            <Pencil className='w-3.5 h-3.5' />
                          </button>
                          <button
                            onClick={() => onDelete?.(note._id)}
                            className='p-1 text-muted-foreground hover:text-red-500 rounded'
                            title='Delete'
                          >
                            <Trash2 className='w-3.5 h-3.5' />
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {!readOnly && (
          <div className='border-t border-border p-4 space-y-2'>
            <Textarea
              placeholder='Add a note…'
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              className='text-sm'
            />
            <div className='flex justify-end'>
              <Button
                size='sm'
                onClick={handleCreate}
                disabled={saving || !draft.trim()}
                className='rounded-none bg-accent text-primary hover:bg-accent-light'
              >
                {saving ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  'Add Note'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
