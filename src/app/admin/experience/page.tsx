'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { getExperienceData } from '@/lib/data-service';
import { ExperienceItem } from '@/types/portfolio';

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getExperienceData();
      setExperience(data);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
            WORK HISTORY
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Experience Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update your professional roles, responsibilities, capabilities applied, and operational impacts.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div key={exp.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">Role 0{idx + 1}</span>
                <h3 className="font-display font-bold text-lg text-white">{exp.role}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{exp.company} • {exp.location}</p>
              </div>
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300 self-start sm:self-auto">
                {exp.period}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-900">
              <strong className="text-white">Impact:</strong> {exp.operationalImpact}
            </p>

            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Capabilities Applied</h4>
              <div className="flex flex-wrap gap-1.5">
                {exp.analyticalSkills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-[11px] bg-slate-900 text-slate-300 rounded-md border border-slate-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
