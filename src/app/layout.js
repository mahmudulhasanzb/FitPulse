import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import AIChatBot from '@/components/ui/AIChatBot';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://fitpulse-gym-management.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FitPulse | High-Performance Fitness Platform & Community',
    template: '%s | FitPulse',
  },
  description:
    'FitPulse is an elite fitness and wellness ecosystem featuring certified instructors, curated training classes, and an active fitness community. Engineered by Mahmudul Hasan.',
  applicationName: 'FitPulse',
  authors: [
    {
      name: 'Mahmudul Hasan',
      url: 'https://mahmudulhasan-dev.vercel.app',
    },
  ],
  creator: 'Mahmudul Hasan',
  publisher: 'Mahmudul Hasan',
  keywords: [
    'FitPulse',
    'Fitness Platform',
    'Workout Classes',
    'Personal Trainers',
    'Fitness Community',
    'Gym Management',
    'Gym Management System',
    'Fitness AI Coach',
    'Fitness AI Assistant',
    'Next.js Fitness App',
    'Mahmudul Hasan',
    'Full Stack Developer Bangladesh',
    'AI Integration Specialist',
    'mahmudulhasanzb',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'FitPulse',
    title: 'FitPulse | High-Performance Fitness Platform & Community',
    description:
      'Professional fitness ecosystems designed for elite athletes and motivated beginners alike. Developed by Mahmudul Hasan.',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'FitPulse Fitness Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitPulse | High-Performance Fitness Platform',
    description:
      'Engineered by Mahmudul Hasan. Explore elite training sessions and fitness forum.',
    creator: '@mahmudulhasanzb',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'FitPulse',
        description:
          'FitPulse is a high-performance fitness platform and community.',
        publisher: {
          '@id': `${siteUrl}/#developer`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#developer`,
        name: 'Mahmudul Hasan',
        url: 'https://mahmudulhasan-dev.vercel.app',
        jobTitle: 'Full-Stack Developer & AI Integration Specialist',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sylhet',
          addressCountry: 'Bangladesh',
        },
        sameAs: [
          'https://github.com/mahmudulhasanzb',
          'https://linkedin.com/in/mahmudulhasanzb',
          'https://twitter.com/mahmudulhasanzb',
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <AIChatBot />
        <Toaster />
      </body>
    </html>
  );
}
