import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { profileData } from '@/data/profile';
import { experienceData } from '@/data/experience';
import { educationData } from '@/data/education';
import { certificationsData } from '@/data/certifications';
import { skillsData } from '@/data/skills';
import { FileText, Download, Mail, Phone, MapPin, Github, Linkedin, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Resume & Curriculum Vitae | Raj Hamal',
  description: 'View and download the professional resume of Raj Hamal, MSc Applied AI & Data Analytics student at the University of Bradford.',
};

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Top Bar with Print/Download CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-1">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            {profileData.fullName}
          </h1>
          <p className="text-sm font-medium text-slate-600 mt-1">
            {profileData.title} • {profileData.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profileData.email}?subject=Requesting%20PDF%20Resume`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            Request PDF Copy
          </a>
        </div>
      </div>

      {/* Web Formatted Resume Document Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-subtle space-y-10">
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                {profileData.fullName}
              </h2>
              <p className="text-sm font-semibold text-blue-700 mt-0.5">
                {profileData.title}
              </p>
            </div>
            <div className="text-right text-xs text-slate-600 space-y-1">
              <p className="flex items-center justify-end gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                {profileData.email}
              </p>
              <p className="flex items-center justify-end gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                {profileData.phone}
              </p>
              <p className="flex items-center justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {profileData.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs pt-2">
            <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1 font-mono">
              <Linkedin className="w-3.5 h-3.5" /> {profileData.linkedinUrl.replace('https://', '')}
            </a>
            <span>•</span>
            <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1 font-mono">
              <Github className="w-3.5 h-3.5" /> {profileData.githubUrl.replace('https://', '')}
            </a>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Professional Profile
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {profileData.bio}
          </p>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Education
          </h3>
          <div className="space-y-4">
            {educationData.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="font-mono text-slate-500">{edu.period}</span>
                </div>
                <div className="text-xs text-blue-700 font-medium">
                  {edu.institution}, {edu.location}
                </div>
                <p className="text-xs text-slate-600">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-6">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                  <span className="font-mono text-slate-500">{exp.period}</span>
                </div>
                <div className="text-xs text-blue-700 font-medium">
                  {exp.company} — {exp.location}
                </div>
                <ul className="space-y-1.5 pt-1">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Certifications & Training
          </h3>
          <div className="space-y-2">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">{cert.title} ({cert.issuer})</span>
                <span className="font-mono text-slate-500">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            Key Achievements & Highlights
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Built independent data analytics case studies published on GitHub and Tableau Public.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Earned promotion from Operations Intern to Tour Manager within six months at Apex Himalaya Treks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Managed logistics and safety for 40+ multi-day international expeditions across Nepal.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Summited Mera Peak (6,476m) twice, demonstrating extreme mental endurance and high-pressure decision making.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
