'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Plus, Edit2, Trash2, Save, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { getEducationData, saveEducationData } from '@/lib/data-service';
import { EducationItem } from '@/types/portfolio';

export default function AdminEducationPage() {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<EducationItem>({
    id: '',
    degree: '',
    institution: '',
    location: '',
    period: '',
    status: 'Completed',
    description: '',
    highlights: [],
  });

  const [highlightsText, setHighlightsText] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await getEducationData();
      setEducation(data);
    }
    loadData();
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setFormData({
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      period: '',
      status: 'In Progress',
      description: '',
      highlights: [],
    });
    setHighlightsText('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: EducationItem) => {
    setEditingItem(item);
    setFormData(item);
    setHighlightsText((item.highlights || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this education entry?')) {
      const updated = education.filter((e) => e.id !== id);
      setEducation(updated);
      await saveEducationData(updated);
      setMessage('Education entry deleted.');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const highlights = highlightsText.split('\n').filter(Boolean);
    const updatedItem: EducationItem = { ...formData, highlights };

    let updatedList: EducationItem[];
    if (editingItem) {
      updatedList = education.map((e) => (e.id === editingItem.id ? updatedItem : e));
    } else {
      updatedList = [updatedItem, ...education];
    }

    setEducation(updatedList);
    await saveEducationData(updatedList);
    setIsModalOpen(false);
    setMessage('Education updated! Changes are live on website.');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            ACADEMIC CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Education Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your postgraduate MSc AI study and degree qualifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#education"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </Link>
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Education
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
        {education.map((edu) => (
          <div key={edu.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-start gap-2 border-b border-slate-900 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">{edu.status}</span>
                <h3 className="font-display font-bold text-base text-white">{edu.degree}</h3>
                <p className="text-xs text-slate-400">{edu.institution} • {edu.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(edu)}
                  className="p-1.5 bg-slate-900 text-blue-400 rounded-lg hover:bg-blue-600/20"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="p-1.5 bg-slate-900 text-red-400 rounded-lg hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-display font-bold text-base text-white">
                {editingItem ? 'Edit Education Entry' : 'Add Education Entry'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Qualification *</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="MSc Applied Artificial Intelligence and Data Analytics"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Institution *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="University of Bradford"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bradford, West Yorkshire, UK"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Period</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Sept 2026 – Present"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Highlights (One per line)</label>
                <textarea
                  rows={3}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-950 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                >
                  <Save className="w-4 h-4" />
                  Save Education Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
