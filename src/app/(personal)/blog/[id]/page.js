import { notFound } from "next/navigation";
import PostDetail from "@/app/components/PostDetail";
import { postDescription } from "@/lib/postContent";
import { getPost } from "@/lib/postsServer";
import { SITE_NAME, SITE_OG_IMAGE } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        return { title: "Post not found" };
    }

    const description = postDescription(post.body);

    return {
        title: post.title,
        description,
        openGraph: {
            type: "article",
            url: `/blog/${post.id}`,
            title: post.title,
            description,
            siteName: SITE_NAME,
            images: [SITE_OG_IMAGE],
            publishedTime: post.createdAt ?? undefined,
            authors: [SITE_NAME],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
            images: [SITE_OG_IMAGE.url],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) notFound();

    return (
        <main className="min-h-screen px-4 py-8 md:px-0 md:py-12">
            <div className="mx-auto w-full max-w-[900px] md:w-[90vw] md:min-w-[320px]">
                <PostDetail post={post} />
            </div>
        </main>
    );
}
