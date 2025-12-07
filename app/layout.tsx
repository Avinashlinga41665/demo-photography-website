import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";
import "aos/dist/aos.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ FULL SEO + VERIFICATION + SOCIAL TAGS
export const metadata: Metadata = {
  title: "Professional Photography Portfolio | Avinash",
  description: "A modern photography portfolio website showcasing premium visual work.",
  metadataBase: new URL("https://demo-photography-website.vercel.app"),

  // ✅ Google Search Console verification
  other: {
    "google-site-verification": "3LHg1Sz9hu05a7l6jaXZX3ZUN5Bel_l_JG5RT4-dYc4",
  },

  // ✅ Correct robots rule
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // ✅ Canonical link (VERY IMPORTANT for SEO)
  alternates: {
    canonical: "/",
  },

  // ✅ Social Preview (OpenGraph)
  openGraph: {
    title: "Professional Photography Portfolio",
    description: "Premium photography, portraits, events, and creative shoots.",
    url: "https://demo-photography-website.vercel.app",
    siteName: "Photography Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png", // add later
        width: 1200,
        height: 630,
        alt: "Photography Banner",
      },
    ],
  },

  // ✅ Twitter Card Preview
  twitter: {
    card: "summary_large_image",
    title: "Professional Photography Portfolio",
    description: "Premium photography website created by Avinash.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
