import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "siritech" },
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
              className="body-sm text-ink transition-colors block font-bold"
            >
              Settings
            </Link>
          </nav>
        </aside>

        <div className="flex-1 p-8 max-w-4xl">
          <h1 className="display-lg mb-12">SITE SETTINGS</h1>

          {settings ? (
            <div className="space-y-8">
              <div>
                <h2 className="title-md mb-4">SITE INFORMATION</h2>
                <div className="space-y-4">
                  <div>
                    <p className="caption-uppercase text-muted mb-2">Site Title</p>
                    <p className="body-md">{settings.siteTitle}</p>
                  </div>
                  <div>
                    <p className="caption-uppercase text-muted mb-2">
                      Site Description
                    </p>
                    <p className="body-md text-body">
                      {settings.siteDescription}
                    </p>
                  </div>
                  <div>
                    <p className="caption-uppercase text-muted mb-2">
                      Meta Description
                    </p>
                    <p className="body-md text-body">
                      {settings.metaDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-hairline pt-8">
                <h2 className="title-md mb-4">ANALYTICS</h2>
                <div className="space-y-4">
                  <div>
                    <p className="caption-uppercase text-muted mb-2">
                      Google Analytics ID
                    </p>
                    <p className="body-md">
                      {settings.analyticsGaId || "Not configured"}
                    </p>
                  </div>
                  <div>
                    <p className="caption-uppercase text-muted mb-2">
                      Microsoft Clarity ID
                    </p>
                    <p className="body-md">
                      {settings.analyticsClarityId || "Not configured"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="body-sm text-muted">
                  Last updated:{" "}
                  {new Date(settings.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="body-md text-muted">Settings not found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
