import { ViewTransition } from "react";
import Link from "next/link";
import { Card, Flex, Text, Theme } from "@radix-ui/themes";
import { BlogPostActions } from "@/app/components/BlogAdminControls";
import PostBody from "@/app/components/PostBody";
import { clipBody, stripLinks } from "@/lib/postContent";
import { formatPostDate } from "@/lib/postFormat";

function PostCard({ post }) {
    const { content, clipped } = clipBody(post.body, 5);
    const preview = stripLinks(content);

    return (
        <ViewTransition
            name={`post-${post.id}`}
            share="morph"
            enter="fall-behind"
            exit="fall-behind"
            default="none"
        >
            <div id={`post-${post.id}`} className="post-card group relative scroll-mt-8 overflow-hidden rounded-lg">
                <Link
                    href={`/blog/${post.id}`}
                    transitionTypes={["nav-forward"]}
                    className="absolute inset-0 z-0 rounded-lg !no-underline !text-transparent"
                    aria-label={post.title}
                />
                <Theme
                    appearance="light"
                    className="relative z-10 pointer-events-none bg-white rounded-lg w-full"
                >
                    <Card className="overflow-hidden transition-shadow group-hover:shadow-md">
                        <Flex direction="column" gap="2" className="px-1 py-1">
                            <Text size="5" weight="bold">
                                {post.title}
                            </Text>
                            {post.createdAt && (
                                <Text size="2" color="gray">
                                    {formatPostDate(post.createdAt)}
                                </Text>
                            )}
                            <div
                                className={
                                    clipped
                                        ? "post-card-preview relative overflow-hidden"
                                        : undefined
                                }
                            >
                                <PostBody html={preview} />
                                {clipped && (
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-white via-white/85 to-transparent pb-1">
                                        <Text size="2" color="gray">
                                            Read more ↓
                                        </Text>
                                    </div>
                                )}
                            </div>
                            <BlogPostActions
                                post={post}
                                className="pointer-events-auto relative z-10 pt-1"
                            />
                        </Flex>
                    </Card>
                </Theme>
            </div>
        </ViewTransition>
    );
}

export default function BlogPanel({ posts = [] }) {
    return (
        <Flex direction="column" gap="6" className="w-full">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </Flex>
    );
}
