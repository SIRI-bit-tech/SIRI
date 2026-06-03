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
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Category</span>
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="input"
            required
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Proficiency</span>
          <select
            value={proficiency}
            onChange={(event) => setProficiency(event.target.value)}
            className="input"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Icon URL</span>
          <input
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            className="input"
            placeholder="Optional image URL"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-900">Order</span>
        <input
          type="number"
          value={order}
          onChange={(event) => setOrder(Number(event.target.value))}
          className="input"
          min={0}
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" className="btn-primary" disabled={isSaving}>
        {isSaving ? "Saving..." : "Create Skill"}
      </button>
    </form>
  );
}
