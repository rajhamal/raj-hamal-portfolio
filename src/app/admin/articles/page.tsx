'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Save, X, CheckCircle2, Eye, Calendar, Tag } from 'lucide-react';
import DocRichTextEditor from '@/components/ui/DocRichTextEditor';
import ImageUploader from '@/components/ui/ImageUploader';

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  coverImage: string;
  status: 'published' | 'draft';
  date: string;
  content: string;
}

const defaultArticles: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'analytics-in-high-altitude-logistics',
    title: 'Applying Data Analytics to High-Altitude Himalayan Operations',
    summary: 'How spreadsheet pipelines, permit tracking databases, and budget reconciliation changed international trekking logistics in Nepal.',
    category: 'Operations Analytics',
    readTime: '6 min read',
    coverImage: '/images/about/himalaya-expedition-1.jpg',
    status: 'published',
    date: 'Jan 2026',
    content: '<h2>Connecting Real Operations with Data Analytics</h2><p>In high-altitude expedition management, decisions cannot be made on guesswork. Every trip involves permits, guide allocations, supplier payments, and safety protocols...</p><h3>Key Findings</h3><ul><li>Streamlined guide assignments reduced permit pipeline delays by 40%.</li><li>Financial reconciliation dashboards eliminated budget variance across remote suppliers.</li></ul>'
  },
  {
    id: 'art-2',
    slug: 'msc-applied-ai-journey-uk',
    title: 'From Nepal Trekking Operations to MSc Applied AI in Bradford',
    summary: 'Reflections on transitioning from 3+ years of tourism operations into postgraduate Data Analytics & Machine Learning at the University of Bradford.',
    category: 'Career & Applied AI',
    readTime: '4 min read',
    coverImage: '/images/about/bradford-university-atrium.jpg',
    status: 'published',
    date: 'Feb 2026',
    content: '<h2>The Next Frontier: Intelligent Decision Systems</h2><p>My postgraduate studies in Applied Artificial Intelligence and Data Analytics at the University of Bradford have provided the technical toolkit to solve complex real-world challenges...</p>'
  }
];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ArticleItem>({
    id: '',
    slug: '',
    title: '',
    summary: '',
    category: 'Data Analytics',
    readTime: '5 min read',
    coverImage: '',
    status: 'published',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    content: '',
  });

  useEffect(() => {
    const cached = localStorage.getItem('raj_cms_articles');
    if (cached) {
      try { setArticles(JSON.parse(cached)); return; } catch {}
    }
    setArticles(defaultArticles);
  }, []);

  const persist = (updated: ArticleItem[]) => {
    setArticles(updated);
    localStorage.setItem('raj_cms_articles', JSON.stringify(updated));
    setMessage('Article content updated! Changes saved.');
    setTimeout(() => setMessage(null), 3000);
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      id: `art-${Date.now()}`,
      slug: '',
      title: '',
      summary: '',
      category: 'Data Analytics',
      readTime: '5 min read',
      coverImage: '',
      status: 'published',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      content: '<h2>Article Section Title</h2><p>Start writing your formatted blog post here...</p>',
    });
    setModalOpen(true);
  };

  const openEditModal = (item: ArticleItem) => {
    setEditingId(item.id);
    setFormData(item);
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete article "${title}"?`)) {
      const updated = articles.filter((a) => a.id !== id);
      persist(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const updatedItem = { ...formData, slug };

    let updatedList: ArticleItem[];
    if (editingId) {
      updatedList = articles.map((a) => (a.id === editingId ? updatedItem : a));
    } else {
      updatedList = [updatedItem, ...articles];
    }

    persist(updatedList);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
            DYNAMIC DOCUMENT & BLOG CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Articles & Long-form Blog CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Write, format, customize alignment, add headers, quotes, and publish dynamic long-form articles.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Write New Article
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {message}
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <div key={art.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4 relative group hover:border-slate-700 transition-colors">
            {art.coverImage && (
              <div className="h-44 bg-slate-900 rounded-xl overflow-hidden border border-slate-850">
                <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  {art.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    art.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {art.status}
                  </span>

                  <button onClick={() => openEditModal(art)} className="p-1 text-slate-400 hover:text-blue-400">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button onClick={() => handleDelete(art.id, art.title)} className="p-1 text-slate-400 hover:text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-display font-bold text-base text-white leading-snug">{art.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{art.summary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Article Editor Modal with DocRichTextEditor & ImageUploader */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-4xl w-full my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="font-display font-bold text-base text-white">
                {editingId ? 'Edit Article Document' : 'Compose New Article'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Applying Data Analytics to High-Altitude Himalayan Operations"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Publish Status</label>
                  <select
                    value={formData.status}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-semibold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <ImageUploader
                label="Article Cover / Featured Image"
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                placeholder="Upload cover photo or paste image URL..."
                aspectRatio="video"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Executive Summary</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300"
                />
              </div>

              {/* Document-style WYSIWYG Editor */}
              <DocRichTextEditor
                label="Full Article Content (WYSIWYG Document Editor with Bold, Headers, Alignment, Colors)"
                value={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                minHeight="320px"
              />

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-900">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                >
                  <Save className="w-4 h-4" />
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
