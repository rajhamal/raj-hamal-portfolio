'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Plus,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { getProjectsData, getExperienceData, getEducationData, getCertificationsData } from '@/lib/data-service';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 4,
    featuredCount: 3,
    experienceCount: 3,
    educationCount: 3,
    certificationsCount: 5,
    messagesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, experience, education, certs] = await Promise.all([
          getProjectsData(),
          getExperienceData(),
          getEducationData(),
          getCertificationsData(),
        ]);

        setStats({
          projectsCount: projects.length,
          featuredCount: projects.filter((p) => p.featured).length,
          experienceCount: experience.length,
          educationCount: education.length,
          certificationsCount: certs.length,
          messagesCount: 0,
        });
      } catch {
        // Keep fallback stats
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            ADMIN DASHBOARD
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Welcome back, Raj
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage portfolio case studies, work experience, certifications, and visitor contact messages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Project
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Projects</span>
            <FolderKanban className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">
              {stats.projectsCount}
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              {stats.featuredCount} Featured
            </span>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Experience Roles</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">
              {stats.experienceCount}
            </span>
            <span className="text-[11px] text-slate-400">3+ Yrs Operations</span>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Certifications</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">
              {stats.certificationsCount}
            </span>
            <span className="text-[11px] text-amber-400">Google Certified</span>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Contact Messages</span>
            <Mail className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">
              {stats.messagesCount}
            </span>
            <span className="text-[11px] text-slate-400">Inbox</span>
          </div>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Projects CMS</h3>
              <p className="text-xs text-slate-400">Create & edit case studies</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Manage your analytics case studies, GitHub links, Tableau embeds, problem statements, and findings.
          </p>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
          >
            Manage Projects →
          </Link>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Experience & Skills</h3>
              <p className="text-xs text-slate-400">Work history & capabilities</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Update your roles at Apex Himalaya Treks, digital marketing work, education entries, and technical skill matrix.
          </p>
          <Link
            href="/admin/experience"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
          >
            Manage Experience →
          </Link>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Site Settings & SEO</h3>
              <p className="text-xs text-slate-400">Global metadata & contact</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Configure contact details, social URLs, page meta titles, Open Graph tags, and media library assets.
          </p>
          <Link
            href="/admin/site-settings"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            Edit Site Settings →
          </Link>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold text-base text-white border-b border-slate-800 pb-3">
          Recent CMS Activity Log
        </h3>
        <div className="space-y-3 text-xs text-slate-300">
          <div className="flex items-center justify-between py-2 border-b border-slate-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Phase 1 audit completed — UI ready as presentation layer.</span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">System</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Favicon icon set to official profile image (raj hamal pp 1.jpeg).</span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">System</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Supabase schema & seed SQL generated in <code>supabase/</code> directory.</span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">Phase 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
