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
      <div role='group' aria-label='Text formatting' className='flex flex-wrap items-center gap-1 border border-advisory-rule border-b-0 bg-canvas p-1 font-advisory-body'>
        {tools.map((tool) => (
          <button
            key={tool.title}
            type='button'
            onClick={tool.action}
            title={tool.title}
            aria-label={tool.title}
            aria-pressed={tool.active}
            className={`inline-flex size-10 cursor-pointer items-center justify-center border border-transparent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none ${
              tool.active
                ? 'bg-midnight text-white'
                : 'text-midnight hover:border-advisory-rule hover:bg-white'
            }`}
          >
            <tool.icon aria-hidden='true' className='size-4' />
          </button>
        ))}
      </div>
      <div
        className='min-h-[120px] border border-advisory-rule bg-white p-3 transition-colors duration-150 focus-within:border-gilt motion-reduce:transition-none [&_.ProseMirror]:min-h-[96px] [&_.ProseMirror]:outline-none'
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
