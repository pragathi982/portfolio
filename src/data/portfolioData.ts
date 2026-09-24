import {
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  LineChart,
  Network,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import type { Certification, EducationItem, NavItem, Project, SkillCategory } from '../types/portfolio';

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const profile = {
  name: 'Bhavanam Venkata Pragathi',
  displayName: 'BHAVANAM VENKATA PRAGATHI',
  title: 'Data Analyst | AI/ML & GenAI Developer',
  tagline: 'Building practical data and AI applications with Python, machine learning, LLMs, and retrieval-augmented generation.',
  intro:
    'Information Technology graduate specializing in AI & ML, with hands-on project work across data preprocessing, exploratory analysis, regression modeling, Gemini-powered debugging assistance, and LLaMA-based RAG systems.',
  email: 'pragathireddy631@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pragathi-reddy',
  github: '',
  resumePath: '/Bhavanam_Venkata_Pragathi_Resume.pdf',
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    description: 'Core scripting and implementation for data and AI workflows.',
    icon: Code2,
    skills: ['Python'],
  },
  {
    title: 'Data Analysis',
    description: 'Turning raw datasets into explainable patterns and usable features.',
    icon: LineChart,
    skills: ['Pandas', 'NumPy', 'Data Cleaning', 'Exploratory Data Analysis'],
  },
  {
    title: 'Machine Learning',
    description: 'Model development workflows for structured prediction problems.',
    icon: BrainCircuit,
    skills: ['Scikit-learn', 'Regression', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    title: 'Data Preprocessing',
    description: 'Preparing reliable inputs for analysis and model training.',
    icon: Database,
    skills: ['Imputation', 'Encoding', 'Feature Selection', 'Dimensionality Reduction'],
  },
  {
    title: 'Visualization',
    description: 'Communicating trends and distributions through clear charts.',
    icon: Sparkles,
    skills: ['Matplotlib', 'Seaborn'],
  },
  {
    title: 'Generative AI',
    description: 'Experimenting with LLM-powered assistant experiences.',
    icon: WandSparkles,
    skills: ['Gemini', 'LLaMA', 'Ollama', 'Hugging Face'],
  },
  {
    title: 'LLM / RAG',
    description: 'Retrieval-centered architecture for personalized Q&A systems.',
    icon: Network,
    skills: ['Embeddings', 'Indexing', 'Retrieval', 'RAG Pipelines'],
  },
  {
    title: 'Tools',
    description: 'Development and experimentation environments used in projects.',
    icon: GitBranch,
    skills: ['Jupyter Notebook', 'Git', 'Ollama'],
  },
];

export const projects: Project[] = [
  {
    name: 'Flight Ticket Price Predictor',
    category: 'Machine Learning / Data Science',
    description:
      'A regression-based machine learning project for estimating flight ticket prices from structured travel data.',
    problem:
      'Flight prices vary across routes, schedules, airlines, and booking conditions, making manual price estimation difficult.',
    built:
      'Built an end-to-end ML workflow with data cleaning, exploratory data analysis, feature engineering, model development, and evaluation using Scikit-learn.',
    features: [
      'Cleaned and prepared raw flight data for modeling',
      'Explored feature relationships through EDA',
      'Engineered inputs suitable for regression models',
      'Evaluated model behavior without overstating unsupported metrics',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    workflow: ['Raw Data', 'Data Cleaning', 'EDA', 'Feature Engineering', 'ML Model', 'Prediction'],
    accent: 'cyan',
  },
  {
    name: 'CodeMedic - GenAI Debugging Assistant',
    category: 'Generative AI',
    description:
      'An intelligent debugging assistant concept built with Google Gemini to analyze code and explain potential fixes.',
    problem:
      'Debugging can be slow when error messages are unclear or when learners need practical explanations for code issues.',
    built:
      'Created a Gemini-powered assistant flow that accepts user code, performs LLM-based analysis, produces human-readable explanations, and suggests fixes.',
    features: [
      'Automated code analysis using Gemini',
      'Human-readable debugging explanations',
      'Suggested fixes based on LLM reasoning',
      'Designed around a practical developer support workflow',
    ],
    stack: ['Google Gemini', 'Generative AI', 'LLM Reasoning'],
    workflow: ['User Code', 'Gemini', 'Code Analysis', 'Explanation', 'Suggested Fix'],
    accent: 'violet',
  },
  {
    name: 'Personalized Q&A Knowledge Base',
    category: 'RAG / LLM Application',
    description:
      'A custom retrieval-augmented Q&A system using LLaMA to generate personalized responses from indexed knowledge.',
    problem:
      'Static documents are hard to search conversationally, especially when users need answers grounded in their own knowledge base.',
    built:
      'Built a RAG pipeline using embeddings, indexing, retrieval, and LLaMA-based generation to support personalized AI assistant responses.',
    features: [
      'Developed an embeddings and indexing pipeline',
      'Retrieved relevant knowledge before generation',
      'Integrated LLaMA for answer generation',
      'Demonstrated core RAG architecture concepts',
    ],
    stack: ['LLaMA', 'RAG', 'Embeddings', 'Indexing', 'Retrieval', 'Ollama'],
    workflow: ['Documents', 'Embeddings', 'Index', 'Retrieval', 'LLaMA', 'Generated Answer'],
    accent: 'emerald',
  },
];

export const education: EducationItem[] = [
  {
    degree: 'B.Tech - Information Technology (AI & ML)',
    institution: 'Narasaraopeta Institute of Technology',
    period: '2021-2025',
    result: 'CGPA: 7.78',
    featured: true,
  },
  {
    degree: 'Intermediate - MPC',
    institution: 'Gitams Junior College, Vinukonda',
    period: '2019-2021',
    result: '73%',
  },
  {
    degree: 'SSC',
    institution: 'Gitams High School, Vinukonda',
    period: '2018-2019',
    result: 'CGPA: 8.8',
  },
];

export const certifications: Certification[] = [
  { title: 'Data Science Internship', issuer: 'AICTE (NT&CS)' },
  { title: 'AI & ML Workshop', issuer: 'Airbaclabs' },
  { title: 'Front-End Web Designing Workshop', issuer: 'Airbaclabs' },
];

export const activities = ['IEEE Member', 'Volunteer Group Leader', 'National workshop participation', 'AI/ML continuous learning'];
