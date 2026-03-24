import type { Project } from '../../content/projects'

interface Props { project: Project }

export default function ProjectModal({ project }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Date range */}
      <p className="text-[#c9d1d9] font-mono text-sm">{project.dateRange}</p>

      {/* Description */}
      <p className="text-[#c9d1d9] font-mono text-sm leading-relaxed">{project.description}</p>

      {/* Stack */}
      <div>
        <p className="text-[#4af626] font-mono text-base font-bold mb-2">Stack:</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-[#4af626] text-[#4af626] font-mono text-sm px-2 py-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links — omit entirely if null */}
      {(project.github || project.live) && (
        <div>
          <p className="text-[#4af626] font-mono text-base font-bold mb-2">Links:</p>
          {project.github && (
            <div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4af626] font-mono text-sm hover:underline focus:underline"
              >
                GitHub
              </a>
            </div>
          )}
          {project.live && (
            <div>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4af626] font-mono text-sm hover:underline focus:underline"
              >
                Live
              </a>
            </div>
          )}
        </div>
      )}

      {/* Screenshots — omit section if empty */}
      {project.screenshots.length > 0 && (
        <div>
          <p className="text-[#4af626] font-mono text-base font-bold mb-2">Screenshots:</p>
          <div className="flex flex-col gap-4">
            {project.screenshots.map((filename) => (
              <img
                key={filename}
                src={`/screenshots/${filename}`}
                alt={`${project.name} screenshot`}
                className="max-w-full border border-[#4af626]/30"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
