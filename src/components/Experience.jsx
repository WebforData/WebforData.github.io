import { MapPin } from "lucide-react";
import Section from "./Section.jsx";

export default function Experience({ content }) {
  const { profile, proofOfWork, timeline, ui } = content;
  const visibleProof = proofOfWork.slice(0, 4);
  const copy = ui.experience;
  return (
    <Section
      id="experience"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      wide
      start
    >
      <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr] xl:grid-cols-[0.68fr_0.9fr_1.52fr]">
        <aside className="surface rounded-lg p-4 sm:p-5">
          <MapPin className="text-redwood-300" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-semibold text-warm-50 sm:text-2xl">{profile.name}</h3>
          <p className="mt-2 text-warm-300">{profile.location}</p>
          <div className="mt-5 rounded-lg border border-redwood-300/20 bg-redwood-500/[0.06] p-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-redwood-300">{copy.operatingModel}</p>
            <p className="mt-2 text-sm leading-6 text-warm-300">{profile.summary}</p>
          </div>
        </aside>

        <div className="surface-soft rounded-lg p-4 xl:p-3">
          <p className="font-mono text-xs uppercase text-redwood-300">{copy.timeline}</p>
          <div className="mt-3 space-y-2">
            {timeline.map((item) => (
              <TimelineItem key={`${item.period}-${item.title}`} item={item} />
            ))}
          </div>
        </div>

        <div className="surface rounded-lg p-4 lg:col-span-2 xl:col-span-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase text-redwood-300">{copy.proof}</p>
              <h3 className="mt-2 text-lg font-semibold text-warm-50 sm:text-xl">{copy.proofTitle}</h3>
            </div>
            <p className="max-w-sm text-xs leading-5 text-warm-400">{copy.proofIntro}</p>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {visibleProof.map((item) => (
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
    <article
      className="reveal-card timeline-item relative rounded-lg border border-warm-50/10 bg-warm-50/[0.035] p-3 pl-4 xl:p-2.5 xl:pl-4"
      role="group"
      tabIndex={0}
      aria-label={`${item.period}: ${item.title}. ${item.detail || item.achievement}`}
    >
      <span className="absolute left-0 top-4 h-2 w-2 -translate-x-1/2 rounded-full bg-redwood-400 shadow-[0_0_16px_rgba(227,99,79,0.55)] xl:top-3.5" aria-hidden="true" />
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-redwood-300">{item.period}</p>
      <h3 className="mt-1 text-sm font-semibold leading-5 text-warm-50 xl:text-[0.82rem] xl:leading-5">{item.title}</h3>
      <p className="mt-1 line-clamp-1 text-xs leading-5 text-warm-300 xl:leading-4">{item.achievement}</p>
      <div className="reveal-panel">
        <p className="text-xs leading-5 text-warm-200 xl:text-[0.7rem] xl:leading-4">{item.detail || item.achievement}</p>
      </div>
    </article>
  );
}

function ProofTile({ item }) {
  return (
    <article
      className="reveal-card proof-tile interactive-card min-w-0 rounded-lg border border-warm-50/10 bg-warm-50/[0.035] p-3 xl:p-2.5"
      role="group"
      tabIndex={0}
      aria-label={`${item.title}: ${item.handle}`}
    >
      <div className="flex items-start gap-3 xl:gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-redwood-300/20 bg-redwood-500/10 text-base xl:h-7 xl:w-7 xl:text-sm" aria-hidden="true">
          {item.emoji}
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold leading-5 text-warm-50 xl:text-[0.82rem]">{item.title}</h4>
          <p className="mt-1 line-clamp-1 text-xs leading-5 text-warm-300 xl:leading-4">{item.handle}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 xl:mt-2">
        {item.signals.slice(0, 2).map((signal) => (
          <span key={signal} className="rounded border border-warm-50/10 bg-ink-950/45 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.06em] text-warm-300">
            {signal}
          </span>
        ))}
      </div>
      <div className="reveal-panel">
        <p className="text-xs leading-5 text-warm-200 xl:text-[0.7rem] xl:leading-4">{item.handle}</p>
      </div>
    </article>
  );
}
