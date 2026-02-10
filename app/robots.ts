import { MetadataRoute } from 'next'

// Ensure this route is statically exported for `output: export`
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
      crawlDelay: 1,
    },
    sitemap: 'https://domain-tools.h2works.xyz/sitemap.xml',
  }
}
