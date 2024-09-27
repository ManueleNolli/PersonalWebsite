import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://manuelenolli.ch',
      lastModified: new Date(),
      priority: 1,
    },
  ]
}
