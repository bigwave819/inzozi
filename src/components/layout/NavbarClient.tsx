// components/NavbarClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleUserRound, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";

interface NavItem {
  name: string;
  path: string;
}

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string | null;
  };
}

interface NavbarClientProps {
  session?: Session | null;
  navItems: NavItem[];
}

export default function NavbarClient({ session, navItems }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  if (pathName.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-[#2B4468] dark:text-blue-400 hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/inzozi.png"
              className="h-10 w-10 shadow-2xl"
              alt="Inzozi Labs logo"
              width={40}
              height={40}
            />
            <span>Inzozi Labs</span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8 bg-gray-50 dark:bg-gray-800 px-6 py-2 rounded-full shadow-inner">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#2B4468] dark:hover:text-blue-400 transition-all duration-200 text-sm font-medium hover:font-semibold relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2B4468] dark:bg-blue-400 group-hover:w-full transition-all duration-200"></span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Side - User & Theme */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login / User */}
            {session ? (
              <div className="px-3 py-2 bg-[#2B4468]/10 dark:bg-blue-400/10 text-[#2B4468] dark:text-blue-400 rounded-md font-medium">
                {session?.user?.name || "User"}
              </div>
            ) : (
              <div className="hidden md:flex items-center">
                <Link 
                  href="/login"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#2B4468] dark:hover:text-blue-400 transition-colors duration-200 group"
                >
                  <CircleUserRound size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Login</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 space-y-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!session && (
              <Link
                href="/login"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}