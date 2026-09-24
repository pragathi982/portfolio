import { ExternalLink, Github } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { projects } from '../data/portfolioData';

const accentClasses = {
  cyan: 'from-cyanSoft/25 border-cyanSoft/40 text-cyanSoft',
  violet: 'from-violetSoft/25 border-violetSoft/40 text-violetSoft',
  emerald: 'from-emerald-300/25 border-emerald-300/40 text-emerald-300',
};

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Projects"
          title="Machine learning and GenAI projects"
          description="The project section centers the practical work most relevant to data analyst, AI/ML developer, and GenAI developer roles."
        />
        <div className="grid gap-6">
          {projects.map((project) => (
            <article key={project.name} className="glass overflow-hidden rounded-lg">
              <div className="grid gap-0 lg:grid-cols-[.95fr_1.05fr]">
                <div className={`border-b border-line bg-gradient-to-br ${accentClasses[project.accent]} to-transparent p-6 lg:border-b-0 lg:border-r sm:p-8`}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em]">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{project.name}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{project.description}</p>

                  <div className="mt-6 grid gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Problem</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">What I Built</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{project.built}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.links?.github ? (
                      <a className="focus-ring inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-slate-200" href={project.links.github}>
                        <Github className="h-4 w-4" aria-hidden="true" /> GitHub
                      </a>
                    ) : null}
                    {project.links?.demo ? (
                      <a className="focus-ring inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-slate-200" href={project.links.demo}>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Workflow</h4>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {project.workflow.map((step, index) => (
                      <div key={step} className="relative rounded-lg border border-line bg-ink/50 p-4">
                        <span className="text-xs font-bold text-cyanSoft">0{index + 1}</span>
                        <p className="mt-2 text-sm font-semibold text-white">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Key Features</h4>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanSoft" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Technology Stack</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="rounded-md border border-line bg-white/[0.045] px-2.5 py-1.5 text-xs font-semibold text-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
