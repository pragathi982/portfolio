import { CheckCircle2 } from 'lucide-react';
import { activities } from '../data/portfolioData';

export function Activities() {
  return (
    <section aria-labelledby="activities-title" className="bg-white/[0.025] py-16">
      <div className="container-shell">
        <div className="mx-auto max-w-5xl rounded-lg border border-line bg-panel/70 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyanSoft">Additional Activities</p>
              <h2 id="activities-title" className="mt-3 text-2xl font-bold text-white">Leadership and continuous learning</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {activities.map((activity) => (
                <div key={activity} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyanSoft" aria-hidden="true" />
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
