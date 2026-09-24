'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Copy, Check, Trash2, Folder, ExternalLink } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

const buckets = ['profile', 'projects', 'experience', 'certifications', 'site'];

export default function AdminMediaPage() {
  const [activeBucket, setActiveBucket] = useState('profile');
  const [copied, setCopied] = useState<string | null>(null);

  const sampleMedia = [
    { name: 'raj-hamal-hero.png', path: '/images/raj-hamal-hero.png', size: '199 KB', bucket: 'profile' },
    { name: 'raj-hamal-profile.jpeg', path: '/images/raj-hamal-profile.jpeg', size: '76 KB', bucket: 'profile' },
    { name: 'raj-trekking-profile.png', path: '/images/about/raj-trekking-profile.png', size: '297 KB', bucket: 'experience' },
    { name: 'himalaya-expedition-1.jpg', path: '/images/about/himalaya-expedition-1.jpg', size: '332 KB', bucket: 'experience' },
    { name: 'bradford-university-atrium.jpg', path: '/images/about/bradford-university-atrium.jpg', size: '219 KB', bucket: 'profile' },
    { name: 'google-certified.png', path: '/icons/google-certified.png', size: '21 KB', bucket: 'certifications' },
    { name: 'tableau.png', path: '/icons/tableau.png', size: '1.5 KB', bucket: 'site' },
    { name: 'sql.png', path: '/icons/sql.png', size: '3.9 KB', bucket: 'site' }
  ];

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(null), 2000);
  };

  const filtered = sampleMedia.filter((m) => m.bucket === activeBucket || activeBucket === 'site');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400">
            SUPABASE STORAGE
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Media Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage media assets across profile, projects, experience, and certifications storage buckets.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm">
          <Upload className="w-4 h-4" />
          Upload Image Asset
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      {/* Bucket Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <span className="text-xs font-mono text-slate-500 px-2 font-bold uppercase">Buckets:</span>
        {buckets.map((b) => (
          <button
            key={b}
            onClick={() => setActiveBucket(b)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              activeBucket === b
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Media Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-3 space-y-3">
            <div className="relative h-40 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
              <img src={item.path} alt={item.name} className="object-cover w-full h-full" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-white block truncate">{item.name}</span>
              <span className="text-[10px] text-slate-500 font-mono block">{item.size} • Bucket: {item.bucket}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-900">
              <button
                onClick={() => handleCopy(item.path)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
              >
                {copied === item.path ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === item.path ? 'Copied URL' : 'Copy URL'}
              </button>

              <a href={item.path} target="_blank" rel="noopener noreferrer" className="p-1 text-slate-500 hover:text-white">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
