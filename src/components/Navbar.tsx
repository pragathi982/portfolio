import { Download, Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { navItems, profile } from '../data/portfolioData';
import { useActiveSection } from '../hooks/useActiveSection';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const ids = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(ids);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/82 backdrop-blur-xl">
      <nav className="container-shell flex h-16 items-center justify-between" aria-label="Primary navigation">
        <a href="#home" className="focus-ring rounded text-sm font-bold uppercase tracking-[0.22em] text-white" onClick={closeMenu}>
          BVP
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition ${
                activeSection === item.id ? 'bg-cyanSoft/12 text-cyanSoft' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={profile.resumePath}
          download
          className="focus-ring hidden min-h-10 items-center gap-2 rounded-md border border-cyanSoft/50 bg-cyanSoft/10 px-4 py-2 text-sm font-semibold text-cyanSoft transition hover:bg-cyanSoft hover:text-ink lg:inline-flex"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download Resume
        </a>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-slate-100 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-line bg-ink/96 lg:hidden">
          <div className="container-shell flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className={`focus-ring rounded-md px-3 py-3 text-sm font-medium ${
                  activeSection === item.id ? 'bg-cyanSoft/12 text-cyanSoft' : 'text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resumePath}
              download
              onClick={closeMenu}
              className="focus-ring mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-cyanSoft/50 bg-cyanSoft/10 px-4 py-2 text-sm font-semibold text-cyanSoft"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
