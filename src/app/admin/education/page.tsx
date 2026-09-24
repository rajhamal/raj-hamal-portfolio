'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, CheckCircle2 } from 'lucide-react';
import { getEducationData } from '@/lib/data-service';
import { EducationItem } from '@/types/portfolio';

export default function AdminEducationPage() {
  const [education, setEducation] = useState<EducationItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getEducationData();
      setEducation(data);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            ACADEMIC BACKGROUND
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Education Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your postgraduate MSc AI study and undergraduate degree qualifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => (
          <div key={edu.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-start gap-2 border-b border-slate-900 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">{edu.status}</span>
                <h3 className="font-display font-bold text-base text-white">{edu.degree}</h3>
                <p className="text-xs text-slate-400">{edu.institution} • {edu.location}</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-900 text-slate-300 font-mono text-[11px] rounded-md border border-slate-800">
                {edu.period}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {edu.description}
            </p>

            <ul className="space-y-1.5 pt-2 border-t border-slate-900">
              {edu.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
