'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter content...',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  const tools = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), title: 'Bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), title: 'Italic' },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), title: 'Underline' },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), title: 'Strikethrough' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), title: 'Bullet List' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), title: 'Numbered List' },
  ];

  return (
    <div>
      <div className='flex items-center gap-0.5 border border-border border-b-0 rounded-t-lg bg-muted px-1 py-1'>
        {tools.map((tool) => (
          <button
            key={tool.title}
            type='button'
            onClick={tool.action}
            title={tool.title}
            className={`p-1.5 rounded transition-colors ${
              tool.active
                ? 'bg-accent/15 text-accent'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <tool.icon className='w-4 h-4' />
          </button>
        ))}
      </div>
      <div
        className='border border-border rounded-b-lg bg-card min-h-[120px] p-3 focus-within:ring-2 focus-within:ring-accent/15 focus-within:border-accent transition-colors [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[96px]'
        style={{
          // placeholder styling
          // @ts-expect-error CSS custom property
          '--placeholder': `"${placeholder}"`,
        }}
      >
        <style>{`
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
          .ProseMirror ul {
            list-style-type: disc;
            padding-left: 1.5em;
            margin: 0.5em 0;
          }
          .ProseMirror ol {
            list-style-type: decimal;
            padding-left: 1.5em;
            margin: 0.5em 0;
          }
          .ProseMirror li {
            margin: 0.25em 0;
          }
          .ProseMirror li p {
            margin: 0;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
