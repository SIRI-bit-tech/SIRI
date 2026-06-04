import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

function formatCaseStudyBody(body: string) {
  const escapeHtml = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const withBold = escapeHtml(body).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return withBold
    .split(/\n{2,}/)
    .map((paragraph) =>
      paragraph
        .split(/\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .join("<br />")
    )
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

export const dynamic = "force-dynamic";

export default async function CaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({ where: { slug } });
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <nav className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-8 top-nav backdrop-blur-sm bg-black/50">
        <Link href="/about" className="nav-link">
          BACK
        </Link>
        <Link href="/" className="nav-link">
          HOME
        </Link>
      </nav>

      <section className="relative min-h-screen pt-[56px] overflow-hidden">
        {study.coverImage ? (
          <>
            <img src={study.coverImage} alt={study.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-surface-soft to-canvas" />
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="display-xl mb-4 text-white drop-shadow-sm">{study.title}</h1>
            <p className="body-md text-white/90">{study.summary}</p>
          </div>
        </div>
      </section>

      <section className="py-[var(--spacing-section)] px-8 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="body-md text-body space-y-6 mb-[var(--spacing-xl)]">
            <div dangerouslySetInnerHTML={{ __html: formatCaseStudyBody(study.body || "") }} />
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline bg-canvas py-[var(--spacing-xxl)] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-hairline pt-8">
            <p className="body-sm text-muted">© 2026 Emuesiri Onovwiona. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
