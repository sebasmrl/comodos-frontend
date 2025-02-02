import { MetadataRoute } from 'next'


export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                //disallow: '',
            }
        ],
        sitemap: `${process.env.FRONTEND_URL}/sitemap.xml`,
    }
}