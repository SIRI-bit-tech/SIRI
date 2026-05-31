'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';

export function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const allProjects = data.data || [];
        setProjects(allProjects);

        // Extract all unique tags
        const tags = new Set<string>();
        allProjects.forEach((p: Project) => {
          try {
            const projectTags = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
            if (Array.isArray(projectTags)) {
              projectTags.forEach((tag: string) => tags.add(tag));
            }
          } catch (e) {
            // Silent fail on parse error
          }
        });
        setAllTags(Array.from(tags).sort());
      } catch (error) {
        console.error('Failed to load projects', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = projects.filter((project) => {
    if (selectedTags.size === 0) return true;
    try {
      const projectTags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
      if (!Array.isArray(projectTags)) return false;
      return projectTags.some((tag: string) => selectedTags.has(tag));
    } catch {
      return false;
    }
  });

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-8 top-nav backdrop-blur-sm bg-black/50">
        <Link href="/" className="nav-link">
          HOME
        </Link>
        <div className="wordmark">SIRITECH</div>
        <Link href="#contact" className="nav-link">
          CONTACT
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-[56px] min-h-[50vh] flex flex-col items-center justify-center hero-photo-band relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-surface-soft to-canvas" />
        <div className="relative z-10 text-center max-w-4xl px-8">
          <h1 className="display-lg mb-8 text-balance">
            ALL PROJECTS
          </h1>
          <p className="caption-uppercase text-muted">
            {filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? 'S' : ''}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-[var(--spacing-section)] px-8 bg-canvas">
        <div className="max-w-7xl mx-auto">
          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="mb-[var(--spacing-xl)]">
              <p className="caption-uppercase text-muted mb-6">FILTER BY TECHNOLOGY</p>
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`caption-uppercase text-xs px-3 py-2 border transition-colors ${
                      selectedTags.has(tag)
                        ? 'border-link text-link bg-link/10'
                        : 'border-hairline text-body hover:border-link'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted">No projects match your filter</p>
              <button
                onClick={() => setSelectedTags(new Set())}
                className="text-link caption-uppercase mt-4 hover:opacity-75"
              >
                CLEAR FILTERS →
              </button>
            </div>
          ) : (
            <div className="grid gap-[var(--spacing-xl)]">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="model-photo-card">
                    {/* Photo placeholder */}
                    <div className="w-full aspect-video bg-gradient-to-br from-surface-card to-surface-elevated mb-6" />
                    <h3 className="display-md text-ink group-hover:opacity-75 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="body-md text-body mt-4">{project.description}</p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {(() => {
                          try {
                            const tags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
                            return Array.isArray(tags) ? (
                              tags.map((tag: string) => (
                                <span key={tag} className="caption-uppercase text-muted text-xs">
                                  {tag}
                                </span>
                              ))
                            ) : null;
                          } catch {
                            return null;
                          }
                        })()}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
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
