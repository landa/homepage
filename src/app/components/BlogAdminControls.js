"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useAuth } from "@/app/components/AuthProvider";
import PostEditorDialog from "@/app/components/PostEditorDialog";
import {
    createPost,
    deletePost,
    listArchivedPosts,
    setPostArchived,
    updatePost,
} from "@/lib/posts";

export function BlogComposer({ onOpenChange } = {}) {
    const { isAdmin } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    if (!isAdmin) return null;

    const handleOpenChange = (next) => {
        setOpen(next);
        onOpenChange?.(next);
    };

    return (
        <>
            <Button size="1" variant="soft" onClick={() => handleOpenChange(true)}>
                New post
            </Button>
            <PostEditorDialog
                open={open}
                onOpenChange={handleOpenChange}
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

export function ArchivedPostsList() {
    const { isAdmin } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    const refresh = useCallback(async () => {
        if (!isAdmin) {
            setPosts([]);
            return;
        }
        try {
            setPosts(await listArchivedPosts());
            setError("");
        } catch (err) {
            setError(err.message || "Could not load archived posts.");
        }
    }, [isAdmin]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    if (!isAdmin || (posts.length === 0 && !error)) return null;

    return (
        <Flex direction="column" gap="2">
            <Text size="1" color="gray">
                Archived
            </Text>
            {posts.map((post) => (
                <Flex key={post.id} align="center" justify="between" gap="2">
                    <Text size="1" className="min-w-0 truncate">
                        {post.title}
                    </Text>
                    <Button
                        size="1"
                        variant="ghost"
                        onClick={async () => {
                            await setPostArchived(post.id, false);
                            await refresh();
                            router.refresh();
                        }}
                    >
                        Unarchive
                    </Button>
                </Flex>
            ))}
            {error && (
                <Text size="1" color="red">
                    {error}
                </Text>
            )}
        </Flex>
    );
}

export function BlogPostActions({ post, redirectTo, className }) {
    const { isAdmin } = useAuth();

    if (!isAdmin) return null;

    return (
        <Flex gap="1" wrap="wrap" className={className}>
            <BlogEditButton post={post} />
            <BlogArchiveButton post={post} redirectTo={redirectTo} />
            <BlogDeleteButton postId={post.id} redirectTo={redirectTo} />
        </Flex>
    );
}

export function BlogArchiveButton({ post, redirectTo }) {
    const { isAdmin } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    if (!isAdmin) return null;

    const archived = Boolean(post.archived);

    const handleToggle = async () => {
        try {
            await setPostArchived(post.id, !archived);
            if (!archived && redirectTo) {
                router.push(redirectTo, { transitionTypes: ["nav-back"] });
            }
            router.refresh();
        } catch (err) {
            setError(err.message || "Could not update archive.");
        }
    };

    return (
        <>
            <Button size="1" variant="ghost" onClick={handleToggle}>
                {archived ? "Unarchive" : "Archive"}
            </Button>
            {error && (
                <Text size="1" color="red">
                    {error}
                </Text>
            )}
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
                router.push(redirectTo, { transitionTypes: ["nav-back"] });
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
