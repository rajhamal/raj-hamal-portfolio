import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { profileData } from '@/data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Narrative */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-display font-bold text-base">
                RH
              </div>
              <span className="font-display font-bold text-slate-900 text-lg">
                {profileData.displayName}
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Data Analyst & MSc Applied AI student at the University of Bradford. Transitioning 3+ years of tourism operations and logistics expertise into data-driven business analytics, dashboard engineering, and applied AI.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 px-2.5 py-1.5 rounded-md"
              >
                <Github className="w-4 h-4 text-slate-700" />
                GitHub
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 px-2.5 py-1.5 rounded-md"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-display text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-700 transition-colors">About & Career Transition</Link>
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
                <Link href="/resume" className="hover:text-blue-700 transition-colors">Resume / CV</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{profileData.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href={`mailto:${profileData.email}`} className="hover:text-blue-700 transition-colors font-mono text-xs">
                  {profileData.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a href={`tel:${profileData.phone}`} className="hover:text-blue-700 transition-colors font-mono text-xs">
                  {profileData.phone}
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Open for Graduate & Entry-level Data/AI Roles
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} {profileData.fullName}. All rights reserved.</p>
          <p className="text-slate-400">
            Domain: <span className="font-mono text-slate-600">{profileData.domain}</span> • Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
