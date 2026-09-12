export default function robots() {
  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://fitpulse-gym-management.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/classes',
          '/trainers',
          '/forum-posts',
          '/help',
          '/contact',
          '/feedback',
          '/privacy',
          '/terms',
        ],
        disallow: [
          '/classes/*',
          '/forum-posts/*',
          '/dashboard',
          '/dashboard/*',
          '/profile',
          '/profile/*',
          '/payment',
          '/payment/*',
          '/payment-success',
          '/api/*',
          '/login',
          '/register',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
