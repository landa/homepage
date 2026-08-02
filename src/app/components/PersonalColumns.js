"use client";

import ColumnLayout from "@/app/components/ColumnLayout";
import AboutCard from "@/app/components/AboutCard";
import BlogPanel from "@/app/components/BlogPanel";

export default function PersonalColumns({ posts = [] }) {
    const columns = [
        {
            path: "/",
            title: "Home",
            content: <AboutCard />,
        },
        {
            path: "/blog",
            title: "Blog",
            content: <BlogPanel posts={posts} />,
        },
    ];

    return <ColumnLayout columns={columns} />;
}
