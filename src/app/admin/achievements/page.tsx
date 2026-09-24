'use client';

import React, { useState } from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';

export default function AdminAchievementsPage() {
  const achievements = [
    { title: 'Google Data Analytics Professional Certificate', description: 'Completed intensive 8-course credential covering SQL, Tableau, R, and Excel analytics workflows.', date: 'Jan 2026' },
    { title: 'Rapid Promotion at Apex Himalaya Treks', description: 'Promoted from Operations Intern to Tour Manager within six months.', date: '2022' },
    { title: '40+ High-Altitude Expeditions Managed', description: 'Successfully led international trekking teams with zero critical safety breaches.', date: '2022–2025' },
    { title: 'Mera Peak Summit (6,476m)', description: 'Summited Mera Peak twice, demonstrating physical and mental endurance under pressure.', date: '2023 & 2024' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            MILESTONES
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Achievements & Highlights
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Key accomplishments across analytical study, career promotions, and expedition leadership.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((item, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{item.title}</span>
              <span className="text-[11px] font-mono text-amber-400">{item.date}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
