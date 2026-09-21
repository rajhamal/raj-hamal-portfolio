'use client';

import React, { useState } from 'react';
import { ExternalLink, BarChart2, ShieldAlert } from 'lucide-react';

interface TableauEmbedProps {
  embedUrl?: string;
  publicUrl?: string;
  title: string;
}

export default function TableauEmbed({ embedUrl, publicUrl, title }: TableauEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!embedUrl && !publicUrl) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-subtle my-8">
      {/* Container Toolbar Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BarChart2 className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold tracking-wide font-display">
            Interactive Tableau Dashboard: {title}
          </span>
        </div>
        {publicUrl && (
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-slate-800 px-3 py-1 rounded-md border border-slate-700"
          >
            <span>Open in Tableau Public</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>
        )}
      </div>

      {/* Embed Frame */}
      <div className="relative w-full min-h-[550px] bg-slate-50 flex items-center justify-center">
        {!loaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-3 z-10">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium">Loading interactive Tableau Public visualization...</span>
          </div>
        )}

        {error ? (
          <div className="p-8 text-center max-w-md space-y-3">
            <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto" />
            <h4 className="font-display text-base font-bold text-slate-900">Dashboard Embed Unavailable</h4>
            <p className="text-xs text-slate-600">
              Tableau Public embeds may be constrained by browser security policies or device settings.
            </p>
            {publicUrl && (
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
              >
                View Live Dashboard Directly on Tableau Public
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ) : (
          embedUrl && (
            <iframe
              src={embedUrl}
              title={`Tableau Public Dashboard - ${title}`}
              className="w-full h-[600px] border-0"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              allowFullScreen
            />
          )
        )}
      </div>

      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>Interactive features: Hover over data points, select region filters, and explore category metrics.</span>
        {publicUrl && (
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
          >
            Full Screen View <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
