import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.FRONTEND_DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${process.env.FRONTEND_DOMAIN}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 2,
    },
    {
      url: `${process.env.FRONTEND_DOMAIN}/auth/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 2,
    },
    {
      url: `${process.env.FRONTEND_DOMAIN}/ubicacion`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 3,
    },
    {
      url: `${process.env.FRONTEND_DOMAIN}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 4,
    },
    {
      url: `${process.env.FRONTEND_DOMAIN}/favoritos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 5,
    },
    {
      url: `${process.env.FRONTEND_DOMAIN}/cuenta`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 6,
    },
  
  ]
}