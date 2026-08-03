import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import Analytics from "@/app/components/Analytics";
import {
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_OG_IMAGE,
    SITE_URL,
} from "@/lib/site";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s · ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        images: [SITE_OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        images: [SITE_OG_IMAGE.url],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Theme appearance="dark">
                    {children}
                    <Analytics />
                </Theme>
            </body>
        </html>
    );
}
