import { ArrowUpRight, Award } from "lucide-react";
import Section from "./Section.jsx";

export default function Certifications({ content }) {
  const { certifications, ui } = content;
  const copy = ui.certifications;
  return (
    <Section
      id="certifications"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      wide
    >
      <div className="grid gap-3 lg:grid-cols-3">
        {certifications.map((certification) => (
          <a
            key={certification.name}
            href={certification.href}
            target="_blank"
            rel="noreferrer noopener"
            className="reveal-card interactive-card surface flex min-w-0 flex-col rounded-lg p-5 text-left no-underline"
            aria-label={`${copy.verify}: ${certification.name} - ${certification.issuer}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-redwood-300/20 bg-redwood-500/10 text-signal-amber">
                <Award size={20} aria-hidden="true" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-warm-50/10 bg-warm-50/[0.04] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-redwood-300">
                {copy.verify}
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-redwood-300">{certification.issuer}</p>
            <h3 className="mt-3 text-xl font-semibold leading-tight text-warm-50">{certification.name}</h3>
            <p className="mt-4 text-sm leading-6 text-warm-300">{certification.focus}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {certification.scope.map((item) => (
                <span
                  key={item}
                  className="rounded border border-warm-50/10 bg-warm-50/[0.04] px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.08em] text-warm-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="reveal-panel">
              <p className="text-sm leading-6 text-warm-200">
                {copy.opens(certification.issuer)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
