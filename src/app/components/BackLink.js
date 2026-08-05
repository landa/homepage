"use client";

import { useRouter } from "next/navigation";

export default function BackLink({ href = "/", postId, children = "Back ↑" }) {
    const router = useRouter();

    return (
        <a
            href={postId ? `${href}#post-${postId}` : href}
            onClick={(event) => {
                event.preventDefault();
                router.push(postId ? `${href}#post-${postId}` : href, {
                    transitionTypes: ["nav-back"],
                });
            }}
        >
            {children}
        </a>
    );
}
