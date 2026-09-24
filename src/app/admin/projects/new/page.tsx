'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, AlertCircle } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    category: 'Tourism Analytics',
    status: 'Completed',
    featured: true,
    priority: 1,
    date: '2026',
    shortDescription: '',
    toolsStr: 'Google Sheets, Tableau Public, SQL',
    githubUrl: '',
    tableauUrl: '',
    tableauEmbedUrl: '',
    problemStatement: '',
    datasetDescription: '',
    dataPreparationStr: '',
    methodologyStr: '',
    analysisHighlightsStr: '',
    keyFindingsStr: '',
    businessRecommendationsStr: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    setFormData({
      ...formData,
      title: val,
      slug: generatedSlug,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const tools = formData.toolsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const dataPreparation = formData.dataPreparationStr.split('\n').filter(Boolean);
    const methodology = formData.methodologyStr.split('\n').filter(Boolean);
    const analysisHighlights = formData.analysisHighlightsStr.split('\n').filter(Boolean);
    const keyFindings = formData.keyFindingsStr.split('\n').filter(Boolean);
    const businessRecommendations = formData.businessRecommendationsStr.split('\n').filter(Boolean);

    if (!isSupabaseConfigured()) {
      setMessage('Demo Mode: Project schema prepared. Add Supabase env variables to persist live changes to database.');
      setLoading(false);
      setTimeout(() => router.push('/admin/projects'), 1500);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from('projects').insert([
        {
          title: formData.title,
          slug: formData.slug,
          subtitle: formData.subtitle,
          category: formData.category,
          status: formData.status,
          featured: formData.featured,
          priority: Number(formData.priority),
          date: formData.date,
          short_description: formData.shortDescription,
          tools,
          github_url: formData.githubUrl,
          tableau_url: formData.tableauUrl,
          tableau_embed_url: formData.tableauEmbedUrl,
          problem_statement: formData.problemStatement,
          dataset_description: formData.datasetDescription,
          data_preparation: dataPreparation,
          methodology,
          analysis_highlights: analysisHighlights,
          key_findings: keyFindings,
          business_recommendations: businessRecommendations,
          tools_used: tools,
        },
      ]);

      if (error) {
        setMessage(`Database Error: ${error.message}`);
      } else {
        setMessage('Project created successfully!');
        setTimeout(() => router.push('/admin/projects'), 1000);
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="font-display text-2xl font-bold text-white tracking-tight">
          Create New Analytics Case Study
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Add a new verified data analytics project case study to your portfolio.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-300 text-xs font-semibold">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-blue-400 border-b border-slate-800 pb-2">
            1. Core Overview & Slugs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Retail Sales Performance Dashboard"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="retail-sales-performance-dashboard"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-blue-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Subtitle / Headline *
            </label>
            <input
              type="text"
              required
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Profit Margin & Regional Retail Analysis Across 10,000 Transactions"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              >
                <option value="Tourism Analytics">Tourism Analytics</option>
                <option value="Market Analysis">Market Analysis</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Applied AI / Capstone">Applied AI / Capstone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority Order</label>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Links & Tools */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-display font-bold text-sm text-blue-400 border-b border-slate-800 pb-2">
            2. Tools & External Links
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tools Used (Comma separated)
            </label>
            <input
              type="text"
              value={formData.toolsStr}
              onChange={(e) => setFormData({ ...formData, toolsStr: e.target.value })}
              placeholder="Google Sheets, Tableau Public, SQL, Feature Engineering"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/rajhamal/repository-name"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tableau Public URL</label>
              <input
                type="url"
                value={formData.tableauUrl}
                onChange={(e) => setFormData({ ...formData, tableauUrl: e.target.value })}
                placeholder="https://public.tableau.com/app/profile/raj.hamal/viz/..."
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Case Study Detailed Content */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-display font-bold text-sm text-blue-400 border-b border-slate-800 pb-2">
            3. Detailed Case Study Structure
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
            <textarea
              required
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Business Problem Statement</label>
            <textarea
              rows={3}
              value={formData.problemStatement}
              onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Dataset Description</label>
            <textarea
              rows={3}
              value={formData.datasetDescription}
              onChange={(e) => setFormData({ ...formData, datasetDescription: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Key Findings (One bullet per line)</label>
            <textarea
              rows={4}
              value={formData.keyFindingsStr}
              onChange={(e) => setFormData({ ...formData, keyFindingsStr: e.target.value })}
              placeholder="Air travel dominance: Over 85% non-Indian arrivals enter via airport.&#10;Post-pandemic recovery trajectory..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Business Recommendations (One bullet per line)</label>
            <textarea
              rows={4}
              value={formData.businessRecommendationsStr}
              onChange={(e) => setFormData({ ...formData, businessRecommendationsStr: e.target.value })}
              placeholder="Diversify market targeting...&#10;Promote high-yield ecotourism..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
            ></textarea>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving Project...' : 'Save & Publish Case Study'}
          </button>
        </div>
      </form>
    </div>
  );
}
