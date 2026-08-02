"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useAuth } from "@/app/components/AuthProvider";
import PostEditorDialog from "@/app/components/PostEditorDialog";
import { createPost, deletePost, updatePost } from "@/lib/posts";

export function BlogComposer() {
    const { isAdmin } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    if (!isAdmin) return null;

    return (
        <>
            <div>
                <Button size="1" variant="soft" onClick={() => setOpen(true)}>
                    New post
                </Button>
            </div>
            <PostEditorDialog
                open={open}
                onOpenChange={setOpen}
                titleLabel="New post"
                submitLabel="Publish"
                onSubmit={async ({ title, body }) => {
                    await createPost({ title, body });
                    router.refresh();
                }}
            />
        </>
    );
}

export function BlogEditButton({ post }) {
    const { isAdmin } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    if (!isAdmin) return null;

    return (
        <>
            <Button size="1" variant="ghost" onClick={() => setOpen(true)}>
                Edit
            </Button>
            <PostEditorDialog
                open={open}
                onOpenChange={setOpen}
                titleLabel="Edit post"
                submitLabel="Save"
                initialTitle={post.title}
                initialBody={post.body}
                onSubmit={async ({ title, body }) => {
                    await updatePost(post.id, { title, body });
                    router.refresh();
                }}
            />
        </>
    );
}

export function BlogDeleteButton({ postId, redirectTo }) {
    const { isAdmin } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    if (!isAdmin) return null;

    const handleDelete = async () => {
        if (!window.confirm("Delete this post?")) return;
        try {
            await deletePost(postId);
            if (redirectTo) {
                router.push(redirectTo);
            }
            router.refresh();
        } catch (err) {
            setError(err.message || "Could not delete post.");
        }
    };

    return (
        <>
            <Button size="1" color="red" variant="ghost" onClick={handleDelete}>
                Delete
            </Button>
            {error && (
                <Text size="1" color="red">
                    {error}
                </Text>
            )}
        </>
    );
}
