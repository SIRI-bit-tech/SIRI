"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function formatCaseStudyBody(body: string) {
  const escapeHtml = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const withBold = escapeHtml(body).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return withBold
    .split(/\n{2,}/)
    .map((paragraph) =>
      paragraph
        .split(/\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .join("<br />")
    )
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

export function NewCaseStudyForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          summary,
          body,
          tags,
          coverImage,
          featured,
          order,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || "Unable to create case study");
      }

      router.push("/admin/case-studies");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Summary</label>
        <textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          className="w-full rounded border border-slate-300 px-4 py-3 min-h-[120px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Body</label>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="w-full rounded border border-slate-300 px-4 py-3 min-h-[180px]"
          placeholder="Use **bold** for strong text and blank lines for new paragraphs."
          required
        />
      </div>

      <div className="rounded border border-slate-700 bg-surface-card p-4 text-sm text-body text-white">
        <div className="mb-2 font-semibold">Body preview</div>
        <div
          className="max-w-full whitespace-pre-wrap leading-7"
          dangerouslySetInnerHTML={{ __html: formatCaseStudyBody(body) }}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            placeholder="Comma separated"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image URL</label>
          <input
            value={coverImage}
            onChange={(event) => setCoverImage(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            placeholder="Optional URL"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <label className="inline-flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) => setFeatured(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm">Featured</span>
        </label>
        <div className="sm:flex-1">
          <label className="block text-sm font-medium mb-2">Order</label>
          <input
            type="number"
            value={order}
            onChange={(event) => setOrder(Number(event.target.value))}
            className="w-full rounded border border-slate-300 px-4 py-3"
            min={0}
          />
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isSaving}
        className="mt-4 inline-flex items-center justify-center rounded bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Create Case Study"}
      </button>
    </form>
  );
}
