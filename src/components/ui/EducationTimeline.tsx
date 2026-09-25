'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getEducationData } from '@/lib/data-service';
import { EducationItem } from '@/types/portfolio';

const fallbackEducation: EducationItem[] = [
  {
    id: 'msc-bradford',
    period: '2026 — Present',
    degree: 'MSc Applied Artificial Intelligence and Data Analytics',
    institution: 'University of Bradford',
    location: 'Bradford, West Yorkshire, UK',
    status: 'Currently Studying',
    description: 'Postgraduate study focused on artificial intelligence and data analytics, building the technical foundation for a career working with data, AI and business problems.',
  },
  {
    id: 'bachelor-katth',
    period: '2023',
    degree: 'Bachelor of Travel and Tourism Studies',
    institution: 'Kathmandu Academy of Travel and Tourism Hospitality',
    location: 'Kathmandu, Nepal',
    description: 'Built a foundation in tourism, business, operations and customer-focused environments. This experience later became the context for exploring data and business analytics.'
  },
  {
    id: 'high-school-vs-niketan',
    period: '2018',
    degree: 'Higher Secondary Education · Science (Biology)',
    institution: 'V.S. Niketan Higher Secondary School',
    location: 'Kathmandu, Nepal',
    description: 'A science-based foundation that developed early analytical, quantitative and problem-solving skills.'
  }
];

export default function EducationTimeline() {
  const shouldReduceMotion = useReducedMotion();
  const [items, setItems] = useState<EducationItem[]>(fallbackEducation);

  useEffect(() => {
    async function load() {
      const data = await getEducationData();
      if (data && data.length > 0) {
        setItems(data);
      }
    }
    load();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <div className="relative max-w-4xl mx-auto pt-4">
      {/* Thin Vertical Timeline Connector Line */}
      <div 
        className="absolute left-4 sm:left-32 top-6 bottom-6 w-[2px] bg-slate-200 pointer-events-none" 
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-8 sm:space-y-10"
      >
        {items.map((item) => {
          const isCurrent = item.status?.toLowerCase().includes('current') || item.period?.includes('Present');

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-10 group"
            >
              {/* Year Column (Desktop Left Column) */}
              <div className="w-28 shrink-0 sm:text-right pt-0.5 pl-10 sm:pl-0">
                <span
                  className={`font-mono text-xs tracking-tight ${
                    isCurrent ? 'text-blue-700 font-extrabold text-sm' : 'text-slate-500 font-semibold'
                  }`}
                >
                  {item.period}
                </span>
              </div>

              {/* Timeline Circle Node */}
              <div 
                className="absolute left-4 sm:left-32 -translate-x-1/2 top-1.5 z-10 flex items-center justify-center"
                aria-hidden="true"
              >
                {isCurrent ? (
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-700 border-2 border-white shadow-xs"></span>
                  </span>
                ) : (
                  <span className="block h-3 w-3 rounded-full bg-slate-300 border-2 border-white ring-1 ring-slate-200" />
                )}
              </div>

              {/* Main Content Box */}
              <div className="flex-1 pl-10 sm:pl-0 w-full">
                <div
                  className={`rounded-2xl p-6 sm:p-7 transition-all ${
                    isCurrent
                      ? 'bg-blue-50/70 border border-blue-200/90 shadow-2xs hover:border-blue-300'
                      : 'bg-white border border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Status Tag & Location Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    {item.status ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-poppins font-bold bg-blue-700 text-white uppercase tracking-wider shadow-2xs">
                        {item.status}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {item.location}
                    </span>
                  </div>

                  {/* Qualification Degree Title */}
                  <h3
                    className={`font-poppins font-bold text-lg sm:text-xl leading-snug ${
                      isCurrent ? 'text-slate-900' : 'text-slate-800'
                    }`}
                  >
                    {item.degree}
                  </h3>

                  {/* Institution */}
                  <div className="mt-1.5 border-b border-slate-100 pb-3">
                    <span
                      className={`text-xs font-poppins font-semibold ${
                        isCurrent ? 'text-blue-700 font-bold' : 'text-slate-600'
                      }`}
                    >
                      {item.institution}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
