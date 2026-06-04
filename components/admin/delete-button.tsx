"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  id: string;
  type?: "projects" | "case-studies";
}

export function DeleteButton({ id, type = "projects" }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/${type}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data?.error || "Failed to delete");
        setIsDeleting(false);
        return;
      }
      router.refresh();
    } catch (err) {
      alert("Failed to delete.");
      setIsDeleting(false);
    }
  }

  const label = type === "projects" ? "project" : "case study";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-600 hover:underline">Delete</button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {label}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to delete this {label}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={handleDelete}
              className="inline-flex items-center justify-center rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
