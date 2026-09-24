import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  action?: React.ReactNode;
  as?: 'h1' | 'h2';
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  action,
  as = 'h2',
}: SectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div className={`mb-10 lg:mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : 'flex flex-col md:flex-row md:items-end md:justify-between gap-4'}`}>
      <div>
        {badge && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100 mb-3">
            {badge}
          </span>
        )}
        <HeadingTag className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
          {title}
        </HeadingTag>
        {subtitle && (
          <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
