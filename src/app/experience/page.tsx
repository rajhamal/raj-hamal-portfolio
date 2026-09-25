'use client';

import React, { useState, useEffect } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { experienceData as fallbackExperience } from '@/data/experience';
import { getExperienceData } from '@/lib/data-service';
import { ExperienceItem } from '@/types/portfolio';
import { Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

export default function ExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>(fallbackExperience);

  useEffect(() => {
    async function load() {
      const data = await getExperienceData();
      if (data && data.length > 0) {
        setItems(data);
      }
    }
    load();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14 lg:space-y-16">
      {/* Page Introduction */}
      <section className="relative rounded-2xl sm:rounded-3xl bg-slate-50/70 border border-slate-200/60 p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xs">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 sm:w-80 h-64 sm:h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <SectionHeader
            as="h1"
            badge="Career History"
            title="Experience shaped by real-world problems."
            subtitle="From managing international tourism operations in Nepal to working across digital marketing and data-driven environments, each stage has strengthened how I understand problems, work with information, and make decisions."
          />
        </div>
      </section>

      {/* Career Timeline */}
      <section className="relative space-y-8 sm:space-y-10">
        {/* Timeline Line */}
        <div className="absolute left-[7px] sm:left-[15px] top-6 bottom-6 w-px bg-blue-200 hidden sm:block" />

        <div className="space-y-8 sm:space-y-12">
          {items.map((exp, index) => (
            <article
              key={exp.id}
              className="relative sm:pl-8 lg:pl-10 group"
            >
              {/* Timeline Marker Dot */}
              <div className="hidden sm:flex absolute left-0 top-6 w-[15px] h-[15px] rounded-full bg-white border-[3px] border-blue-600 z-10 group-hover:scale-125 transition-transform" />

              {/* Experience Card Container */}
              <div className="bg-slate-50/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/70 shadow-2xs hover:border-blue-200 hover:bg-slate-50/90 transition-all duration-200 space-y-6">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 pb-5 sm:pb-6 border-b border-slate-200/80">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="h-px w-6 bg-blue-200 hidden sm:inline-block" />

                      <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-500">
                        {exp.type}
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                      {exp.role}
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs sm:text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                        <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                        {exp.company}
                      </span>

                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start lg:justify-end pt-1 lg:pt-0">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono font-bold text-blue-700 bg-blue-50 px-2.5 sm:px-3 py-1 rounded-lg border border-blue-100">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 sm:gap-8 lg:gap-12 pt-1">
                  {/* Narrative + Responsibilities */}
                  <div>
                    {exp.operationalImpact && (
                      <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-800 font-medium mb-5 sm:mb-6 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/60 shadow-2xs">
                        {exp.operationalImpact}
                      </p>
                    )}

                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 mb-3">
                      Selected Contributions
                    </h3>

                    <ul className="space-y-2.5 sm:space-y-3">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed text-slate-600"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Evidence / Capabilities */}
                  <aside className="pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-200/80 lg:pl-8 space-y-6">
                    <div>
                      <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 mb-3 sm:mb-4">
                        Capabilities Applied
                      </h3>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {exp.analyticalSkills.map((skill) => (
                          <div
                            key={skill}
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-slate-200/80 text-[11px] sm:text-xs font-medium text-slate-700 shadow-2xs hover:border-blue-300 transition-colors"
                          >
                            <span>{skill}</span>
                            <ArrowUpRight className="w-3 h-3 text-blue-500 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Career Thread Section */}
      <section className="relative rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-6 sm:p-8 md:p-12 overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 sm:w-96 h-80 sm:h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/60 inline-block">
            The common thread
          </span>

          <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase pt-1">
            Understand the problem.<br />
            <span className="text-blue-400">Work with the data.</span><br />
            Improve the decision.
          </h2>

          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-300 font-sans pt-1 sm:pt-2">
            My experience in operations gave me practical business context.
            Digital marketing introduced me to audiences, digital channels,
            and performance information. Together, these experiences shaped
            my current focus on Data Analytics, Business Intelligence, and
            Applied AI.
          </p>
        </div>
      </section>
    </main>
  );
}
