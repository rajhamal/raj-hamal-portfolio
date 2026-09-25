'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Code,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  FileText,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface DocRichTextEditorProps {
  value: string;
  onChange: (htmlValue: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
  theme?: 'light' | 'dark';
}

export default function DocRichTextEditor({
  value,
  onChange,
  label = 'Rich Text',
  placeholder = 'Write or paste your content here...',
  minHeight = '240px',
  theme = 'light',
}: DocRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedCode, setEmbedCode] = useState('');

  // Synchronize initial content to contentEditable area
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const executeCommand = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL link (e.g. https://example.com):');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const applyFormatBlock = (tag: string) => {
    executeCommand('formatBlock', tag);
  };

  const insertHorizontalRule = () => {
    executeCommand('insertHorizontalRule');
  };

  const insertEmbedBlock = () => {
    if (!embedCode.trim()) return;
    executeCommand('insertHTML', `<div className="my-4 p-4 bg-slate-100 border border-slate-300 rounded-xl text-slate-800">${embedCode}</div>`);
    setEmbedCode('');
    setShowEmbedModal(false);
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-1.5 w-full font-sans">
      {label && (
        <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
          {label}
        </label>
      )}

      {/* Editor Container matching exact CMS screenshot layout */}
      <div className={`rounded-xl overflow-hidden border shadow-xs transition-all ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Exact Toolbar matching Screenshot */}
        <div className={`px-3 py-2 border-b flex flex-wrap items-center justify-between gap-2 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-[#f8fafc] border-slate-200/90'
        }`}>
          {/* Left Group Controls */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
            {/* Normal Text Dropdown */}
            <select
              onChange={(e) => applyFormatBlock(e.target.value)}
              defaultValue="<p>"
              className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                isDark
                  ? 'bg-slate-950 text-slate-200 border-slate-800'
                  : 'bg-white text-slate-700 border-slate-300 shadow-2xs hover:bg-slate-50'
              }`}
            >
              <option value="<p>">Normal Text</option>
              <option value="<h1>">Heading 1</option>
              <option value="<h2>">Heading 2</option>
              <option value="<h3>">Heading 3</option>
              <option value="<pre>">Code Block</option>
            </select>

            <span className={`w-px h-5 mx-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

            {/* Bold B */}
            <button
              type="button"
              onClick={() => executeCommand('bold')}
              className={`px-2 py-1 rounded-md text-xs font-bold transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-200/70'
              }`}
              title="Bold"
            >
              B
            </button>

            {/* Italic I */}
            <button
              type="button"
              onClick={() => executeCommand('italic')}
              className={`px-2 py-1 rounded-md text-xs font-serif italic font-bold transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-200/70'
              }`}
              title="Italic"
            >
              I
            </button>

            {/* Underline U */}
            <button
              type="button"
              onClick={() => executeCommand('underline')}
              className={`px-2 py-1 rounded-md text-xs underline font-bold transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-200/70'
              }`}
              title="Underline"
            >
              U
            </button>

            <span className={`w-px h-5 mx-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

            {/* Code <> */}
            <button
              type="button"
              onClick={() => executeCommand('formatBlock', '<pre>')}
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
              title="Code Block (<>)"
            >
              <Code className="w-4 h-4" />
            </button>

            {/* Link 🔗 */}
            <button
              type="button"
              onClick={addLink}
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
              title="Insert Link"
            >
              <LinkIcon className="w-4 h-4" />
            </button>

            <span className={`w-px h-5 mx-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

            {/* Bullet List */}
            <button
              type="button"
              onClick={() => executeCommand('insertUnorderedList')}
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>

            {/* Numbered List */}
            <button
              type="button"
              onClick={() => executeCommand('insertOrderedList')}
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            {/* Quote Block */}
            <button
              type="button"
              onClick={() => executeCommand('formatBlock', 'blockquote')}
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
              title="Quote Block"
            >
              <Quote className="w-4 h-4" />
            </button>

            {/* Horizontal Line Divider — */}
            <button
              type="button"
              onClick={insertHorizontalRule}
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
              title="Horizontal Divider Line"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Right Button: Embed block entry */}
          <button
            type="button"
            onClick={() => setShowEmbedModal(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isDark
                ? 'bg-slate-950 hover:bg-slate-850 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>Embed block entry</span>
          </button>
        </div>

        {/* ContentEditable Writing Canvas */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          style={{ minHeight }}
          className={`p-4 text-xs sm:text-sm leading-relaxed focus:outline-none prose max-w-none border-none resize-y overflow-y-auto ${
            isDark ? 'bg-slate-950 text-slate-100 prose-invert' : 'bg-white text-slate-800'
          }`}
          data-placeholder={placeholder}
        />
      </div>

      {/* Embed Block Entry Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Embed Block Entry / Callout
              </h3>
              <button onClick={() => setShowEmbedModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Block Content / Embed Code</label>
              <textarea
                rows={4}
                placeholder="Enter callout note, code block, or embed snippet..."
                value={embedCode}
                onChange={(e) => setEmbedCode(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEmbedModal(false)}
                className="px-4 py-2 bg-slate-900 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertEmbedBlock}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
              >
                Insert Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
