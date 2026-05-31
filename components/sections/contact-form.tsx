'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-hairline py-3 text-body body-md placeholder:text-muted-soft focus:outline-none focus:border-link transition-colors"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-hairline py-3 text-body body-md placeholder:text-muted-soft focus:outline-none focus:border-link transition-colors"
        />
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-transparent border-b border-hairline py-3 text-body body-md placeholder:text-muted-soft focus:outline-none focus:border-link transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
      </button>

      {status === 'success' && (
        <p className="text-success caption-uppercase text-center">
          Message sent successfully
        </p>
      )}

      {status === 'error' && (
        <p className="text-warning caption-uppercase text-center">
          {error}
        </p>
      )}
    </form>
  );
}
