'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ArrowUp, 
  Copy, 
  Check, 
  FileText,
  MessageSquare
} from 'lucide-react';
import { profileData } from '@/data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
          
          {/* Column 1: Brand & Narrative */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white font-display font-bold text-base shadow-xs">
                RH
              </div>
              <div>
                <span className="font-display font-bold text-slate-900 text-lg block leading-snug">
                  {profileData.displayName}
                </span>
                <span className="text-xs text-blue-700 font-medium">
                  Data Analyst & MSc Applied AI
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Postgraduate Applied AI & Data Analytics student at the University of Bradford. Transitioning 3+ years of tourism operations and logistics expertise into data-driven business intelligence, dashboard engineering, and applied AI.
            </p>

            {/* Live Availability Status Pill */}
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open for Graduate & Entry-level Data/AI Roles
              </span>
            </div>

            {/* Social & Contact Buttons */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Connect & Social Networks
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* LinkedIn */}
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 transition-colors text-xs font-semibold"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>LinkedIn</span>
                </a>

                {/* GitHub */}
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/80 transition-colors text-xs font-semibold"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>GitHub</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200/80 transition-colors text-xs font-semibold"
                  title="Send Email"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Email</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${profileData.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200/80 transition-colors text-xs font-semibold"
                  title="Chat on WhatsApp"
                >
                  <Image 
                    src="/icons/whatsapp.png" 
                    alt="WhatsApp" 
                    width={14} 
                    height={14} 
                    className="object-contain shrink-0" 
                  />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-700 transition-colors">About & Career Narrative</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-blue-700 transition-colors">Analytics Projects</Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-blue-700 transition-colors">Professional Experience</Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-blue-700 transition-colors">Technical Skills</Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-blue-700 transition-colors">Certifications</Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Resume / CV
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">
              Contact & Location
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-600">
              {/* Location */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block tracking-wider">Location</span>
                  <span className="font-medium text-slate-800">{profileData.location}</span>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block tracking-wider">Email Address</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <a 
                      href={`mailto:${profileData.email}`} 
                      className="font-mono text-xs text-blue-700 hover:underline truncate block font-medium"
                    >
                      {profileData.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
                      title="Copy Email"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block tracking-wider">Phone / WhatsApp</span>
                  <a 
                    href={`tel:${profileData.phone}`} 
                    className="font-mono text-xs text-slate-800 hover:text-blue-700 transition-colors block mt-0.5 font-medium"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {currentYear} {profileData.fullName}. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p className="font-mono text-slate-500">
              Domain: <span className="text-slate-700">{profileData.domain}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-[11px]">
              Built with Next.js & Tailwind CSS
            </span>

            {/* Back to Top Smooth Button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors font-medium text-xs shadow-2xs"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


