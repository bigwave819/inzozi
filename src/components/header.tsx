// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CircleUserRound, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/service' },
    { name: 'Company', path: '/company' },
    { name: 'Industries', path: '/industries' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Flex with three sections: logo | links | login */}
        <div className="flex items-center justify-between">
          
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
            <img src="/inzozi.png" className="h-10 w-10 shadow-2xl" alt="Inzozi Labs logo" />
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

          {/* Login Icon (Right) */}
          <div className="hidden md:flex items-center">
            <Link href="/login">
              <CircleUserRound className="text-gray-700 hover:text-blue-600" size={24} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
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
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
