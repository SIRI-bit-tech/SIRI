import { Experience } from '@prisma/client';
import { format } from 'date-fns';

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <div className="space-y-0">
      {experience.map((exp, index) => (
        <div key={exp.id} className="relative">
          {/* Timeline line */}
          {index < experience.length - 1 && (
            <div className="absolute left-0 top-0 w-px h-32 bg-hairline" />
          )}

          {/* Timeline dot */}
          <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-link transform -translate-x-0.5" />

          {/* Content */}
          <div className="pl-8 py-8">
            <div className="flex items-baseline gap-4 mb-2">
              <h3 className="title-md">{exp.role}</h3>
              {exp.isCurrent && (
                <span className="caption-uppercase text-success text-xs">
                  CURRENT
                </span>
              )}
            </div>
            <p className="body-sm text-muted mb-2">{exp.company}</p>
            <p className="body-sm text-body mb-4">{exp.description}</p>
            {exp.technologies && (
              <div className="flex flex-wrap gap-2">
                {(() => {
                  try {
                    const techs = typeof exp.technologies === 'string' 
                      ? JSON.parse(exp.technologies) 
                      : exp.technologies;
                    return Array.isArray(techs) && techs.length > 0 ? (
                      techs.map((tech) => (
                        <span
                          key={tech}
                          className="caption-uppercase text-muted text-xs px-2 py-1 border border-hairline"
                        >
                          {tech}
                        </span>
                      ))
                    ) : null;
                  } catch {
                    return null;
                  }
                })()}
              </div>
            )}
            <p className="caption-uppercase text-muted text-xs mt-4">
              {format(exp.startDate, 'MMM yyyy')} –{' '}
              {exp.endDate ? format(exp.endDate, 'MMM yyyy') : 'Present'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
