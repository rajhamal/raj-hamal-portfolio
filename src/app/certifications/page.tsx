'use client';

import React, { useState, useEffect } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { certificationsData as fallbackCertifications } from '@/data/certifications';
import { getCertificationsData } from '@/lib/data-service';
import { CertificationItem } from '@/types/portfolio';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import ToolIcon from '@/components/ui/ToolIcon';

export default function CertificationsPage() {
  const [certs, setCerts] = useState<CertificationItem[]>(fallbackCertifications);

  useEffect(() => {
    async function load() {
      const data = await getCertificationsData();
      if (data && data.length > 0) {
        setCerts(data);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      <SectionHeader
        as="h1"
        badge="Verified Credentials"
        title="Certifications & Professional Development"
        subtitle="Industry-recognized credentials validating practical competence in data analytics workflows, SQL querying, Tableau dashboarding, and web analytics."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certs.map((cert) => (
          <div key={cert.id} className="uiverse-card-glass rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100">
                  <ToolIcon name={cert.issuer} size={15} />
                  {cert.issuer}
                </span>
                <span className="text-xs font-mono text-slate-400">Issued: {cert.issueDate}</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-slate-900 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-900 mb-2.5">
                  Core Skills & Topics Covered
                </h4>
                <ul className="space-y-2">
                  {cert.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {cert.credentialUrl && (
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Verify Credential
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
