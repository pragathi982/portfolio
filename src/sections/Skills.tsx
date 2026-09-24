import { SectionHeading } from '../components/SectionHeading';
import { skillCategories } from '../data/portfolioData';

export function Skills() {
  return (
    <section id="skills" className="bg-white/[0.025] py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Skills"
          title="Focused skill set for data and AI projects"
          description="Categorized capabilities from the resume, without arbitrary percentage scores."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <article key={category.title} className="glass rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyanSoft/40">
                <Icon className="h-7 w-7 text-cyanSoft" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-white">{category.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{category.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="rounded-md border border-line bg-ink/60 px-2.5 py-1.5 text-xs font-semibold text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
