// app/sitemap.ts - Dynamic Sitemap Generator
import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hamdev-portfolio.vercel.app';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic portfolio pages (optional - if you have individual pages)
  let portfolioPages: MetadataRoute.Sitemap = [];
  
  try {
    const portfoliosSnapshot = await getDocs(collection(db, 'portfolios'));
    portfolioPages = portfoliosSnapshot.docs.map((doc) => ({
      url: `${baseUrl}/portfolio/${doc.id}`,
      lastModified: doc.data().updatedAt?.toDate() || doc.data().createdAt?.toDate() || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching portfolios for sitemap:', error);
  }

  return [...staticPages, ...portfolioPages];
}