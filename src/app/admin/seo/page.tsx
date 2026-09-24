'use client';

import React, { useState } from 'react';
import { Search, Save, Globe } from 'lucide-react';

export default function AdminSeoPage() {
  const pagesSeo = [
    { page: '/', title: 'Raj Hamal | Data Analyst | Applied AI & Data Analytics', description: 'Raj Hamal is a postgraduate student in Applied AI & Data Analytics at the University of Bradford, with 3+ years of tourism operations and analytics experience.' },
    { page: '/about', title: 'About Raj Hamal | From Nepal Tourism to MSc Data & AI UK', description: 'Learn how Raj Hamal transitioned from 3+ years of tourism operations and expedition logistics in Nepal into Data Analytics and MSc Applied AI.' },
    { page: '/experience', title: 'Professional Experience | Raj Hamal', description: 'Career experience spanning tourism operations, digital marketing, social media, data tracking, and business-focused problem solving.' },
    { page: '/projects', title: 'Data Analytics Case Studies & Projects | Raj Hamal', description: 'Explore verified data analytics case studies, SQL queries, Tableau dashboards, and applied AI projects by Raj Hamal.' },
    { page: '/skills', title: 'Technical Skills & Matrix | Raj Hamal', description: 'Explore Raj Hamal\'s technical skill matrix across SQL, Tableau, Google Sheets, R, developing Python capabilities, and operational leadership.' },
    { page: '/certifications', title: 'Certifications & Credentials | Raj Hamal', description: 'Verified professional certifications held by Raj Hamal, including the Google Data Analytics Professional Certificate.' },
    { page: '/resume', title: 'Resume & Curriculum Vitae | Raj Hamal', description: 'View and download the professional resume of Raj Hamal, MSc Applied AI & Data Analytics student at the University of Bradford.' },
    { page: '/contact', title: 'Contact Raj Hamal | Data Analytics & Applied AI', description: 'Get in touch with Raj Hamal for graduate data analyst roles, business intelligence opportunities, applied AI projects, and professional inquiries.' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
          SEARCH ENGINE OPTIMIZATION
        </span>
        <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
          SEO Metadata Management
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Edit unique page title tags, meta descriptions, canonical URLs, and Open Graph previews.
        </p>
      </div>

      <div className="space-y-4">
        {pagesSeo.map((item) => (
          <div key={item.page} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="font-mono text-xs font-bold text-blue-400">{item.page}</span>
              <span className="text-[11px] text-emerald-400 font-mono">Indexable</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title Tag</label>
              <input
                type="text"
                defaultValue={item.title}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Meta Description</label>
              <textarea
                rows={2}
                defaultValue={item.description}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
