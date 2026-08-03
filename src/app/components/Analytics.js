"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import app from "@/lib/firebaseClient";

let analyticsInstance = null;

async function getAnalyticsInstance() {
    if (analyticsInstance) return analyticsInstance;
    if (!(await isSupported())) return null;
    analyticsInstance = getAnalytics(app);
    return analyticsInstance;
}

export default function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        let cancelled = false;

        getAnalyticsInstance().then((analytics) => {
            if (cancelled || !analytics) return;
            logEvent(analytics, "page_view", {
                page_path: pathname,
                page_location: window.location.href,
                page_title: document.title,
            });
        });

        return () => {
            cancelled = true;
        };
    }, [pathname]);

    return null;
}
