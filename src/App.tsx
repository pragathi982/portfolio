import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { About } from './sections/About';
import { Activities } from './sections/Activities';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Activities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
