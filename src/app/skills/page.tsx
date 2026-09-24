import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { skillsData } from '@/data/skills';
import { CheckCircle2, Code2, Database, BarChart3, Cpu, Users } from 'lucide-react';

export const metadata = {
  title: 'Technical Skills & Matrix | Raj Hamal',
  description: 'Explore Raj Hamal\'s technical skill matrix across SQL, Tableau, Google Sheets, R, developing Python capabilities, and operational leadership.',
};

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      <SectionHeader
        as="h1"
        badge="Technical Matrix"
        title="Skills & Tool Stack"
        subtitle="Categorized breakdown of analytical tools, database languages, spreadsheets, business intelligence platforms, and domain competencies."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-display font-bold text-xl text-slate-900">
                {category.categoryName}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {category.description}
              </p>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-slate-900 text-sm">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        skill.level === 'Proficient'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : skill.level === 'Developing'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {skill.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
