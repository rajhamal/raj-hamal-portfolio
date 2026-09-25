'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowUp,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { profileData } from '@/data/profile';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navigation = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Skills', href: '/skills' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr_1fr] gap-12 lg:gap-20 py-16 lg:py-20">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
              aria-label="Raj Hamal — Home"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-display font-bold text-sm">
                RH
              </div>

              <div>
                <span className="block font-display font-bold text-lg tracking-tight text-slate-950">
                  Raj Hamal
                </span>

                <span className="block text-xs text-slate-500 mt-0.5">
                  Data Analytics · Applied AI
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-lg text-sm sm:text-base leading-7 text-slate-600">
              I work at the intersection of real-world problems, data, and
              technology — building toward a career in Data Analytics,
              Business Intelligence, and Applied AI.
            </p>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <span>
                Open to graduate & early-career opportunities
              </span>
            </div>

            {/* Socials */}
            <div className="mt-7 flex items-center gap-2">

              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${profileData.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${profileData.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
              >
                <Image
                  src="/icons/whatsapp.png"
                  alt=""
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Explore
            </p>

            <nav className="mt-5">
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-slate-950 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Contact
            </p>

            <div className="mt-5 space-y-5">

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {profileData.location}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    United Kingdom
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />

                <div className="min-w-0">
                  <p className="text-xs text-slate-400 mb-1">
                    Email
                  </p>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-sm text-slate-700 hover:text-blue-700 transition-colors break-all"
                    >
                      {profileData.email}
                    </a>

                    <button
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      title="Copy email address"
                      className="shrink-0 p-1 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />

                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    Phone / WhatsApp
                  </p>

                  <a
                    href={`tel:${profileData.phone}`}
                    className="text-sm text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400">
              <span>
                © {currentYear} {profileData.fullName}. All rights reserved.
              </span>

              <span className="hidden sm:block text-slate-300">
                /
              </span>

              <span>
                {profileData.domain}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5">
              <span className="text-xs text-slate-400">
                Built with Next.js & Tailwind CSS
              </span>

              <button
                onClick={scrollToTop}
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-950 transition-colors"
                aria-label="Back to top"
              >
                Back to top
                <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
