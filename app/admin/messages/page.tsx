import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function MessagesPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
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
              className="body-sm text-ink transition-colors block font-bold"
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
          <h1 className="display-lg mb-8">CONTACT MESSAGES</h1>

          {messages.length === 0 ? (
            <p className="body-md text-muted">No messages.</p>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`border border-hairline p-6 ${
                    !message.read ? "bg-surface-card" : "bg-canvas"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="title-md mb-1">{message.name}</h3>
                      <p className="body-sm text-link">{message.email}</p>
                    </div>
                    <p className="body-sm text-muted">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="caption-uppercase text-muted mb-4">
                    Contact message
                  </p>
                  <p className="body-md text-body mb-4 whitespace-pre-wrap">
                    {message.message}
                  </p>
                  {!message.read && (
                    <span className="inline-block px-4 py-1 bg-surface-elevated text-success caption-uppercase">
                      NEW
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
