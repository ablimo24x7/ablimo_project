"use client";

import * as React from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Quote,
  Minus,
  Undo2,
  Redo2,
  Table as TableIcon,
  Highlighter,
  Eye,
  Code2,
} from "lucide-react";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`h-8 w-8 p-0 ${
        isActive
          ? "bg-abGold/20 text-abGold hover:bg-abGold/30"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </Button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-gray-600 mx-1" />;
}

function Toolbar({ editor }: { editor: Editor }) {
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("");
  const [imageOpen, setImageOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setLinkOpen(false);
    setLinkUrl("");
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
    setImageOpen(false);
    setImageUrl("");
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-gray-700 bg-[#1a1b1f]">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          title="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={editor.isActive("taskList")}
          title="Task List"
        >
          <ListChecks className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setLinkOpen(true);
            }
          }}
          isActive={editor.isActive("link")}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setImageOpen(true)}
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run();
          }}
          title="Insert Table"
        >
          <TableIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Link Dialog */}
      <Dialog open={linkOpen} onOpenChange={setLinkOpen}>
        <DialogContent className="bg-[#1c1d21] border-gray-700">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <Input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="bg-[#292a30] border-gray-600"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setLink();
              }
            }}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setLinkOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={setLink}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="bg-[#1c1d21] border-gray-700">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (https://...)"
            className="bg-[#292a30] border-gray-600"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImage();
              }
            }}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-2 h-32 w-full rounded-md object-cover"
            />
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setImageOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={addImage}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function WysiwygEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className = "",
}: WysiwygEditorProps) {
  const [htmlView, setHtmlView] = React.useState(false);
  const [htmlInput, setHtmlInput] = React.useState(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none min-h-[200px] p-4 focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-abGold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:my-3 [&_pre]:bg-[#111216] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_code]:text-abGold [&_code]:bg-[#111216] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_a]:text-abGold [&_a]:underline [&_a]:hover:text-yellow-400 [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-gray-600 [&_th]:bg-[#111216] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-gray-600 [&_td]:px-3 [&_td]:py-2 [&_hr]:border-gray-600 [&_hr]:my-4 [&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:pl-0 [&_ul[data-type='taskList']_li]:flex [&_ul[data-type='taskList']_li]:items-center [&_ul[data-type='taskList']_li]:gap-2 [&_ul[data-type='taskList']_li]:mb-1",
      },
    },
  });

  // Sync external value changes
  React.useEffect(() => {
    if (editor && !htmlView) {
      const current = editor.getHTML();
      if (current !== value) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }
  }, [value, editor, htmlView]);

  const toggleHtmlView = () => {
    if (htmlView) {
      // Switching back to visual — apply HTML to editor
      if (editor) {
        editor.commands.setContent(htmlInput, { emitUpdate: false });
      }
      onChange(htmlInput);
      setHtmlView(false);
    } else {
      // Switching to HTML — get current HTML
      setHtmlInput(editor ? editor.getHTML() : value);
      setHtmlView(true);
    }
  };

  return (
    <div className={`border border-gray-700 rounded-lg overflow-hidden bg-[#292a30] ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-700 bg-[#1a1b1f] px-2">
        <div className="flex-1">
          {editor && <Toolbar editor={editor} />}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHtmlView}
          className="h-8 gap-1.5 text-xs text-gray-400 hover:text-white ml-2 shrink-0"
        >
          {htmlView ? (
            <>
              <Eye className="h-3.5 w-3.5" /> Visual
            </>
          ) : (
            <>
              <Code2 className="h-3.5 w-3.5" /> HTML
            </>
          )}
        </Button>
      </div>

      {htmlView ? (
        <textarea
          value={htmlInput}
          onChange={(e) => {
            setHtmlInput(e.target.value);
            onChange(e.target.value);
          }}
          className="w-full min-h-[200px] p-4 bg-[#111216] text-gray-300 font-mono text-sm resize-y focus:outline-none"
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
