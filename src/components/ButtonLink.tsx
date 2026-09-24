import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variants = {
  primary:
    'border-cyanSoft/70 bg-cyanSoft text-ink hover:bg-white hover:border-white',
  secondary:
    'border-line bg-white/[0.055] text-slate-100 hover:border-cyanSoft/60 hover:bg-cyanSoft/10',
  ghost:
    'border-transparent bg-transparent text-slate-300 hover:border-line hover:bg-white/[0.05] hover:text-white',
};

export function ButtonLink({ children, className = '', variant = 'secondary', ...props }: ButtonLinkProps) {
  return (
    <a
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
