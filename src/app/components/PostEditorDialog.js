"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Dialog, Flex, Text, TextField, Theme } from "@radix-ui/themes";
import { bodyToEditorContent, plainTextFromHtml } from "@/lib/postContent";

function ToolbarButton({ active, disabled, onClick, children }) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`rounded px-2 py-1 text-sm transition-colors ${
                active ? "bg-black text-white" : "bg-transparent text-black hover:bg-black/5"
            } disabled:opacity-40`}
        >
            {children}
        </button>
    );
}

function EditorToolbar({ editor }) {
    if (!editor) return null;

    return (
        <Flex
            gap="1"
            wrap="wrap"
            className="border-b border-black/10 px-3 py-2"
        >
            <ToolbarButton
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                Bold
            </ToolbarButton>
            <ToolbarButton
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                Italic
            </ToolbarButton>
            <ToolbarButton
                active={editor.isActive("heading", { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                H2
            </ToolbarButton>
            <ToolbarButton
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                List
            </ToolbarButton>
            <ToolbarButton
                active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                Numbered
            </ToolbarButton>
            <ToolbarButton
                active={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                Quote
            </ToolbarButton>
            <ToolbarButton
                active={editor.isActive("codeBlock")}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                Code
            </ToolbarButton>
        </Flex>
    );
}

export default function PostEditorDialog({
    open,
    onOpenChange,
    onSubmit,
    initialTitle = "",
    initialBody = "",
    submitLabel = "Publish",
    titleLabel = "New post",
}) {
    const [title, setTitle] = useState(initialTitle);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const editor = useEditor({
        extensions: [StarterKit],
        content: bodyToEditorContent(initialBody),
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "post-editor min-h-[50vh] flex-1 px-4 py-3 outline-none",
            },
        },
    });

    useEffect(() => {
        if (!open) return;
        setTitle(initialTitle);
        setError("");
        setSaving(false);
        if (editor) {
            editor.commands.setContent(bodyToEditorContent(initialBody));
        }
    }, [open, initialTitle, initialBody, editor]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!editor) return;

        const body = editor.getHTML();
        if (!title.trim() || !plainTextFromHtml(body)) {
            setError("Title and body are required.");
            return;
        }

        setSaving(true);
        setError("");
        try {
            await onSubmit({ title: title.trim(), body });
            onOpenChange(false);
        } catch (err) {
            setError(err.message || "Could not save post.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content
                aria-describedby={undefined}
                style={{
                    position: "fixed",
                    inset: 0,
                    maxWidth: "100vw",
                    width: "100vw",
                    height: "100vh",
                    maxHeight: "100vh",
                    borderRadius: 0,
                    padding: 0,
                    overflow: "hidden",
                }}
            >
                <Theme appearance="light" className="flex h-full flex-col bg-white">
                    <form onSubmit={handleSubmit} className="flex h-full flex-col">
                        <Flex
                            align="center"
                            justify="between"
                            gap="3"
                            className="border-b border-black/10 px-4 py-3"
                        >
                            <Dialog.Title className="m-0">
                                <Text size="5" weight="bold">
                                    {titleLabel}
                                </Text>
                            </Dialog.Title>
                            <Flex gap="2">
                                <Dialog.Close>
                                    <Button type="button" variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Button type="submit" disabled={saving}>
                                    {saving ? "Saving…" : submitLabel}
                                </Button>
                            </Flex>
                        </Flex>

                        <div className="border-b border-black/10 px-4 py-3">
                            <TextField.Root
                                placeholder="Title"
                                size="3"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </div>

                        <EditorToolbar editor={editor} />

                        <div className="min-h-0 flex-1 overflow-y-auto">
                            <EditorContent editor={editor} className="h-full" />
                        </div>

                        {error && (
                            <Text size="2" color="red" className="px-4 py-2">
                                {error}
                            </Text>
                        )}
                    </form>
                </Theme>
            </Dialog.Content>
        </Dialog.Root>
    );
}
