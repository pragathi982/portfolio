import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { education } from '../data/portfolioData';

export function Education() {
  return (
    <section id="education" className="bg-white/[0.025] py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation in Information Technology and AI"
          description="B.Tech specialization is highlighted as the primary academic credential."
        />
        <div className="mx-auto grid max-w-5xl gap-5">
          {education.map((item) => (
            <article
              key={`${item.degree}-${item.period}`}
              className={`rounded-lg border p-6 ${
                item.featured
                  ? 'border-cyanSoft/40 bg-cyanSoft/10 shadow-glow'
                  : 'border-line bg-panel/70'
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-line bg-ink/70">
                    <GraduationCap className="h-6 w-6 text-cyanSoft" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                    <p className="mt-1 text-slate-300">{item.institution}</p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="font-semibold text-cyanSoft">{item.period}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
