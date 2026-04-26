import { capabilityLogoRail, capabilityProofPoints, capabilitySignals } from "../data/portfolio.js";

export default function MetricStrip({ highlightedSignal }) {
  return (
    <section id="capabilities" className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-hidden px-3 pb-4 pt-20 sm:px-6 sm:pb-8 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-start overflow-y-auto overflow-x-hidden py-1 lg:py-0">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="min-w-0">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-redwood-300 sm:text-xs">capability cockpit</p>
            <h2 className="mt-1 max-w-2xl break-words font-display text-[1.75rem] font-semibold leading-[1.05] text-warm-50 sm:mt-2 sm:text-5xl lg:text-4xl 2xl:text-5xl">
              The work I can own end to end.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {capabilityProofPoints.map((point) => (
              <div key={point.label} className="rounded-lg border border-warm-50/10 bg-warm-50/[0.04] px-2 py-1.5 sm:px-3 sm:py-2">
                <p className="text-sm leading-none sm:text-base">{point.emoji}</p>
                <p className="mt-1 truncate text-xs font-semibold text-warm-50 sm:text-lg">{point.value}</p>
                <p className="mt-0.5 line-clamp-2 text-[0.56rem] leading-3 text-warm-400 sm:text-xs sm:leading-4">{point.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-9 gap-1 sm:mt-4 sm:grid-cols-[repeat(18,minmax(0,1fr))] sm:gap-2">
          {capabilityLogoRail.map((logo) => (
            <div key={logo.label} className={`flex min-h-9 items-center justify-center rounded-lg border px-1 py-1 sm:min-h-14 sm:px-1.5 sm:py-2 ${logo.tone}`}>
              <div className="text-center">
                {logo.image ? (
                  <img
                    src={logo.image}
                    alt={logo.label}
                    className={`mx-auto h-5 w-7 object-contain sm:h-5 sm:w-12 ${logo.invert ? "theme-invert-on-dark" : ""}`}
                  />
                ) : (
                  <p className="font-display text-lg font-semibold text-warm-50">{logo.mark}</p>
                )}
                <p className="mt-1 hidden truncate font-mono text-[0.45rem] uppercase tracking-[0.06em] text-warm-300 sm:block">{logo.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-4 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4 lg:gap-2">
          {capabilitySignals.map((item) => (
            <div
              key={item.label}
              className={`surface-soft min-h-[4.7rem] rounded-lg p-2 transition sm:min-h-[6.15rem] sm:p-3 lg:min-h-[7.15rem] ${
                item.label === highlightedSignal ? "capability-highlight" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-mono text-[0.52rem] uppercase tracking-[0.1em] text-redwood-300 sm:text-[0.62rem]">{item.label}</p>
                  <p className="mt-0.5 break-words text-[0.82rem] font-semibold leading-tight text-warm-50 sm:mt-1 sm:text-base lg:text-lg">{item.value}</p>
                </div>
                <span className="text-sm leading-none sm:text-lg">{item.emoji}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[0.58rem] leading-3 text-warm-400 sm:mt-2 sm:text-[0.66rem] sm:leading-4 lg:text-[0.7rem]">
                {item.brief || item.detail}
              </p>
              <div className="mt-2 hidden flex-wrap gap-1 sm:flex">
                {item.stack.map((tech, index) => (
                  <span key={tech} className={`${index > 3 ? "hidden 2xl:inline-flex" : "inline-flex"} rounded border border-warm-50/10 bg-ink-950/45 px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.06em] text-warm-300`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
