# Bhavanam Venkata Pragathi Portfolio

A modern personal portfolio for Bhavanam Venkata Pragathi, positioning her for Data Analyst, AI/ML Developer, and GenAI Developer opportunities.

## Features

- Premium dark theme with data and AI visual language
- Responsive React + TypeScript + Vite application
- Tailwind CSS component styling
- Sticky navigation with mobile menu and active-section highlighting
- Strong project section for ML, Gemini, LLaMA, and RAG work
- Privacy-first contact section using email and LinkedIn
- SEO metadata, Open Graph image, favicon, robots.txt, and sitemap.xml
- Centralized portfolio content in `src/data/portfolioData.ts`

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

## Project Structure

```text
src/
  components/
  data/
  hooks/
  sections/
  types/
  styles.css
public/
  favicon.svg
  og-image.svg
  robots.txt
  sitemap.xml
```

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Linting

```bash
npm run lint
```

## Customization

Update portfolio content in:

```text
src/data/portfolioData.ts
```

Common updates:

- Add a GitHub profile URL by setting `profile.github`
- Add project repository or demo links in each project object
- Replace the resume file in `public/` with the final PDF named `Bhavanam_Venkata_Pragathi_Resume.pdf`
- Update canonical, Open Graph, robots, and sitemap URLs after choosing the final deployed domain

## Screenshots

Add screenshots here after reviewing the local design.

## GitHub Pages Deployment

The included GitHub Actions workflow builds and publishes the portfolio with GitHub Pages whenever a commit is pushed to `main`.

1. Create a public empty repository on GitHub.
2. Add the GitHub repository as the `origin` remote and push the `main` branch.
3. In the repository, open **Settings > Pages** and select **GitHub Actions** under **Build and deployment**.
4. Open **Actions** and wait for the deployment workflow to pass.

For a repository named `portfolio`, the URL normally follows this format:

```text
https://<github-username>.github.io/portfolio/
```

After publishing, update the canonical URL, Open Graph URL, `public/robots.txt`, and `public/sitemap.xml` with the final GitHub Pages address.
