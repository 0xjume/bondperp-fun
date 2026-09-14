import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bondperp.fun",
  description:
    "Bonding curve to perpetual alpha. Launch a token on Base. Fund an Avantis position.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>
          <Suspense fallback={<div className="h-16 border-b border-border" />}>
            <Header />
          </Suspense>
          <main className="page-enter flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
