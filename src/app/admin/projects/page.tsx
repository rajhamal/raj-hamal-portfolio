'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
  Star,
  Github,
  BarChart3,
} from 'lucide-react';
import { getProjectsData } from '@/lib/data-service';
import { ProjectItem } from '@/types/portfolio';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjectsData();
      setProjects(data);
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            CONTENT MANAGEMENT
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Projects & Case Studies
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your analytics case studies, GitHub URLs, Tableau embeds, problem statements, and findings.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Case Study
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title or category..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Tourism Analytics', 'Market Analysis', 'Business Intelligence', 'Applied AI / Capstone'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Project Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">
                    <div>
                      <Link href={`/projects/${project.slug}`} target="_blank" className="hover:text-blue-400 flex items-center gap-1.5">
                        {project.title}
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </Link>
                      <span className="text-[11px] text-slate-500 block font-normal mt-0.5">
                        {project.subtitle}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-300">
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-[11px]">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      project.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {project.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> Featured
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-400">
                    {project.date}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className="p-1.5 text-blue-400 hover:bg-blue-600/20 rounded-lg transition-colors"
                        title="Edit Case Study"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
