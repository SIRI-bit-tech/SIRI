import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SkillsTicker } from "@/components/sections/skills-ticker";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "SIRITECH - Full-Stack Engineer | Production-Ready Systems",
  description:
    "Full-stack engineer shipping production-ready systems. 3+ years building fast, scalable web applications across the entire stack. Based in Nigeria, remote-ready.",
  openGraph: {
    title: "SIRITECH - Full-Stack Engineer",
    description:
      "Full-stack engineer shipping production-ready systems. Learn about my projects, experience, and approach to building.",
    url: "https://siritech.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://siritech.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIRITECH Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIRITECH - Full-Stack Engineer",
    description: "Full-stack engineer shipping production-ready systems.",
    images: ["https://siritech.com/og-image.jpg"],
  },
  keywords: [
    "full-stack engineer",
    "software developer",
    "web development",
    "Nigeria",
    "remote developer",
    "product engineering",
    "system architecture",
  ],
};

export default async function HomePage() {
  const [projects, skills, experience] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    }),
    prisma.skill.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    }),
  ]);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-8 top-nav backdrop-blur-sm bg-black/50">
        <Link href="/about" className="nav-link">
          ABOUT
        </Link>
        <div className="wordmark">SIRITECH</div>
        <Link href="#contact" className="nav-link">
          CONTACT
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-[56px] min-h-screen flex flex-col items-center justify-center hero-photo-band relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-surface-soft to-canvas" />
        <div className="relative z-10 text-center max-w-4xl px-8">
          <h1 className="display-xl mb-8 text-balance">
            FULL-STACK ENGINEER
          </h1>
          <p className="body-md text-body mb-6 text-balance">
            I build products that scale, ship fast, and solve real problems.
          </p>
          <p className="caption-uppercase text-muted mb-12">
            BASED IN NIGERIA · REMOTE-READY · SHIPPING DAILY
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="#work" className="btn-primary">
              VIEW MY WORK
            </Link>
            <Link href="#contact" className="btn-primary">
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section className="py-[var(--spacing-section)] px-8 bg-surface-soft border-t border-hairline">
        <div className="max-w-4xl mx-auto">
          <h2 className="display-lg mb-[var(--spacing-xl)]">WHO I AM</h2>
          <div className="body-md text-body space-y-6">
            <p>
              I am a full-stack software engineer with 3+ years of professional experience building fast, scalable systems. I work across the entire stack — from database architecture and API design to pixel-perfect interfaces. My work is defined by ownership: I don't hand off problems, I solve them end-to-end.
            </p>
            <p>
              I have shipped systems that operate under real pressure — an online banking platform, a brokerage system, BidForge, CodeLens, and more. These are not side projects. They are complete, deployed systems built to solve real problems for real users.
            </p>
            <Link href="/about" className="text-link inline-block mt-4">
              READ MY FULL STORY →
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Ticker */}
      <section className="py-[var(--spacing-xl)] px-8 bg-canvas border-t border-hairline overflow-hidden">
        <SkillsTicker skills={skills} />
      </section>

      {/* Featured Projects */}
      <section id="work" className="py-[var(--spacing-section)] px-8 bg-canvas">
        <h2 className="display-lg text-center mb-[var(--spacing-section)] text-balance">
          FEATURED WORK
        </h2>

        <div className="max-w-7xl mx-auto grid gap-[var(--spacing-xl)] mb-[var(--spacing-xl)]">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group cursor-pointer"
            >
              <div className="model-photo-card">
                <div className="w-full aspect-video bg-gradient-to-br from-surface-card to-surface-elevated mb-6" />
                <h3 className="display-md text-ink group-hover:opacity-75 transition-opacity">
                  {project.title}
                </h3>
                <p className="body-md text-body mt-4">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/projects" className="btn-primary">
            VIEW ALL PROJECTS
          </Link>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-[var(--spacing-section)] px-8 bg-surface-soft border-t border-hairline">
        <div className="max-w-4xl mx-auto">
          <h2 className="display-lg mb-[var(--spacing-xl)]">EXPERIENCE</h2>
          <ExperienceTimeline experience={experience} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-[var(--spacing-section)] px-8 bg-canvas border-t border-hairline">
        <div className="max-w-2xl mx-auto">
          <h2 className="display-lg text-center mb-[var(--spacing-xl)]">
            LET'S WORK TOGETHER
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline bg-surface-soft py-[var(--spacing-xxl)] px-8">
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
              <a href="mailto:onovwionaemuesiri@gmail.com" className="body-sm text-link hover:opacity-75 transition-opacity block mb-3">
                onovwionaemuesiri@gmail.com
              </a>
              <a href="https://wa.me/2348072307541" target="_blank" rel="noopener noreferrer" className="body-sm text-link hover:opacity-75 transition-opacity block">
                +234 807 230 7541 (WhatsApp)
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
