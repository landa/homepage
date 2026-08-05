"use client";

/**
 * Page wrapper for route transitions.
 * Post open/close uses shared-element morph only; page-level slides fight the
 * height reveal, so we don't apply directional enter/exit here.
 */
export default function NavTransition({ children }) {
    return children;
}
