import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  id: string;
};

export type LinkConfig = {
  label: string;
  href: string;
};

export type SkillCategory = {
  title: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
};

export type Project = {
  name: string;
  category: string;
  description: string;
  problem: string;
  built: string;
  features: string[];
  stack: string[];
  workflow: string[];
  accent: 'cyan' | 'violet' | 'emerald';
  links?: {
    github?: string;
    demo?: string;
  };
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  result: string;
  featured?: boolean;
};

export type Certification = {
  title: string;
  issuer: string;
};
