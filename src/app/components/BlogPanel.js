import Link from "next/link";
import { Card, Flex, Text, Theme } from "@radix-ui/themes";
import {
    BlogComposer,
    BlogDeleteButton,
    BlogEditButton,
} from "@/app/components/BlogAdminControls";
import PostBody from "@/app/components/PostBody";
import { clipBody } from "@/lib/postContent";
import { formatPostDate } from "@/lib/postFormat";

function PostCard({ post }) {
    const { content, clipped } = clipBody(post.body, 5);

    return (
        <Theme appearance="light" className="bg-white rounded-lg w-full">
            <Card className="overflow-visible">
                <Flex direction="column" gap="2" className="px-1 py-1">
                    <Flex align="baseline" justify="between" gap="3">
                        <Link href={`/blog/${post.id}`} className="emph">
                            <Text size="5" weight="bold" as="span">
                                {post.title}
                            </Text>
                        </Link>
                        <Flex gap="1">
                            <BlogEditButton post={post} />
                            <BlogDeleteButton postId={post.id} />
                        </Flex>
                    </Flex>
                    {post.createdAt && (
                        <Text size="2" color="gray">
                            {formatPostDate(post.createdAt)}
                        </Text>
                    )}
                    <div className={clipped ? "relative" : undefined}>
                        <PostBody html={content} />
                        {clipped && (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-1">
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="pointer-events-auto emph"
                                >
                                    Read more ↓
                                </Link>
                            </div>
                        )}
                    </div>
                </Flex>
            </Card>
        </Theme>
    );
}

export default function BlogPanel({ posts = [] }) {
    return (
        <Flex direction="column" gap="6" className="w-full">
            <BlogComposer />

            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </Flex>
    );
}
