import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "version.tex");
const outputPath = path.join(root, "public", "abderrahmane-ouroui-cv.html");
const printSourcePath = path.join(root, "node_modules", ".cache", "aouroui-cv-source.html");

const tex = await fs.readFile(sourcePath, "utf8");

function parseGroups(source, index, count) {
  const groups = [];
  let cursor = index;

  for (let groupIndex = 0; groupIndex < count; groupIndex += 1) {
    while (/\s/.test(source[cursor])) cursor += 1;
    if (source[cursor] !== "{") throw new Error(`Expected group ${groupIndex + 1} at ${cursor}`);

    let depth = 0;
    let start = cursor + 1;
    cursor += 1;

    for (; cursor < source.length; cursor += 1) {
      const char = source[cursor];
      const previous = source[cursor - 1];

      if (char === "{" && previous !== "\\") depth += 1;
      if (char === "}" && previous !== "\\") {
        if (depth === 0) {
          groups.push(source.slice(start, cursor));
          cursor += 1;
          break;
        }
        depth -= 1;
      }
    }
  }

  return { groups, cursor };
}

function findCommandIndex(source, marker, cursor = 0) {
  let searchFrom = cursor;

  while (searchFrom < source.length) {
    const index = source.indexOf(marker, searchFrom);
    if (index < 0) return -1;

    const next = source[index + marker.length];
    if (!/[A-Za-z@]/.test(next ?? "")) return index;

    searchFrom = index + marker.length;
  }

  return -1;
}

function firstCommand(name, count = 1) {
  const marker = `\\${name}`;
  const index = findCommandIndex(tex, marker);
  if (index < 0) return [];
  return parseGroups(tex, index + marker.length, count).groups;
}

function newCommandValue(name) {
  const marker = `\\newcommand{\\${name}}`;
  const index = tex.indexOf(marker);
  if (index < 0) return "";
  return parseGroups(tex, index + marker.length, 1).groups[0] ?? "";
}

function commandEntries(source, name, count) {
  return commandEntriesWithMeta(source, name, count).map((entry) => entry.groups);
}

function commandEntriesWithMeta(source, name, count) {
  const entries = [];
  const marker = `\\${name}`;
  let cursor = 0;

  while (cursor < source.length) {
    const index = findCommandIndex(source, marker, cursor);
    if (index < 0) break;
    const parsed = parseGroups(source, index + marker.length, count);
    entries.push({ groups: parsed.groups, index, cursor: parsed.cursor });
    cursor = parsed.cursor;
  }

  return entries;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanLatex(value = "") {
  let output = value
    .replace(/%.*$/gm, "")
    .replace(/\\(?:begin|end)\{[^{}]+\}/g, "")
    .replace(/\$\\rightarrow\$/g, "->")
    .replace(/\$\|\$/g, "|")
    .replace(/\\vspace\{[^{}]*\}/g, "")
    .replace(/\\&/g, "&")
    .replace(/~/g, " ")
    .replace(/\\\\/g, "\n")
    .replace(/\s+/g, " ")
    .trim();

  output = escapeHtml(output);
  output = output.replace(/\\textbf\{([^{}]+)\}/g, "<strong>$1</strong>");
  output = output.replace(/\\href\{([^{}]+)\}\s*\{([^{}]+)\}/g, '<a href="$1">$2</a>');
  output = output.replace(/\\[a-zA-Z]+\*?(?:\[[^\]]*\])?/g, "");
  output = output.replace(/[{}]/g, "");
  output = output.replace(/--/g, "&ndash;");
  return output.trim();
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function itemizeToHtml(value) {
  const resumeItems = resumeItemsToHtml(value);
  if (resumeItems) return resumeItems;

  const match = value.match(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/);
  if (!match) return paragraphHtml(value);

  const items = match[1]
    .split(/\\item/g)
    .map((item) => cleanLatex(item))
    .filter(Boolean);

  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function paragraphHtml(value) {
  const cleaned = cleanLatex(value);
  return cleaned ? `<p>${cleaned}</p>` : "";
}

function resumeItemsToHtml(value) {
  const items = commandEntries(value, "resumeItem", 1)
    .map(([item]) => cleanLatex(item))
    .filter(Boolean);

  return items.length ? `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>` : "";
}

function detailBetweenEntries(body, entries, index) {
  const current = entries[index];
  const next = entries[index + 1];
  return body.slice(current.cursor, next?.index ?? body.length);
}

function splitSections(source) {
  const sections = [];
  const regex = /\\section\{([^{}]+)\}/g;
  const matches = [...source.matchAll(regex)];

  for (let index = 0; index < matches.length; index += 1) {
    const current = matches[index];
    const next = matches[index + 1];
    sections.push({
      title: current[1],
      body: source.slice(current.index + current[0].length, next?.index ?? source.length)
    });
  }

  return sections;
}

function renderCventries(body, variant = "experience") {
  return commandEntries(body, "cventry", 6)
    .map(([period, title, company, location, , detail]) => {
      const cleanTitle = cleanLatex(title);
      const cleanCompany = cleanLatex(company);
      const role = [cleanTitle, cleanCompany].filter(Boolean).join(", ");
      const place = cleanLatex(location);
      const cleanPeriod = cleanLatex(period);
      return `<article class="cv-item cv-item-${variant}">
        <div class="item-head">
          <div>
            <h3>${role}</h3>
            ${place ? `<p class="item-meta">${place}</p>` : ""}
          </div>
          ${cleanPeriod ? `<p class="period">${cleanPeriod}</p>` : ""}
        </div>
        <div class="item-body">${itemizeToHtml(detail)}</div>
      </article>`;
    })
    .join("");
}

function renderResumeSubheadings(body, variant = "experience") {
  const entries = commandEntriesWithMeta(body, "resumeSubheading", 4);

  return entries
    .map((entry, index) => {
      const [title, period, company, location] = entry.groups;
      const cleanTitle = cleanLatex(title);
      const cleanCompany = cleanLatex(company);
      const role = [cleanTitle, cleanCompany].filter(Boolean).join(", ");
      const place = cleanLatex(location);
      const cleanPeriod = cleanLatex(period);
      const detail = detailBetweenEntries(body, entries, index);

      return `<article class="cv-item cv-item-${variant}">
        <div class="item-head">
          <div>
            <h3>${role}</h3>
            ${place ? `<p class="item-meta">${place}</p>` : ""}
          </div>
          ${cleanPeriod ? `<p class="period">${cleanPeriod}</p>` : ""}
        </div>
        <div class="item-body">${itemizeToHtml(detail)}</div>
      </article>`;
    })
    .join("");
}

function parseProjectHeading(heading) {
  const name = heading.match(/\\textbf\{([^{}]+)\}/)?.[1] ?? heading.split(/\$\|\$/)[0] ?? heading;
  const tech = heading.match(/\\emph\{([^{}]+)\}/)?.[1] ?? "";
  return {
    name: cleanLatex(name),
    tech: cleanLatex(tech)
  };
}

function renderResumeProjects(body) {
  const entries = commandEntriesWithMeta(body, "resumeProjectHeading", 2);

  return entries
    .map((entry, index) => {
      const [heading] = entry.groups;
      const { name, tech } = parseProjectHeading(heading);
      const detail = detailBetweenEntries(body, entries, index);
      const summary = commandEntries(detail, "resumeItem", 1)
        .map(([item]) => cleanLatex(item))
        .filter(Boolean)
        .join(" ");

      return `<p class="cvitem-row project-row">
        <strong>${name}:</strong> ${summary}
        ${tech ? `<span class="project-tech">${tech}</span>` : ""}
      </p>`;
    })
    .join("");
}

function renderCvitems(body) {
  return commandEntries(body, "cvitem", 2)
    .map(([label, content]) => {
      const cleanedLabel = cleanLatex(label);
      return `<p class="cvitem-row">${cleanedLabel ? `<strong>${cleanedLabel}:</strong> ` : ""}${cleanLatex(content)}</p>`;
    })
    .join("");
}

function splitSkillList(content) {
  return cleanLatex(content)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderResumeSkillRows(body) {
  return commandEntries(body, "resumeSkill", 2)
    .map(([label, content]) => {
      const cleanedLabel = cleanLatex(label);
      return `<p class="cvitem-row">${cleanedLabel ? `<strong>${cleanedLabel}:</strong> ` : ""}${cleanLatex(content)}</p>`;
    })
    .join("");
}

function renderSkills(body) {
  const entries = commandEntries(body, "resumeSkill", 2);
  const sourceEntries = entries.length ? entries : commandEntries(body, "cvitem", 2);

  return sourceEntries
    .map(([label, content]) => {
      const cleanedLabel = cleanLatex(label);
      const skills = splitSkillList(content);
      return `<div class="skill-row">
        <h3>${cleanedLabel}</h3>
        <div class="tag-list">${skills.map((skill) => `<span>${skill}</span>`).join("")}</div>
      </div>`;
    })
    .join("");
}

function renderCertifications(body) {
  const entries = commandEntries(body, "resumeCertification", 2);
  const sourceEntries = entries.length ? entries : commandEntries(body, "cvitem", 2);

  return sourceEntries
    .map(([label, content]) => {
      const cleanedLabel = cleanLatex(label);
      return `<li>${cleanedLabel ? `<strong>${cleanedLabel}:</strong> ` : ""}${cleanLatex(content)}</li>`;
    })
    .join("");
}

function renderLanguages(body) {
  return splitSkillList(commandEntries(body, "cvitem", 2).map(([, content]) => content).join(","))
    .map((language) => `<span>${language}</span>`)
    .join("");
}

function renderSection(section) {
  const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const title = cleanLatex(section.title);

  if (section.title === "Professional Summary") {
    return `<section class="cv-section summary-section" id="${id}">
      <h2>${title}</h2>
      ${paragraphHtml(section.body)}
    </section>`;
  }

  if (section.title === "Experience") {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      ${section.body.includes("\\resumeSubheading") ? renderResumeSubheadings(section.body, "experience") : renderCventries(section.body, "experience")}
    </section>`;
  }

  if (section.title === "Projects" && section.body.includes("\\resumeProjectHeading")) {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      <div class="cvitem-list project-list">${renderResumeProjects(section.body)}</div>
    </section>`;
  }

  if (section.body.includes("\\cventry")) {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      ${renderCventries(section.body, "project")}
    </section>`;
  }

  if (section.title === "Education") {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      ${renderCventries(section.body, "education")}
    </section>`;
  }

  if (section.title === "Technical Skills") {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      <div class="skills-grid">${renderSkills(section.body)}</div>
    </section>`;
  }

  if (section.title === "Certifications") {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      <ul class="cert-list">${renderCertifications(section.body)}</ul>
    </section>`;
  }

  if (section.body.includes("\\resumeSkill")) {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      <div class="cvitem-list">${renderResumeSkillRows(section.body)}</div>
    </section>`;
  }

  if (section.title === "Languages") {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      <div class="language-list">${renderLanguages(section.body)}</div>
    </section>`;
  }

  if (section.body.includes("\\cvitem")) {
    return `<section class="cv-section" id="${id}">
      <h2>${title}</h2>
      <div class="cvitem-list">${renderCvitems(section.body)}</div>
    </section>`;
  }

  return `<section class="cv-section" id="${id}"><h2>${title}</h2>${paragraphHtml(section.body)}</section>`;
}

const [firstName, lastName] = firstCommand("name", 2);
const [location] = firstCommand("address", 3);
const [email] = firstCommand("email", 1);
const metadataName = newCommandValue("cvName");
const metadataLocation = newCommandValue("cvLocation");
const metadataEmail = newCommandValue("cvEmail");
const metadataRole = newCommandValue("cvRole");
const center = tex.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/)?.[1] ?? "";
const role = cleanLatex(metadataRole || center.match(/\\textbf\{([^{}]+)\}/)?.[1] || "DevOps Engineer II | Platform Engineer");
const links = commandEntries(center, "href", 2).filter(([href]) => !href.startsWith("mailto:"));
const sections = splitSections(tex);
const fullName = cleanLatex(metadataName) || `${cleanLatex(firstName)} ${cleanLatex(lastName)}`.trim();
const summaryText =
  cleanLatex(sections.find((section) => section.title === "Professional Summary")?.body ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ") || `${fullName} CV`;

const quickSignals = [
  ["Cloud Platform", "OCI, IAM, networking, compute, storage, Autonomous Database"],
  ["Delivery", "Terraform, Kubernetes/OKE, CI/CD, release validation"],
  ["Reliability", "Observability, Grafana, incident response, production operations"]
];

const cleanLocation = cleanLatex(metadataLocation || location);
const cleanEmail = cleanLatex(metadataEmail || email);
const emailSubject = "Portfolio inquiry";
const emailHref = cleanEmail
  ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(cleanEmail)}&su=${encodeURIComponent(emailSubject)}`
  : "";

function socialProfile(href, label) {
  const value = `${href} ${label}`.toLowerCase();
  if (value.includes("linkedin")) {
    return { name: "LinkedIn", icon: "/assets/social/linkedin.svg", className: "linkedin" };
  }
  if (value.includes("github")) {
    return { name: "GitHub", icon: "/assets/social/github.svg", className: "github" };
  }
  if (value.includes("leetcode")) {
    return { name: "LeetCode", icon: "/assets/social/leetcode.svg", className: "leetcode" };
  }
  return { name: cleanLatex(label), icon: "", className: "link" };
}

const contactItems = [
  cleanEmail
    ? `<li>
        <a class="copy-contact" href="${escapeAttr(emailHref)}" target="_blank" rel="noreferrer noopener" aria-label="Open Gmail compose to contact ${escapeAttr(fullName)}">
          <span class="copy-main">
            <span class="copy-label">Email</span>
            <span class="copy-value">${cleanEmail}</span>
          </span>
          <span class="copy-state" aria-hidden="true">Gmail</span>
        </a>
      </li>`
    : "",
  links.length
    ? `<li class="social-contact-row">
        ${links
          .map(([href, label]) => {
            const profile = socialProfile(href, label);
            return `<a class="social-contact ${profile.className}" href="${escapeAttr(href)}" target="_blank" rel="noreferrer noopener" aria-label="${profile.name}">
              ${profile.icon ? `<img src="${profile.icon}" alt="" />` : ""}
              <span>${profile.name}</span>
            </a>`;
          })
          .join("")}
      </li>`
    : ""
].filter(Boolean);

function renderPdfViewerHtml() {
  const cvPdfPath = "abderrahmane-ouroui-cv.pdf";
  const description = summaryText || `${fullName} CV`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="https://aouroui.dev/abderrahmane-ouroui-cv.html" />
    <title>${fullName} CV</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #15100e;
        --paper: #fffaf3;
        --ink: #211814;
        --muted: #76675d;
        --line: rgba(255, 250, 243, 0.18);
        --accent: #b64334;
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
      }

      body {
        background:
          radial-gradient(circle at 18% 0%, rgba(182, 67, 52, 0.22), transparent 28rem),
          linear-gradient(135deg, #15100e 0%, #241915 52%, #15100e 100%);
        color: var(--paper);
        font-family: Arial, "Segoe UI", Helvetica, sans-serif;
        margin: 0;
      }

      a {
        color: inherit;
      }

      .viewer-shell {
        display: grid;
        gap: 14px;
        grid-template-rows: auto minmax(0, 1fr);
        min-height: 100%;
        padding: 16px;
      }

      .viewer-toolbar {
        align-items: center;
        display: flex;
        gap: 12px;
        justify-content: space-between;
        margin: 0 auto;
        max-width: 1120px;
        width: 100%;
      }

      .viewer-title {
        min-width: 0;
      }

      .viewer-title p {
        color: rgba(255, 250, 243, 0.68);
        font-size: 0.72rem;
        letter-spacing: 0.14em;
        margin: 0 0 3px;
        text-transform: uppercase;
      }

      .viewer-title h1 {
        font-size: clamp(1rem, 3vw, 1.25rem);
        line-height: 1.2;
        margin: 0;
      }

      .viewer-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }

      .viewer-actions a {
        background: rgba(255, 250, 243, 0.08);
        border: 1px solid var(--line);
        border-radius: 999px;
        color: #fffaf3;
        font-size: 0.86rem;
        padding: 8px 12px;
        text-decoration: none;
      }

      .viewer-actions a:hover,
      .viewer-actions a:focus-visible {
        background: rgba(182, 67, 52, 0.28);
        border-color: rgba(255, 250, 243, 0.34);
        outline: none;
      }

      .pdf-frame {
        background: #2b2420;
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 28px 80px rgba(0, 0, 0, 0.35);
        display: block;
        height: min(1120px, calc(100vh - 90px));
        margin: 0 auto;
        max-width: 1120px;
        overflow: hidden;
        width: 100%;
      }

      .pdf-frame object,
      .pdf-frame iframe {
        border: 0;
        display: block;
        height: 100%;
        width: 100%;
      }

      .fallback {
        align-items: center;
        background: var(--paper);
        color: var(--ink);
        display: grid;
        gap: 10px;
        height: 100%;
        justify-items: center;
        padding: 28px;
        text-align: center;
      }

      .fallback p {
        color: var(--muted);
        margin: 0;
        max-width: 42rem;
      }

      .fallback a {
        color: var(--accent);
        font-weight: 700;
      }

      @media (max-width: 700px) {
        .viewer-shell {
          padding: 10px;
        }

        .viewer-toolbar {
          align-items: flex-start;
          display: grid;
        }

        .viewer-actions {
          justify-content: flex-start;
        }

        .pdf-frame {
          border-radius: 12px;
          height: calc(100vh - 122px);
        }
      }
    </style>
  </head>
  <body>
    <main class="viewer-shell">
      <header class="viewer-toolbar">
        <div class="viewer-title">
          <p>Online CV</p>
          <h1>${fullName}</h1>
        </div>
        <nav class="viewer-actions" aria-label="CV actions">
          <a href="/">Portfolio</a>
          <a href="${cvPdfPath}" target="_blank" rel="noreferrer">Open PDF</a>
          <a href="${cvPdfPath}" download>Download PDF</a>
        </nav>
      </header>

      <section class="pdf-frame" aria-label="${escapeAttr(fullName)} CV PDF">
        <object data="${cvPdfPath}#view=FitH" type="application/pdf">
          <iframe src="${cvPdfPath}#view=FitH" title="${escapeAttr(fullName)} CV PDF">
            <div class="fallback">
              <p>Your browser cannot display the embedded CV PDF.</p>
              <a href="${cvPdfPath}" download>Download the CV PDF</a>
            </div>
          </iframe>
        </object>
      </section>
    </main>
  </body>
</html>`;
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeAttr(summaryText)}" />
    <link rel="canonical" href="https://aouroui.dev/abderrahmane-ouroui-cv.html" />
    <title>${fullName} CV</title>
    <style>
      :root {
        color-scheme: light;
        --page: #fffaf3;
        --paper: #ffffff;
        --ink: #211814;
        --muted: #6f6258;
        --line: #e7dcd0;
        --line-strong: #d7c6b6;
        --accent: #b64334;
        --accent-dark: #863024;
        --accent-soft: #fff0ea;
        --shell: #15100e;
      }

      @page {
        margin: 9mm;
        size: A4;
      }

      * {
        box-sizing: border-box;
      }

      html {
        background: var(--shell);
      }

      body {
        background:
          radial-gradient(circle at 15% 0%, rgba(182, 67, 52, 0.22), transparent 28rem),
          linear-gradient(135deg, #15100e 0%, #221915 48%, #15100e 100%);
        color: var(--ink);
        font-family: Arial, "Segoe UI", Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.55;
        margin: 0;
        min-height: 100vh;
      }

      a {
        color: inherit;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.16em;
      }

      .cv-shell {
        overflow-x: hidden;
        padding: 28px 16px 48px;
      }

      .cv-toolbar {
        align-items: center;
        color: #f6efe7;
        display: flex;
        gap: 12px;
        justify-content: space-between;
        margin: 0 auto 18px;
        max-width: 960px;
      }

      .toolbar-title {
        color: rgba(246, 239, 231, 0.76);
        font-size: 0.76rem;
        letter-spacing: 0.16em;
        margin: 0;
        text-transform: uppercase;
      }

      .toolbar-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }

      .toolbar-actions a,
      .toolbar-actions button {
        appearance: none;
        background: rgba(255, 250, 243, 0.08);
        border: 1px solid rgba(255, 250, 243, 0.16);
        border-radius: 999px;
        color: #fffaf3;
        cursor: pointer;
        font: inherit;
        font-size: 0.82rem;
        padding: 8px 12px;
        text-decoration: none;
      }

      .toolbar-actions a:hover,
      .toolbar-actions button:hover {
        background: rgba(182, 67, 52, 0.34);
        border-color: rgba(255, 250, 243, 0.28);
      }

      .cv-page {
        background: var(--page);
        border: 1px solid rgba(255, 250, 243, 0.28);
        border-radius: 22px;
        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.38);
        margin: 0 auto;
        max-width: 960px;
        overflow: hidden;
        width: 100%;
      }

      .cv-inner {
        background:
          linear-gradient(180deg, rgba(182, 67, 52, 0.08), transparent 210px),
          var(--page);
        padding: clamp(28px, 5vw, 56px);
      }

      .cv-header {
        border-bottom: 1px solid var(--line-strong);
        padding-bottom: 24px;
      }

      .header-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: minmax(0, 1fr) minmax(220px, 0.42fr);
      }

      .header-grid > * {
        min-width: 0;
      }

      .eyebrow {
        color: var(--accent);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        margin: 0 0 10px;
        text-transform: uppercase;
      }

      h1 {
        color: var(--ink);
        font-size: clamp(2.35rem, 6vw, 4.25rem);
        letter-spacing: -0.045em;
        line-height: 0.94;
        margin: 0;
        overflow-wrap: anywhere;
      }

      .role {
        color: var(--accent-dark);
        font-size: clamp(1rem, 2.8vw, 1.25rem);
        font-weight: 700;
        margin: 14px 0 0;
      }

      .location {
        color: var(--muted);
        margin: 6px 0 0;
      }

      .contact-list {
        display: grid;
        gap: 10px;
        justify-items: end;
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: right;
      }

      .copy-contact {
        appearance: none;
        align-items: center;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid var(--line);
        border-radius: 14px;
        box-sizing: border-box;
        color: var(--muted);
        cursor: pointer;
        display: flex;
        font: inherit;
        gap: 10px;
        justify-content: space-between;
        margin: 0;
        max-width: 100%;
        min-width: 0;
        overflow-wrap: anywhere;
        padding: 8px 10px;
        text-align: left;
        text-decoration: none;
        transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        width: 292px;
      }

      .copy-contact:hover {
        background: var(--accent-soft);
        border-color: rgba(182, 67, 52, 0.28);
        color: var(--ink);
      }

      .copy-main {
        display: grid;
        flex: 1 1 auto;
        gap: 2px;
        min-width: 0;
      }

      .copy-label {
        color: var(--accent-dark);
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .copy-value {
        color: var(--ink);
        font-size: 0.9rem;
        line-height: 1.25;
        text-decoration: none;
      }

      .copy-state {
        background: rgba(182, 67, 52, 0.1);
        border-radius: 999px;
        color: var(--accent-dark);
        flex: 0 0 auto;
        font-size: 0.62rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        opacity: 0.8;
        padding: 4px 7px;
        text-transform: uppercase;
        transition: background 160ms ease, opacity 160ms ease;
      }

      .copy-contact:hover .copy-state,
      .copy-contact.is-copied .copy-state {
        background: rgba(182, 67, 52, 0.16);
        opacity: 1;
      }

      .social-contact-row {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
        padding-top: 2px;
      }

      .social-contact {
        align-items: center;
        background: rgba(255, 255, 255, 0.58);
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--ink);
        display: inline-flex;
        gap: 7px;
        min-height: 34px;
        padding: 7px 10px;
        text-decoration: none;
        transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
      }

      .social-contact:hover {
        background: var(--accent-soft);
        border-color: rgba(182, 67, 52, 0.34);
        color: var(--accent-dark);
      }

      .social-contact img {
        display: block;
        height: 17px;
        width: 17px;
      }

      .social-contact.github img {
        filter: brightness(0) saturate(1) invert(11%) sepia(12%) saturate(906%) hue-rotate(337deg) brightness(92%) contrast(91%);
      }

      .social-contact span {
        font-size: 0.78rem;
        font-weight: 700;
      }

      .signal-strip {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin-top: 22px;
      }

      .signal {
        background: rgba(255, 255, 255, 0.58);
        border: 1px solid var(--line);
        border-radius: 14px;
        min-width: 0;
        overflow-wrap: anywhere;
        padding: 14px;
      }

      .signal strong {
        color: var(--accent-dark);
        display: block;
        font-size: 0.78rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .signal span {
        color: var(--muted);
        display: block;
        font-size: 0.9rem;
        margin-top: 6px;
      }

      .cv-section {
        margin-top: 30px;
      }

      .cv-section h2 {
        align-items: center;
        color: var(--accent-dark);
        display: flex;
        font-size: 0.78rem;
        font-weight: 800;
        gap: 12px;
        letter-spacing: 0.18em;
        margin: 0 0 13px;
        text-transform: uppercase;
      }

      .cv-section h2::after {
        background: var(--line-strong);
        content: "";
        flex: 1;
        height: 1px;
      }

      .summary-section p {
        color: #372a24;
        font-size: 1.02rem;
        margin: 0;
        max-width: 74ch;
        overflow-wrap: anywhere;
      }

      .cv-item {
        border-left: 3px solid var(--line-strong);
        padding: 0 0 4px 18px;
      }

      .cv-item + .cv-item {
        margin-top: 18px;
      }

      .item-head {
        align-items: baseline;
        display: flex;
        gap: 16px;
        justify-content: space-between;
      }

      .cv-item h3,
      .skill-row h3 {
        color: var(--ink);
        font-size: 1rem;
        line-height: 1.35;
        margin: 0;
      }

      .item-meta,
      .period {
        color: var(--muted);
        font-size: 0.9rem;
        margin: 3px 0 0;
      }

      .period {
        flex: none;
        font-weight: 700;
        text-align: right;
      }

      .item-body {
        color: #3e3029;
        margin-top: 8px;
        overflow-wrap: anywhere;
      }

      .item-body p {
        margin: 0;
      }

      .item-body ul {
        display: grid;
        gap: 5px;
        margin: 0;
        padding-left: 1.1rem;
      }

      .item-body li {
        padding-left: 0.12rem;
      }

      .skills-grid {
        display: grid;
        gap: 10px;
      }

      .skill-row {
        background: rgba(255, 255, 255, 0.55);
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 14px;
      }

      .cvitem-list {
        display: grid;
        gap: 9px;
      }

      .cvitem-row {
        background: rgba(255, 255, 255, 0.52);
        border: 1px solid var(--line);
        border-radius: 12px;
        color: #3e3029;
        margin: 0;
        padding: 11px 13px;
      }

      .cvitem-row strong {
        color: var(--ink);
      }

      .project-tech {
        color: var(--muted);
        display: block;
        font-size: 0.82rem;
        margin-top: 4px;
      }

      .tag-list,
      .language-list {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-top: 10px;
      }

      .tag-list span,
      .language-list span {
        background: var(--paper);
        border: 1px solid var(--line);
        border-radius: 999px;
        color: #4c3c34;
        font-size: 0.82rem;
        line-height: 1.1;
        padding: 7px 10px;
      }

      .cert-list {
        display: grid;
        gap: 9px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .cert-list li {
        background: rgba(255, 255, 255, 0.58);
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 12px 14px;
      }

      .cert-list a {
        color: var(--ink);
        font-weight: 700;
      }

      .cert-list a:hover {
        color: var(--accent-dark);
      }

      @media (max-width: 760px) {
        .cv-shell {
          padding: 18px 10px 32px;
        }

        .cv-toolbar,
        .header-grid,
        .item-head {
          display: block;
        }

        .toolbar-actions {
          justify-content: flex-start;
          margin-top: 10px;
        }

        .cv-page {
          border-radius: 16px;
          margin-left: 0;
          margin-right: 0;
          max-width: 370px;
        }

        h1 {
          font-size: clamp(1.82rem, 7.4vw, 2.18rem);
          letter-spacing: -0.028em;
          line-height: 1.04;
        }

        .contact-list {
          justify-items: start;
          margin-top: 18px;
          text-align: left;
        }

        .copy-contact {
          width: min(100%, 320px);
        }

        .social-contact-row {
          justify-content: flex-start;
        }

        .signal-strip {
          grid-template-columns: 1fr;
        }

        .period {
          text-align: left;
        }
      }

      @media (min-width: 520px) and (max-width: 760px) {
        .cv-page,
        .cv-toolbar {
          max-width: min(680px, calc(100vw - 36px));
        }

        .cv-page {
          margin-left: auto;
          margin-right: auto;
        }
      }

      @media print {
        html,
        body {
          background: #ffffff;
        }

        body {
          color: #111111;
          font-size: 9.2pt;
          line-height: 1.26;
        }

        .cv-shell {
          padding: 0;
        }

        .cv-toolbar {
          display: none;
        }

        .cv-page {
          background: #ffffff;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          max-width: none;
        }

        .cv-inner {
          background: #ffffff;
          padding: 0;
        }

        .cv-header {
          padding-bottom: 8px;
        }

        .header-grid {
          display: block;
        }

        h1 {
          font-size: 20pt;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .role {
          font-size: 10.2pt;
          margin-top: 4px;
        }

        .location {
          margin-top: 2px;
        }

        .contact-list {
          display: block;
          margin-top: 5px;
          text-align: left;
        }

        .contact-list li {
          display: inline;
        }

        .contact-list li + li::before {
          color: #777777;
          content: " | ";
        }

        .copy-contact,
        .copy-value,
        .social-contact {
          color: #222222;
          font-size: 8.2pt;
          text-decoration: none;
        }

        .copy-contact {
          background: transparent;
          border: 0;
          display: inline;
          min-width: 0;
          padding: 0;
          width: auto;
        }

        .copy-main {
          display: inline;
        }

        .copy-label,
        .copy-state,
        .social-contact img {
          display: none;
        }

        .social-contact {
          background: transparent;
          border: 0;
          display: inline;
          padding: 0;
        }

        .social-contact span {
          font-size: 8.2pt;
          font-weight: 400;
        }

        .social-contact + .social-contact::before {
          color: #777777;
          content: " | ";
        }

        .signal-strip {
          display: none;
        }

        .cv-section {
          margin-top: 8px;
        }

        .cv-section h2 {
          border-bottom: 1px solid #bbbbbb;
          display: block;
          font-size: 8.2pt;
          letter-spacing: 0.12em;
          margin-bottom: 4px;
          padding-bottom: 2px;
        }

        .cv-section h2::after {
          display: none;
        }

        .summary-section p {
          font-size: 8.9pt;
          max-width: none;
        }

        .cv-item {
          border-left: 1.5px solid #cccccc;
          padding: 0 0 1px 8px;
        }

        .cv-item + .cv-item {
          margin-top: 5px;
        }

        .item-head {
          display: flex;
          gap: 10px;
        }

        .cv-item h3,
        .skill-row h3 {
          font-size: 9pt;
        }

        .item-meta,
        .period {
          color: #555555;
          font-size: 8.2pt;
        }

        .item-body {
          margin-top: 2px;
        }

        .item-body ul {
          gap: 0;
          padding-left: 0.85rem;
        }

        .skill-row,
        .cvitem-row,
        .cert-list li {
          background: transparent;
          border: 0;
          border-radius: 0;
          padding: 0;
        }

        .cvitem-list {
          gap: 2px;
        }

        .cvitem-row {
          font-size: 8.4pt;
          line-height: 1.25;
        }

        .project-tech {
          color: #555555;
          display: inline;
          font-size: 8pt;
          margin-top: 0;
        }

        .project-tech::before {
          content: " | ";
        }

        .skill-row + .skill-row {
          margin-top: 2px;
        }

        .tag-list,
        .language-list {
          display: block;
          margin-top: 1px;
        }

        .tag-list span,
        .language-list span {
          background: transparent;
          border: 0;
          border-radius: 0;
          color: #222222;
          display: inline;
          font-size: 8.4pt;
          padding: 0;
        }

        .tag-list span:not(:last-child)::after,
        .language-list span:not(:last-child)::after {
          content: ", ";
        }

        .cert-list {
          gap: 2px;
          list-style: disc;
          padding-left: 1rem;
        }

        .cv-section,
        .cv-item,
        .skill-row,
        .cvitem-row,
        .cert-list li {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    </style>
  </head>
  <body>
    <main class="cv-shell">
      <div class="cv-toolbar" aria-label="CV actions">
        <p class="toolbar-title">Online CV</p>
        <div class="toolbar-actions">
          <a href="/">Portfolio</a>
          <a href="/abderrahmane-ouroui-cv.pdf" download>Download PDF</a>
          <button type="button" onclick="window.print()">Print</button>
        </div>
      </div>
      <article class="cv-page" aria-label="${escapeAttr(fullName)} CV">
        <div class="cv-inner">
          <header class="cv-header">
            <div class="header-grid">
              <div>
                <p class="eyebrow">DevOps / Platform / OCI</p>
                <h1>${fullName}</h1>
                <p class="role">${role}</p>
                <p class="location">${cleanLocation}</p>
              </div>
              <ul class="contact-list">
                ${contactItems.join("")}
              </ul>
            </div>
            <div class="signal-strip" aria-label="Profile highlights">
              ${quickSignals
                .map(
                  ([title, detail]) => `<div class="signal"><strong>${title}</strong><span>${detail}</span></div>`
                )
                .join("")}
            </div>
          </header>
          ${sections.map(renderSection).join("\n")}
        </div>
      </article>
    </main>
  </body>
</html>`;

await fs.mkdir(path.dirname(printSourcePath), { recursive: true });
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(printSourcePath, html);
await fs.writeFile(outputPath, renderPdfViewerHtml());
console.log(`Rendered ${path.relative(root, outputPath)} and ${path.relative(root, printSourcePath)} from ${path.relative(root, sourcePath)}`);
