'use client';

import { useState } from 'react';
import Link from 'next/link';

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-8">
        <Link href="/" className="nav-link hover:opacity-75 transition-opacity">
          BACK
        </Link>
        <div className="wordmark">CONTACT</div>
        <div className="w-12" />
      </nav>

      {/* Hero */}
      <section className="pt-[56px] min-h-[50vh] flex items-center justify-center px-8">
        <div className="max-w-2xl w-full text-center">
          <h1 className="display-lg mb-6 text-balance">GET IN TOUCH</h1>
          <p className="body-md text-body mb-4">
            Have a project in mind? Let&apos;s discuss how we can work together to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-[var(--spacing-section)] px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="caption-uppercase text-muted block mb-4">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-0 py-3 border-b border-hairline bg-transparent text-ink focus:outline-none focus:border-ink transition-colors body-md"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="caption-uppercase text-muted block mb-4">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-0 py-3 border-b border-hairline bg-transparent text-ink focus:outline-none focus:border-ink transition-colors body-md"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="caption-uppercase text-muted block mb-4">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-0 py-3 border-b border-hairline bg-transparent text-ink focus:outline-none focus:border-ink transition-colors body-md"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="caption-uppercase text-muted block mb-4">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-0 py-3 border-b border-hairline bg-transparent text-ink focus:outline-none focus:border-ink transition-colors body-md resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {status === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
                <p className="text-green-400 body-sm">Message sent successfully. We&apos;ll be in touch soon.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded">
                <p className="text-red-400 body-sm">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full"
            >
              {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline bg-canvas py-[var(--spacing-xxl)] px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="body-sm text-muted">
            © 2026 SIRITECH. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
