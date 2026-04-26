import { ArrowUpRight, Award, MapPin } from "lucide-react";
import { certifications, profile, proofOfWork, timeline } from "../data/portfolio.js";
import Section from "./Section.jsx";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="experience"
      title="Experience and proof of work."
      intro="A compact view of where I have worked and the platform patterns I can own."
      wide
      start
    >
      <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr] xl:grid-cols-[0.68fr_0.9fr_1.52fr]">
        <aside className="surface rounded-lg p-4 sm:p-5">
          <MapPin className="text-redwood-300" />
          <h3 className="mt-4 text-xl font-semibold text-warm-50 sm:text-2xl">{profile.name}</h3>
          <p className="mt-2 text-warm-300">{profile.location}</p>
          <div className="mt-5 space-y-2.5">
            {certifications.map((certification) => (
              <Credential key={certification.name} certification={certification} />
            ))}
          </div>
        </aside>

        <div className="surface-soft rounded-lg p-4 xl:p-3">
          <p className="font-mono text-xs uppercase text-redwood-300">career timeline</p>
          <div className="mt-3 space-y-2">
            {timeline.map((item) => (
              <TimelineItem key={`${item.period}-${item.title}`} item={item} />
            ))}
          </div>
        </div>

        <div className="surface rounded-lg p-4 lg:col-span-2 xl:col-span-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase text-redwood-300">proof of work</p>
              <h3 className="mt-2 text-lg font-semibold text-warm-50 sm:text-xl">Public-safe delivery patterns I can own.</h3>
            </div>
            <p className="max-w-sm text-xs leading-5 text-warm-400">
              Compact signals across architecture, migration, delivery, reliability, and MLOps.
            </p>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {proofOfWork.map((item) => (
              <ProofTile key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function TimelineItem({ item }) {
  return (
    <article className="timeline-item relative rounded-lg border border-warm-50/10 bg-warm-50/[0.035] p-3 pl-4 xl:p-2.5 xl:pl-4">
      <span className="absolute left-0 top-4 h-2 w-2 -translate-x-1/2 rounded-full bg-redwood-400 shadow-[0_0_16px_rgba(227,99,79,0.55)] xl:top-3.5" />
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-redwood-300">{item.period}</p>
      <h3 className="mt-1 text-sm font-semibold leading-5 text-warm-50 xl:text-[0.82rem] xl:leading-5">{item.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-warm-300 xl:line-clamp-1 xl:leading-4">{item.achievement}</p>
    </article>
  );
}

function ProofTile({ item }) {
  return (
    <article className="proof-tile interactive-card min-w-0 rounded-lg border border-warm-50/10 bg-warm-50/[0.035] p-3 xl:p-2.5">
      <div className="flex items-start gap-3 xl:gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-redwood-300/20 bg-redwood-500/10 text-base xl:h-7 xl:w-7 xl:text-sm">
          {item.emoji}
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold leading-5 text-warm-50 xl:text-[0.82rem]">{item.title}</h4>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-warm-300 xl:line-clamp-1 xl:leading-4">{item.handle}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 xl:mt-2">
        {item.signals.slice(0, 2).map((signal) => (
          <span key={signal} className="rounded border border-warm-50/10 bg-ink-950/45 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.06em] text-warm-300">
            {signal}
          </span>
        ))}
      </div>
    </article>
  );
}

function Credential({ certification }) {
  return (
    <a
      href={certification.href}
      target="_blank"
      rel="noreferrer"
      className="group flex gap-3 border-t border-warm-50/10 pt-3"
      aria-label={`View certificate: ${certification.name}`}
    >
      <Award className="mt-1 flex-none text-signal-amber" size={18} />
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-xs leading-5 text-warm-200 transition group-hover:text-redwood-300 sm:text-sm sm:leading-6">
          {certification.name}
        </span>
        <span className="mt-1 inline-flex items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-warm-500 transition group-hover:text-redwood-300">
          {certification.issuer}
          <ArrowUpRight size={12} />
        </span>
      </span>
    </a>
  );
}
