import { ViewTransition } from "react";
import { Card, Flex, Text, Theme } from "@radix-ui/themes";
import BackLink from "@/app/components/BackLink";
import { BlogPostActions } from "@/app/components/BlogAdminControls";
import PostBody from "@/app/components/PostBody";
import { formatPostDate } from "@/lib/postFormat";

function PostContent({ post }) {
    return (
        <Flex direction="column" gap="2" className="px-1 py-1">
            <Flex align="baseline" justify="between" gap="3">
                <Text size="5" weight="bold" className="min-w-0">
                    {post.title}
                </Text>
                <Text size="2" className="shrink-0">
                    <BackLink postId={post.id} />
                </Text>
            </Flex>
            <Text size="2" color="gray">
                Yafim Landa
                {post.createdAt ? ` · ${formatPostDate(post.createdAt)}` : ""}
            </Text>

            <PostBody html={post.body} />

            <BlogPostActions post={post} redirectTo="/" className="pt-2" />
        </Flex>
    );
}

export default function PostDetail({ post }) {
    return (
        <ViewTransition name={`post-${post.id}`} share="morph" default="none">
            <div className="post-detail w-full overflow-clip">
                <div className="md:hidden">
                    <PostContent post={post} />
                </div>

                <Theme appearance="light" className="hidden w-full rounded-lg bg-white md:block">
                    <Card className="overflow-hidden">
                        <PostContent post={post} />
                    </Card>
                </Theme>
            </div>
        </ViewTransition>
    );
}
