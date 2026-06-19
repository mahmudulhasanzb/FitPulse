'use client';

import { useSession, authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Bookmark,
  Briefcase,
  Heart,
  Shield,
  User,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const studentMenuItem = [
  {
    label: 'Overview',
    href: '/dashboard/overview',
    icon: Home,
  },
  {
    label: 'Booked Classes',
    href: '/dashboard/booked-classes',
    icon: Bookmark,
  },
  {
    label: 'Apply As Trainer',
    href: '/dashboard/apply-as-trainer',
    icon: Briefcase,
  },
  {
    label: 'Favourite Classes',
    href: '/dashboard/favourite-classes',
    icon: Heart,
  },
];

const trainerMenuItem = [
  {
    label: 'Overview',
    href: '/dashboard/overview',
    icon: Home,
  },
];

const adminMenu = [
  {
    label: 'Overview',
    href: '/dashboard/overview',
    icon: Home,
  },
];

const DashboardSideBar = () => {
  const router = useRouter();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  const menuItems =
    role === 'student'
      ? studentMenuItem
      : role === 'trainer'
        ? trainerMenuItem
        : role === 'admin'
          ? adminMenu
          : [];

  const user = session?.user;

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
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

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#0E1106] border-r border-[#1C210E] flex flex-col justify-between z-40 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-20 border-b border-[#1C210E] flex items-center px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-white font-extrabold text-xl tracking-wider font-sans group-hover:text-[#D4FF00] transition-colors">
              FITPULSE
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#D4FF00]/10 text-[#D4FF00] px-2 py-0.5 rounded border border-[#D4FF00]/20">
              Panel
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-170px)]">
          <div className="text-[10px] font-bold text-[#A4A896]/40 uppercase tracking-widest px-3 mb-2">
            Navigation
          </div>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 group border ${
                  active
                    ? 'bg-[#14180A] border-[#282F18] text-white'
                    : 'bg-transparent border-transparent text-[#A4A896]/70 hover:text-white hover:bg-[#14180A]/40'
                }`}
              >
                <IconComponent
                  className={`h-4.5 w-4.5 transition-colors duration-200 ${
                    active
                      ? 'text-[#D4FF00]'
                      : 'text-[#A4A896]/50 group-hover:text-[#D4FF00]/80'
                  }`}
                />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 bg-[#D4FF00] rounded-full shadow-lg shadow-[#D4FF00]/50" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-[#1C210E] bg-[#0A0D02]/50 relative">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* User Dropdown */}
            {isUserDropdownOpen && (
              <div
                className="absolute bottom-full left-0 mb-2 w-56 bg-[#0E1106] border border-[#1C210E] rounded-2xl shadow-2xl p-1.5 z-50 animate-fade-in backdrop-blur-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-2 border-b border-[#1C210E]/60 mb-1">
                  <p className="text-white text-xs font-bold truncate">
                    {user.name}
                  </p>
                  <p className="text-[#A4A896]/60 text-[10px] truncate">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#A4A896]/80 hover:text-white hover:bg-[#14180A] transition-all duration-200"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Profile Info Card */}
            <div
              className="flex items-center gap-3 p-2 rounded-2xl bg-[#14180A]/40 border border-[#1C210E]/60 cursor-pointer hover:border-[#D4FF00]/50 transition-all duration-200"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleDropdownClick}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#282F18] flex items-center justify-center border border-[#3B3E31] flex-shrink-0">
                {user.image ? (
                  <Image
                    width={100}
                    height={100}
                    src={user.image}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-4.5 w-4.5 text-[#A4A896]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4FF00]/80 mt-0.5">
                  {role}
                </p>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#A4A896]/70 transition-transform duration-300 flex-shrink-0 ${
                  isUserDropdownOpen ? 'rotate-180 text-[#D4FF00]' : ''
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-[#14180A]/40 border border-[#1C210E]/60 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-[#282F18]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 bg-[#282F18] rounded w-3/4" />
              <div className="h-2 bg-[#282F18] rounded w-1/2" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSideBar;
