"use client";

import AuthProvider from "@/app/components/AuthProvider";

export default function PersonalLayout({ children }) {
    return <AuthProvider>{children}</AuthProvider>;
}
