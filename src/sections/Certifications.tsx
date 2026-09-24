import { Award } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { certifications } from '../data/portfolioData';

export function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Certifications"
          title="Workshops, internships, and learning"
          description="Relevant learning experiences from the resume, without unsupported certificate links."
        />
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {certifications.map((certification) => (
            <article key={certification.title} className="glass rounded-lg p-6">
              <Award className="h-7 w-7 text-cyanSoft" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-white">{certification.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{certification.issuer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
