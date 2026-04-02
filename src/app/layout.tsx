import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Quicksand } from "next/font/google";
import { ThemeProvider } from "next-themes";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inzozi Labs - Innovative Software Solutions",
  description: "Discover innovative products from Inzozi Labs, including SAAS, DAAS, Digital Payment solutions, IoT platforms, and more.",
  keywords: ["Inzozi Labs", "Software Solutions", "Digital Payment", "IoT", "SAAS", "Web Development"],
  openGraph: {
    title: "Inzozi Labs - Innovative Software Solutions",
    description: "Discover innovative products from Inzozi Labs, including SAAS, DAAS, Digital Payment solutions, IoT platforms, and more.",
    type: "website",
  },
  verification: {
    google: "w6rW1HGA8IWk2ZTY54QIK_FZudpnx0gA-b1FcsQOP2E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}