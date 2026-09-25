'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award, Plus, Edit2, Trash2, Save, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { getCertificationsData, saveCertificationsData } from '@/lib/data-service';
import { CertificationItem } from '@/types/portfolio';
import ImageUploader from '@/components/ui/ImageUploader';

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CertificationItem | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<CertificationItem>({
    id: '',
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    description: '',
    topics: [],
  });

  const [topicsText, setTopicsText] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await getCertificationsData();
      setCertifications(data);
    }
    loadData();
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setFormData({
      id: `cert-${Date.now()}`,
      title: '',
      issuer: 'Google / Coursera',
      issueDate: '2026',
      credentialUrl: '',
      description: '',
      topics: [],
    });
    setTopicsText('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: CertificationItem) => {
    setEditingItem(item);
    setFormData(item);
    setTopicsText(item.topics.join('\n'));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this certification entry?')) {
      const updated = certifications.filter((c) => c.id !== id);
      setCertifications(updated);
      await saveCertificationsData(updated);
      setMessage('Certification entry deleted.');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const topics = topicsText.split('\n').filter(Boolean);
    const updatedItem: CertificationItem = { ...formData, topics };

    let updatedList: CertificationItem[];
    if (editingItem) {
      updatedList = certifications.map((c) => (c.id === editingItem.id ? updatedItem : c));
    } else {
      updatedList = [updatedItem, ...certifications];
    }

    setCertifications(updatedList);
    await saveCertificationsData(updatedList);
    setIsModalOpen(false);
    setMessage('Certification saved! Changes are live on website.');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            VERIFIED CREDENTIALS CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Certifications Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your Google Data Analytics Professional Certificate and DataCamp credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/certifications"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </Link>
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-3">
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold">
                {cert.issuer}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Issued: {cert.issueDate}</span>
                <button
                  onClick={() => openEditModal(cert)}
                  className="p-1.5 bg-slate-900 text-blue-400 rounded-lg hover:bg-blue-600/20"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-1.5 bg-slate-900 text-red-400 rounded-lg hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-white">{cert.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cert.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Sticky Header with Live Preview Toggle */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm text-white">
                    {editingItem ? 'Edit Certification Entry' : 'Add New Certification'}
                  </h2>
                  <p className="text-[11px] text-slate-400">Configure verified credential details & badge logo</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Certificate Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Google Data Analytics Professional Certificate"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Issuer *</label>
                    <input
                      type="text"
                      required
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      placeholder="e.g. Google / Coursera"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Issue Date *</label>
                    <input
                      type="text"
                      required
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      placeholder="e.g. Jan 2026"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Credential URL</label>
                  <input
                    type="url"
                    value={formData.credentialUrl || ''}
                    onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                    placeholder="https://www.coursera.org/verify/..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <ImageUploader
                  label="Certificate Badge / Logo Image"
                  value={formData.badgeUrl || ''}
                  onChange={(url) => setFormData({ ...formData, badgeUrl: url })}
                  placeholder="Choose badge from device or paste image URL..."
                  aspectRatio="square"
                />

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief summary of skills and coursework certified..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Topics Covered (One per line)</label>
                  <textarea
                    rows={3}
                    value={topicsText}
                    onChange={(e) => setTopicsText(e.target.value)}
                    placeholder="SQL Data Analytics&#10;Tableau Visualization&#10;R Programming"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Sticky Footer - Pinned at bottom, always accessible without scrolling! */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
                <span className="text-[11px] text-slate-400 font-mono">
                  Changes save directly to live site
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Certification
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

