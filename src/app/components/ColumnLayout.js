"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * A layout component that displays multiple routes as horizontal columns
 * The active route is centered in the viewport
 * 
 * @param {Object} props - Component props
 * @param {Array<{path: string, content: React.ReactNode}>} props.columns - Array of column configurations
 */
export default function ColumnLayout({ columns }) {
    const pathname = usePathname();
    const router = useRouter();
    const scrollContainerRef = useRef(null);
    const columnRefs = useRef({});
    const isScrollingProgrammatically = useRef(false);
    const scrollTimeout = useRef(null);

    // Scroll to active column when pathname changes
    useEffect(() => {
        const activeIndex = columns.findIndex((col) => col.path === pathname);
        
        if (activeIndex !== -1 && scrollContainerRef.current && columnRefs.current[pathname]) {
            const container = scrollContainerRef.current;
            const activeColumn = columnRefs.current[pathname];
            
            // Calculate the scroll position to center the active column
            const columnLeft = activeColumn.offsetLeft;
            const columnWidth = activeColumn.offsetWidth;
            const containerWidth = container.offsetWidth;
            const scrollPosition = columnLeft - (containerWidth / 2) + (columnWidth / 2);
            
            isScrollingProgrammatically.current = true;
            container.scrollTo({
                left: scrollPosition,
                behavior: "smooth"
            });
            
            // Reset flag after scroll completes
            setTimeout(() => {
                isScrollingProgrammatically.current = false;
            }, 500);
        }
    }, [pathname, columns]);

    // Handle scroll events to update the URL (only on small screens)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Only handle scroll navigation on small screens (mobile)
            const isMobile = window.innerWidth < 768;
            if (!isMobile) return;

            // Don't update URL if we're scrolling programmatically (from route change)
            if (isScrollingProgrammatically.current) return;

            // Clear existing timeout
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Wait for scroll to settle before updating URL
            scrollTimeout.current = setTimeout(() => {
                const containerWidth = container.offsetWidth;
                const scrollLeft = container.scrollLeft;
                const containerCenter = scrollLeft + containerWidth / 2;

                // Find which column is centered
                let closestColumn = null;
                let closestDistance = Infinity;

                columns.forEach((column) => {
                    const columnEl = columnRefs.current[column.path];
                    if (!columnEl) return;

                    const columnCenter = columnEl.offsetLeft + columnEl.offsetWidth / 2;
                    const distance = Math.abs(containerCenter - columnCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestColumn = column;
                    }
                });

                // Update URL if the centered column differs from current pathname
                if (closestColumn && closestColumn.path !== pathname) {
                    router.push(closestColumn.path);
                }
            }, 150); // Debounce for 150ms
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            container.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [columns, pathname, router]);

    const handleColumnClick = (path) => {
        if (path !== pathname) {
            router.push(path);
        }
    };

    return (
        <div 
            ref={scrollContainerRef}
            className="column-scroll-container"
            style={{
                display: "flex",
                overflowX: "auto",
                overflowY: "hidden",
                height: "100vh",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch"
            }}
        >
            {columns.map((column, index) => (
                <div
                    key={column.path}
                    ref={(el) => columnRefs.current[column.path] = el}
                    className={`column ${pathname === column.path ? 'active' : ''}`}
                    onClick={() => handleColumnClick(column.path)}
                    style={{
                        flexShrink: 0,
                        width: "90vw",
                        maxWidth: "600px",
                        minWidth: "320px",
                        scrollSnapAlign: "center",
                        padding: "2rem 1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "start",
                        overflowY: "auto",
                        opacity: pathname === column.path ? 1 : 0.5,
                        transition: "opacity 0.3s ease",
                        cursor: pathname === column.path ? "default" : "pointer"
                    }}
                >
                    <div style={{ pointerEvents: pathname === column.path ? "auto" : "none", width: "100%" }}>
                        {column.content}
                    </div>
                </div>
            ))}
        </div>
    );
}
