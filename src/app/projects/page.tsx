'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectsData } from '@/data/projects';

const categories = [
  'All Projects',
  'Tourism Analytics',
  'Market Analysis',
  'Business Intelligence',
  'Applied AI / Capstone'
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === 'All Projects') return true;
    return project.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      <SectionHeader
        as="h1"
        badge="Analytics Case Studies"
        title="Data Analytics & Applied AI Projects"
        subtitle="Verified project evidence utilizing official government statistics, retail datasets, and market research intelligence."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80 w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`uiverse-tab-pill ${
              selectedCategory === cat ? 'active' : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} featuredMode={project.featured} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 uiverse-card-glass rounded-2xl">
          <p className="text-sm text-slate-500 font-medium">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
