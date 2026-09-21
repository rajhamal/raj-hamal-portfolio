'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  MapPin, 
  ChevronRight,
  Sparkles,
  BarChart2,
  Cpu
} from 'lucide-react';
import { profileData } from '@/data/profile';

const stackTools = [
  { name: 'SQL', icon: '/icons/sql.png', type: 'image' },
  { name: 'Tableau', icon: '/icons/tableau.png', type: 'image' },
  { name: 'Power BI', icon: '/icons/powerbi.svg', type: 'image' },
  { name: 'Python', icon: '/icons/python.png', type: 'image' },
  { name: 'Google Sheets', icon: '/icons/google-sheets.png', type: 'image' },
  { name: 'Google BigQuery', icon: '/icons/bigquery.svg', type: 'image' },
  { name: 'R Analytics', icon: 'r', type: 'lucide' },
  { name: 'Machine Learning', icon: 'ml', type: 'lucide' },
];

export default function HomeHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] lg:min-h-screen flex flex-col justify-between pt-6 pb-8 md:pt-10 md:pb-10 overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-slate-50/80">
      {/* Subtle Background Radial Grid & Glow Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Main 2-Column Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center flex-1 my-auto"
        >
          {/* Left Main Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 pt-2 lg:pt-0">
            {/* Status Badge Pill */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-poppins font-semibold text-slate-800">
                  MSc Applied AI & Data Analytics • University of Bradford
                </span>
              </div>
            </motion.div>

            {/* Name Title */}
            <motion.h1
              variants={itemVariants}
              className="font-poppins font-extrabold text-5xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.05]"
            >
              RAJ HAMAL
            </motion.h1>

            {/* Role Title */}
            <motion.div
              variants={itemVariants}
              className="mt-3 text-xl sm:text-2xl lg:text-3xl font-poppins font-bold text-blue-700 tracking-tight"
            >
              Data Analyst | Applied AI & Data Analytics
            </motion.div>

            {/* Hero Copy / Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg sm:text-xl text-slate-800 font-poppins font-semibold leading-snug max-w-2xl"
            >
              Turning data into insights, dashboards, and better business decisions.
            </motion.p>

            {/* Bio Statement */}
            <motion.p
              variants={itemVariants}
              className="mt-3 text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              3+ years of real-world operations and client-facing experience, now building a career in data analytics and applied AI.
            </motion.p>

            {/* Location Pill */}
            <motion.div
              variants={itemVariants}
              className="mt-4 flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs font-sans text-xs text-slate-600 font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{profileData.location}</span>
            </motion.div>

            {/* Action CTAs & Social Links */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-poppins font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/90 font-poppins font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-2xs hover:border-slate-400 hover:-translate-y-0.5"
              >
                <FileText className="w-4.5 h-4.5 text-blue-600" />
                View Resume
              </Link>

              {/* Social Icons: LinkedIn | GitHub */}
              <div className="flex items-center gap-2 ml-auto sm:ml-2">
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-all shadow-2xs font-poppins font-semibold text-xs text-slate-700 group"
                  title="LinkedIn Profile"
                >
                  <Image src="/icons/linkedin.png" alt="LinkedIn" width={18} height={18} className="object-contain group-hover:scale-105 transition-transform" />
                  <span>LinkedIn</span>
                </a>
                <span className="text-slate-300 font-light">|</span>
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-slate-400 transition-all shadow-2xs font-poppins font-semibold text-xs text-slate-700 group"
                  title="GitHub Profile"
                >
                  <Github className="w-4.5 h-4.5 text-slate-800 group-hover:scale-105 transition-transform" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Column: Full Cutout Image with Gradient Bottom Fade */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col items-center justify-end relative h-[420px] sm:h-[480px] lg:h-[560px] w-full"
          >
            {/* Background Arch Glow & Frame */}
            <div className="absolute bottom-0 w-full h-[85%] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-slate-100/60 rounded-t-[3.5rem] border-t border-x border-slate-200/70 shadow-sm overflow-hidden" />
            
            {/* Soft Ambient Light Circle Behind Head */}
            <div className="absolute top-10 w-64 h-64 sm:w-72 sm:h-72 bg-blue-300/30 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Credential Badges */}
            <div className="absolute top-4 left-2 sm:left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-md">
              <Image src="/icons/university-of-bradford.png" width={18} height={18} alt="Univ Bradford" className="object-contain" />
              <span className="text-xs font-poppins font-semibold text-slate-800">Univ. of Bradford</span>
            </div>

            <div className="absolute top-10 right-2 sm:right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-md">
              <Image src="/icons/google-certified.png" width={18} height={18} alt="Google Certified" className="object-contain" />
              <span className="text-xs font-poppins font-semibold text-slate-800">Google Certified</span>
            </div>

            {/* Cutout Portrait Image Container */}
            <div 
              className="relative z-10 w-full h-full flex items-end justify-center"
              style={{
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              }}
            >
              <Image
                src="/images/raj-hamal-hero.png"
                alt="Raj Kumar Hamal"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain object-bottom drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </div>

            {/* Gradient Bottom Fade Layer for seamless blend */}
            <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Bottom Section: Verified Metrics & Core Analytics Motion Ticker */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 pt-6 border-t border-slate-200/80 w-full z-10"
        >
          {/* Verified Metrics Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5">
            {profileData.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all group"
              >
                <div className="font-poppins font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-700 transition-colors">
                  {metric.value}
                </div>
                <div className="font-poppins font-semibold text-xs text-slate-800 mt-0.5">
                  {metric.label}
                </div>
                <p className="text-[11px] text-slate-500 font-sans leading-tight mt-1 line-clamp-2">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* Core Analytics Tools & Stack Motion Ticker */}
          <div className="relative overflow-hidden py-3 sm:py-3.5 bg-slate-100/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center">
              <div className="px-4 sm:px-5 py-2 font-poppins font-bold text-xs sm:text-sm text-slate-700 uppercase tracking-wider whitespace-nowrap border-r border-slate-300/90 shrink-0 bg-slate-200/70 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span>Core Stack</span>
              </div>
              
              {/* Continuous Moving Ticker */}
              <div className="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                  className="flex items-center gap-4 sm:gap-6 whitespace-nowrap pl-4 shrink-0"
                >
                  {[...stackTools, ...stackTools, ...stackTools].map((tool, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4.5 py-2.5 sm:px-5 sm:py-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-xs sm:text-sm font-poppins font-bold text-slate-800 hover:border-blue-400 hover:shadow-xs transition-all"
                    >
                      {tool.type === 'image' ? (
                        <Image src={tool.icon} alt={tool.name} width={28} height={28} className="object-contain shrink-0" />
                      ) : tool.icon === 'r' ? (
                        <BarChart2 className="w-6 h-6 text-blue-600 shrink-0" />
                      ) : (
                        <Cpu className="w-6 h-6 text-indigo-600 shrink-0" />
                      )}
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

