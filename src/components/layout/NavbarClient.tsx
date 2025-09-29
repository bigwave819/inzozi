// components/NavbarClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleUserRound, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavbarClient({
  session,
  navItems,
}: {
  session: any;
  navItems: { name: string; path: string }[];
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname()

  if (pathName.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-blue-600"
            >
              <img
                src="/inzozi.png"
                className="h-10 w-10 shadow-2xl"
                alt="Inzozi Labs logo"
              />
              <span>Inzozi Labs</span>
            </Link>

            {/* Center Links */}
            <nav className="hidden md:flex flex-1 justify-center">
              <div className="space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Login / User */}
            {session ? (
              <div className="px-3 py-2 bg-blue-50">{session?.user?.name}</div>
            ) : (
              <div className="hidden md:flex items-center">
                <Link href="/login">
                  <CircleUserRound
                    className="text-gray-700 hover:text-blue-600"
                    size={24}
                  />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
