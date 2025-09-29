import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Quicksand } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"], // Add the weights you need
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Inzozi Labs - Innovative Software Solutions",
  description: "Discover innovative products from Inzozi Labs, including SAAS, DAAS, Digital Payment solutions, IoT platforms, and more.",
  keywords: ["Inzozi Labs", "SAAS", "DAAS", "IoT", "Digital Payment", "Software Solutions"],
  authors: [{ name: "Hirwa Tresor Christian", url: "https://inzozi.onrender.com" }],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Inzozi Labs - Innovative Software Solutions",
    description: "Explore Inzozi Labs products and services to empower your business.",
    url: "https://inzozi.onrender.com",
    siteName: "Inzozi Labs",
    images: [
      {
        url: "/inzozi.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inzozi Labs - Innovative Software Solutions",
    description: "Explore Inzozi Labs products and services to empower your business.",
    images: ["/inzozi.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
