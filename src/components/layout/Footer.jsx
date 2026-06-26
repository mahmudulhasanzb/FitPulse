import React from "react";
import Link from "next/link";
import { Globe, Share2, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A0D02] border-t border-[#1C210E] pt-16 pb-8 text-[#A4A896]/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
          {/* Left Side: Brand Details */}
          <div className="col-span-1 md:col-span-6 flex flex-col space-y-5">
            <h2 className="text-white font-black text-2xl tracking-wider select-none">
              FITPULSE
            </h2>
            <p className="text-[#A4A896]/80 text-[15px] leading-relaxed max-w-sm">
              Professional fitness ecosystems designed for elite athletes and
              motivated beginners alike.
            </p>
            {/* Contact Information */}
            <div className="text-sm text-[#A4A896]/60 space-y-1">
              <p>Email: contact@fitpulse.com</p>
              <p>Phone: +1 (555) 019-9922</p>
              <p>Address: 100 Fitness Way, San Francisco, CA</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center space-x-5 pt-2">
              <a
                href="#"
                className="text-[#A4A896]/60 hover:text-[#D4FF00] transition-colors duration-250 flex items-center justify-center"
                aria-label="X (formerly Twitter)"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-[#A4A896]/60 hover:text-[#D4FF00] transition-colors duration-250"
                aria-label="Website"
              >
                <Globe className="h-5 w-5 stroke-[1.8]" />
              </a>
              <a
                href="#"
                className="text-[#A4A896]/60 hover:text-[#D4FF00] transition-colors duration-250"
                aria-label="Chat"
              >
                <MessageSquare className="h-5 w-5 stroke-[1.8]" />
              </a>
            </div>
          </div>

          {/* Right Side: Columns */}
          <div className="col-span-1 md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Platform */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-white font-extrabold text-[12px] tracking-widest uppercase select-none">
                Platform
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/classes"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Classes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trainers"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Trainers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/forum-posts"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Forum
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-white font-extrabold text-[12px] tracking-widest uppercase select-none">
                Support
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feedback"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="col-span-2 sm:col-span-1 flex flex-col space-y-4">
              <h3 className="text-white font-extrabold text-[12px] tracking-widest uppercase select-none">
                Legal
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1C210E]/40 pt-6 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#A4A896]/45">
          <p className="select-none">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-[#A4A896] font-semibold italic transition-colors duration-250 hover:cursor-pointer">
              FitLife Hub
            </span>
            . All rights reserved.
          </p>
          <p className="text-[#A4A896]/45 select-none">
            Developed by{' '}
            <Link
              href="https://www.linkedin.com/in/mahmudulhasanzb/"
              target="_blank"
              className="text-[#A4A896] font-semibold italic transition-colors duration-250 hover:text-[#D4FF00] hover:cursor-pointer"
            >
              Mahmudul Hasan{' '}
              <span className="animate-pulse text-[#00FF37]">&gt;</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
