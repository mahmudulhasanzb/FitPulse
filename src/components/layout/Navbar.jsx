"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // Links from screenshot
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Classes", href: "/classes" },
    { label: "Community Forum", href: "/forum" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  // Helper to determine if link is active
  // Default to '/forum' (Community Forum) active if on root or '/forum' to match the screenshot
  const isLinkActive = (href) => {
    if (href === "/forum") {
      return pathname === "/forum" || pathname === "/" || !navLinks.some(link => link.href === pathname);
    }
    return pathname === href;
  };

  return (
    <nav className="w-full bg-[#0E1106] border-b border-[#1C210E] sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-white font-extrabold text-xl tracking-wider select-none font-sans">
                FITPULSE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[15px] font-medium transition-all duration-200 py-2 ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-[#A4A896]/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section: Search & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#A4A896]/50" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className="w-56 bg-[#14180A] border border-[#282F18] rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-[#A4A896]/45 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00]/30 transition-all duration-200"
              />
            </div>

            {/* Profile Button */}
            <Link
              href="/profile"
              className="flex items-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-[#D4FF00]/10 hover:shadow-[#D4FF00]/20 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              <User className="h-4 w-4 stroke-[2.5]" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#A4A896] hover:text-white hover:bg-[#1C210E] focus:outline-none transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100 border-b border-[#1C210E]'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-4 bg-[#0E1106]/95 backdrop-blur-lg">
          {/* Mobile links */}
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    active
                      ? 'bg-[#1C210E] text-white font-semibold border-l-2 border-[#D4FF00]'
                      : 'text-[#A4A896]/70 hover:text-white hover:bg-[#1C210E]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile search */}
          <div className="relative px-3">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#A4A896]/50" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full bg-[#14180A] border border-[#282F18] rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#A4A896]/45 focus:outline-none focus:border-[#D4FF00]"
            />
          </div>

          {/* Mobile profile button */}
          <div className="px-3 pt-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#D4FF00] text-[#121212] font-semibold py-3 rounded-full hover:bg-[#c2eb00] transition-colors duration-200"
            >
              <User className="h-4 w-4 stroke-[2.5]" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
