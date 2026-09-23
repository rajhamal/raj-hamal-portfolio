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

      {/* 2. ABOUT / CAREER TRANSITION NARRATIVE */}

      {/* 3. ABOUT / CAREER TRANSITION NARRATIVE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="uiverse-card-glass rounded-2xl p-8 sm:p-10">
          <SectionHeader
            badge="Career Narrative"
            title="Operational Problem Solver Transformed into Data Analyst"
            subtitle="Connecting 3+ years of tourism logistics, supplier management, and team leadership with postgraduate Applied AI and Data Analytics training."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-slate-50/90 p-6 rounded-xl border border-slate-100 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">Tourism Operations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {profileData.narrative.origin}
              </p>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-xl border border-slate-100 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">Data & Analytics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {profileData.narrative.transition}
              </p>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-xl border border-slate-100 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-display font-bold text-slate-900 text-lg">Applied AI & Future</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {profileData.narrative.vision}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              Targeting Graduate Data Analyst, Business Intelligence, and Applied AI Roles across the UK.
            </span>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800"
            >
              Read Full Career Background
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Project Evidence"
          title="Featured Case Studies & Dashboards"
          subtitle="Explore end-to-end data analytics projects using government statistics, retail transaction datasets, and market intelligence."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
            >
              View All Projects Grid
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
        <div className="uiverse-card-glass rounded-2xl p-8 sm:p-10">
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

          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div key={exp.id} className="p-6 rounded-xl bg-slate-50/90 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-lg">{exp.role}</h3>
                    <p className="text-xs text-blue-700 font-semibold">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white text-slate-700 border border-slate-200/80 shadow-2xs self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {exp.operationalImpact}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.analyticalSkills.map((skill) => (
                    <span key={skill} className="px-2.5 py-0.5 text-[11px] font-medium bg-white text-slate-700 rounded-md border border-slate-200 shadow-2xs">
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
        <SectionHeader
          badge="Education & Learning"
          title="From Tourism to Data & AI"
          subtitle="A progression from tourism and business foundations to postgraduate study in applied artificial intelligence and data analytics."
        />

        <EducationTimeline />
      </section>

      {/* 7. TECHNICAL SKILLS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-subtle">
          <SectionHeader
            badge="Tool Stack & Expertise"
            title="Technical & Analytical Capabilities"
            subtitle="Practical mastery across business intelligence platforms, database querying, spreadsheets, and statistical analysis."
            action={
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
              >
                View Skill Matrix
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.slice(0, 3).map((category, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
                <h3 className="font-display font-bold text-slate-900 text-base border-b border-slate-200 pb-2">
                  {category.categoryName}
                </h3>
                <ul className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="space-y-0.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 flex items-center">
                          <ToolIcon name={skill.name} size={14} className="mr-1.5" />
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${skill.level === 'Proficient' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                            {skill.level}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">{skill.context}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CERTIFICATIONS */}
      {googleCert && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl p-8 sm:p-10 shadow-elevated relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-poppins font-bold shadow-md">
                  <Image src="/icons/google-certified.png" alt="Google Certified" width={26} height={26} className="object-contain shrink-0" />
                  <span>Google Certified Professional</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-extrabold tracking-tight text-white leading-tight">
                  {googleCert.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {googleCert.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {googleCert.topics.map((t, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80">
                      <ToolIcon name={t} size={16} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center md:items-end gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="w-32 h-32 sm:w-36 sm:h-36 bg-white rounded-2xl p-3.5 shadow-xl flex items-center justify-center border-2 border-white/20">
                  <Image
                    src="/icons/google-certified.png"
                    alt="Google Certified Official Badge"
                    width={120}
                    height={120}
                    className="object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-center md:text-right">
                  <div className="text-xs font-mono text-slate-300">Verified Credential</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">Issued: {googleCert.issueDate}</div>
                </div>
                <a
                  href={googleCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-poppins font-semibold text-xs rounded-lg transition-colors shadow-sm"
                >
                  Verify Certificate
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. ADDITIONAL PROJECT (Bellabeat Capstone Spotlight) */}
      {additionalProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Ongoing Capstone"
            title="Additional Project Evidence"
            subtitle="Active analytics exploration in Google BigQuery utilizing cloud data warehousing."
          />
          <div className="max-w-xl">
            {additionalProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featuredMode={false} />
            ))}
          </div>
        </section>
      )}

      {/* 10. CONTACT CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-subtle space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-2">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Let's Discuss Data & AI Opportunities
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            I am actively seeking graduate and entry-level opportunities in Data Analytics, Business Intelligence, and Applied AI across the UK. Feel free to reach out directly or inspect my resume.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-all shadow-xs"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${profileData.email}`}
              className="inline-flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg transition-colors font-mono"
            >
              <Image src="/icons/gmail.png" alt="Email" width={16} height={16} className="object-contain" />
              {profileData.email}
            </a>
            <a
              href={`https://wa.me/${profileData.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg transition-colors font-mono"
            >
              <Image src="/icons/whatsapp.png" alt="Call/WhatsApp" width={16} height={16} className="object-contain" />
              {profileData.phone}
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg transition-colors"
            >
              <Image src="/icons/linkedin.png" alt="LinkedIn" width={16} height={16} className="object-contain" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
