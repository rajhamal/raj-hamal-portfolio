import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
}

export default function MetricCard({ label, value, description, icon }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-subtle hover:border-slate-300 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        {icon && <div className="text-blue-600">{icon}</div>}
      </div>
      <div className="font-display text-3xl font-bold text-slate-900 mb-1 tracking-tight">
        {value}
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
