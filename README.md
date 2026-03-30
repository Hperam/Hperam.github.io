# hperam.github.io

Portfolio site for Harshith Sai Peram, a software engineer focused on backend systems, distributed infrastructure, AI-powered products, and polished user-facing experiences.

## Live site

- Portfolio: `https://hperam.github.io`
- Commerce Copilot demo: `https://hperam.github.io/commerce-copilot/`

## Highlights

- premium recruiter-facing homepage built to communicate technical depth and product taste immediately
- strong story around Amazon-scale systems, Flipkart full-stack commerce delivery, and AI-forward product engineering
- live multimodal Commerce Copilot demo with tab-scoped OpenAI API key handling
- static export deployment through GitHub Pages and GitHub Actions

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GitHub Pages
- GitHub Actions

## Featured work

- `Commerce Copilot`: multimodal product discovery experience with text, voice, image input, grounded retrieval, and AI recommendations
- `ScenarioOps AI`: operations planning concept translating simulation-heavy Amazon experience into an explainable decision surface
- `Runbook Agent`: incident-triage concept grounded in logs, metrics, traces, and runbook retrieval

## Repo structure

- `app/`: Next.js routes, layout, and global styles
- `components/`: reusable UI and section components
- `data/portfolio.ts`: centralized portfolio content model
- `public/`: deployed static assets including resume, favicon, and social preview image
- `commerce-copilot/`: shipped standalone demo app source
- `scripts/postbuild.mjs`: copies the live demo into the static export output
- `.github/workflows/deploy-pages.yml`: GitHub Pages build and deploy pipeline

## Local preview

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

To generate the static production export used by GitHub Pages:

```bash
npm run build
```
