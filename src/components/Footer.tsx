import { profile } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Built for data, ML, and GenAI opportunities.</p>
        <div className="flex gap-4">
          <a className="focus-ring rounded hover:text-cyanSoft" href={`mailto:${profile.email}`}>Email</a>
          <a className="focus-ring rounded hover:text-cyanSoft" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
