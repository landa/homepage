import NavTransition from "@/app/components/NavTransition";
import PersonalShell from "@/app/components/PersonalShell";
import { getPosts } from "@/lib/postsServer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const posts = await getPosts();
    return (
        <NavTransition>
            <PersonalShell posts={posts} />
        </NavTransition>
    );
}
