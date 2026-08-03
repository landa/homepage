export function looksLikeHtml(value) {
    return /<\/?[a-z][\s\S]*>/i.test(value || "");
}

export function plainTextFromHtml(html) {
    return String(html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function postDescription(body, maxLength = 160) {
    const text = plainTextFromHtml(body);
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

/** Convert plain-text newlines into TipTap-friendly paragraph HTML. */
export function bodyToEditorContent(body) {
    if (!body) return "";
    if (looksLikeHtml(body)) return body;

    return body
        .split(/\n/)
        .map((line) => `<p>${escapeHtml(line) || "<br>"}</p>`)
        .join("");
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/**
 * Keep the first `count` block-level paragraphs/blocks for homepage previews.
 */
export function clipBody(body, count = 2) {
    if (!body) return { content: "", clipped: false };

    if (!looksLikeHtml(body)) {
        const paragraphs = body.split(/\n\s*\n/).filter((part) => part.trim().length > 0);
        if (paragraphs.length > count) {
            return {
                content: paragraphs.slice(0, count).join("\n\n"),
                clipped: true,
            };
        }
        // Fall back to single newlines as paragraph breaks for older plain posts.
        const lines = body.split(/\n/).filter((part) => part.trim().length > 0);
        if (lines.length > count) {
            return {
                content: lines.slice(0, count).join("\n\n"),
                clipped: true,
            };
        }
        return { content: body, clipped: false };
    }

    const blocks = [
        ...body.matchAll(/<(p|h[1-6]|blockquote|ul|ol|pre)(\s[^>]*)?>[\s\S]*?<\/\1>/gi),
    ].map((match) => match[0]);

    if (blocks.length === 0) {
        return { content: body, clipped: false };
    }

    return {
        content: blocks.slice(0, count).join(""),
        clipped: blocks.length > count,
    };
}
