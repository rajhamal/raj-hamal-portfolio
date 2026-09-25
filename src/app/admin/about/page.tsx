'use client';

import React, { useState, useEffect } from 'react';
import { User, Save, CheckCircle2, Image as ImageIcon, Sparkles, Layers, List, ExternalLink } from 'lucide-react';
import ImageUploader from '@/components/ui/ImageUploader';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface AboutPageContent {
  heroHeadline: string;
  heroSubtitle: string;
  profileImageUrl: string;
  introParagraphs: string[];
  quote1: string;
  nepalTitle: string;
  nepalSubtitle: string;
  nepalNarrative: string[];
  nepalStats: { stat: string; label: string }[];
  nepalScope: string[];
  nepalImageUrl?: string;
  nepalImages?: string[];
  chapter2Title: string;
  chapter2Subtitle: string;
  chapter2Narrative: string[];
  quote2: string;
  quote3: string;
  turningPointTitle: string;
  turningPointSubtitle: string;
  turningPointNarrative: string[];
  turningPointImageUrl?: string;
  turningPointImages?: string[];
  ukChapterTitle: string;
  ukChapterSubtitle: string;
  ukChapterNarrative: string[];
  ukChapterImageUrl?: string;
  ukChapterImages?: string[];
  whatIBring: string;
  whereIAmNow: string;
}

const defaultAboutContent: AboutPageContent = {
  heroHeadline: "From the mountains to data, my career has always been about solving real problems.",
  heroSubtitle: "Connecting 3+ years of tourism logistics and expedition leadership in Nepal with postgraduate Applied AI and Data Analytics study at the University of Bradford.",
  profileImageUrl: "/images/about/raj-trekking-profile.png",
  introParagraphs: [
    "My professional journey started in Nepal's tourism industry, working directly with people, operations, logistics and the realities of running journeys in challenging environments.",
    "Over more than three years, I progressed from an Operations & Marketing Intern to a Tour Manager and Senior Trekking Guide, managing international trekking and adventure programs across Nepal.",
    "That experience taught me how to make decisions when conditions change, coordinate people and resources, manage information, and keep things moving when there is no room for confusion."
  ],
  quote1: "I see data as another way of understanding the problems I have spent years solving in the real world.",
  nepalTitle: "THE NEPAL CHAPTER",
  nepalSubtitle: "Before the dashboards, there were mountains.",
  nepalNarrative: [
    "My career began in Nepal's tourism and adventure industry. At Apex Himalaya Treks, I progressed from Operations & Marketing Intern to Tour Manager and Senior Trekking Guide, taking responsibility for both the planning behind the journey and the experience on the ground.",
    "I managed and supported 40+ multi-day international trekking and expedition programs, working with international clients, guides, suppliers and internal teams. The role went far beyond guiding."
  ],
  nepalStats: [
    { stat: "40+", label: "International Expeditions" },
    { stat: "10+", label: "Team Members Led" },
    { stat: "3+ Years", label: "Tourism Operations" }
  ],
  nepalScope: [
    "Expedition and itinerary planning",
    "Logistics and transportation",
    "Client coordination",
    "Supplier and partner management",
    "Budgeting and financial reconciliation",
    "Guide assignments and team coordination",
    "Permits and operational documentation",
    "Post-trip reporting",
    "Problem solving in remote environments"
  ],
  nepalImageUrl: "/images/about/himalaya-expedition-1.jpg",
  nepalImages: [
    "/images/about/himalaya-expedition-1.jpg",
    "/images/about/himalaya-team-rock.jpg",
    "/images/about/himalaya-expedition-team.jpg"
  ],
  chapter2Title: "MORE THAN GUIDING",
  chapter2Subtitle: "I learned to manage the system behind the journey.",
  chapter2Narrative: [
    "Working in tourism showed me that successful trips depend on much more than what happens on the trail. There are bookings to track, permits to manage, suppliers to coordinate, payments to reconcile, guides to assign and clients to keep informed.",
    "I started building practical systems using Google Sheets to organize operational information, track booking pipelines, permits and guide assignments, and make important information easier for the team to access."
  ],
  quote2: "Better information leads to better decisions.",
  quote3: "I don't see analytics as only numbers, dashboards and technical tools. I see it as another way of understanding a problem before making a decision.",
  turningPointTitle: "THE TURNING POINT",
  turningPointSubtitle: "I wanted to understand the numbers behind the problems.",
  turningPointNarrative: [
    "The more operational experience I gained, the more curious I became about the information behind everyday decisions. Why do some processes take longer than others? Where are costs increasing? What patterns are hidden inside customer and operational data?",
    "That curiosity led me into data analytics. I completed the Google Data Analytics Professional Certificate and began working on independent projects using real-world datasets."
  ],
  turningPointImageUrl: "",
  turningPointImages: [],
  ukChapterTitle: "THE UK CHAPTER",
  ukChapterSubtitle: "Now I'm building deeper technical capability.",
  ukChapterNarrative: [
    "I am currently studying MSc Applied Artificial Intelligence and Data Analytics at the University of Bradford. Moving from professional operations into postgraduate study has given me the opportunity to build a stronger technical foundation while exploring how data and artificial intelligence can be applied to real problems."
  ],
  ukChapterImageUrl: "/images/about/bradford-university-atrium.jpg",
  ukChapterImages: [
    "/images/about/bradford-uk-street-1.jpg",
    "/images/about/bradford-uk-city.jpg",
    "/images/about/bradford-richmond-building.jpg",
    "/images/about/bradford-university-atrium.jpg"
  ],
  whatIBring: "My background sits across two worlds. Real-world operations taught me how businesses, people and processes work. Data analytics is teaching me how to understand those processes through evidence. Applied AI is opening the next layer: exploring how intelligent systems can improve the way problems are understood and solved.",
  whereIAmNow: "Currently based in Bradford, UK, studying MSc Applied Artificial Intelligence and Data Analytics at the University of Bradford. Building toward opportunities across Data Analytics, Business Intelligence, and Applied AI."
};

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutPageContent>(defaultAboutContent);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem('raj_cms_about');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (!parsed.ukChapterImages || parsed.ukChapterImages.length === 0) {
          parsed.ukChapterImages = defaultAboutContent.ukChapterImages;
        }
        if (!parsed.nepalImages || parsed.nepalImages.length === 0) {
          parsed.nepalImages = defaultAboutContent.nepalImages;
        }
        setContent({ ...defaultAboutContent, ...parsed });
        return;
      } catch {}
    }
    setContent(defaultAboutContent);
  }, []);

  const handleSave = () => {
    localStorage.setItem('raj_cms_about', JSON.stringify(content));
    setSavedMessage('About Page content updated successfully! Live site reflects changes.');
    setTimeout(() => setSavedMessage(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            STORY & NARRATIVE CMS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            About Page CMS & Rich Story Editor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your career narrative, expedition scope, turning point, and UK transition story.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0"
        >
          <Save className="w-4 h-4" />
          Save About Page
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {savedMessage}
        </div>
      )}

      {/* Hero Section Editor */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="border-b border-slate-900 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h3 className="font-display font-bold text-sm text-white">Hero Section & Main Headline</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Main Headline</label>
          <input
            type="text"
            value={content.heroHeadline}
            onChange={(e) => setContent({ ...content, heroHeadline: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtitle</label>
          <textarea
            rows={2}
            value={content.heroSubtitle}
            onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300"
          ></textarea>
        </div>

        <ImageUploader
          label="Profile Photo / Cutout Image"
          value={content.profileImageUrl}
          onChange={(url) => setContent({ ...content, profileImageUrl: url })}
          placeholder="Upload image file or paste URL..."
          aspectRatio="portrait"
        />
      </div>

      {/* Introduction Paragraphs */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="border-b border-slate-900 pb-3">
          <h3 className="font-display font-bold text-sm text-white">Intro Narrative Paragraphs (Rich Text Editor)</h3>
        </div>

        {content.introParagraphs.map((para, idx) => (
          <div key={idx}>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Paragraph {idx + 1}</label>
            <textarea
              rows={3}
              value={para}
              onChange={(e) => {
                const updated = [...content.introParagraphs];
                updated[idx] = e.target.value;
                setContent({ ...content, introParagraphs: updated });
              }}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300"
            ></textarea>
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Highlighted Quote Callout</label>
          <input
            type="text"
            value={content.quote1}
            onChange={(e) => setContent({ ...content, quote1: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-blue-300 font-semibold"
          />
        </div>
      </div>

      {/* Chapter 1: The Nepal Chapter */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="border-b border-slate-900 pb-3">
          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">Chapter 01</span>
          <h3 className="font-display font-bold text-sm text-white">The Nepal Operations Chapter</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Chapter Title</label>
            <input
              type="text"
              value={content.nepalTitle}
              onChange={(e) => setContent({ ...content, nepalTitle: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Chapter Subtitle</label>
            <input
              type="text"
              value={content.nepalSubtitle}
              onChange={(e) => setContent({ ...content, nepalSubtitle: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        {content.nepalNarrative.map((p, idx) => (
          <div key={idx}>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Nepal Story Paragraph {idx + 1}</label>
            <textarea
              rows={3}
              value={p}
              onChange={(e) => {
                const updated = [...content.nepalNarrative];
                updated[idx] = e.target.value;
                setContent({ ...content, nepalNarrative: updated });
              }}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300"
            ></textarea>
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Operational Scope List (Line-by-line)</label>
          <textarea
            rows={5}
            value={content.nepalScope.join('\n')}
            onChange={(e) => setContent({ ...content, nepalScope: e.target.value.split('\n').filter(Boolean) })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
          ></textarea>
        </div>

        <ImageUploader
          label="Chapter 01 Featured Image (Nepal Expeditions)"
          value={content.nepalImageUrl || ''}
          onChange={(url) => setContent({ ...content, nepalImageUrl: url })}
          placeholder="Upload Nepal expedition image from device..."
          aspectRatio="video"
        />

        {/* Chapter 1 Multi-Photo Gallery */}
        <div className="space-y-3 pt-3 border-t border-slate-900">
          <label className="block text-xs font-bold text-slate-300">Chapter 01 Expedition Multi-Photo Gallery</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(content.nepalImages || []).map((img, i) => (
              <ImageUploader
                key={`nepal-img-${i}-${img}`}
                label={`Expedition Photo 0${i + 1}`}
                value={img}
                onChange={(url) => {
                  const updated = [...(content.nepalImages || [])];
                  updated[i] = url;
                  setContent({ ...content, nepalImages: updated });
                }}
                aspectRatio="video"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setContent({ ...content, nepalImages: [...(content.nepalImages || []), ''] })}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-blue-400 text-xs font-bold rounded-xl border border-slate-800 inline-flex items-center gap-2 transition-colors"
          >
            + Add Photo to Nepal Expedition Gallery
          </button>
        </div>
      </div>

      {/* Chapter 2: More Than Guiding */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="border-b border-slate-900 pb-3">
          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">Chapter 02</span>
          <h3 className="font-display font-bold text-sm text-white">More Than Guiding & Systems Building</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Highlight Quote: Systems & Information</label>
          <input
            type="text"
            value={content.quote2}
            onChange={(e) => setContent({ ...content, quote2: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-emerald-300 font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Highlight Quote: Analytics Philosophy</label>
          <input
            type="text"
            value={content.quote3}
            onChange={(e) => setContent({ ...content, quote3: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-indigo-300 font-semibold"
          />
        </div>
      </div>

      {/* Chapter 3 & Chapter 4: Turning Point & UK Chapter */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="border-b border-slate-900 pb-3">
          <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Chapters 03 & 04</span>
          <h3 className="font-display font-bold text-sm text-white">Turning Point & Chapter 4 (UK MSc Applied AI)</h3>
        </div>

        {/* Chapter 3 Image */}
        <ImageUploader
          label="Chapter 03 Featured Image (Turning Point / Analytics Journey)"
          value={content.turningPointImageUrl || ''}
          onChange={(url) => setContent({ ...content, turningPointImageUrl: url })}
          placeholder="Upload analytics certificate or dataset image from device..."
          aspectRatio="video"
        />

        {/* Chapter 4 Image */}
        <ImageUploader
          label="Chapter 04 Featured Image (UK Chapter / University of Bradford)"
          value={content.ukChapterImageUrl || ''}
          onChange={(url) => setContent({ ...content, ukChapterImageUrl: url })}
          placeholder="Upload UK campus or Applied AI study photo from device..."
          aspectRatio="video"
        />

        {/* Chapter 4 Multi-Photo Gallery */}
        <div className="space-y-3 pt-3 border-t border-slate-900">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-300">
              Chapter 04 Multi-Photo Gallery (UK Campus & MSc Applied AI — 2 Top Landscape, 2 Bottom Portrait)
            </label>
            <span className="text-[10px] text-purple-400 font-mono font-bold">2 Up / 2 Down Format</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {((content.ukChapterImages && content.ukChapterImages.length > 0)
              ? content.ukChapterImages
              : defaultAboutContent.ukChapterImages || []
            ).map((img, i) => {
              const labels = [
                'UK Photo 01 (Top Left — Street View Landscape)',
                'UK Photo 02 (Top Right — City View Landscape)',
                'UK Photo 03 (Bottom Left — Richmond Building Portrait)',
                'UK Photo 04 (Bottom Right — University Atrium Portrait)',
              ];
              return (
                <ImageUploader
                  key={`uk-img-${i}-${img}`}
                  label={labels[i] || `UK Photo 0${i + 1}`}
                  value={img}
                  onChange={(url) => {
                    const currentList = (content.ukChapterImages && content.ukChapterImages.length > 0)
                      ? [...content.ukChapterImages]
                      : [...(defaultAboutContent.ukChapterImages || [])];
                    currentList[i] = url;
                    setContent({ ...content, ukChapterImages: currentList });
                  }}
                  aspectRatio={i < 2 ? 'video' : 'portrait'}
                />
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => {
              const currentList = (content.ukChapterImages && content.ukChapterImages.length > 0)
                ? [...content.ukChapterImages]
                : [...(defaultAboutContent.ukChapterImages || [])];
              setContent({ ...content, ukChapterImages: [...currentList, ''] });
            }}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-purple-400 text-xs font-bold rounded-xl border border-slate-800 inline-flex items-center gap-2 transition-colors"
          >
            + Add Photo to Chapter 04 Gallery
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">What I Bring Summary</label>
          <textarea
            rows={3}
            value={content.whatIBring}
            onChange={(e) => setContent({ ...content, whatIBring: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Where I Am Now Summary</label>
          <textarea
            rows={3}
            value={content.whereIAmNow}
            onChange={(e) => setContent({ ...content, whereIAmNow: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
          ></textarea>
        </div>
      </div>

      {/* Floating Sticky Save & Live Preview Bar */}
      <div className="sticky bottom-4 z-40 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>About Page CMS Editor</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            Save About Page
          </button>
        </div>
      </div>
    </div>
  );
}

