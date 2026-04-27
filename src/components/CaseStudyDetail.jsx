import { ArrowLeft, Home } from "lucide-react";

export default function CaseStudyDetail({ study, ui }) {
  const sectionTitles = ui.sections;
  const evidenceText =
    study.evidence ??
    study.artifacts.map((artifact) => `${artifact.title}: ${artifact.description}`).join(" ");

  return (
    <section
      id={`case-${study.slug}`}
      className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8"
      aria-labelledby={`${study.slug}-title`}
    >
      <div className="story-scroll-y mx-auto flex h-full w-full max-w-[88rem] flex-col justify-start overflow-y-auto py-2 lg:py-0">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase text-redwood-300">{study.eyebrow}</p>
            <h2 id={`${study.slug}-title`} className="mt-3 max-w-4xl break-words font-display text-3xl font-semibold leading-tight text-warm-50 sm:text-5xl">
              {study.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-warm-300 sm:text-lg sm:leading-8">{study.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a href="/#work" className="case-back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              {ui.index}
            </a>
            <a href="/" className="case-back-link">
              <Home size={16} aria-hidden="true" />
              {ui.home}
            </a>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
          <article className="surface rounded-lg p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <ProofCell label={ui.proofLabels.role} value={study.proof.role} />
              <ProofCell label={ui.proofLabels.stack} value={study.proof.stack} />
              <ProofCell label={ui.proofLabels.outcome} value={study.proof.outcome} />
            </div>

            <div className="mt-6 grid gap-5">
              <StudySection idPrefix={study.slug} title={sectionTitles[0]} text={study.problem} />
              <StudySection idPrefix={study.slug} title={sectionTitles[1]} text={study.action ?? study.approach} />
              <StudySection idPrefix={study.slug} title={sectionTitles[2]} text={study.result ?? study.outcome} highlight />
              <StudySection idPrefix={study.slug} title={sectionTitles[3]} text={evidenceText} />
            </div>
          </article>

          <div className="grid gap-4">
            <article className="surface-soft rounded-lg p-5 sm:p-6">
              <p className="font-mono text-xs uppercase text-redwood-300">{ui.keyDecisions}</p>
              <ul className="mt-4 grid gap-3">
                {study.keyDecisions.map((decision) => (
                  <li key={decision} className="rounded-md border border-warm-50/10 bg-warm-50/[0.035] p-3 text-sm leading-6 text-warm-300">
                    {decision}
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface rounded-lg p-5 sm:p-6">
              <p className="font-mono text-xs uppercase text-redwood-300">{ui.architectureExamples}</p>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {study.artifacts.map((artifact) => (
                  <ArtifactBlock key={artifact.title} artifact={artifact} label={ui.representativeExample} />
                ))}
              </div>
            </article>

            <article className="surface-soft rounded-lg p-5 sm:p-6">
              <p className="font-mono text-xs uppercase text-redwood-300">{ui.portableStandard}</p>
              <p className="mt-3 text-sm leading-7 text-warm-300">{study.portability}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span key={tech} className="rounded-md border border-warm-50/10 bg-ink-950/70 px-3 py-1.5 text-xs text-warm-200">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudySection({ idPrefix, title, text, highlight = false }) {
  const headingId = `${idPrefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`;
  return (
    <section aria-labelledby={headingId}>
      <h3 id={headingId} className="font-mono text-xs uppercase tracking-[0.12em] text-redwood-300">
        {title}
      </h3>
      <p className={`mt-2 text-sm leading-7 ${highlight ? "text-warm-50" : "text-warm-300"}`}>{text}</p>
    </section>
  );
}

function ProofCell({ label, value }) {
  return (
    <div className="rounded-md border border-warm-50/10 bg-warm-50/[0.04] p-3">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-warm-500">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-5 text-warm-50">{value}</p>
    </div>
  );
}

function ArtifactBlock({ artifact, label }) {
  return (
    <div className="artifact-block rounded-lg border border-warm-50/10 bg-warm-50/[0.035] p-4">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-warm-500">{label}</p>
      <h3 className="mt-2 text-base font-semibold leading-6 text-warm-50">{artifact.title}</h3>
      <p className="mt-2 text-xs leading-5 text-warm-400">{artifact.description}</p>
      {artifact.type === "flow" ? <ArtifactFlow artifact={artifact} /> : <ArtifactChecklist artifact={artifact} />}
    </div>
  );
}

function ArtifactFlow({ artifact }) {
  return (
    <div className="mt-4 rounded-md border border-redwood-300/20 bg-ink-950/55 p-3" role="img" aria-label={artifact.alt}>
      <div className="grid gap-2 sm:grid-cols-3">
        {artifact.steps.map((step, index) => (
          <div key={step} className="relative rounded-md border border-warm-50/10 bg-warm-50/[0.04] px-3 py-2 text-center">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-redwood-300">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm font-semibold text-warm-100">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtifactChecklist({ artifact }) {
  return (
    <ul className="mt-4 grid gap-2">
      {artifact.items.map((item) => (
        <li key={item} className="flex gap-2 rounded-md border border-warm-50/10 bg-ink-950/45 px-3 py-2 text-xs leading-5 text-warm-300">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-redwood-300" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
