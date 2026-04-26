import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { canonicalUrl, defaultSeo, extraSitemapUrls, storySections } from "../src/data/seo.js";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");
const lastmod = new Date().toISOString().slice(0, 10);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMeta(html, selector, content) {
  const escaped = escapeHtml(content);
  const pattern = new RegExp(
    `<meta\\s+((?:[^>"']|"[^"]*")*?(?:name|property)="${selector}"(?:[^>"']|"[^"]*")*?)\\s*/>`,
    "s"
  );

  return html.replace(pattern, (tag) => {
    if (tag.includes("content=")) return tag.replace(/content="[^"]*"/s, `content="${escaped}"`);
    return tag.replace(/\s*\/>$/, ` content="${escaped}" />`);
  });
}

function applyRouteSeo(html, route) {
  const title = route.title || defaultSeo.title;
  const description = route.description || defaultSeo.description;
  const url = canonicalUrl(route.path);

  let next = html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/s, `<link rel="canonical" href="${url}" />`)
    .replace(/<script\s+type="application\/ld\+json">.*?<\/script>/s, buildJsonLdScript());

  next = replaceMeta(next, "description", description);
  next = replaceMeta(next, "og:title", title);
  next = replaceMeta(next, "og:description", description);
  next = replaceMeta(next, "og:url", url);
  next = replaceMeta(next, "twitter:title", title);
  next = replaceMeta(next, "twitter:description", description);

  return next;
}

function buildJsonLdScript() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${canonicalUrl("/")}#profile`,
    url: canonicalUrl("/"),
    name: "Abderrahmane Ouroui Portfolio",
    description: defaultSeo.description,
    inLanguage: "en",
    dateModified: lastmod,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: defaultSeo.image,
      width: 1200,
      height: 630
    },
    mainEntity: {
      "@type": "Person",
      "@id": `${canonicalUrl("/")}#person`,
      name: "Abderrahmane Ouroui",
      alternateName: "webfordata",
      url: canonicalUrl("/"),
      image: `${canonicalUrl("/")}assets/me-512.jpeg`,
      jobTitle: "DevOps Engineer / Platform Engineer",
      email: "mailto:abdououroui123@gmail.com",
      worksFor: {
        "@type": "Organization",
        name: "Oracle"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressCountry: "MA"
      },
      sameAs: [
        "https://github.com/webfordata",
        "https://www.linkedin.com/in/abderrahmane-ouroui-5b73b1216/"
      ],
      knowsAbout: [
        "Oracle Cloud Infrastructure",
        "Terraform",
        "Kubernetes",
        "Oracle Kubernetes Engine",
        "CI/CD",
        "Secure Cloud Networking",
        "Observability",
        "Autonomous Database",
        "MLOps",
        "Cloud-portable platform standards"
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
          credentialCategory: "certification",
          url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5DCB8BDEE987AB0D33F444C6F0144AEC8E9596EF9BA9A3528575CBDC6F3F67AE",
          recognizedBy: {
            "@type": "Organization",
            name: "Oracle"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
          credentialCategory: "certification",
          url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=703518BB3025293CEBF2E2E2207E532FEF6B4989E515803FA6B2A07A3956C00F",
          recognizedBy: {
            "@type": "Organization",
            name: "Oracle"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Building Scalable Java Microservices with Spring Boot and Spring Cloud",
          credentialCategory: "certificate",
          url: "https://www.coursera.org/account/accomplishments/certificate/SD425CFMRN48",
          recognizedBy: {
            "@type": "Organization",
            name: "Coursera"
          }
        }
      ]
    }
  };

  return `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
}

async function writeSitemap() {
  const urls = [
    ...storySections.map((section) => ({
      loc: canonicalUrl(section.path),
      priority: section.priority
    })),
    ...extraSitemapUrls.map((url) => ({
      loc: canonicalUrl(url.path),
      priority: url.priority
    }))
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    ),
    "</urlset>",
    ""
  ].join("\n");

  await fs.writeFile(path.join(distDir, "sitemap.xml"), xml);
}

async function main() {
  const template = await fs.readFile(templatePath, "utf8");
  const server = await createServer({
    appType: "custom",
    logLevel: "error",
    server: {
      hmr: false,
      ws: false,
      middlewareMode: true
    }
  });

  try {
    const { default: App } = await server.ssrLoadModule("/src/App.jsx");

    for (const route of storySections) {
      const appHtml = renderToString(React.createElement(App, { initialPath: route.path }));
      const html = applyRouteSeo(
        template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
        route
      );

      const outputPath =
        route.path === "/"
          ? templatePath
          : path.join(distDir, route.path.replace(/^\//, ""), "index.html");

      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html);
    }

    await writeSitemap();
  } finally {
    await server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
