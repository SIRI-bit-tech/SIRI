"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewSkillForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [proficiency, setProficiency] = useState("Intermediate");
  const [icon, setIcon] = useState("");
  const [order, setOrder] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, proficiency, icon, order }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.error || "Unable to create skill");
      }

      router.push("/admin/skills");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2">Proficiency</label>
          <select
            value={proficiency}
            onChange={(event) => setProficiency(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Icon URL</label>
          <input
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            placeholder="Optional image URL"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Order</label>
        <input
          type="number"
          value={order}
          onChange={(event) => setOrder(Number(event.target.value))}
          className="w-full rounded border border-slate-300 px-4 py-3"
          min={0}
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isSaving}
        className="mt-4 inline-flex items-center justify-center rounded bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Create Skill"}
      </button>
    </form>
  );
}
