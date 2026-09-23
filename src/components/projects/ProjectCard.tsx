import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, ArrowRight, BarChart3, Database, CheckCircle2, Clock } from 'lucide-react';
import { ProjectItem } from '@/types/portfolio';
import ToolIcon from '@/components/ui/ToolIcon';

interface ProjectCardProps {
  project: ProjectItem;
  featuredMode?: boolean;
}

export default function ProjectCard({ project, featuredMode = false }: ProjectCardProps) {
  const isPrimary = project.priority <= 3 && project.featured;

  if (featuredMode && isPrimary) {
    return (
      <div className="uiverse-card-glass rounded-2xl flex flex-col justify-between overflow-hidden group">
        <div className="p-6 sm:p-8 space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100/90 shadow-2xs">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {project.date}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              <Link href={`/projects/${project.slug}`}>
                {project.title}
              </Link>
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Problem / Metric Highlight */}
          <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Core Analytical Insight
            </span>
            <p className="text-xs text-slate-800 font-medium leading-normal">
              {project.caseStudy.analysisHighlights[0] || project.caseStudy.problemStatement.slice(0, 140) + '...'}
            </p>
          </div>

          {/* Tools List */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white text-slate-700 rounded-md border border-slate-200/80 shadow-2xs"
              >
                <ToolIcon name={tool} size={14} />
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="bg-slate-50/70 px-6 sm:px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4 text-slate-700" />
              Code
            </a>
            {project.tableauUrl && (
              <a
                href={project.tableauUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                title="View Live Tableau Dashboard"
              >
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Tableau Dashboard
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors"
          >
            Read Case Study
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  // Secondary / Additional Card (e.g. Bellabeat Capstone)
  return (
    <div className="uiverse-card-glass rounded-xl p-6 flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
            <Clock className="w-3 h-3 text-amber-600" />
            {project.status}
          </span>
          <span className="text-xs font-mono text-slate-400">{project.category}</span>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            <Link href={`/projects/${project.slug}`} className="hover:text-blue-700 transition-colors">
              {project.title}
            </Link>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{project.subtitle}</p>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <span key={tool} className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-white text-slate-700 rounded border border-slate-200/80 shadow-2xs">
              <ToolIcon name={tool} size={12} />
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub Repo
        </a>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
        >
          View Progress
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
