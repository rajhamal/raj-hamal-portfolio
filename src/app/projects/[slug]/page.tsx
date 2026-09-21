import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Github, ExternalLink, ArrowLeft, BarChart2, CheckCircle2, FileSpreadsheet, Database, Lightbulb } from 'lucide-react';
import { projectsData } from '@/data/projects';
import TableauEmbed from '@/components/projects/TableauEmbed';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Case Study by Raj Hamal`,
    description: project.shortDescription,
  };
}

export default function DynamicProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;
  const relatedProjects = projectsData.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Projects
      </Link>

      {/* 1. HERO SECTION */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            {project.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${project.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
            {project.status}
          </span>
          <span className="text-xs font-mono text-slate-400">{project.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-lg text-slate-600 font-medium">
          {project.subtitle}
        </p>

        {/* Links bar */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Github className="w-4 h-4" />
            View GitHub Repository
          </a>
          {project.tableauUrl && (
            <a
              href={project.tableauUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
            >
              <BarChart2 className="w-4 h-4" />
              Live Tableau Dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 2 & 3. METADATA & TOOLS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400 block">Project Status</span>
          <span className="text-xs font-bold text-slate-900">{project.status}</span>
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400 block">Category</span>
          <span className="text-xs font-bold text-slate-900">{project.category}</span>
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400 block">Primary Tools</span>
          <span className="text-xs font-bold text-slate-900">{project.tools.slice(0, 2).join(', ')}</span>
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400 block">Author</span>
          <span className="text-xs font-bold text-slate-900">Raj Hamal</span>
        </div>
      </div>

      {/* 4. BUSINESS / RESEARCH QUESTION */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
        <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Business Problem & Objectives
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {caseStudy.problemStatement}
        </p>
      </div>

      {/* 5. DATASET & DATA PREPARATION */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-subtle space-y-6">
        <div>
          <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-blue-600" />
            Dataset Overview
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {caseStudy.datasetDescription}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="font-display font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Data Preparation & Cleaning Steps
          </h3>
          <ul className="space-y-2.5">
            {caseStudy.dataPreparation.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6 & 7. METHODOLOGY & KEY ANALYSIS */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-subtle space-y-6">
        <h2 className="font-display font-bold text-xl text-slate-900">
          Analytical Methodology & Core Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
            <h3 className="font-display font-bold text-sm text-slate-900">Methodology Framework</h3>
            <ul className="space-y-2">
              {caseStudy.methodology.map((m, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50/60 p-6 rounded-xl border border-blue-100 space-y-3">
            <h3 className="font-display font-bold text-sm text-blue-950">Analysis Highlights</h3>
            <ul className="space-y-2">
              {caseStudy.analysisHighlights.map((h, i) => (
                <li key={i} className="text-xs text-blue-900 font-medium flex items-start gap-1.5">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 9. VISUALIZATION (TABLEAU EMBED) */}
      {(caseStudy.tableauEmbedUrl || caseStudy.tableauPublicUrl) && (
        <TableauEmbed
          embedUrl={caseStudy.tableauEmbedUrl}
          publicUrl={caseStudy.tableauPublicUrl}
          title={project.title}
        />
      )}

      {/* 10 & 11. KEY FINDINGS & RECOMMENDATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          <h2 className="font-display font-bold text-lg text-slate-900">
            Key Findings
          </h2>
          <ul className="space-y-2.5">
            {caseStudy.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          <h2 className="font-display font-bold text-lg text-slate-900">
            Business Recommendations
          </h2>
          <ul className="space-y-2.5">
            {caseStudy.businessRecommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 15. RELATED PROJECTS */}
      <div className="border-t border-slate-200 pt-10 space-y-6">
        <h3 className="font-display font-bold text-xl text-slate-900">
          Related Case Studies
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedProjects.map((rel) => (
            <Link
              key={rel.id}
              href={`/projects/${rel.slug}`}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all group"
            >
              <span className="text-[11px] font-semibold text-blue-700 block mb-1">
                {rel.category}
              </span>
              <h4 className="font-display font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                {rel.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                {rel.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
