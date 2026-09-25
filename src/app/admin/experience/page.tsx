'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Plus, Edit2, Trash2, Save, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { getExperienceData, saveExperienceData } from '@/lib/data-service';
import { ExperienceItem } from '@/types/portfolio';

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<ExperienceItem>({
    id: '',
    role: '',
    company: '',
    location: '',
    period: '',
    type: 'Full-Time Operations & Leadership',
    responsibilities: [],
    analyticalSkills: [],
    operationalImpact: '',
  });

  const [respText, setRespText] = useState('');
  const [skillsText, setSkillsText] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await getExperienceData();
      setExperience(data);
    }
    loadData();
  }, []);

  const openNewModal = () => {
    setEditingItem(null);
    setFormData({
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      period: '',
      type: 'Full-Time Operations & Leadership',
      responsibilities: [],
      analyticalSkills: [],
      operationalImpact: '',
    });
    setRespText('');
    setSkillsText('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: ExperienceItem) => {
    setEditingItem(item);
    setFormData(item);
    setRespText(item.responsibilities.join('\n'));
    setSkillsText(item.analyticalSkills.join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      const updated = experience.filter((e) => e.id !== id);
      setExperience(updated);
      await saveExperienceData(updated);
      setMessage('Experience entry deleted successfully.');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const responsibilities = respText.split('\n').filter(Boolean);
    const analyticalSkills = skillsText.split(',').map((s) => s.trim()).filter(Boolean);

    const updatedItem: ExperienceItem = {
      ...formData,
      responsibilities,
      analyticalSkills,
    };

    let updatedList: ExperienceItem[];
    if (editingItem) {
      updatedList = experience.map((e) => (e.id === editingItem.id ? updatedItem : e));
    } else {
      updatedList = [updatedItem, ...experience];
    }

    setExperience(updatedList);
    await saveExperienceData(updatedList);
    setIsModalOpen(false);
    setMessage('Experience entry saved successfully! Changes are live on the website.');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
            WORK HISTORY CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Experience Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, edit, or remove your professional roles and accomplishments. Updates reflect live on the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/experience"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition-colors"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </Link>
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {message}
        </div>
      )}

      {/* List of Experiences */}
      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div key={exp.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4 relative group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">Role 0{idx + 1} • {exp.type}</span>
                <h3 className="font-display font-bold text-lg text-white">{exp.role}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{exp.company} • {exp.location}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300">
                  {exp.period}
                </span>

                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2 bg-slate-900 hover:bg-blue-600/20 text-blue-400 rounded-lg border border-slate-800 transition-colors"
                  title="Edit Role"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 bg-slate-900 hover:bg-red-500/20 text-red-400 rounded-lg border border-slate-800 transition-colors"
                  title="Delete Role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-900">
              <strong className="text-white">Impact:</strong> {exp.operationalImpact}
            </p>

            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Capabilities Applied</h4>
              <div className="flex flex-wrap gap-1.5">
                {exp.analyticalSkills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-[11px] bg-slate-900 text-slate-300 rounded-md border border-slate-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Sticky Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm text-white">
                    {editingItem ? 'Edit Experience Entry' : 'Add New Experience Entry'}
                  </h2>
                  <p className="text-[11px] text-slate-400">Configure role title, company, period, and impact</p>
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
              <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Role Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Tour Manager / Senior Trekking Guide"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Himalaya Treks"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Kathmandu, Nepal"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Period / Date</label>
                    <input
                      type="text"
                      required
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      placeholder="Apr 2022 – Dec 2025"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Employment Type</label>
                    <input
                      type="text"
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="Full-Time Operations"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Operational Impact Summary</label>
                  <textarea
                    rows={2}
                    value={formData.operationalImpact}
                    onChange={(e) => setFormData({ ...formData, operationalImpact: e.target.value })}
                    placeholder="Summary of key results, promotions, or budget savings..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Responsibilities / Bullet Points (One per line)</label>
                  <textarea
                    rows={4}
                    value={respText}
                    onChange={(e) => setRespText(e.target.value)}
                    placeholder="Managed operational planning for 40+ expeditions...&#10;Built Google Sheets dashboards for permits..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Capabilities Applied (Comma separated)</label>
                  <input
                    type="text"
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                    placeholder="Google Sheets Dashboarding, Financial Reconciliation, Variance Analysis"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sticky Footer */}
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
                    Save Experience Entry
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
