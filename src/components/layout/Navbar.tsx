'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { profileData } from '@/data/profile';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/certifications', label: 'Certifications' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200/90 ${
        scrolled ? 'shadow-sm py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Just "Raj Hamal", NO box icon */}
        <Link href="/" className="group flex flex-col justify-center">
          <span className="font-poppins font-extrabold text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-none">
            Raj Hamal
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 font-semibold tracking-widest uppercase mt-1">
            Data Analyst
          </span>
        </Link>

        {/* Desktop Navigation Links - Clean underline indicator & proper spacing */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-2 text-sm lg:text-base font-poppins font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {/* Simple active underline bar */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-blue-600 rounded-full transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons - Clean, optimized Resume & Contact buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-poppins font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/90 hover:border-slate-300 rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs shrink-0"
          >
            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Resume</span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 px-5 py-2 text-xs lg:text-sm font-poppins font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-4 pb-8 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2.5 px-3 rounded-xl text-lg font-poppins font-bold border-l-4 transition-all ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/70 border-blue-700'
                      : 'text-slate-700 hover:text-slate-900 border-transparent hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <Link
              href="/resume"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-poppins font-bold text-slate-800 bg-slate-100 rounded-xl hover:bg-slate-200"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              View Resume
            </Link>
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-poppins font-bold text-white bg-blue-700 rounded-xl hover:bg-blue-800"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
