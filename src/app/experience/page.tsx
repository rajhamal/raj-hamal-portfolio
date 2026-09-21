import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { experienceData } from '@/data/experience';
import { Briefcase, CheckCircle2, Calendar, MapPin, Award } from 'lucide-react';

export const metadata = {
  title: 'Professional Experience | Raj Hamal',
  description: 'Detailed work history of Raj Hamal at Apex Himalaya Treks, covering 40+ international expeditions, Google Sheets dashboard tracking, and invoice reconciliations.',
};

export default function ExperiencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      <SectionHeader
        badge="Career History"
        title="Professional Experience"
        subtitle="3+ years of operations management, team leadership, financial reconciliation, and data tracking in international tourism."
      />

      <div className="relative border-l-2 border-slate-200 ml-3 sm:ml-6 space-y-12 pl-6 sm:pl-10">
        {experienceData.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-blue-700 border-4 border-slate-50 shadow-sm group-hover:scale-110 transition-transform"></div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-1">
                    {exp.type}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-semibold self-start md:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {exp.period}
                </div>
              </div>

              {/* Impact Highlight */}
              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 text-blue-900 text-xs font-medium leading-relaxed">
                <strong>Operational Highlight:</strong> {exp.operationalImpact}
              </div>

              {/* Detailed Responsibilities */}
              <div>
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
                  Key Responsibilities & Data Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Analytical Skills Badges */}
              <div className="pt-2">
                <h4 className="font-display text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Analytical Competencies Applied
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.analyticalSkills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
