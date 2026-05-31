"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
  project?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    body: string;
      tags: string;
      images?: string;
    previewVideo?: string | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
    featured: boolean;
    order: number;
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [description, setDescription] = useState(project?.description || "");
  const [body, setBody] = useState(project?.body || "");
  const [tags, setTags] = useState(
    project?.tags ? JSON.parse(project.tags).join(", ") : ""
  );
  const [selectedImageFiles, setSelectedImageFiles] = useState<FileList | null>(
    null
  );
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(
    null
  );
  const [previewVideo, setPreviewVideo] = useState(project?.previewVideo || "");
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || "");
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
  const [imagesUrls, setImagesUrls] = useState<string[]>(
    project?.images ? JSON.parse(project.images) : []
  );
  const [featured, setFeatured] = useState(project?.featured || false);
  const [order, setOrder] = useState(project?.order ?? 0);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEdit = Boolean(project);
  const actionUrl = isEdit ? `/api/admin/projects/${project?.id}` : "/api/admin/projects";
  const method = isEdit ? "PUT" : "POST";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const response = await fetch(actionUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          description,
          body,
          tags: tagsArray,
          previewVideo: previewVideo || null,
          liveUrl: liveUrl || null,
          githubUrl: githubUrl || null,
          featured,
          order: Number(order),
          images: imagesUrls,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data?.error || "Failed to save project.");
        setIsSaving(false);
        return;
      }

      router.push("/admin/projects");
    } catch (err) {
      setError("Failed to save project.");
      setIsSaving(false);
    }
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

  async function handleUploadImages() {
    if (!selectedImageFiles) return;
    setIsSaving(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(selectedImageFiles)) {
        const url = await uploadFileToServer(file);
        uploaded.push(url);
      }
      setImagesUrls((cur) => [...cur, ...uploaded]);
    } catch (err) {
      setError("Image upload failed.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUploadVideo() {
    if (!selectedVideoFile) return;
    setIsSaving(true);
    try {
      const url = await uploadFileToServer(selectedVideoFile);
      setPreviewVideo(url);
    } catch (err) {
      setError("Video upload failed.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full rounded border border-slate-300 px-4 py-3"
            placeholder="bidforge"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full rounded border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
            className="w-full rounded border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            placeholder="Next.js, React, Prisma"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSelectedImageFiles(e.target.files)}
            className="w-full"
          />
          <div className="mt-2 flex gap-2 items-center">
            <button
              type="button"
              onClick={handleUploadImages}
              disabled={!selectedImageFiles || isSaving}
              className="btn-primary inline-block"
            >
              Upload Images
            </button>
            <div className="text-sm text-muted">Or leave empty and provide external image URLs in the form after create.</div>
          </div>

          {imagesUrls.length > 0 && (
            <div className="mt-3 flex gap-3 flex-wrap">
              {imagesUrls.map((u) => (
                <img key={u} src={u} alt="preview" className="h-20 w-20 object-cover rounded" />
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Preview Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setSelectedVideoFile(e.target.files?.[0] || null)}
            className="w-full"
          />
          <div className="mt-2 flex gap-2 items-center">
            <button
              type="button"
              onClick={handleUploadVideo}
              disabled={!selectedVideoFile || isSaving}
              className="btn-primary inline-block"
            >
              Upload Video
            </button>
            <div className="text-sm text-muted">Or paste a video URL in the Preview video URL field.</div>
          </div>

          {previewVideo && (
            <div className="mt-3">
              <video src={previewVideo} controls className="max-h-48" />
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Live URL</label>
            <input
              value={liveUrl || ""}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full rounded border border-slate-300 px-4 py-3"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              value={githubUrl || ""}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full rounded border border-slate-300 px-4 py-3"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium mb-2">Preview video URL</label>
            <input
              value={previewVideo || ""}
              onChange={(e) => setPreviewVideo(e.target.value)}
              className="w-full rounded border border-slate-300 px-4 py-3"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full rounded border border-slate-300 px-4 py-3"
            />
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              Featured
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-4 inline-flex items-center justify-center rounded bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isSaving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
