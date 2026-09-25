'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Copy, Check, Trash2, ExternalLink, Plus } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  path: string;
  size: string;
  bucket: string;
}

const defaultMedia: MediaItem[] = [
  { id: '1', name: 'raj-hamal-pp-1.jpeg', path: '/images/raj-hamal-pp-1.jpeg', size: '85 KB', bucket: 'profile' },
  { id: '2', name: 'raj-hamal-hero.png', path: '/images/raj-hamal-hero.png', size: '199 KB', bucket: 'profile' },
  { id: '3', name: 'raj-trekking-profile.png', path: '/images/about/raj-trekking-profile.png', size: '297 KB', bucket: 'experience' },
  { id: '4', name: 'himalaya-expedition-1.jpg', path: '/images/about/himalaya-expedition-1.jpg', size: '332 KB', bucket: 'experience' },
  { id: '5', name: 'bradford-university-atrium.jpg', path: '/images/about/bradford-university-atrium.jpg', size: '219 KB', bucket: 'profile' },
  { id: '6', name: 'google-certified.png', path: '/icons/google-certified.png', size: '21 KB', bucket: 'certifications' },
  { id: '7', name: 'tableau.png', path: '/icons/tableau.png', size: '1.5 KB', bucket: 'site' },
  { id: '8', name: 'sql.png', path: '/icons/sql.png', size: '3.9 KB', bucket: 'site' }
];

const buckets = ['all', 'profile', 'projects', 'experience', 'certifications', 'site'];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [activeBucket, setActiveBucket] = useState('all');
  const [copied, setCopied] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('raj_cms_media');
    if (cached) {
      try { setMediaList(JSON.parse(cached)); return; } catch {}
    }
    setMediaList(defaultMedia);
  }, []);

  const persist = (updated: MediaItem[]) => {
    setMediaList(updated);
    localStorage.setItem('raj_cms_media', JSON.stringify(updated));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      const newItem: MediaItem = {
        id: Date.now().toString(),
        name: file.name,
        path: dataUrl,
        size: `${Math.round(file.size / 1024)} KB`,
        bucket: activeBucket === 'all' ? 'profile' : activeBucket,
      };

      const updated = [newItem, ...mediaList];
      persist(updated);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete media item "${name}"?`)) {
      const updated = mediaList.filter((item) => item.id !== id);
      persist(updated);
    }
  };

  const filtered = activeBucket === 'all'
    ? mediaList
    : mediaList.filter((m) => m.bucket === activeBucket);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400">
            ASSET MANAGEMENT CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Media & Image Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload, preview, copy URLs, and manage image assets for projects, profile, and certifications.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm shrink-0">
          <Upload className="w-4 h-4" />
          {uploading ? 'Processing Image...' : 'Upload Image Asset'}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
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
        {filtered.map((item) => (
          <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-3 space-y-3 hover:border-slate-700 transition-colors">
            <div className="relative h-40 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img src={item.path} alt={item.name} className="object-contain max-h-full max-w-full rounded" />
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
                {copied === item.path ? 'Copied' : 'Copy Link'}
              </button>

              <button
                onClick={() => handleDelete(item.id, item.name)}
                className="p-1 text-slate-500 hover:text-red-400"
                title="Delete Media Asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
