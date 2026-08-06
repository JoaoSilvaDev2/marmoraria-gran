import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteMetadata, jsonLd } from "@/lib/seo";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/providers/CustomCursor";
import ProgressBar from "@/components/layout/ProgressBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/images/logo-dourada.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <SmoothScroll>
          <CustomCursor />
          <ProgressBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <a
            href="https://wa.me/5521974793847"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-600"
            aria-label="WhatsApp"
          >
            💬
          </a>
        </SmoothScroll>
      </body>
    </html>
  );
}
