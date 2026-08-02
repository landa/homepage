import Link from "next/link";
import { Card, Flex, Text, Theme } from "@radix-ui/themes";
import { BlogDeleteButton, BlogEditButton } from "@/app/components/BlogAdminControls";
import PostBody from "@/app/components/PostBody";
import { formatPostDate } from "@/lib/postFormat";

function PostContent({ post, dark = false }) {
    return (
        <Flex direction="column" gap="4" className="px-1 py-1">
            <Flex direction="column" gap="2">
                <Flex align="baseline" justify="between" gap="3">
                    <Text weight="bold" size="7" className="min-w-0">
                        {post.title}
                    </Text>
                    <Flex align="baseline" gap="2" className="shrink-0">
                        <BlogEditButton post={post} />
                        <BlogDeleteButton postId={post.id} redirectTo="/" />
                        <Text size="2">
                            <Link
                                href="/"
                                className={
                                    dark
                                        ? "text-[var(--gray-12)] underline underline-offset-4 decoration-[var(--gray-8)] hover:decoration-[var(--gray-12)]"
                                        : "emph"
                                }
                            >
                                Back ↑
                            </Link>
                        </Text>
                    </Flex>
                </Flex>
                <Text size="2" color="gray">
                    Yafim Landa
                    {post.createdAt ? ` · ${formatPostDate(post.createdAt)}` : ""}
                </Text>
            </Flex>

            <PostBody html={post.body} />
        </Flex>
    );
}

export default function PostDetail({ post }) {
    return (
        <>
            <div className="w-full md:hidden">
                <PostContent post={post} dark />
            </div>

            <Theme appearance="light" className="hidden w-full rounded-lg bg-white md:block">
                <Card className="overflow-visible">
                    <PostContent post={post} />
                </Card>
            </Theme>
        </>
    );
}
