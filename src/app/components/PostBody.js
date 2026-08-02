import { looksLikeHtml } from "@/lib/postContent";

export default function PostBody({ html }) {
    if (!looksLikeHtml(html)) {
        return (
            <div className="post-body whitespace-pre-wrap text-[var(--gray-11)] leading-relaxed">
                {html}
            </div>
        );
    }

    return (
        <div
            className="post-body text-[var(--gray-11)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
