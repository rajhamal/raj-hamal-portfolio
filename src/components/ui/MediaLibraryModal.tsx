'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Image as ImageIcon, Check, Upload, Folder, Sparkles } from 'lucide-react';

export interface MediaItem {
  id: string;
  name: string;
  path: string;
  size: string;
  bucket: string;
}

export const defaultMediaItems: MediaItem[] = [
  { id: 'm1', name: 'raj-hamal-pp-1.jpeg', path: '/images/raj-hamal-pp-1.jpeg', size: '85 KB', bucket: 'profile' },
  { id: 'm2', name: 'raj-hamal-hero.png', path: '/images/raj-hamal-hero.png', size: '199 KB', bucket: 'profile' },
  { id: 'm3', name: 'raj-hamal-profile.jpeg', path: '/images/raj-hamal-profile.jpeg', size: '76 KB', bucket: 'profile' },
  { id: 'm4', name: 'raj-trekking-profile.png', path: '/images/about/raj-trekking-profile.png', size: '297 KB', bucket: 'experience' },
  { id: 'm5', name: 'himalaya-expedition-1.jpg', path: '/images/about/himalaya-expedition-1.jpg', size: '332 KB', bucket: 'experience' },
  { id: 'm6', name: 'himalaya-team-rock.jpg', path: '/images/about/himalaya-team-rock.jpg', size: '350 KB', bucket: 'experience' },
  { id: 'm7', name: 'himalaya-expedition-team.jpg', path: '/images/about/himalaya-expedition-team.jpg', size: '274 KB', bucket: 'experience' },
  { id: 'm8', name: 'bradford-university-atrium.jpg', path: '/images/about/bradford-university-atrium.jpg', size: '219 KB', bucket: 'profile' },
  { id: 'm9', name: 'bradford-uk-street-1.jpg', path: '/images/about/bradford-uk-street-1.jpg', size: '242 KB', bucket: 'profile' },
  { id: 'm10', name: 'bradford-uk-city.jpg', path: '/images/about/bradford-uk-city.jpg', size: '245 KB', bucket: 'profile' },
  { id: 'm11', name: 'bradford-richmond-building.jpg', path: '/images/about/bradford-richmond-building.jpg', size: '211 KB', bucket: 'profile' },
  { id: 'm12', name: 'google-certified.png', path: '/icons/google-certified.png', size: '21 KB', bucket: 'certifications' },
  { id: 'm13', name: 'tableau.png', path: '/icons/tableau.png', size: '1.5 KB', bucket: 'site' },
  { id: 'm14', name: 'sql.png', path: '/icons/sql.png', size: '3.9 KB', bucket: 'site' },
];

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  currentValue?: string;
}

export function getMediaLibraryItems(): MediaItem[] {
  if (typeof window === 'undefined') return defaultMediaItems;
  try {
    const cached = localStorage.getItem('raj_cms_media');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge cached with default items to ensure no paths are lost
        const cachedPaths = new Set(parsed.map((item) => item.path));
        const missingDefaults = defaultMediaItems.filter((item) => !cachedPaths.has(item.path));
        return [...parsed, ...missingDefaults];
      }
    }
  } catch (err) {
    console.error('Error reading media library from localStorage:', err);
  }
  return defaultMediaItems;
}

export function saveMediaLibraryItem(item: MediaItem) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getMediaLibraryItems();
    const updated = [item, ...existing.filter((i) => i.path !== item.path)];
    localStorage.setItem('raj_cms_media', JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving media item to localStorage:', err);
  }
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelectImage,
  currentValue,
}: MediaLibraryModalProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBucket, setSelectedBucket] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setItems(getMediaLibraryItems());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const buckets = ['all', 'profile', 'experience', 'certifications', 'site', 'uploads'];

  const filteredItems = items.filter((item) => {
    const matchesBucket = selectedBucket === 'all' || item.bucket === selectedBucket;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.path.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBucket && matchesQuery;
  });

  const handleModalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;

      // Compress large images via canvas if needed
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        let finalUrl = dataUrl;
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          finalUrl = canvas.toDataURL('image/jpeg', 0.85);
        }

        const newItem: MediaItem = {
          id: `upload-${Date.now()}`,
          name: file.name,
          path: finalUrl,
          size: `${Math.round(finalUrl.length / 1024)} KB`,
          bucket: 'uploads',
        };

        saveMediaLibraryItem(newItem);
        setItems(getMediaLibraryItems());
        setIsUploading(false);
      };
      img.onerror = () => {
        setIsUploading(false);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Media & Image Library
                <span className="text-[10px] bg-purple-500/10 text-purple-300 font-mono px-2 py-0.5 rounded-full border border-purple-500/20">
                  {items.length} Assets
                </span>
              </h2>
              <p className="text-xs text-slate-400">Select an existing photo asset or upload a new one.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Upload New'}</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleModalFileUpload} />
            </label>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar: Bucket Tabs & Search */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Bucket Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {buckets.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBucket(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedBucket === b
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Image Grid Content */}
        <div className="p-5 overflow-y-auto flex-1 min-h-[300px]">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
              <ImageIcon className="w-10 h-10 text-slate-600" />
              <p className="text-sm font-semibold text-slate-400">No media assets found matching filter.</p>
              <p className="text-xs text-slate-500 max-w-sm">
                Try searching for a different name or upload a new image asset from your device.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredItems.map((item) => {
                const isSelected = currentValue === item.path;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectImage(item.path);
                      onClose();
                    }}
                    className={`group relative bg-slate-950 border rounded-2xl overflow-hidden p-2.5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] ${
                      isSelected
                        ? 'border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/10'
                        : 'border-slate-800 hover:border-purple-500/50'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-32 w-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
                      <img
                        src={item.path}
                        alt={item.name}
                        className="object-contain max-h-full max-w-full rounded"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-1 min-w-0">
                      <span className="text-xs font-bold text-white block truncate group-hover:text-purple-300 transition-colors">
                        {item.name}
                      </span>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{item.size}</span>
                        <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 uppercase">
                          {item.bucket}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Click any photo to select and populate it into the CMS editor.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
