"use client";

import { useState, useRef } from "react";
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

interface CaseStudyFormProps {
  caseStudy?: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    body: string;
    tags: string;
    coverImage?: string | null;
    featured: boolean;
    order: number;
  };
}

export function NewCaseStudyForm({ caseStudy }: CaseStudyFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(caseStudy?.title || "");
  const [slug, setSlug] = useState(caseStudy?.slug || "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [summary, setSummary] = useState(caseStudy?.summary || "");
  const [body, setBody] = useState(caseStudy?.body || "");
  const [tags, setTags] = useState(
    caseStudy?.tags ? JSON.parse(caseStudy.tags).join(", ") : ""
  );
  const [coverImage, setCoverImage] = useState(caseStudy?.coverImage || "");
  const [featured, setFeatured] = useState(caseStudy?.featured || false);
  const [order, setOrder] = useState(caseStudy?.order ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const isEdit = Boolean(caseStudy);
  const actionUrl = isEdit ? `/api/admin/case-studies/${caseStudy?.id}` : "/api/admin/case-studies";
  const method = isEdit ? "PUT" : "POST";

  function createSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function uploadFileToServer(file: File) {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          const res = await fetch("/api/admin/uploads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: file.name, dataUrl }),
          });
          const data = await res.json();
          if (!res.ok) return reject(data?.error || "Upload failed");
          resolve(data.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  async function handleUploadImage() {
    if (!selectedImageFile) {
      imageInputRef.current?.click();
      return;
    }
    setError(null);
    setUploadMessage("Uploading image...");
    setIsUploadingImage(true);
    try {
      const url = await uploadFileToServer(selectedImageFile);
      setCoverImage(url);
      setSelectedImageFile(null);
      setUploadMessage("Image uploaded successfully.");
    } catch (err) {
      setError("Image upload failed.");
      setUploadMessage("");
    } finally {
      setIsUploadingImage(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch(actionUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          summary,
          body,
          tags,
          coverImage: coverImage || null,
          featured,
          order,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || "Unable to save case study");
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
            onChange={(event) => {
              const nextTitle = event.target.value;
              setTitle(nextTitle);
              if (!slugEdited) {
                setSlug(createSlug(nextTitle));
              }
            }}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugEdited(true);
            }}
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
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImageFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <div className="mb-2 text-sm text-muted">
            {selectedImageFile
              ? `Selected file: ${selectedImageFile.name}`
              : coverImage
              ? "Cover image uploaded."
              : "No image selected."}
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={isSaving || isUploadingImage}
              className="btn-primary inline-block"
            >
              {isUploadingImage
                ? "Uploading Image..."
                : selectedImageFile
                ? "Upload Image"
                : "Choose Image"}
            </button>
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={isSaving || isUploadingImage}
              className="btn-secondary inline-block"
            >
              Select Image
            </button>
          </div>
          <div className="text-sm text-muted mt-2">
            {uploadMessage || "Upload a cover image for your case study."}
          </div>

          {coverImage && (
            <div className="mt-3">
              <img src={coverImage} alt="Cover preview" className="h-40 w-full object-cover rounded border border-hairline" />
            </div>
          )}
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
        {isSaving ? "Saving..." : isEdit ? "Update Case Study" : "Create Case Study"}
      </button>
    </form>
  );
}
