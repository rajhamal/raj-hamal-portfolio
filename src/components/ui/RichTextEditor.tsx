'use client';

import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  label?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content here (supports rich formatting & markdown)...',
  minHeight = '220px',
  label,
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

  const renderSimpleMarkdown = (text: string) => {
    if (!text) return <p className="text-slate-500 italic">Nothing to preview...</p>;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-display font-bold text-xl text-white mt-4 mb-2">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-display font-bold text-lg text-blue-400 mt-3 mb-1.5">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-blue-500 pl-3 py-1.5 bg-blue-500/10 text-blue-200 italic my-2 text-xs rounded-r-lg">
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="ml-5 list-disc text-xs text-slate-300 my-1">
            {line.replace(/^[-*]\s+/, '')}
          </li>
        );
      }
      if (/^\d+\.\s+/.test(line)) {
        return (
          <li key={idx} className="ml-5 list-decimal text-xs text-slate-300 my-1">
            {line.replace(/^\d+\.\s+/, '')}
          </li>
        );
      }
      if (line.startsWith('```') || line.endsWith('```')) {
        return (
          <pre key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono text-emerald-400 my-2 overflow-x-auto">
            {line.replace(/```/g, '')}
          </pre>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-xs text-slate-300 leading-relaxed my-1.5">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="block text-xs font-semibold text-slate-300">{label}</label>}

      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Toolbar & Tab Switcher Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
          {/* Formatting Buttons */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormat('**', '**')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Bold (**text**)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('*', '*')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Italic (*text*)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-4 bg-slate-800 mx-1" />
            <button
              type="button"
              onClick={() => insertFormat('## ')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Heading 2 (## Heading)"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('### ')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Heading 3 (### Subheading)"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-4 bg-slate-800 mx-1" />
            <button
              type="button"
              onClick={() => insertFormat('- ')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Bullet List (- Item)"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('1. ')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Numbered List (1. Item)"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('> ')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Quote (> Quote)"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('```\n', '\n```')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Code Block"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-4 bg-slate-800 mx-1" />
            <button
              type="button"
              onClick={() => insertFormat('[', '](https://)')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Add Hyperlink"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormat('![alt text](', ')')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Add Image Embed"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Edit / Preview Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              Preview
            </button>
          </div>
        </div>

        {/* Text Input area or Live Preview area */}
        {activeTab === 'edit' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full p-4 bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder-slate-600 font-mono border-none focus:outline-none focus:ring-0 leading-relaxed resize-y"
          />
        ) : (
          <div style={{ minHeight }} className="p-4 bg-slate-950 overflow-y-auto">
            {renderSimpleMarkdown(value)}
          </div>
        )}
      </div>
    </div>
  );
}
