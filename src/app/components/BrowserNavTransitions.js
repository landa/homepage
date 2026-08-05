"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { addTransitionType, startTransition } from "react";

function pathDepth(pathname) {
    return pathname.split("/").filter(Boolean).length;
}

function directionForTraversal(fromPathname, toPathname) {
    const fromDepth = pathDepth(fromPathname);
    const toDepth = pathDepth(toPathname);
    if (toDepth < fromDepth) return "nav-back";
    if (toDepth > fromDepth) return "nav-forward";
    if (toPathname === "/") return "nav-back";
    return "nav-forward";
}

export default function BrowserNavTransitions() {
    const router = useRouter();
    const pathname = usePathname();
    const pathnameRef = useRef(pathname);
    const suppressPopStateRef = useRef(false);

    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);

    useEffect(() => {
        const navigation = window.navigation;

        const onPopState = (event) => {
            if (!suppressPopStateRef.current) return;
            // Stop Next's sync traverse restore so View Transitions can run.
            event.stopImmediatePropagation();
        };

        window.addEventListener("popstate", onPopState, true);

        if (!navigation) {
            const onFallbackPopState = (event) => {
                event.stopImmediatePropagation();
                const href =
                    window.location.pathname +
                    window.location.search +
                    window.location.hash;
                const direction = directionForTraversal(
                    pathnameRef.current,
                    window.location.pathname
                );
                startTransition(() => {
                    addTransitionType(direction);
                    router.replace(href, { transitionTypes: [direction] });
                });
            };

            window.removeEventListener("popstate", onPopState, true);
            window.addEventListener("popstate", onFallbackPopState, true);
            return () => {
                window.removeEventListener("popstate", onFallbackPopState, true);
            };
        }

        const onNavigate = (event) => {
            if (!event.canIntercept || event.hashChange || event.downloadRequest) {
                return;
            }
            if (event.navigationType !== "traverse") return;

            const url = new URL(event.destination.url);
            if (url.origin !== window.location.origin) return;

            const href = `${url.pathname}${url.search}${url.hash}`;
            const direction = directionForTraversal(
                pathnameRef.current,
                url.pathname
            );

            suppressPopStateRef.current = true;

            event.intercept({
                handler: () =>
                    new Promise((resolve) => {
                        startTransition(() => {
                            addTransitionType(direction);
                            router.replace(href, {
                                transitionTypes: [direction],
                            });
                        });

                        const started = performance.now();
                        const tick = () => {
                            if (
                                window.location.pathname === url.pathname ||
                                performance.now() - started > 1500
                            ) {
                                suppressPopStateRef.current = false;
                                resolve();
                                return;
                            }
                            requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                    }),
            });
        };

        navigation.addEventListener("navigate", onNavigate);
        return () => {
            navigation.removeEventListener("navigate", onNavigate);
            window.removeEventListener("popstate", onPopState, true);
            suppressPopStateRef.current = false;
        };
    }, [router]);

    return null;
}
