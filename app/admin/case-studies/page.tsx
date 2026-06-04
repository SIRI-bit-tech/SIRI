import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/logout-button";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function CaseStudiesPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <nav className="border-b border-hairline px-8 py-6 flex items-center justify-between">
        <Link href="/admin/dashboard" className="wordmark">
          SIRITECH ADMIN
        </Link>
        <LogoutButton />
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
              className="body-sm text-body hover:text-ink transition-colors block"
            >
              Projects
            </Link>
            <Link
              href="/admin/case-studies"
              className="body-sm text-ink transition-colors block font-bold"
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
            <h1 className="display-lg">CASE STUDIES</h1>
            <Link href="/admin/case-studies/new" className="btn-primary">
              NEW CASE STUDY
            </Link>
          </div>

          {caseStudies.length === 0 ? (
            <p className="body-md text-muted">No case studies found.</p>
          ) : (
            <div className="border border-hairline">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="text-left p-4 caption-uppercase text-muted">
                      Title
                    </th>
                    <th className="text-left p-4 caption-uppercase text-muted">
                      Slug
                    </th>
                    <th className="text-left p-4 caption-uppercase text-muted">
                      Summary
                    </th>
                    <th className="text-left p-4 caption-uppercase text-muted">
                      Featured
                    </th>
                    <th className="text-left p-4 caption-uppercase text-muted">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudies.map((study) => (
                    <tr key={study.id} className="border-b border-hairline">
                      <td className="p-4 body-sm">{study.title}</td>
                      <td className="p-4 body-sm text-muted">{study.slug}</td>
                      <td className="p-4 body-sm">{study.summary || "—"}</td>
                      <td className="p-4 body-sm">
                        {study.featured ? "Yes" : "No"}
                      </td>
                      <td className="p-4 body-sm">
                        <Link
                          href={`/admin/case-studies/${study.id}`}
                          className="text-link hover:opacity-75 mr-4"
                        >
                          Edit
                        </Link>
                        <DeleteButton id={study.id} type="case-studies" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
