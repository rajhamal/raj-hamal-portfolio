'use client';

import React, { useState, useEffect } from 'react';
import { Code2, Plus, Edit2, Trash2, CheckCircle2, Save, X, Layers } from 'lucide-react';
import { getSkillsData, saveSkillsData } from '@/lib/data-service';
import { SkillCategory, SkillItem } from '@/types/portfolio';

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  // Category Modal State
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editCatIndex, setEditCatIndex] = useState<number | null>(null);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Skill Modal State
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedCatIdx, setSelectedCatIdx] = useState<number>(0);
  const [editSkillIdx, setEditSkillIdx] = useState<number | null>(null);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState<'Proficient' | 'Developing' | 'Foundational'>('Proficient');
  const [skillContext, setSkillContext] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await getSkillsData();
      setCategories(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSaveCategories = async (updated: SkillCategory[]) => {
    setCategories(updated);
    await saveSkillsData(updated);
    setSavedMessage('Skills matrix updated successfully! Live website reflects changes.');
    setTimeout(() => setSavedMessage(null), 3500);
  };

  // Open Category Modal
  const openCategoryModal = (index?: number) => {
    if (index !== undefined) {
      setEditCatIndex(index);
      setCatName(categories[index].categoryName);
      setCatDesc(categories[index].description || '');
    } else {
      setEditCatIndex(null);
      setCatName('');
      setCatDesc('');
    }
    setCatModalOpen(true);
  };

  const saveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const updated = [...categories];
    if (editCatIndex !== null) {
      updated[editCatIndex] = {
        ...updated[editCatIndex],
        categoryName: catName,
        description: catDesc,
      };
    } else {
      updated.push({
        categoryName: catName,
        description: catDesc,
        skills: [],
      });
    }
    handleSaveCategories(updated);
    setCatModalOpen(false);
  };

  const deleteCategory = (index: number) => {
    if (confirm(`Delete skill category "${categories[index].categoryName}" and all its skills?`)) {
      const updated = categories.filter((_, i) => i !== index);
      handleSaveCategories(updated);
    }
  };

  // Open Skill Modal
  const openSkillModal = (catIdx: number, skillIdx?: number) => {
    setSelectedCatIdx(catIdx);
    if (skillIdx !== undefined) {
      setEditSkillIdx(skillIdx);
      const target = categories[catIdx].skills[skillIdx];
      setSkillName(target.name);
      setSkillLevel(target.level || 'Proficient');
      setSkillContext(target.context);
    } else {
      setEditSkillIdx(null);
      setSkillName('');
      setSkillLevel('Proficient');
      setSkillContext('');
    }
    setSkillModalOpen(true);
  };

  const saveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    const updated = [...categories];
    const targetCat = { ...updated[selectedCatIdx] };
    const updatedSkills = [...targetCat.skills];

    const newSkillItem: SkillItem = {
      name: skillName,
      level: skillLevel,
      context: skillContext,
    };

    if (editSkillIdx !== null) {
      updatedSkills[editSkillIdx] = newSkillItem;
    } else {
      updatedSkills.push(newSkillItem);
    }

    targetCat.skills = updatedSkills;
    updated[selectedCatIdx] = targetCat;
    handleSaveCategories(updated);
    setSkillModalOpen(false);
  };

  const deleteSkill = (catIdx: number, skillIdx: number) => {
    if (confirm('Delete this skill item?')) {
      const updated = [...categories];
      updated[catIdx].skills = updated[catIdx].skills.filter((_, i) => i !== skillIdx);
      handleSaveCategories(updated);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
        Loading Skills Matrix...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            TECHNICAL MATRIX CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Skills & Tool Stack Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your skill categories, proficiency levels (Proficient, Developing, Foundational), and context notes.
          </p>
        </div>

        <button
          onClick={() => openCategoryModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {savedMessage}
        </div>
      )}

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4 relative group">
            <div className="flex items-start justify-between border-b border-slate-900 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  Category 0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-lg text-white">{cat.categoryName}</h3>
                {cat.description && <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openCategoryModal(idx)}
                  className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-900 rounded-lg transition-colors"
                  title="Edit Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCategory(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-850 space-y-1.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{skill.name}</span>

                    <div className="flex items-center gap-2">
                      {skill.level && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          skill.level === 'Proficient'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : skill.level === 'Developing'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {skill.level}
                        </span>
                      )}

                      <button
                        onClick={() => openSkillModal(idx, sIdx)}
                        className="text-slate-500 hover:text-blue-400 p-1"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => deleteSkill(idx, sIdx)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">{skill.context}</p>
                </div>
              ))}

              <button
                onClick={() => openSkillModal(idx)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-dashed border-slate-800 rounded-xl text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all mt-2"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                Add Skill to {cat.categoryName}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {catModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
              <h3 className="font-display font-bold text-sm text-white">
                {editCatIndex !== null ? 'Edit Skill Category' : 'Add Skill Category'}
              </h3>
              <button onClick={() => setCatModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveCategory} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Core Analytics & SQL"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Relational querying, complex joins, and window functions"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setCatModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
              <h3 className="font-display font-bold text-sm text-white">
                {editSkillIdx !== null ? 'Edit Skill Item' : 'Add Skill Item'}
              </h3>
              <button onClick={() => setSkillModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveSkill} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Skill Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SQL / PostgreSQL"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Proficiency Level</label>
                  <select
                    value={skillLevel}
                    onChange={(e: any) => setSkillLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Proficient">Proficient</option>
                    <option value="Developing">Developing</option>
                    <option value="Foundational">Foundational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Context / Application Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how and where you apply this skill..."
                    value={skillContext}
                    onChange={(e) => setSkillContext(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
