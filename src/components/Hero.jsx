import { ArrowRight, ArrowUpRight, Download, Terminal } from "lucide-react";
import { profile } from "../data/portfolio.js";
import { portfolioSections } from "../data/seo.js";

const oracleLogoUrl = "/assets/oracle-logo.svg";

const socialLinks = [
  {
    label: "GitHub",
    href: profile.github,
    icon: "/assets/social/github.svg"
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: "/assets/social/linkedin.svg"
  },
];

const terminalLines = [
  {
    command: "platform.status --summary",
    output: "OCI-proven production runway. Cloud-portable standards."
  }
];

const heroSignals = [
  {
    label: "OCI",
    value: "architecture",
    detail: "IAM, networking, compute, storage, Autonomous Database, observability, and MLOps-ready foundations."
  },
  {
    label: "IaC",
    value: "Terraform",
    detail: "State-aware modules, reviewable release paths, environment promotion, and safer infrastructure change."
  },
  {
    label: "Runtime",
    value: "OKE / K8s",
    detail: "Container runtime design, private service paths, release validation, rollback readiness, and production operations."
  }
];

const environmentRunway = [
  { icon: "🧩", label: "dev" },
  { icon: "🧪", label: "test" },
  { icon: "🛡️", label: "stage" },
  { icon: "🚀", label: "prod" }
];

const controlPlaneMap = [
  {
    label: "IaC",
    value: "Codify OCI with Terraform modules, state-aware reviews, and promotion gates.",
    target: 1,
    signal: "Terraform / IaC"
  },
  {
    label: "IAM",
    value: "Design compartments, policies, service principals, and app auth boundaries.",
    target: 1,
    signal: "Cloud architecture"
  },
  {
    label: "Networking",
    value: "Shape private VCN paths, LB/API Gateway, Traefik, and authN/authZ.",
    target: 1,
    signal: "Secure networking"
  },
  {
    label: "OKE",
    value: "Own workload runtime, images, validation, scaling, and service exposure.",
    target: 1,
    signal: "Runtime platforms"
  },
  {
    label: "Data",
    value: "Wire Autonomous Database, Object Storage, Spark/Data Flow, and data movement.",
    target: 1,
    signal: "Data platforms"
  },
  {
    label: "Observability",
    value: "Build logs, metrics, Grafana dashboards, alarms, and health signals.",
    target: 1,
    signal: "Observability"
  },
  {
    label: "MLOps",
    value: "Prepare MLflow, Data Science pipelines, datasets, and model artifacts.",
    target: 1,
    signal: "MLOps foundations"
  }
];

export default function Hero({ onNavigate }) {
  const sectionIndex = (id) => portfolioSections.findIndex((section) => section.id === id);

  const navigateTo = (event, idOrIndex, signal = null) => {
    event.preventDefault();
    const index = typeof idOrIndex === "number" ? idOrIndex : sectionIndex(idOrIndex);
    if (index < 0) return;
    onNavigate?.(index, signal);
  };

  return (
    <section id="top" className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-y-auto overflow-x-hidden px-4 pb-6 pt-[4.5rem] sm:px-6 sm:pt-20 lg:px-8">
      <div className="mx-auto grid min-h-full w-full min-w-0 max-w-7xl items-start gap-6 py-2 lg:h-full lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-8 lg:py-0">
        <div className="w-full min-w-0 max-w-3xl">
          <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-md border border-redwood-400/30 bg-redwood-500/10 px-3 py-2 font-mono text-xs uppercase text-redwood-300">
            <span className="h-2 w-2 rounded-sm bg-redwood-400" aria-hidden="true" />
            {profile.positionTitle}
          </p>

          <div className="flex min-w-0 items-center gap-3 sm:items-start sm:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-warm-50/10 bg-warm-50/[0.04] p-1.5 text-center shadow-panel sm:h-28 sm:w-28 sm:p-2 2xl:h-32 2xl:w-32">
              <picture className="h-[90%] w-[90%] overflow-hidden rounded-md">
                <source srcSet="/assets/me-256.webp 256w, /assets/me-512.webp 512w" sizes="(min-width: 640px) 112px, 58px" type="image/webp" />
                <source srcSet="/assets/me-256.jpeg 256w, /assets/me-512.jpeg 512w" sizes="(min-width: 640px) 112px, 58px" type="image/jpeg" />
                <img
                  src="/assets/me-256.jpeg"
                  alt={profile.name}
                  width="256"
                  height="256"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </picture>
            </div>

            <div className="min-w-0 max-w-[calc(100vw-7.75rem)] flex-1 sm:max-w-full">
              <h1 className="break-words font-display text-[clamp(1.35rem,6vw,1.75rem)] font-semibold leading-[1.04] text-warm-50 sm:text-5xl lg:text-[2.45rem] xl:text-[2.65rem] 2xl:text-6xl">
                {profile.role}
              </h1>
              <img src={oracleLogoUrl} alt="Oracle" className="mt-3 h-5 w-[112px] object-contain sm:h-6 sm:w-[132px]" />
            </div>
          </div>

          <p className="mt-5 w-full max-w-full break-words text-base leading-7 text-warm-300 sm:max-w-2xl sm:text-lg sm:leading-7">
            Secure, observable production platforms with Terraform, OKE/Kubernetes, CI/CD, and MLOps foundations.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-3" aria-label="Hero focus signals">
            {heroSignals.map((signal) => (
              <article
                key={signal.label}
                className="reveal-card surface-soft min-h-[4.8rem] rounded-lg p-3"
                tabIndex={0}
                aria-label={`${signal.label}: ${signal.detail}`}
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-redwood-300">{signal.label}</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-warm-50">{signal.value}</p>
                <div className="reveal-panel">
                  <p className="text-xs leading-5 text-warm-200">{signal.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="/work/"
              onClick={(event) => navigateTo(event, "work")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-redwood-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-redwood-400 sm:w-auto"
            >
              View case studies <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-warm-50/18 bg-ink-950/35 px-5 py-3 text-sm font-semibold text-warm-50 transition hover:border-redwood-300/80 hover:text-redwood-300 sm:w-auto"
            >
              Download CV <Download size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Professional links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.label}
                title={link.label}
                className="interactive-card inline-flex h-11 w-11 items-center justify-center rounded-md border border-warm-50/12 bg-warm-50/[0.045] transition hover:border-redwood-300/70 hover:bg-redwood-500/10"
              >
                <img
                  src={link.icon}
                  alt=""
                  className={`h-5 w-5 object-contain ${link.label === "GitHub" ? "theme-github-logo" : ""}`}
                />
              </a>
            ))}
            <a
              href="/contact/"
              onClick={(event) => navigateTo(event, "contact")}
              className="interactive-card inline-flex items-center justify-center gap-2 rounded-md border border-warm-50/12 bg-warm-50/[0.045] px-3 py-2 text-sm font-semibold text-warm-100 transition hover:border-redwood-300/70 hover:bg-redwood-500/10"
            >
              <span>Contact</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="surface hidden w-full min-w-0 overflow-hidden rounded-lg lg:block">
          <div className="flex items-center justify-between border-b border-warm-50/10 bg-ink-950/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-redwood-400" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-signal-amber" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-signal-jade" aria-hidden="true" />
            </div>
            <div className="flex min-w-0 items-center gap-2 font-mono text-xs uppercase text-warm-300">
              <Terminal size={15} aria-hidden="true" />
              <span className="truncate">oci-architect.sh</span>
            </div>
          </div>

          <div className="space-y-3 p-3 font-mono sm:p-4">
            {terminalLines.map((line) => (
              <div key={line.command} className="min-w-0">
                <p className="text-xs leading-6 text-signal-jade">
                  aouroui@oci-platform:~$ <span className="text-warm-100">{line.command}</span>
                  <span className="terminal-cursor" aria-hidden="true" />
                </p>
                <p className="break-words text-sm leading-5 text-warm-300">{line.output}</p>
              </div>
            ))}

            <div className="rounded-md border border-redwood-300/20 bg-redwood-500/[0.06] px-3 py-2">
              <p className="text-[0.66rem] uppercase tracking-[0.2em] text-redwood-300">promotion runway</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {environmentRunway.map((env) => (
                  <div key={env.label} className="rounded-md border border-warm-50/10 bg-ink-950/55 px-2 py-2 text-center">
                    <p className="text-base leading-none" aria-hidden="true">{env.icon}</p>
                    <p className="mt-1 text-[0.64rem] uppercase tracking-[0.16em] text-warm-200">{env.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-warm-50/10 bg-ink-950/70 p-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase text-redwood-300">ownership map</p>
                <p className="hidden text-[0.6rem] uppercase tracking-[0.12em] text-warm-500 sm:block">hover / click</p>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {controlPlaneMap.map((item, index) => (
                  <article
                    key={item.label}
                    className={`reveal-card rounded-md border border-warm-50/10 ${
                      index % 2 === 0 ? "bg-warm-50/[0.025]" : "bg-ink-950/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(event) => navigateTo(event, item.target, item.signal)}
                      aria-label={`Inspect ${item.signal}: ${item.value}`}
                      className="architecture-map-row block w-full px-3 py-2 text-left text-[0.72rem] leading-4"
                    >
                      <span className="block uppercase tracking-[0.12em] text-signal-jade">[{item.label}]</span>
                      <span className="mt-1 block truncate text-warm-200">{item.signal}</span>
                    </button>
                    <div className="reveal-panel">
                      <p className="text-[0.7rem] leading-5 text-warm-200">{item.value}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
