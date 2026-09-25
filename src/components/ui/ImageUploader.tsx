'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Link as LinkIcon, Folder, AlertCircle } from 'lucide-react';
import MediaLibraryModal, { saveMediaLibraryItem } from './MediaLibraryModal';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
}

export default function ImageUploader({
  value,
  onChange,
  label,
  placeholder = 'Paste image URL or choose file...',
  aspectRatio = 'auto',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressAndProcessImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP, SVG).');
      return;
    }

    setUploading(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;

      // SVGs don't need raster canvas compression
      if (file.type === 'image/svg+xml') {
        onChange(dataUrl);
        saveMediaLibraryItem({
          id: `upload-${Date.now()}`,
          name: file.name,
          path: dataUrl,
          size: `${Math.round(file.size / 1024)} KB`,
          bucket: 'uploads',
        });
        setUploading(false);
        return;
      }

      // Compress JPG/PNG/WebP using Canvas to prevent LocalStorage QuotaExceeded errors
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
        let processedUrl = dataUrl;
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          processedUrl = canvas.toDataURL('image/jpeg', 0.85);
        }

        onChange(processedUrl);

        // Auto-save to Media Library
        saveMediaLibraryItem({
          id: `upload-${Date.now()}`,
          name: file.name,
          path: processedUrl,
          size: `${Math.round(processedUrl.length / 1024)} KB`,
          bucket: 'uploads',
        });

        setUploading(false);
      };

      img.onerror = () => {
        // Fallback to raw dataUrl if canvas fails
        onChange(dataUrl);
        setUploading(false);
      };

      img.src = dataUrl;
    };

    reader.onerror = () => {
      setErrorMsg('Failed to read image file.');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndProcessImage(file);
    }
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      compressAndProcessImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square': return 'h-36 sm:h-40';
      case 'video': return 'h-40 sm:h-44';
      case 'portrait': return 'h-48 sm:h-52';
      default: return 'h-40 sm:h-44';
    }
  };

  return (
    <div className="space-y-2 w-full min-w-0 overflow-hidden">
      {label && (
        <div className="flex items-center justify-between gap-2">
          <label className="block text-xs font-bold text-slate-300 truncate">{label}</label>
          <span className="text-[10px] text-slate-500 font-mono shrink-0">JPG, PNG, WebP, SVG</span>
        </div>
      )}

      {/* Hidden File Input Element */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 sm:p-4 space-y-3 shadow-inner w-full min-w-0 overflow-hidden">
        {/* Error Alert */}
        {errorMsg && (
          <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span className="truncate">{errorMsg}</span>
            </div>
            <button type="button" onClick={() => setErrorMsg(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* If Image Exists: Show Clean Preview & Control Bar */}
        {value ? (
          <div className="space-y-3 w-full min-w-0">
            {/* Image Preview Box */}
            <div className={`relative w-full ${getAspectClass()} bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 group`}>
              <img
                src={value}
                alt="Uploaded Preview"
                className="object-contain max-h-full max-w-full rounded shadow-sm"
              />

              {/* Floating Delete Button */}
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all shadow-md"
                title="Remove Image"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold bg-slate-950/80 text-blue-300 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                Active Photo
              </span>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={triggerFileInput}
                disabled={uploading}
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{uploading ? 'Processing...' : 'Upload Device'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                <Folder className="w-3.5 h-3.5 shrink-0 text-purple-200" />
                <span className="truncate">Browse Library</span>
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-xl border border-red-500/30 transition-colors shrink-0 inline-flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty State: Dropzone & Library Selector */
          <div className="space-y-3 w-full min-w-0">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full flex flex-col items-center justify-center p-5 sm:p-6 border-2 border-dashed rounded-xl transition-all text-center group ${
                isDragging
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-800 hover:border-blue-500/60 bg-slate-900/50 hover:bg-slate-900'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white mb-1">
                {uploading ? 'Processing Image...' : 'Upload or Browse Photo'}
              </span>
              <p className="text-[11px] text-slate-400 max-w-xs mb-3">
                Drag and drop image here, select from device, or pick from Media Library.
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLibraryOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition-all shadow-sm"
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>Browse Library</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* URL or Asset Path Input Bar */}
        <div className="pt-2 border-t border-slate-900 flex items-center gap-2 w-full min-w-0">
          <LinkIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 min-w-0 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 truncate"
          />
        </div>
      </div>

      {/* Media Library Picker Modal */}
      <MediaLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectImage={(selectedUrl) => {
          onChange(selectedUrl);
          setIsLibraryOpen(false);
        }}
        currentValue={value}
      />
    </div>
  );
}
