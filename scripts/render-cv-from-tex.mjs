import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "version.tex");
const outputPath = path.join(root, "public", "abderrahmane-ouroui-cv.html");

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

function firstCommand(name, count = 1) {
  const marker = `\\${name}`;
  const index = tex.indexOf(marker);
  if (index < 0) return [];
  return parseGroups(tex, index + marker.length, count).groups;
}

function commandEntries(source, name, count) {
  const entries = [];
  const marker = `\\${name}`;
  let cursor = 0;

  while (cursor < source.length) {
    const index = source.indexOf(marker, cursor);
    if (index < 0) break;
    const parsed = parseGroups(source, index + marker.length, count);
    entries.push(parsed.groups);
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

function cleanLatex(value) {
  let output = value
    .replace(/%.*$/gm, "")
    .replace(/\$\\rightarrow\$/g, "->")
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
  return output.trim();
}

function itemizeToHtml(value) {
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

function renderCventries(body) {
  return commandEntries(body, "cventry", 6)
    .map(([period, title, company, location, , detail]) => {
      const role = [cleanLatex(title), cleanLatex(company)].filter(Boolean).join(", ");
      const place = cleanLatex(location);
      return `<article>
        <div class="item-head">
          <h3>${role}</h3>
          <p class="muted">${cleanLatex(period)}</p>
        </div>
        ${place ? `<p class="muted">${place}</p>` : ""}
        ${itemizeToHtml(detail)}
      </article>`;
    })
    .join("");
}

function renderCvitems(body) {
  return commandEntries(body, "cvitem", 2)
    .map(([label, content]) => {
      const cleanedLabel = cleanLatex(label);
      return `<p>${cleanedLabel ? `<strong>${cleanedLabel}:</strong> ` : ""}${cleanLatex(content)}</p>`;
    })
    .join("");
}

function renderSection(section) {
  if (section.title === "Experience" || section.title === "Education") {
    return `<section><h2>${section.title}</h2>${renderCventries(section.body)}</section>`;
  }

  if (section.title === "Technical Skills") {
    return `<section><h2>${section.title}</h2><div class="stack">${renderCvitems(section.body)}</div></section>`;
  }

  if (section.title === "Certifications") {
    return `<section><h2>${section.title}</h2><ul>${commandEntries(section.body, "cvitem", 2)
      .map(([, content]) => `<li>${cleanLatex(content)}</li>`)
      .join("")}</ul></section>`;
  }

  if (section.title === "Languages") {
    return `<section><h2>${section.title}</h2>${renderCvitems(section.body)}</section>`;
  }

  return `<section><h2>${section.title}</h2>${paragraphHtml(section.body)}</section>`;
}

const [firstName, lastName] = firstCommand("name", 2);
const [location] = firstCommand("address", 3);
const [phone] = firstCommand("phone[mobile]", 1);
const [email] = firstCommand("email", 1);
const center = tex.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/)?.[1] ?? "";
const role = cleanLatex(center.match(/\\textbf\{([^{}]+)\}/)?.[1] ?? "DevOps Engineer II | Platform Engineer");
const links = commandEntries(center, "href", 2);
const sections = splitSections(tex);

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${cleanLatex(firstName)} ${cleanLatex(lastName)} CV</title>
    <style>
      @page { margin: 18mm; size: A4; }
      body { color: #18130f; font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; line-height: 1.42; margin: 0; }
      h1 { font-size: 24pt; letter-spacing: -0.02em; margin: 0; }
      h2 { border-bottom: 1px solid #d9d0c4; color: #a13a2d; font-size: 10pt; letter-spacing: 0.08em; margin: 18px 0 8px; padding-bottom: 4px; text-transform: uppercase; }
      h3 { font-size: 11.5pt; margin: 12px 0 2px; }
      p { margin: 4px 0; }
      ul { margin: 6px 0 0 18px; padding: 0; }
      li { margin: 3px 0; }
      a { color: inherit; text-decoration: none; }
      .meta, .muted { color: #66594e; }
      .header { display: flex; justify-content: space-between; gap: 24px; }
      .role { color: #a13a2d; font-size: 12pt; font-weight: 700; margin-top: 4px; }
      .contact { font-size: 9.5pt; text-align: right; }
      .stack { display: grid; gap: 6px; }
      .item-head { align-items: baseline; display: flex; justify-content: space-between; gap: 16px; }
    </style>
  </head>
  <body>
    <header class="header">
      <div>
        <h1>${cleanLatex(firstName)} ${cleanLatex(lastName)}</h1>
        <p class="role">${role}</p>
        <p class="meta">${cleanLatex(location)}</p>
      </div>
      <div class="contact">
        <p>${cleanLatex(email)}</p>
        ${cleanLatex(phone) ? `<p>${cleanLatex(phone)}</p>` : ""}
        ${links.map(([href, label]) => `<p><a href="${href}">${cleanLatex(label)}</a></p>`).join("")}
      </div>
    </header>
    ${sections.map(renderSection).join("\n")}
  </body>
</html>`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, html);
console.log(`Rendered ${path.relative(root, outputPath)} from ${path.relative(root, sourcePath)}`);
