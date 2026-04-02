"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Products", path: "/products" },
    // { name: "Services", path: "/service" },
    // { name: "Company", path: "/company" },
    // { name: "Industries", path: "/industries" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow-sm dark:shadow-gray-800/50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-[#1e3a5f] dark:text-blue-400 hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/inzozi.png"
              className="h-10 w-10 shadow-sm rounded-md"
              alt="Inzozi Labs logo"
              width={40}
              height={40}
            />
            <span>Inzozi Labs</span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8 px-6 py-2 rounded-full">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium transition-all duration-200 relative group ${pathName === item.path
                      ? "text-[#1e3a5f] dark:text-blue-400 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-blue-400"
                    }`}
                >
                  {item.name}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#1e3a5f] dark:bg-blue-400 group-hover:w-full transition-all duration-200"></span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Side - Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

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
          <nav className="md:hidden mt-4 pb-2 space-y-2 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-100 dark:border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#1e3a5f] dark:hover:text-blue-400 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
