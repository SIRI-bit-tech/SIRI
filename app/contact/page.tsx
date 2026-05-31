import type { Metadata } from 'next';
import { ContactClient } from '@/components/pages/contact-client';

export const metadata: Metadata = {
  title: 'Get In Touch - SIRITECH',
  description:
    'Interested in working together? Send me a message and let\'s discuss your project or opportunity.',
};

export default function ContactPage() {
  return <ContactClient />;
}
