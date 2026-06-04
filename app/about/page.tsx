import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ContactForm } from "@/components/sections/contact-form";
import { SiteLogo } from "@/components/site-logo";

export const metadata = {
  title: "About - Emuesiri Onovwiona",
  description: "Full-stack engineer with 3+ years building production-ready systems. Learn about my approach, what I can do, and how I work.",
};

export default async function AboutPage() {
  let experience = [] as any[];
  let caseStudies = [] as any[];
  try {
    experience = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    try {
      caseStudies = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } });
    } catch (err) {
      console.warn('Could not load case studies during prerender:', err);
      caseStudies = [];
    }
  } catch (err) {
    // If the database is not reachable during build/prerender, fall back to empty list
    console.warn('Could not load experience during prerender:', err);
    experience = [];
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-8 top-nav backdrop-blur-sm bg-black/50">
        <Link href="/" className="nav-link">
          HOME
        </Link>
        <SiteLogo />
        <Link href="#contact" className="nav-link">
          CONTACT
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-[56px] min-h-screen flex flex-col items-center justify-center hero-photo-band relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-surface-soft to-canvas" />
        <div className="relative z-10 text-center max-w-4xl px-8">
          <h1 className="display-xl mb-8 text-balance">
            ABOUT ME
          </h1>
          <p className="caption-uppercase text-muted">
            3+ YEARS SHIPPING PRODUCTION SYSTEMS
          </p>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-[var(--spacing-section)] px-8 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="body-md text-body space-y-8">
            <div>
              <p className="text-xl mb-4">Hi, I&apos;m Emuesiri Onovwiona (SIRI).</p>
              <p className="mb-4">
                I am a Full-Stack Software Engineer based in Nigeria with 3+ years of professional experience, focused on building fast, scalable, and visually precise web applications. I work across the entire stack — from database architecture and API design to pixel-perfect interfaces that perform seamlessly on any device. My approach is driven by one standard: production-ready work that holds up under real-world conditions.
              </p>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center py-8">
              <div className="w-64 h-80 relative rounded-sm overflow-hidden border border-hairline">
                <Image
                  src="/emuesiri.jpg"
                  alt="Emuesiri Onovwiona - Full-Stack Engineer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div>
              <h2 className="display-md mb-4 text-ink">WHAT I&apos;VE BUILT</h2>
              <p className="mb-4">
                Over the past three years I have shipped systems that operate under real pressure — an online banking platform, a brokerage system, BidForge, CodeLens, and more. These are not side projects. They are complete, deployed systems built to solve real problems for real users. Each one required me to make architectural decisions, own the full delivery, and ensure the product held up in production.
              </p>
              <p className="mb-4">
                BidForge is a SaaS platform built for the construction industry that connects general contractors with qualified subcontractors. It handles the full bidding lifecycle — from RFP creation and document management to real-time bid comparison and one-click contract awards. It includes a subcontractor network with search and filtering by trade, location, and certification, automated deadline tracking, and instant bid notifications — all built to eliminate the manual, error-prone process that construction teams have dealt with for decades.
              </p>
              <p>
                CodeLens is a desktop application built with Python that explains code in six distinct ways — designed for developers who want to understand, not just run, the code in front of them.
              </p>
            </div>

            <div>
              <h2 className="display-md mb-4 text-ink">HOW I WORK</h2>
              <p className="mb-4">
                Security is not an afterthought in my workflow — it is built into every layer. From implementing robust authentication systems and secure API design to conducting thorough code audits, I ensure that every application I build protects both the business and its users. Performance optimization is equally central to how I work, with every system tuned for speed, stability, and efficient resource usage.
              </p>
              <p className="mb-4">
                I work independently with the discipline and focus of someone who treats every project as their primary responsibility. I have not yet worked inside a team structure, but I bring something many team-experienced developers do not — the ability to own an entire system end-to-end without gaps, hand-offs, or ambiguity. I move fast without cutting corners, and I give each project my full attention for as long as it takes.
              </p>
              <p>
                I am fully remote-ready and open to working with teams across Nigeria and internationally.
              </p>
            </div>

            <div>
              <h2 className="display-md mb-4 text-ink">HOW I SHIP</h2>
              <p>
                I work with AI-assisted development tools — Cursor, Claude Code, and Codex — not as a shortcut, but as a force multiplier. They allow me to move faster, catch issues earlier, and deliver more in less time without sacrificing quality or depth of understanding. I know what I am building. The tools help me build it faster.
              </p>
            </div>

            <div>
              <h2 className="display-md mb-4 text-ink">WHAT I CAN DO FOR YOUR COMPANY</h2>
              <p className="mb-4">
                What defines my work is the intersection of technical depth and design precision. I care about type-safety, real-time data synchronization, and micro-interactions that make an interface feel alive — because the best systems are not just functional, they are exceptional to use. I bring that same commitment whether I am architecting a complex backend system, designing a seamless user experience, or optimizing an existing codebase for scale.
              </p>
              <p className="mb-4">
                I am looking for opportunities where I can contribute meaningfully from day one — and where I can also grow. I want to work inside teams, learn how great engineering cultures operate, and expand what I am capable of. I am open to full-time roles and serious freelance engagements.
              </p>
              <p>
                I build for founders and teams who need a developer that takes ownership — not just of the code, but of the outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="py-[var(--spacing-section)] px-8 bg-surface-soft border-t border-hairline">
          <div className="max-w-4xl mx-auto">
            <h2 className="display-lg mb-[var(--spacing-xl)]">EXPERIENCE</h2>
            <ExperienceTimeline experience={experience} />
          </div>
        </section>
      )}

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-[var(--spacing-section)] px-8 bg-canvas border-t border-hairline">
          <div className="max-w-7xl mx-auto">
            <h2 className="display-lg mb-[var(--spacing-xl)]">CASE STUDIES</h2>
            <div className="grid gap-[var(--spacing-xl)]">
              {caseStudies.map((cs) => (
                <Link key={cs.id} href={`/case-studies/${cs.slug}`} className="group">
                  <div className="model-photo-card">
                    {cs.coverImage ? (
                      <img src={cs.coverImage} alt={cs.title} className="w-full h-[40vh] md:h-[60vh] object-cover mb-6" />
                    ) : (
                      <div className="w-full aspect-video bg-gradient-to-br from-surface-card to-surface-elevated mb-6" />
                    )}
                    <h3 className="display-md text-ink group-hover:opacity-75 transition-opacity">{cs.title}</h3>
                    <p className="body-md text-body mt-4">{cs.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section id="contact" className="py-[var(--spacing-section)] px-8 bg-canvas border-t border-hairline">
        <div className="max-w-2xl mx-auto">
          <h2 className="display-lg text-center mb-[var(--spacing-xl)]">
            LET'S BUILD SOMETHING
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
