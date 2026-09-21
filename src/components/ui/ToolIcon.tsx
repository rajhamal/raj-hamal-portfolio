import React from 'react';
import Image from 'next/image';

interface ToolIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function ToolIcon({ name, className = '', size = 16 }: ToolIconProps) {
  const lower = name.toLowerCase();

  let iconPath: string | null = null;
  if (lower.includes('python')) iconPath = '/icons/python.png';
  else if (lower.includes('tableau')) iconPath = '/icons/tableau.png';
  else if (lower.includes('bigquery')) iconPath = '/icons/bigquery.svg';
  else if (lower.includes('sql')) iconPath = '/icons/sql.png';
  else if (lower.includes('power bi') || lower.includes('powerbi')) iconPath = '/icons/powerbi.svg';
  else if (lower.includes('datacamp')) iconPath = '/icons/datacamp.png';
  else if (lower.includes('excel') || lower.includes('sheet')) iconPath = '/icons/google-sheets.png';
  else if (lower.includes('google cert') || lower.includes('google analytics')) iconPath = '/icons/google-certified.png';
  else if (lower.includes('linkedin')) iconPath = '/icons/linkedin.png';
  else if (lower.includes('gmail') || lower.includes('mail') || lower.includes('email')) iconPath = '/icons/gmail.png';
  else if (lower.includes('whatsapp') || lower.includes('phone') || lower.includes('call')) iconPath = '/icons/whatsapp.png';
  else if (lower.includes('bradford') || lower.includes('university')) iconPath = '/icons/university-of-bradford.png';

  if (!iconPath) return null;

  return (
    <Image
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      className={`object-contain inline-block shrink-0 ${className}`}
    />
  );
}
