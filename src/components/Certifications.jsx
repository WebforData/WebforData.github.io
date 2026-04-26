import { ArrowUpRight, Award } from "lucide-react";
import { certifications } from "../data/portfolio.js";
import Section from "./Section.jsx";

export default function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="certifications"
      title="Verified credentials."
      intro="Cloud and engineering certifications that reinforce my OCI platform focus and production delivery standards."
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
            aria-label={`View certificate: ${certification.name} from ${certification.issuer}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-redwood-300/20 bg-redwood-500/10 text-signal-amber">
                <Award size={20} aria-hidden="true" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-warm-50/10 bg-warm-50/[0.04] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-redwood-300">
                Verify
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-redwood-300">{certification.issuer}</p>
            <h3 className="mt-3 text-xl font-semibold leading-tight text-warm-50">{certification.name}</h3>
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-warm-300">
              Credential aligned with cloud architecture, platform operations, backend delivery, and production-ready engineering.
            </p>

            <div className="reveal-panel">
              <p className="text-sm leading-6 text-warm-200">
                View the official certificate record from {certification.issuer}.
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
