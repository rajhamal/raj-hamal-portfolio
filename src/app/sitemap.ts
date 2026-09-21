import { MetadataRoute } from 'next';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${profileData.domain}`;

  const routes = [
    '',
    '/about',
    '/experience',
    '/projects',
    '/skills',
    '/certifications',
    '/resume',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...projectRoutes];
}
