export function formatPostDate(createdAt) {
    if (!createdAt) return "";
    const date = typeof createdAt.toDate === "function" ? createdAt.toDate() : new Date(createdAt);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
