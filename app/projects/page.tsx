import type { Metadata } from 'next';
import { ProjectsClient } from '@/components/pages/projects-client';

export const metadata: Metadata = {
  title: 'Projects - SIRITECH | Full-Stack Portfolio',
  description:
    'View my portfolio of production-ready projects. From SaaS platforms to complex backend systems, explore the work I\'ve shipped.',
  openGraph: {
    title: 'Projects - SIRITECH',
    description:
      'Portfolio of production-ready projects built with modern technologies.',
    url: 'https://siritech.com/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
