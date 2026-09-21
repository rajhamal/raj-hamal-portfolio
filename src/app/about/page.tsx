import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Mail, GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { profileData } from '@/data/profile';
import { educationData } from '@/data/education';

export const metadata = {
  title: 'About Raj Hamal | Tourism Operations to Data Analyst',
  description: 'Learn how Raj Hamal transitioned from 3+ years of tourism operations and expedition logistics in Nepal into Data Analytics and Applied AI at the University of Bradford, UK.',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Header */}
      <SectionHeader
        badge="Career Journey"
        title="About Raj Hamal"
        subtitle="Operational problem solver turned data analyst, bridging real-world business challenges with quantitative analytics and postgraduate Applied AI study."
      />

      {/* Main Narrative Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left 2 Cols: Detailed Narrative */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-subtle space-y-6 text-slate-700 leading-relaxed text-base">
            <h3 className="font-display font-bold text-2xl text-slate-900 border-b border-slate-100 pb-4">
              The Operational Foundation
            </h3>
            <p>
              For over three years, I worked at the operational center of Nepal's international tourism sector at Apex Himalaya Treks. As a Tour Manager and Senior Trekking Guide, I was responsible for the safety, budgets, logistics, and ground coordination of more than 40 multi-day international expeditions in high-altitude environments.
            </p>
            <p>
              In this role, leadership wasn't just about guiding clients up mountain trails—it was about managing complex, interconnected datasets. I designed Google Sheets tracking systems to monitor permit approval pipelines, guide scheduling, supplier contract compliance, and guest payment reconciliations.
            </p>
            <p className="bg-blue-50/80 p-5 rounded-xl border border-blue-100 text-blue-950 font-medium text-sm">
              "Managing time-sensitive expedition logistics taught me that operational delays, budget overruns, and client friction are almost always data visibility problems in disguise."
            </p>

            <h3 className="font-display font-bold text-2xl text-slate-900 border-b border-slate-100 pb-4 pt-4">
              The Analytics & Applied AI Pivot
            </h3>
            <p>
              Driven by a desire to solve larger systemic business problems through quantitative data, I completed the Google Data Analytics Professional Certificate. This intensive program solidified my technical toolkit in SQL data manipulation, Tableau interactive dashboarding, Excel feature engineering, and introductory R programming.
            </p>
            <p>
              Currently, I am expanding my capabilities as a postgraduate student in MSc Applied Artificial Intelligence and Data Analytics at the University of Bradford, UK. Here, I am mastering machine learning algorithms, statistical modeling, and AI-driven automation to transform raw business data into actionable strategic intelligence.
            </p>

            <h3 className="font-display font-bold text-2xl text-slate-900 border-b border-slate-100 pb-4 pt-4">
              Analytical Principles & Philosophy
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Business Context First:</strong> Data without business context is just noise. Every query and visualization should answer a concrete commercial question.</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Integrity & Rigor:</strong> Data cleaning and validation are non-negotiable. Insights are only as trustworthy as the underlying ETL pipeline.</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Clear Communication:</strong> Executive dashboards should present clear narrative stories that non-technical stakeholders can understand immediately.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right 1 Col: Quick Facts & Education Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
              Key Information
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block font-medium">Full Name</span>
                <span className="font-semibold text-slate-900">{profileData.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Primary Focus</span>
                <span className="font-semibold text-slate-900">{profileData.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Location</span>
                <span className="font-semibold text-slate-900">{profileData.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Languages</span>
                <span className="font-semibold text-slate-900">Nepali (Native), English (Proficient), Hindi (Proficient)</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">High Altitude Achievement</span>
                <span className="font-semibold text-slate-900">Mera Peak Summited Twice (6,476m)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-elevated">
            <h3 className="font-display text-base font-bold">Current Education</h3>
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded bg-blue-800 text-blue-200 text-[11px] font-semibold">
                Sept 2026 – Present
              </span>
              <h4 className="font-display font-bold text-sm text-slate-100">
                MSc Applied Artificial Intelligence & Data Analytics
              </h4>
              <p className="text-xs text-blue-400 font-medium">University of Bradford, UK</p>
              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                Postgraduate study covering machine learning, data mining, statistical modeling, and business AI integration.
              </p>
            </div>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:text-white pt-2 transition-colors"
            >
              View Full Academic Resume
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
