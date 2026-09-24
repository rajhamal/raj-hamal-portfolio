'use client';

import React, { useState, useEffect } from 'react';
import { Code2, CheckCircle2 } from 'lucide-react';
import { getSkillsData } from '@/lib/data-service';
import { SkillCategory } from '@/types/portfolio';

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getSkillsData();
      setCategories(data);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            TECHNICAL MATRIX
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Skills & Tool Stack Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organized 2-level skill hierarchy: Categories → Individual Skills (Level & Context).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Category 0{idx + 1}</span>
              <h3 className="font-display font-bold text-lg text-white">{cat.categoryName}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
            </div>

            <div className="space-y-3">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="bg-slate-900/70 p-3 rounded-xl border border-slate-900 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{skill.name}</span>
                    {skill.level && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {skill.level}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">{skill.context}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
