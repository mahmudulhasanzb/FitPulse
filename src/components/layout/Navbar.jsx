'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, Menu, X, Bell, ChevronDown } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setIsSearchExpanded(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 150);
  };

  const handleDropdownClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = async () => {
    const toastId = toast.loading('Signing out...');
    try {
      await authClient.signOut({
        onSuccess: () => {
          toast.success('Signed out successfully!', { id: toastId });
          router.push('/login');
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Sign out failed.', { id: toastId });
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Classes', href: '/classes' },
    { label: 'Community Forum', href: '/forum' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  const isLinkActive = href => pathname === href;

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

          {/* Navigation Links */}
          <div
            className={`hidden md:flex items-center space-x-8 transition-all duration-300 ${
              isSearchExpanded ? 'md:hidden lg:flex' : ''
            }`}
          >
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

          {/* Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div ref={searchRef} className="relative flex items-center">
              {/* Desktop Search */}
              <div className="hidden lg:block relative">
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

              {/* Tablet Search */}
              <div className="block lg:hidden">
                {!isSearchExpanded ? (
                  <button
                    onClick={() => setIsSearchExpanded(true)}
                    className="p-2.5 bg-[#14180A] border border-[#282F18] hover:border-[#D4FF00]/50 rounded-xl text-[#A4A896]/70 hover:text-white cursor-pointer transition-all duration-200 flex items-center justify-center"
                    title="Search"
                  >
                    <Search className="h-5 w-5 text-[#A2B28C] hover:text-[#D4FF00] transition-colors duration-200" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 animate-fade-in">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[#A4A896]/50" />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search discussions..."
                        className="w-48 sm:w-56 bg-[#14180A] border border-[#282F18] rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-[#A4A896]/45 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00]/30 transition-all duration-200"
                      />
                    </div>
                    <button
                      onClick={() => setIsSearchExpanded(false)}
                      className="p-2.5 bg-[#14180A] border border-[#282F18] hover:border-red-500/50 hover:text-red-400 rounded-xl text-[#A4A896]/70 cursor-pointer transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <button className="relative p-2 rounded-full bg-[#14180A] border border-[#282F18] hover:border-[#D4FF00]/50 hover:bg-[#1C210E] transition-all duration-200 group text-white cursor-pointer">
                  <Bell className="h-4.5 w-4.5 text-[#A4A896]/70 group-hover:text-[#D4FF00] transition-colors" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D4FF00] rounded-full border border-[#0E1106] animate-pulse" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex items-center space-x-2 cursor-pointer bg-[#14180A] border border-[#282F18] hover:border-[#D4FF00]/50 hover:bg-[#1C210E] p-1.5 pr-3 rounded-full transition-all duration-200"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleDropdownClick}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#282F18] flex items-center justify-center border border-[#3B3E31]">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-[#A4A896]" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-white/90 hidden sm:block truncate max-w-[80px]">
                      {user?.name || 'Account'}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-[#A4A896]/70 transition-transform duration-300 ${
                        isUserDropdownOpen ? 'rotate-180 text-[#D4FF00]' : ''
                      }`}
                    />
                  </div>

                  {isUserDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2.5 w-64 bg-[#0E1106] border border-[#1C210E] rounded-2xl shadow-2xl py-3.5 z-50 animate-fade-in backdrop-blur-md"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="px-4 pb-3 border-b border-[#1C210E]/60">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#282F18] flex items-center justify-center border border-[#3B3E31]">
                            {user?.image ? (
                              <Image
                                src={user.image}
                                width={96}
                                height={96}
                                alt="User avatar"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="h-5 w-5 text-[#A4A896]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold truncate text-sm">
                              {user?.name}
                            </p>
                            <p className="text-[#A4A896]/60 text-xs truncate">
                              {user?.email}
                            </p>
                            {user?.role && (
                              <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider bg-[#D4FF00]/10 text-[#D4FF00] px-1.5 py-0.5 rounded border border-[#D4FF00]/20">
                                {user.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-1.5 space-y-0.5">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#A4A896]/80 hover:text-white hover:bg-[#14180A] transition-all duration-200"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#A4A896]/80 hover:text-white hover:bg-[#14180A] transition-all duration-200"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Profile Settings
                        </Link>
                      </div>

                      <div className="border-t border-[#1C210E]/60 p-1.5 mt-1.5">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-extrabold text-xs uppercase px-6 py-3 rounded-full shadow-lg shadow-[#D4FF00]/10 hover:shadow-[#D4FF00]/20 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
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

          <div className="px-3 pt-2 border-t border-[#1C210E]/60">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#282F18] flex items-center justify-center border border-[#3B3E31]">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-[#A4A896]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold truncate text-sm">
                      {user.name}
                    </p>
                    <p className="text-[#A4A896]/60 text-xs truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-[#14180A] border border-[#282F18] text-white text-xs font-semibold py-2.5 rounded-full hover:bg-[#1C210E] transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold py-2.5 rounded-full hover:bg-red-500/20 transition-colors duration-200 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#D4FF00] text-[#121212] font-semibold py-3 rounded-full hover:bg-[#c2eb00] transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
