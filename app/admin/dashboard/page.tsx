import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany();
  const caseStudies = await prisma.caseStudy.findMany();
  const messages = await prisma.contactMessage.findMany({
    where: { read: false },
  });
  const skills = await prisma.skill.findMany();
  const experience = await prisma.experience.findMany();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Admin Nav */}
      <nav className="border-b border-hairline px-8 py-6 flex items-center justify-between">
        <div className="wordmark">SIRITECH ADMIN</div>
        <LogoutButton />
      </nav>

      <div className="flex">
        {/* Sidebar */}
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
              className="body-sm text-body hover:text-ink transition-colors block"
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="display-lg mb-12">DASHBOARD</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-xl)] mb-[var(--spacing-section)]">
            <div className="border border-hairline p-8 bg-surface-card">
              <p className="caption-uppercase text-muted mb-4">PROJECTS</p>
              <p className="display-lg">{projects.length}</p>
              <Link
                href="/admin/projects"
                className="body-sm text-link hover:opacity-75 transition-opacity block mt-4"
              >
                Manage →
              </Link>
            </div>

            <div className="border border-hairline p-8 bg-surface-card">
              <p className="caption-uppercase text-muted mb-4">CASE STUDIES</p>
              <p className="display-lg">{caseStudies.length}</p>
              <Link
                href="/admin/case-studies"
                className="body-sm text-link hover:opacity-75 transition-opacity block mt-4"
              >
                Manage →
              </Link>
            </div>

            <div className="border border-hairline p-8 bg-surface-card">
              <p className="caption-uppercase text-muted mb-4">
                NEW MESSAGES
              </p>
              <p className="display-lg">{messages.length}</p>
              <Link
                href="/admin/messages"
                className="body-sm text-link hover:opacity-75 transition-opacity block mt-4"
              >
                View →
              </Link>
            </div>

            <div className="border border-hairline p-8 bg-surface-card">
              <p className="caption-uppercase text-muted mb-4">SKILLS</p>
              <p className="display-lg">{skills.length}</p>
              <Link
                href="/admin/skills"
                className="body-sm text-link hover:opacity-75 transition-opacity block mt-4"
              >
                Manage →
              </Link>
            </div>

            <div className="border border-hairline p-8 bg-surface-card">
              <p className="caption-uppercase text-muted mb-4">EXPERIENCE</p>
              <p className="display-lg">{experience.length}</p>
              <Link
                href="/admin/experience"
                className="body-sm text-link hover:opacity-75 transition-opacity block mt-4"
              >
                Manage →
              </Link>
            </div>

            <div className="border border-hairline p-8 bg-surface-card">
              <p className="caption-uppercase text-muted mb-4">SETTINGS</p>
              <p className="body-sm text-muted">Site configuration</p>
              <Link
                href="/admin/settings"
                className="body-sm text-link hover:opacity-75 transition-opacity block mt-4"
              >
                Configure →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-hairline pt-8">
            <h2 className="display-md mb-6">QUICK ACTIONS</h2>
            <div className="space-y-3">
              <Link
                href="/admin/projects/new"
                className="btn-primary inline-block"
              >
                NEW PROJECT
              </Link>
              <br />
              <Link
                href="/admin/case-studies/new"
                className="btn-primary inline-block"
              >
                NEW CASE STUDY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
