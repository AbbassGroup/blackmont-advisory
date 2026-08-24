'use client';

import { useEffect, useRef, useState } from 'react';
import { Node, mergeAttributes } from '@tiptap/core';
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
  Quote,
  Minus,
  Link as LinkIcon,
  Unlink,
  ImagePlus,
  Undo2,
  Redo2,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { uploadBlogImage, blogErrorMessage } from '@/lib/blogs';
import { cn } from '@/lib/utils';

/**
 * Minimal image node.
 *
 * StarterKit has no image extension and `@tiptap/extension-image` isn't a
 * dependency here, so rather than add one we declare the node inline — it only
 * needs to round-trip `<img>` through the document. Without it TipTap strips
 * every image from pasted or loaded HTML.
 */
const BlogImage = Node.create({
  name: 'image',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'img[src]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)];
  },
});

interface BlogEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function BlogEditor({
  value,
  onChange,
  placeholder = 'Write your blog content here...',
}: BlogEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false, autolink: true },
      }),
      Underline,
      BlogImage,
    ],
    content: value,
    // The editor is rendered inside a client page but Next still prerenders it;
    // rendering immediately would mismatch the server HTML.
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync external changes (loading an existing article) without clobbering the
  // user's cursor while they type — hence the equality check.
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className='flex min-h-[420px] items-center justify-center border border-border bg-card'>
        <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
      </div>
    );
  }

  const handleSetLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const href = window.prompt('Link URL', previous ?? 'https://');

    // Cancelled — leave the document untouched.
    if (href === null) return;

    if (href.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: href.trim() })
      .run();
  };

  const handleImagePicked = async (file: File | null) => {
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadBlogImage(file);
      editor.chain().focus().insertContent({ type: 'image', attrs: { src: url } }).run();
    } catch (error) {
      toast.error(blogErrorMessage(error, 'Failed to upload image'));
    } finally {
      setUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const marks = [
    { icon: Bold, title: 'Bold', run: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
    { icon: Italic, title: 'Italic', run: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
    { icon: UnderlineIcon, title: 'Underline', run: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline') },
    { icon: Strikethrough, title: 'Strikethrough', run: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike') },
  ];

  const blocks = [
    { icon: List, title: 'Bullet list', run: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
    { icon: ListOrdered, title: 'Numbered list', run: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
    { icon: Quote, title: 'Quote', run: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
    { icon: Minus, title: 'Divider', run: () => editor.chain().focus().setHorizontalRule().run(), active: false },
  ];

  return (
    <div className='border border-border bg-card'>
      <div className='flex flex-wrap items-center gap-0.5 border-b border-border bg-muted px-1.5 py-1.5'>
        {/* Paragraph / heading level */}
        <ToolbarButton
          title='Paragraph'
          active={editor.isActive('paragraph')}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <span className='px-0.5 text-xs font-semibold'>P</span>
        </ToolbarButton>
        {([2, 3, 4] as const).map((level) => (
          <ToolbarButton
            key={level}
            title={`Heading ${level}`}
            active={editor.isActive('heading', { level })}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          >
            <span className='px-0.5 text-xs font-semibold'>H{level}</span>
          </ToolbarButton>
        ))}

        <ToolbarDivider />

        {marks.map((tool) => (
          <ToolbarButton key={tool.title} title={tool.title} active={tool.active} onClick={tool.run}>
            <tool.icon className='h-4 w-4' />
          </ToolbarButton>
        ))}

        <ToolbarDivider />

        {blocks.map((tool) => (
          <ToolbarButton key={tool.title} title={tool.title} active={tool.active} onClick={tool.run}>
            <tool.icon className='h-4 w-4' />
          </ToolbarButton>
        ))}

        <ToolbarDivider />

        <ToolbarButton title='Add link' active={editor.isActive('link')} onClick={handleSetLink}>
          <LinkIcon className='h-4 w-4' />
        </ToolbarButton>
        <ToolbarButton
          title='Remove link'
          active={false}
          disabled={!editor.isActive('link')}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <Unlink className='h-4 w-4' />
        </ToolbarButton>
        <ToolbarButton
          title='Insert image'
          active={false}
          disabled={uploading}
          onClick={() => imageInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <ImagePlus className='h-4 w-4' />
          )}
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          title='Undo'
          active={false}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className='h-4 w-4' />
        </ToolbarButton>
        <ToolbarButton
          title='Redo'
          active={false}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className='h-4 w-4' />
        </ToolbarButton>

        <input
          ref={imageInputRef}
          type='file'
          accept='image/*'
          hidden
          onChange={(e) => handleImagePicked(e.target.files?.[0] ?? null)}
        />
      </div>

      <div
        className='min-h-[420px] bg-card p-4 [&_.ProseMirror]:min-h-[390px] [&_.ProseMirror]:outline-none'
        onClick={() => editor.chain().focus().run()}
      >
        <style>{`
          .ProseMirror p.is-editor-empty:first-child::before {
            content: '${placeholder.replace(/'/g, "\\'")}';
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
          .ProseMirror h2 { font-size: 1.5rem; font-weight: 700; margin: 1.2em 0 0.5em; }
          .ProseMirror h3 { font-size: 1.25rem; font-weight: 700; margin: 1.1em 0 0.4em; }
          .ProseMirror h4 { font-size: 1.1rem; font-weight: 600; margin: 1em 0 0.4em; }
          .ProseMirror p { margin: 0.6em 0; line-height: 1.7; }
          .ProseMirror ul { list-style-type: disc; padding-left: 1.5em; margin: 0.6em 0; }
          .ProseMirror ol { list-style-type: decimal; padding-left: 1.5em; margin: 0.6em 0; }
          .ProseMirror li { margin: 0.25em 0; }
          .ProseMirror li p { margin: 0; }
          .ProseMirror blockquote {
            border-left: 3px solid var(--border);
            padding-left: 1em;
            margin: 0.8em 0;
            color: #64748b;
          }
          .ProseMirror hr { border: none; border-top: 1px solid var(--border); margin: 1.4em 0; }
          .ProseMirror a { color: #b08d57; text-decoration: underline; }
          .ProseMirror img { max-width: 100%; height: auto; margin: 1em 0; }
          .ProseMirror img.ProseMirror-selectednode { outline: 2px solid #b08d57; }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarDivider() {
  return <span className='mx-1 h-5 w-px bg-border' />;
}

function ToolbarButton({
  children,
  title,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-7 min-w-7 items-center justify-center px-1 transition-colors',
        active
          ? 'bg-accent/15 text-accent'
          : 'text-muted-foreground hover:bg-background hover:text-foreground',
        disabled && 'cursor-not-allowed opacity-40 hover:bg-transparent',
      )}
    >
      {children}
    </button>
  );
}
