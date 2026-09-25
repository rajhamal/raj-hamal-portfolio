'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Plus, Edit2, Trash2, CheckCircle2, X, Save } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
}

const defaultAchievements: Achievement[] = [
  { id: '1', title: 'Google Data Analytics Professional Certificate', description: 'Completed intensive 8-course credential covering SQL, Tableau, R, and Excel analytics workflows.', date: 'Jan 2026', category: 'Certification' },
  { id: '2', title: 'Rapid Promotion at Apex Himalaya Treks', description: 'Promoted from Operations Intern to Tour Manager within six months.', date: '2022', category: 'Career' },
  { id: '3', title: '40+ High-Altitude Expeditions Managed', description: 'Successfully led international trekking teams with zero critical safety breaches.', date: '2022–2025', category: 'Operations' },
  { id: '4', title: 'Mera Peak Summit (6,476m)', description: 'Summited Mera Peak twice, demonstrating physical and mental endurance under pressure.', date: '2023 & 2024', category: 'Expedition' }
];

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem('raj_cms_achievements');
    if (cached) {
      try { setItems(JSON.parse(cached)); return; } catch {}
    }
    setItems(defaultAchievements);
  }, []);

  const persist = (updated: Achievement[]) => {
    setItems(updated);
    localStorage.setItem('raj_cms_achievements', JSON.stringify(updated));
    setSavedMessage('Achievements updated! Live website sync active.');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const openModal = (index?: number) => {
    if (index !== undefined) {
      setEditIndex(index);
      setTitle(items[index].title);
      setDescription(items[index].description);
      setDate(items[index].date);
      setCategory(items[index].category || '');
    } else {
      setEditIndex(null);
      setTitle('');
      setDescription('');
      setDate('');
      setCategory('Analytics');
    }
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: Achievement = {
      id: editIndex !== null ? items[editIndex].id : Date.now().toString(),
      title,
      description,
      date,
      category,
    };

    const updated = [...items];
    if (editIndex !== null) {
      updated[editIndex] = newItem;
    } else {
      updated.push(newItem);
    }

    persist(updated);
    setModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if (confirm(`Delete achievement "${items[index].title}"?`)) {
      const updated = items.filter((_, i) => i !== index);
      persist(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            MILESTONES CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Achievements & Key Highlights
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage key professional milestones across analytics, career promotions, and leadership.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Milestone
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {savedMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={item.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2 relative group hover:border-slate-700 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">{item.title}</span>
                {item.category && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {item.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono font-bold text-amber-400">{item.date}</span>
                <button onClick={() => openModal(idx)} className="p-1 text-slate-500 hover:text-blue-400">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(idx)} className="p-1 text-slate-500 hover:text-red-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">{item.description}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="font-display font-bold text-base text-white">
                {editIndex !== null ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rapid Promotion at Apex Treks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date / Period</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jan 2026 or 2022–2025"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Operations / Analytics"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief summary of the achievement..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
