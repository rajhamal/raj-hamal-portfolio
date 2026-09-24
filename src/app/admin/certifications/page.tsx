'use client';

import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { getCertificationsData } from '@/lib/data-service';
import { CertificationItem } from '@/types/portfolio';

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getCertificationsData();
      setCertifications(data);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            VERIFIED CREDENTIALS
          </span>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Certifications Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your Google Data Analytics Professional Certificate and DataCamp credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-3">
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold">
                {cert.issuer}
              </span>
              <span className="text-xs font-mono text-slate-400">Issued: {cert.issueDate}</span>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-white">{cert.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cert.description}</p>
            </div>

            {cert.credentialUrl && (
              <div className="pt-2">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:underline"
                >
                  Verify Credential URL <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
