"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewExperienceForm() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [technologies, setTechnologies] = useState("");
  const [order, setOrder] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          role,
          description,
          startDate,
          endDate,
          isCurrent,
          technologies,
          order,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || "Unable to create experience");
      }

      router.push("/admin/experience");
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
          <span className="text-sm font-semibold text-slate-900">Company</span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="input"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Role</span>
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="input"
            required
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-900">Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="input min-h-[140px]"
          required
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Start Date</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="input"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">End Date</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="input"
            disabled={isCurrent}
          />
        </label>
        <label className="inline-flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(event) => setIsCurrent(event.target.checked)}
            className="h-4 w-4 rounded border-slate-400 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm">Current role</span>
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-900">Technologies</span>
        <input
          value={technologies}
          onChange={(event) => setTechnologies(event.target.value)}
          className="input"
          placeholder="Comma separated"
        />
      </label>

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
        {isSaving ? "Saving..." : "Create Experience"}
      </button>
    </form>
  );
}
