"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Slug</span>
          <input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="input"
            required
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-900">Summary</span>
        <textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          className="input min-h-[120px]"
          required
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-900">Body</span>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="input min-h-[180px]"
          required
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Tags</span>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className="input"
            placeholder="Comma separated"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Cover Image URL</span>
          <input
            value={coverImage}
            onChange={(event) => setCoverImage(event.target.value)}
            className="input"
            placeholder="Optional URL"
          />
        </label>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <label className="inline-flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) => setFeatured(event.target.checked)}
            className="h-4 w-4 rounded border-slate-400 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm">Featured</span>
        </label>
        <label className="space-y-2 sm:flex-1">
          <span className="text-sm font-semibold text-slate-900">Order</span>
          <input
            type="number"
            value={order}
            onChange={(event) => setOrder(Number(event.target.value))}
            className="input"
            min={0}
          />
        </label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button type="submit" className="btn-primary" disabled={isSaving}>
        {isSaving ? "Saving..." : "Create Case Study"}
      </button>
    </form>
  );
}
