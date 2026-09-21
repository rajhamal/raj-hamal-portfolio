import { MetadataRoute } from 'next';
import { profileData } from '@/data/profile';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${profileData.domain}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
