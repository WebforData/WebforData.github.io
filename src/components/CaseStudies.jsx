import Section from "./Section.jsx";
import { caseStudies } from "../data/portfolio.js";

export default function CaseStudies() {
  return (
    <Section
      id="work"
      eyebrow="platform portfolio"
      title="Outcome-first platform work."
      intro="Public-safe snapshots of what I owned, what changed, and why it mattered."
      wide
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {caseStudies.map((study) => (
          <article
            key={study.title}
            className="surface flex min-w-0 flex-col rounded-lg p-4 sm:p-5"
          >
            <div className="flex min-w-0 flex-col gap-3">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase text-redwood-300">{study.eyebrow}</p>
                <h3 className="mt-3 text-lg font-semibold leading-tight text-warm-50 sm:text-xl">{study.title}</h3>
              </div>
              <span className="w-fit max-w-full truncate rounded-md border border-redwood-300/25 bg-redwood-500/10 px-3 py-1 font-mono text-xs uppercase text-redwood-300">
                {study.signal}
              </span>
            </div>

            <div className="mt-4 grid gap-1.5">
              <ProofCell label="Role" value={study.proof.role} />
              <ProofCell label="Stack" value={study.proof.stack} />
              <ProofCell label="Outcome" value={study.proof.outcome} />
            </div>

            <div className="mt-4 space-y-3">
              <CaseLine label="Outcome" text={study.impact} highlight />
              <CaseLine label="Owned" text={study.solution} />
              <CaseLine label="Challenge" text={study.problem} />
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {study.technologies.map((tech) => (
                <span key={tech} className="rounded-md border border-warm-50/10 bg-ink-950/70 px-3 py-1.5 text-xs text-warm-200">
                  {tech}
                </span>
              ))}
            </div>
          </article>
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

function CaseLine({ label, text, highlight = false }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-xs uppercase text-warm-500">{label}</p>
      <p className={`mt-1 text-xs leading-5 sm:text-sm sm:leading-6 ${highlight ? "text-warm-100" : "text-warm-300"}`}>{text}</p>
    </div>
  );
}
