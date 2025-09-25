import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yafim Landa",
  openGraph: {
    title: "Yafim Landa",
    images: [
      {
        url: "/yafim.png",
        width: 550,
        height: 550,
        alt: "Yafim Landa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/yafim.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme appearance="dark">
            {children}
        </Theme>
      </body>
    </html>
  );
}
