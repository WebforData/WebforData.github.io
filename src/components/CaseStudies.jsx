import { ArrowRight } from "lucide-react";
import Section from "./Section.jsx";

export default function CaseStudies({ content }) {
  const { caseStudies, ui } = content;
  const copy = ui.caseStudies;
  return (
    <Section
      id="work"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      wide
    >
      <div className="grid gap-3 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <a
            key={study.title}
            href={study.path}
            className="reveal-card interactive-card surface flex min-w-0 flex-col rounded-lg p-4 text-left no-underline sm:p-5"
            aria-label={`${copy.read}: ${study.title}. ${study.summary} ${copy.proofLabels.role}: ${study.proof.role}. ${copy.proofLabels.outcome}: ${study.proof.outcome}.`}
          >
            <div className="flex min-w-0 flex-col gap-3">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase text-redwood-300">{study.eyebrow}</p>
                <h3 className="mt-3 text-lg font-semibold leading-tight text-warm-50 sm:text-xl">{study.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-warm-300">{study.summary}</p>
              </div>
              <span className="w-fit max-w-full truncate rounded-md border border-redwood-300/25 bg-redwood-500/10 px-3 py-1 font-mono text-xs uppercase text-redwood-300">
                {study.signal}
              </span>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-5" aria-hidden="true">
              {study.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-md border border-warm-50/10 bg-ink-950/70 px-3 py-1.5 text-xs text-warm-200">
                  {tech}
                </span>
              ))}
            </div>
            <div className="reveal-panel">
              <div className="grid gap-1.5">
                <ProofCell label={copy.proofLabels.role} value={study.proof.role} />
                <ProofCell label={copy.proofLabels.stack} value={study.proof.stack} />
                <ProofCell label={copy.proofLabels.outcome} value={study.proof.outcome} />
              </div>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-redwood-300">
              {copy.read} <ArrowRight size={16} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

function ProofCell({ label, value }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 rounded-md border border-warm-50/10 bg-warm-50/[0.035] px-2.5 py-1.5">
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-warm-500">{label}</p>
      <p className="min-w-0 truncate text-right text-[0.68rem] font-semibold leading-4 text-warm-100">{value}</p>
    </div>
  );
}
