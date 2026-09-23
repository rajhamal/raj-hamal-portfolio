import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Award, Briefcase, GraduationCap, Code2, LineChart, ShieldCheck, Mail } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import MetricCard from '@/components/ui/MetricCard';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/projects/ProjectCard';
import EducationTimeline from '@/components/ui/EducationTimeline';
import ToolIcon from '@/components/ui/ToolIcon';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { educationData } from '@/data/education';
import { skillsData } from '@/data/skills';
import { certificationsData } from '@/data/certifications';

export default function HomePage() {
  const primaryProjects = projectsData.filter((p) => p.featured && p.priority <= 3);
  const additionalProjects = projectsData.filter((p) => !p.featured || p.priority > 3);
  const googleCert = certificationsData.find((c) => c.id === 'google-data-analytics');

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <HomeHero />

      {/* 2. ABOUT / CAREER NARRATIVE SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="relative rounded-3xl bg-slate-50/70 border border-slate-200/60 p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 overflow-hidden shadow-2xs">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-72 h-72 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="space-y-3 max-w-3xl relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
              Career Narrative
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.15] uppercase text-slate-900">
              From Nepal to the UK,<br />
              <span className="text-blue-700">solving real problems</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">through data.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans pt-1 max-w-2xl">
              Connecting hands-on operational leadership and performance marketing experience with postgraduate Data Analytics and Applied AI study in the UK.
            </p>
          </div>

          {/* Clean Stepper Progression Line */}
          <div className="py-4 border-y border-slate-200/80 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { step: '01', location: 'Nepal', label: 'Operations' },
                { step: '02', location: 'Digital', label: 'Marketing' },
                { step: '03', location: 'Data & AI', label: 'Analytics' },
                { step: '04', location: 'UK', label: 'Future' },
              ].map((item) => (
                <div key={item.step} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700">{item.step}</span>
                    <span className="h-[1px] flex-1 bg-blue-200/80" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display">{item.location}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Narrative Stages (Clean text columns with subtle left accent) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {[
              {
                num: '01',
                title: 'Understanding real-world problems',
                description: 'Tourism, customers, suppliers, teams and operations.'
              },
              {
                num: '02',
                title: 'Learning to work with data',
                description: 'Performance marketing, measurement, experimentation and understanding customer behaviour.'
              },
              {
                num: '03',
                title: 'Moving toward analytics & AI',
                description: 'Data analytics, business intelligence and practical AI applied to real business problems.'
              },
            ].map((stage) => (
              <div key={stage.num} className="border-l-2 border-blue-600/70 pl-4 py-1 space-y-2 hover:border-blue-700 transition-colors">
                <span className="text-xs font-mono font-bold text-blue-700 block">
                  Stage {stage.num}
                </span>
                <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg leading-snug">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="pt-2 flex justify-end relative z-10 border-t border-slate-200/60">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors pt-2"
            >
              Explore the full story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Selected Work"
          title="Projects that show how I work with data."
          subtitle="A selection of analytics projects focused on turning raw information into clear findings, useful visualizations, and business insight."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
            >
              Explore all projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {primaryProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featuredMode={true} />
          ))}
        </div>
      </section>

      {/* 5. PROFESSIONAL EXPERIENCE SNAPSHOT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50/80 p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-2xs space-y-6">
          <SectionHeader
            badge="Work History"
            title="Professional Experience"
            subtitle="Demonstrated leadership, budget reconciliation, tracking dashboards, and operational execution in high-stakes environments."
            action={
              <Link
                href="/experience"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
              >
                View Full Timeline
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />

          <div className="space-y-4">
            {experienceData.map((exp) => (
              <div key={exp.id} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/70 hover:border-blue-200 transition-colors shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-lg">{exp.role}</h3>
                    <p className="text-xs text-blue-700 font-semibold">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-100 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {exp.operationalImpact}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.analyticalSkills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 text-[11px] font-medium bg-slate-100/80 text-slate-700 rounded-lg border border-slate-200/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EDUCATION & LEARNING */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-xs">
          <SectionHeader
            badge="Education & Learning"
            title="From Tourism to Data & AI"
            subtitle="A progression from tourism and business foundations to postgraduate study in applied artificial intelligence and data analytics."
          />

          <EducationTimeline />
        </div>
      </section>

      {/* 7. TECHNICAL & ANALYTICAL CAPABILITIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50/70 p-6 sm:p-10 md:p-12 border border-slate-200/70 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
            <SectionHeader
              badge="Capabilities"
              title="Tools I use to turn data into insight."
              subtitle="A practical toolkit spanning analytics, visualization, tracking, databases, and business intelligence."
            />

            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors shrink-0"
            >
              View full skill matrix
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {skillsData.slice(0, 3).map((category, idx) => (
              <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/70 shadow-2xs space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <h3 className="font-display font-bold text-base text-slate-900">
                    {category.categoryName}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-start gap-3"
                    >
                      <ToolIcon
                        name={skill.name}
                        size={17}
                        className="mt-0.5 shrink-0"
                      />

                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800">
                          {skill.name}
                        </p>

                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                          {skill.context}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CERTIFICATION */}
      {googleCert && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 shadow-xl border border-blue-600/30">

            {/* Subtle background detail */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">

              {/* Colorful Official Logo */}
              <div className="bg-white rounded-2xl px-6 py-3 shadow-md border border-white/40 flex items-center justify-center">
                <Image
                  src="/icons/google-certified.png"
                  alt="Google Certified Official Logo"
                  width={180}
                  height={55}
                  className="object-contain h-10 sm:h-12 w-auto"
                />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-blue-100 bg-blue-800/60 px-3 py-1 rounded-full border border-blue-600/60 inline-block">
                  Professional Credential
                </span>

                <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {googleCert.title}
                </h2>

                <p className="text-xs sm:text-sm font-mono text-blue-100">
                  Issued by Google <span className="mx-2 text-blue-300">•</span> {googleCert.issueDate}
                </p>

                <p className="max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-blue-50/90 font-sans pt-1">
                  A verified credential supporting my foundation in digital marketing, analytics, and data-driven decision making.
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <a
                  href={googleCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    inline-flex items-center justify-center gap-2
                    rounded-xl
                    bg-white
                    px-6 py-3
                    text-sm font-bold text-blue-700
                    shadow-sm
                    transition-all duration-200
                    hover:bg-blue-50 hover:shadow-md
                  "
                >
                  Verify Credential
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 9. ADDITIONAL PROJECTS */}
      {additionalProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-2">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  More Work
                </span>

                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-2">
                  More analytical work
                </h2>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
              >
                View projects
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="max-w-2xl">
              {additionalProjects.slice(0, 1).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featuredMode={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. CONTACT CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border-y border-slate-200 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">

            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Get in touch
            </span>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
              Let&apos;s build something
              <br className="hidden sm:block" />
              meaningful with data.
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg leading-7 text-slate-600">
              Open to conversations around Data Analytics, Business Intelligence,
              Applied AI, and opportunities where data can solve real business problems.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${profileData.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-lg transition-colors"
              >
                <Image
                  src="/icons/whatsapp.png"
                  alt=""
                  width={17}
                  height={17}
                  className="object-contain"
                />
                WhatsApp
              </a>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
