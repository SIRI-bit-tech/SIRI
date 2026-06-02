import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SiteLogo } from "@/components/site-logo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return { title: "Project Not Found" };
    }

    return {
      title: `${project.title} - SIRITECH`,
      description: project.description,
    };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    notFound();
  }

  const allProjects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;

  let images: string[] = [];
  let tags: string[] = [];
  try {
    if (typeof project.images === 'string') {
      images = JSON.parse(project.images);
    }
    if (typeof project.tags === 'string') {
      tags = JSON.parse(project.tags);
    }
  } catch (e) {
    // Silent fail
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-8 top-nav backdrop-blur-sm bg-black/50">
        <Link href="/projects" className="nav-link">
          BACK
        </Link>
        <SiteLogo />
        <Link href="/about" className="nav-link">
          ABOUT
        </Link>
      </nav>

      <section className="relative min-h-screen pt-[56px] overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[0]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-surface-soft to-canvas" />
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="display-xl mb-4 text-white drop-shadow-sm">{project.title}</h1>
            <p className="body-md text-white/90">{project.description}</p>
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="py-[var(--spacing-section)] px-8 bg-canvas border-t border-hairline">
          <div className="max-w-7xl mx-auto">
            <h2 className="display-md mb-[var(--spacing-xl)]">PROJECT IMAGES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-xl)]">
              {images.map((image, idx) => (
                <div key={idx} className="w-full overflow-hidden rounded">
                  <img src={image} alt={`${project.title} ${idx + 1}`} className="w-full h-56 md:h-96 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="py-[var(--spacing-section)] px-8 bg-canvas">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-[var(--spacing-xl)] flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="caption-uppercase text-muted text-xs px-2 py-1 border border-hairline">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Body Content */}
          <div className="body-md text-body space-y-6 mb-[var(--spacing-xl)]">
            <p>{project.body}</p>
          </div>

          {/* Links */}
          <div className="flex gap-6 mb-[var(--spacing-section)]">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                VIEW LIVE
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                VIEW CODE
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Images Gallery */}
      {images.length > 0 && (
        <section className="py-[var(--spacing-section)] px-8 bg-surface-soft border-t border-hairline">
          <div className="max-w-7xl mx-auto">
            <h2 className="display-md mb-[var(--spacing-xl)]">GALLERY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-xl)]">
              {images.map((image, idx) => (
                <div key={idx} className="w-full aspect-video bg-surface-card overflow-hidden">
                  <img src={image} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {project.previewVideo && (
        <section className="py-[var(--spacing-section)] px-8 bg-canvas border-t border-hairline">
          <div className="max-w-4xl mx-auto">
            <h2 className="display-md mb-[var(--spacing-xl)]">PREVIEW VIDEO</h2>
            <video
              src={project.previewVideo}
              controls
              autoPlay
              muted
              className="w-full rounded-none bg-surface-soft"
            />
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-[var(--spacing-section)] px-8 bg-surface-soft border-t border-hairline">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-[var(--spacing-xl)]">
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="group">
                <p className="caption-uppercase text-muted mb-4">← PREVIOUS</p>
                <h3 className="display-sm text-ink group-hover:opacity-75 transition-opacity">
                  {prevProject.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="group text-right">
                <p className="caption-uppercase text-muted mb-4">NEXT →</p>
                <h3 className="display-sm text-ink group-hover:opacity-75 transition-opacity">
                  {nextProject.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline bg-canvas py-[var(--spacing-xxl)] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-xl)] mb-[var(--spacing-section)]">
            <div>
              <div className="wordmark mb-8">SIRITECH</div>
              <p className="body-sm text-muted">
                Full-stack engineer shipping production-ready systems.
              </p>
            </div>
            <div>
              <p className="caption-uppercase text-muted mb-6">NAVIGATE</p>
              <nav className="space-y-3">
                <Link href="/" className="body-sm text-body hover:text-ink transition-colors block">
                  Home
                </Link>
                <Link href="/projects" className="body-sm text-body hover:text-ink transition-colors block">
                  Projects
                </Link>
                <Link href="/about" className="body-sm text-body hover:text-ink transition-colors block">
                  About
                </Link>
              </nav>
            </div>
            <div>
              <p className="caption-uppercase text-muted mb-6">CONTACT</p>
              <a href="mailto:emuesiri@siritech.com" className="body-sm text-link hover:opacity-75 transition-opacity block">
                emuesiri@siritech.com
              </a>
            </div>
          </div>
          <div className="border-t border-hairline pt-8">
            <p className="body-sm text-muted">
              © 2026 Emuesiri Onovwiona. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
