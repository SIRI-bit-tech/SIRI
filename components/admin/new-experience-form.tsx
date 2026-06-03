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
        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded border border-slate-300 px-4 py-3 min-h-[140px]"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="w-full rounded border border-slate-300 px-4 py-3"
            disabled={isCurrent}
          />
        </div>
        <label className="inline-flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(event) => setIsCurrent(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm">Current role</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Technologies</label>
        <input
          value={technologies}
          onChange={(event) => setTechnologies(event.target.value)}
          className="w-full rounded border border-slate-300 px-4 py-3"
          placeholder="Comma separated"
        />
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
        {isSaving ? "Saving..." : "Create Experience"}
      </button>
    </form>
  );
}
