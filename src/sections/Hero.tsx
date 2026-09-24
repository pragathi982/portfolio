import { ArrowRight, Download, Linkedin, Mail, Network } from 'lucide-react';
import { ButtonLink } from '../components/ButtonLink';
import { profile } from '../data/portfolioData';

const orbitTags = ['Python', 'ML', 'GenAI', 'RAG', 'LLMs'];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.055)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="container-shell grid min-h-[calc(100vh-7rem)] items-center gap-12 pb-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-cyanSoft/30 bg-cyanSoft/10 px-4 py-2 text-sm font-semibold text-cyanSoft">
            Data Analytics + Machine Learning + Generative AI
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            {profile.displayName}
          </h1>
          <p className="mt-5 text-xl font-semibold text-cyanSoft sm:text-2xl">{profile.title}</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{profile.tagline}</p>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">{profile.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#projects" variant="primary">
              View Projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact">Contact Me</ButtonLink>
            <ButtonLink href={profile.resumePath} download>
              <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
            </ButtonLink>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <a className="focus-ring inline-flex items-center gap-2 rounded-md text-slate-300 hover:text-cyanSoft" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
            </a>
            <a className="focus-ring inline-flex items-center gap-2 rounded-md text-slate-300 hover:text-cyanSoft" href={`mailto:${profile.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> {profile.email}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="glass relative aspect-square rounded-[2rem] p-6">
            <div className="absolute inset-6 rounded-[1.5rem] border border-cyanSoft/20 bg-gradient-to-br from-cyanSoft/10 via-white/[0.03] to-violetSoft/10" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyanSoft">AI Project Map</p>
                  <p className="text-xs text-slate-400">from data to intelligent response</p>
                </div>
                <Network className="h-7 w-7 text-cyanSoft" aria-hidden="true" />
              </div>

              <div className="grid gap-4">
                {['Clean data', 'Train models', 'Retrieve context', 'Generate answers'].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyanSoft/30 bg-cyanSoft/10 text-sm font-bold text-cyanSoft">
                      {index + 1}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-cyanSoft/60 to-transparent" />
                    <span className="min-w-32 rounded-md border border-line bg-ink/60 px-3 py-2 text-sm font-medium text-slate-100">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {orbitTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
