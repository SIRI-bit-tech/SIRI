import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProjectForm } from "@/app/admin/projects/project-form";

interface ProjectPageProps {
  params: { id: string };
}

export default async function EditProjectPage({ params }: ProjectPageProps) {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    redirect("/admin/projects");
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <nav className="border-b border-hairline px-8 py-6 flex items-center justify-between">
        <Link href="/admin/dashboard" className="wordmark">
          SIRITECH ADMIN
        </Link>
      </nav>

      <div className="flex">
        <aside className="w-64 border-r border-hairline p-8 hidden md:block min-h-screen">
          <nav className="space-y-4">
            <Link
              href="/admin/dashboard"
              className="body-sm text-body hover:text-ink transition-colors block"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/projects"
              className="body-sm text-ink transition-colors block font-bold"
            >
              Projects
            </Link>
            <Link
              href="/admin/case-studies"
              className="body-sm text-body hover:text-ink transition-colors block"
            >
              Case Studies
            </Link>
            <Link
              href="/admin/skills"
              className="body-sm text-body hover:text-ink transition-colors block"
            >
              Skills
            </Link>
            <Link
              href="/admin/experience"
              className="body-sm text-body hover:text-ink transition-colors block"
            >
              Experience
            </Link>
            <Link
              href="/admin/messages"
              className="body-sm text-body hover:text-ink transition-colors block"
            >
              Messages
            </Link>
            <Link
              href="/admin/settings"
              className="body-sm text-body hover:text-ink transition-colors block"
            >
              Settings
            </Link>
          </nav>
        </aside>

        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="display-lg">Edit Project</h1>
              <p className="text-muted mt-2">Update project details and save changes.</p>
            </div>
            <Link href="/admin/projects" className="text-link">
              Back to projects
            </Link>
          </div>

          <ProjectForm project={project} />
        </div>
      </div>
    </main>
  );
}
