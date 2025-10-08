"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * A layout component that displays multiple routes as horizontal columns
 * The active route is centered in the viewport
 * 
 * @param {Object} props - Component props
 * @param {Array<{path: string, title?: string, content: React.ReactNode}>} props.columns - Array of column configurations
 */
export default function ColumnLayout({ columns }) {
    const pathname = usePathname();
    const router = useRouter();
    const scrollContainerRef = useRef(null);
    const navRef = useRef(null);
    const columnRefs = useRef({});
    const navButtonRefs = useRef({});
    const isScrollingProgrammatically = useRef(false);
    const scrollTimeout = useRef(null);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [isPositioned, setIsPositioned] = useState(false);

    // Initial positioning using useLayoutEffect (runs before paint, no flash)
    useLayoutEffect(() => {
        const activeIndex = columns.findIndex((col) => col.path === pathname);
        
        if (activeIndex !== -1 && scrollContainerRef.current && columnRefs.current[pathname]) {
            const container = scrollContainerRef.current;
            const activeColumn = columnRefs.current[pathname];
            
            // Calculate the scroll position to center the active column
            const columnLeft = activeColumn.offsetLeft;
            const columnWidth = activeColumn.offsetWidth;
            const containerWidth = container.offsetWidth;
            const scrollPosition = columnLeft - (containerWidth / 2) + (columnWidth / 2);
            
            // Set scroll position immediately without animation on initial mount
            if (isInitialMount) {
                container.scrollLeft = scrollPosition;
                setIsInitialMount(false);
                // Use requestAnimationFrame to ensure position is set before showing
                requestAnimationFrame(() => {
                    setIsPositioned(true);
                });
            } else {
                // Smooth scroll for subsequent navigation
                isScrollingProgrammatically.current = true;
                container.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth"
                });
                
                setTimeout(() => {
                    isScrollingProgrammatically.current = false;
                }, 500);
            }
        }

        // Scroll the navigation bar to center the active button
        if (navRef.current && navButtonRefs.current[pathname]) {
            const nav = navRef.current;
            const activeButton = navButtonRefs.current[pathname];
            
            const buttonLeft = activeButton.offsetLeft;
            const buttonWidth = activeButton.offsetWidth;
            const navWidth = nav.offsetWidth;
            const navScrollPosition = buttonLeft - (navWidth / 2) + (buttonWidth / 2);
            
            nav.scrollTo({
                left: navScrollPosition,
                behavior: isInitialMount ? "auto" : "smooth"
            });
        }
    }, [pathname, columns, isInitialMount]);

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
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Navigation Bar */}
            <nav 
                ref={navRef}
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    backgroundColor: "var(--color-background)",
                    borderBottom: "1px solid var(--gray-a3)",
                    padding: "0.75rem 0",
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                    gap: "0.5rem",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                <style jsx>{`
                    nav::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {/* Left spacer to allow first item to be centered */}
                <div style={{ flexShrink: 0, width: "calc(50vw - 60px)" }} />
                
                {columns.map((column) => (
                    <button
                        key={column.path}
                        ref={(el) => navButtonRefs.current[column.path] = el}
                        onClick={() => handleColumnClick(column.path)}
                        style={{
                            padding: "0.25rem 0.75rem",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "transparent",
                            color: pathname === column.path ? "var(--gray-12)" : "var(--gray-11)",
                            fontWeight: pathname === column.path ? "500" : "400",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            textDecoration: pathname === column.path ? "underline" : "none",
                            textUnderlineOffset: "3px",
                            textDecorationThickness: "1px",
                            opacity: pathname === column.path ? 1 : 0.7,
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                            if (pathname !== column.path) {
                                e.target.style.opacity = "1";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (pathname !== column.path) {
                                e.target.style.opacity = "0.7";
                            }
                        }}
                    >
                        {column.title || column.path}
                    </button>
                ))}
                
                {/* Right spacer to allow last item to be centered */}
                <div style={{ flexShrink: 0, width: "calc(50vw - 60px)" }} />
            </nav>
            
            <div 
                ref={scrollContainerRef}
                className="column-scroll-container"
                style={{
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                    flex: 1,
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                    visibility: isPositioned ? "visible" : "hidden"
                }}
            >
            {/* Spacer to allow first column to be centered */}
            <div 
                style={{
                    flexShrink: 0,
                    width: "calc(50vw - min(600px, 90vw) / 2)"
                }}
            />
            
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
            
            {/* Spacer to allow last column to be centered */}
            <div 
                style={{
                    flexShrink: 0,
                    width: "calc(50vw - min(600px, 90vw) / 2)"
                }}
            />
            </div>
        </div>
    );
}
