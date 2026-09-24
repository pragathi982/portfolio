import { SectionHeading } from '../components/SectionHeading';

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="About"
          title="Practical AI/ML foundation with a data-first mindset"
          description="A concise view of Pragathi's academic specialization, hands-on project work, and interest in building useful AI systems."
        />
        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="glass rounded-lg p-6 sm:p-8">
            <p className="leading-8 text-slate-300">
              I am an Information Technology graduate specializing in AI & ML, focused on using Python, data preprocessing, visualization, and machine learning to solve structured problems. My project work includes regression modeling, exploratory data analysis, feature engineering, and model evaluation with Scikit-learn.
            </p>
            <p className="mt-5 leading-8 text-slate-300">
              I also build and explore modern GenAI applications, including a Gemini-based debugging assistant and a LLaMA-powered RAG knowledge base. These projects reflect my interest in practical AI systems that combine clean data workflows, retrieval, and LLM reasoning.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ['Primary Focus', 'Data Analytics, ML, GenAI, LLM applications, and RAG'],
              ['Strengths', 'Python workflows, preprocessing, EDA, and AI project implementation'],
              ['Career Direction', 'Early-career roles across Data Analytics, AI/ML, and GenAI development'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-line bg-panel/70 p-5">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
