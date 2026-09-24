import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Analytics Case Studies & Projects | Raj Hamal',
  description: 'Explore verified data analytics case studies, SQL queries, Tableau dashboards, and applied AI projects by Raj Hamal.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
