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
import { uploadBlogImage, blogErrorMessage, clampHeadings } from '@/lib/blogs';

/**
 * Heading levels the toolbar offers. The article title is the page's h1, so the
 * body starts at h2; anything outside this range is clamped into it on load and
 * paste, since TipTap would otherwise drop it to a plain paragraph.
 */
const HEADING_LEVELS = [2, 3, 4] as const;
const toEditorHeadings = (html: string) => clampHeadings(html, HEADING_LEVELS[0], HEADING_LEVELS[HEADING_LEVELS.length - 1]);
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
  disabled?: boolean;
}

export function BlogEditor({
  value,
  onChange,
  placeholder = 'Write your blog content here...',
  disabled = false,
}: BlogEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [...HEADING_LEVELS] },
        link: { openOnClick: false, autolink: true },
      }),
      Underline,
      BlogImage,
    ],
    content: toEditorHeadings(value),
    // The editor is rendered inside a client page but Next still prerenders it;
    // rendering immediately would mismatch the server HTML.
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editable: !disabled,
    editorProps: {
      attributes: { role: 'textbox', 'aria-multiline': 'true', 'aria-labelledby': 'blog-content-title', class: 'blog-article-editor' },
      transformPastedHTML: toEditorHeadings,
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync external changes (loading an existing article) without clobbering the
  // user's cursor while they type — hence the equality check.
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(toEditorHeadings(value || ''));
    }
  }, [value, editor]);

  useEffect(() => { editor?.setEditable(!disabled); }, [editor, disabled]);

  if (!editor) {
    return (
      <div role='status' className='border border-advisory-input bg-white'>
        <span className='sr-only'>Loading article content editor.</span>
        <div aria-hidden='true' className='flex h-[54px] gap-2 overflow-hidden border-b border-advisory-rule bg-canvas p-2'>{[0, 1, 2, 3, 4, 5, 6].map((index) => <span key={index} className='h-9 w-9 shrink-0 animate-pulse bg-white motion-reduce:animate-none' />)}</div>
        <div aria-hidden='true' className='min-h-[420px] p-5'><div className='h-4 w-3/4 animate-pulse bg-canvas motion-reduce:animate-none' /></div>
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
    if (!file || disabled || uploading) return;

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
    <div className='min-w-0 border border-advisory-input bg-white focus-within:border-gilt'>
      <div role='region' aria-label='Article formatting' tabIndex={0} className='max-w-full overflow-x-auto border-b border-advisory-rule bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'>
      <fieldset disabled={disabled} aria-label='Article formatting controls' className='m-0 flex w-max min-w-full items-center gap-0.5 border-0 p-1.5'>
        {/* Paragraph / heading level */}
        <ToolbarButton
          title='Paragraph'
          active={editor.isActive('paragraph')}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <span className='px-0.5 text-xs font-semibold'>P</span>
        </ToolbarButton>
        {HEADING_LEVELS.map((level) => (
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
          disabled={disabled || uploading}
          onChange={(e) => handleImagePicked(e.target.files?.[0] ?? null)}
        />
      </fieldset>
      </div>
      {uploading && <p role='status' className='m-0 border-b border-advisory-rule bg-canvas px-5 py-3 text-xs text-ink'>Uploading image…</p>}

      <div
        className='relative min-h-[420px] bg-white p-5 text-[15px] leading-[1.8] text-ink [&_.ProseMirror]:min-h-[378px] [&_.ProseMirror]:outline-none [&_.ProseMirror_h2]:mt-8 [&_.ProseMirror_h2]:mb-4 [&_.ProseMirror_h2]:font-advisory-heading [&_.ProseMirror_h2]:text-[25px] [&_.ProseMirror_h2]:leading-[1.4] [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-midnight [&_.ProseMirror_h3]:mt-7 [&_.ProseMirror_h3]:mb-3 [&_.ProseMirror_h3]:font-advisory-heading [&_.ProseMirror_h3]:text-[21px] [&_.ProseMirror_h3]:leading-[1.45] [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:text-midnight [&_.ProseMirror_h4]:mt-6 [&_.ProseMirror_h4]:mb-3 [&_.ProseMirror_h4]:text-lg [&_.ProseMirror_h4]:font-semibold [&_.ProseMirror_h4]:text-midnight [&_.ProseMirror_p]:my-4 [&_.ProseMirror_ul]:my-4 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:my-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:my-1 [&_.ProseMirror_li_p]:my-0 [&_.ProseMirror_blockquote]:my-5 [&_.ProseMirror_blockquote]:border-l [&_.ProseMirror_blockquote]:border-gilt [&_.ProseMirror_blockquote]:pl-5 [&_.ProseMirror_hr]:my-7 [&_.ProseMirror_hr]:border-advisory-rule [&_.ProseMirror_a]:text-midnight [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:decoration-gilt [&_.ProseMirror_a]:underline-offset-4 [&_.ProseMirror_img]:my-5 [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:max-w-full [&_.ProseMirror-selectednode]:outline-2 [&_.ProseMirror-selectednode]:outline-gilt [&_.ProseMirror>:first-child]:mt-0'
        onClick={() => { if (!disabled) editor.chain().focus().run(); }}
      >
        {editor.isEmpty && <p aria-hidden='true' className='pointer-events-none absolute top-5 right-5 left-5 m-0 text-ink/65'>{placeholder}</p>}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarDivider() {
  return <span className='mx-1 h-5 w-px bg-advisory-rule' />;
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
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex size-10 shrink-0 items-center justify-center text-midnight transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt motion-reduce:transition-none',
        active
          ? 'bg-midnight text-white'
          : 'text-ink hover:bg-white hover:text-midnight',
        disabled && 'cursor-not-allowed opacity-40',
      )}
    >
      {children}
    </button>
  );
}
