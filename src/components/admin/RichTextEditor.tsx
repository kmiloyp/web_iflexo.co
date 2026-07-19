"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import type { EditorView } from "@tiptap/pm/view";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Unlink,
} from "lucide-react";
import { uploadArticleImage } from "@/lib/upload-image";
import { cn } from "@/lib/utils";

/**
 * Editor visual (WYSIWYG) tipo Word/WordPress para el contenido del artículo.
 * Escribes con formato real (negrita, títulos, listas…) y por dentro guarda
 * HTML limpio (content_html). Estilado con .prose-iflexo para verse casi
 * igual que en la web publicada.
 */
export function RichTextEditor({
  initialValue,
  onChange,
  onNotice,
}: {
  initialValue: string;
  onChange: (html: string) => void;
  /** Avisos para la barra lateral (imagen optimizada, error de subida…). */
  onNotice?: (message: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false, // requerido en Next App Router (evita hydration mismatch)
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-xl" } }),
      Placeholder.configure({
        placeholder: "Escribe el artículo aquí… (usa la barra para dar formato)",
      }),
    ],
    content: initialValue || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      // Word / Google Docs pegan <img src="data:image/png;base64,…">. Incrustado
      // en content_html revienta el límite del Server Action al guardar, así que
      // se descarta aquí: las imágenes entran por subida, nunca inline.
      transformPastedHTML(html) {
        if (!html.includes("data:image")) return html;
        onNotice?.(
          "Se quitó una imagen pegada dentro del texto. Súbela con el botón de imagen para que quede alojada."
        );
        return html.replace(/<img[^>]+src=["']data:image[^>]*>/gi, "");
      },
      handlePaste(view, event) {
        const files = Array.from(event.clipboardData?.files ?? []);
        return handleImageFiles(view, files, onNotice);
      },
      handleDrop(view, event) {
        const files = Array.from(
          (event as DragEvent).dataTransfer?.files ?? []
        );
        return handleImageFiles(view, files, onNotice);
      },
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[24rem] rounded-xl border border-line bg-white" />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose-iflexo max-w-none px-5 py-4"
      />
    </div>
  );
}

/**
 * Sube las imágenes pegadas/arrastradas y las inserta ya alojadas.
 * Devuelve true si se hizo cargo del evento (para que ProseMirror no
 * las incruste como base64).
 */
function handleImageFiles(
  view: EditorView,
  files: File[],
  onNotice?: (message: string) => void
): boolean {
  const images = files.filter((f) => f.type.startsWith("image/"));
  if (images.length === 0) return false;

  void (async () => {
    for (const file of images) {
      onNotice?.("Subiendo imagen…");
      const result = await uploadArticleImage(file);
      if (!result.ok) {
        onNotice?.(result.error);
        continue;
      }
      onNotice?.(result.note ?? "Imagen insertada.");
      const node = view.state.schema.nodes.image.create({ src: result.url });
      view.dispatch(view.state.tr.replaceSelectionWith(node));
    }
  })();

  return true;
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("URL de la imagen:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-line bg-sand px-2 py-1.5">
      <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Negrita">
        <Bold size={16} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Cursiva">
        <Italic size={16} />
      </Btn>
      <Divider />
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Título 2">
        <Heading2 size={16} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Título 3">
        <Heading3 size={16} />
      </Btn>
      <Divider />
      <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Lista">
        <List size={16} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Lista numerada">
        <ListOrdered size={16} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Cita">
        <Quote size={16} />
      </Btn>
      <Divider />
      <Btn onClick={setLink} active={editor.isActive("link")} label="Enlace">
        <LinkIcon size={16} />
      </Btn>
      {editor.isActive("link") && (
        <Btn onClick={() => editor.chain().focus().unsetLink().run()} label="Quitar enlace">
          <Unlink size={16} />
        </Btn>
      )}
      <Btn onClick={addImage} label="Imagen">
        <ImageIcon size={16} />
      </Btn>
      <Divider />
      <Btn onClick={() => editor.chain().focus().undo().run()} label="Deshacer">
        <Undo2 size={16} />
      </Btn>
      <Btn onClick={() => editor.chain().focus().redo().run()} label="Rehacer">
        <Redo2 size={16} />
      </Btn>
    </div>
  );
}

function Btn({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
        active ? "bg-ink text-white" : "text-ink-soft hover:bg-mist"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-line" />;
}
