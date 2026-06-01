import type { Metadata } from 'next';
import { ProjectsClient } from '@/components/pages/projects-client';

export const metadata: Metadata = {
  title: 'Portfolio - SIRITECH | Web Developer Projects',
  description:
    'Explore a web developer portfolio of production-ready React, Next.js, and full-stack projects built for modern businesses.',
  openGraph: {
    title: 'Portfolio - SIRITECH | Web Developer Projects',
    description:
      'Explore a web developer portfolio of production-ready React, Next.js, and full-stack projects built for modern businesses.',
    url: 'https://siridev.me/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
