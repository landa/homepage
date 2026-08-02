import { redirect } from "next/navigation";
import PersonalShell from "@/app/components/PersonalShell";
import { PERSONAL_LAYOUT } from "@/lib/personalLayout";
import { getPosts } from "@/lib/postsServer";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    if (PERSONAL_LAYOUT === "split") {
        redirect("/");
    }

    const posts = await getPosts();
    return <PersonalShell posts={posts} />;
}
