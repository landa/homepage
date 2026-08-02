import { notFound } from "next/navigation";
import PostDetail from "@/app/components/PostDetail";
import { getPost } from "@/lib/postsServer";

export const dynamic = "force-dynamic";

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
