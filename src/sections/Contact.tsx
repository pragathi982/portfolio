import { Linkedin, Mail } from 'lucide-react';
import { ButtonLink } from '../components/ButtonLink';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../data/portfolioData';

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Open to data, AI/ML, and GenAI opportunities"
          description="Reach out for early-career roles, project discussions, or collaboration around intelligent data-driven applications."
        />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-line bg-gradient-to-br from-cyanSoft/12 via-panel to-violetSoft/10 p-6 shadow-glow sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">Let&apos;s build something intelligent with data.</h3>
              <p className="mt-4 leading-7 text-slate-300">
                The fastest way to contact Pragathi is through email or LinkedIn. Phone details are intentionally not exposed on the public page by default.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href={`mailto:${profile.email}?subject=Portfolio%20Opportunity%20-%20Bhavanam%20Venkata%20Pragathi`} variant="primary">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Me
              </ButtonLink>
              <ButtonLink href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
