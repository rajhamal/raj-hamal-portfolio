'use client';

import React from 'react';
import { Download, Printer, Mail } from 'lucide-react';
import { profileData } from '@/data/profile';

export default function ResumeActions() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-3 no-print">
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
        title="Print or Save as PDF using browser print"
      >
        <Printer className="w-4 h-4 text-blue-400" />
        Print / Save PDF
      </button>

      <a
        href={`mailto:${profileData.email}?subject=Requesting%20PDF%20Resume`}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
      >
        <Mail className="w-4 h-4" />
        Request PDF Copy
      </a>
    </div>
  );
}
