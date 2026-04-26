# Abderrahmane Ouroui Portfolio

React + Tailwind portfolio starter built from:

- `version.tex` CV content in this directory as the primary source.
- Sanitized delivery history used only to infer public-safe capabilities.
- Public-safe case study transformations for platform DevOps, cloud networking, observability, and MLOps readiness.
- Simple Oracle Redwood-inspired dark enterprise visual direction.
- Horizontal snap-scroll layout with no generated/background images.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build prerenders the React app into static HTML for `/`, `/capabilities`, `/about`, `/work`, `/stack`, `/experience`, and `/contact`, then regenerates `dist/sitemap.xml`.

## Structure

- `src/data/portfolio.js` - sanitized portfolio content and case study data.
- `src/data/seo.js` - canonical URLs, route-level titles, descriptions, and sitemap entries.
- `scripts/prerender.mjs` - static HTML prerender step for SEO-friendly production output.
- `src/components/` - page sections and visual system components.
- `public/assets/` - unused generated assets from an earlier direction; the current UI does not render them.
- `portfolio-package.md` - written strategy, public-safe content direction, and design notes.

## Confidentiality

The website avoids internal names, work identifiers, hostnames, bucket names, tenancy names, and private links. Keep that boundary if you expand the case studies.
