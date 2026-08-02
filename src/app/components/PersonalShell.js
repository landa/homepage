import PersonalColumns from "@/app/components/PersonalColumns";
import PersonalSplit from "@/app/components/PersonalSplit";
import { PERSONAL_LAYOUT } from "@/lib/personalLayout";

/**
 * Active personal layout. Set PERSONAL_LAYOUT in src/lib/personalLayout.js
 * to "columns" to revert to the horizontal scroll layout.
 */
export default function PersonalShell({ posts = [] }) {
    if (PERSONAL_LAYOUT === "columns") {
        return <PersonalColumns posts={posts} />;
    }

    return <PersonalSplit posts={posts} />;
}
