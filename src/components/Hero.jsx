import { ArrowRight, ArrowUpRight, Terminal } from "lucide-react";
import { profile, targetRoles } from "../data/portfolio.js";

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
  {
    label: "LeetCode",
    href: profile.leetcode,
    icon: "/assets/social/leetcode.svg"
  }
];

const terminalLines = [
  {
    command: "cat architecture.profile",
    output: "Design -> validate -> secure -> release through controlled cloud runways."
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
  const navigateTo = (event, index, signal = null) => {
    event.preventDefault();
    onNavigate?.(index, signal);
  };

  return (
    <section id="top" className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-y-auto overflow-x-hidden px-4 pb-6 pt-20 sm:px-6 lg:overflow-hidden lg:px-8">
      <div className="mx-auto grid min-h-full w-full min-w-0 max-w-7xl items-start gap-6 py-2 lg:h-full lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:overflow-hidden lg:py-0">
        <div className="w-full min-w-0 max-w-3xl">
          <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-md border border-redwood-400/30 bg-redwood-500/10 px-3 py-2 font-mono text-xs uppercase text-redwood-300">
            <span className="h-2 w-2 rounded-sm bg-redwood-400" />
            Oracle Cloud Infrastructure
          </p>

          <div className="flex min-w-0 items-start gap-3 sm:gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-warm-50/10 bg-warm-50/[0.04] p-1.5 text-center shadow-panel sm:h-32 sm:w-32 sm:p-2">
              <picture className="h-[90%] w-[90%] overflow-hidden rounded-md">
                <source srcSet="/assets/me-256.webp 256w, /assets/me-512.webp 512w" sizes="(min-width: 640px) 112px, 72px" type="image/webp" />
                <source srcSet="/assets/me-256.jpeg 256w, /assets/me-512.jpeg 512w" sizes="(min-width: 640px) 112px, 72px" type="image/jpeg" />
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

            <h1 className="min-w-0 max-w-full flex-1 break-words font-display text-3xl font-semibold leading-[1.04] text-warm-50 sm:text-5xl 2xl:text-6xl">
              {profile.role}
            </h1>
          </div>

          <p className="mt-4 w-full max-w-full break-words text-base leading-7 text-warm-300 sm:max-w-2xl sm:text-lg sm:leading-7">
            {profile.headline}
          </p>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="Target roles">
            {targetRoles.map((role) => (
              <span
                key={role}
                className="rounded-md border border-warm-50/10 bg-warm-50/[0.045] px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-warm-300"
              >
                {role}
              </span>
            ))}
          </div>

          <div className="mt-5 flex w-full min-w-0 max-w-full flex-col gap-3 rounded-lg border border-redwood-300/20 bg-ink-950/50 px-4 py-3 shadow-glow sm:flex-row sm:items-center sm:gap-4 lg:w-fit">
            <img src={oracleLogoUrl} alt="Oracle" className="h-7 w-[132px] object-contain" />
            <span className="hidden h-8 w-px bg-warm-50/12 sm:block" />
            <div className="min-w-0">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-redwood-300">
                OCI architecture
              </p>
              <p className="mt-1 break-words text-sm leading-5 text-warm-300">IAM, networking, Terraform, compute, storage, Autonomous Database, observability, and MLOps foundations.</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="/work/"
              onClick={(event) => navigateTo(event, 3)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-redwood-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-redwood-400 sm:w-auto"
            >
              View work <ArrowRight size={17} />
            </a>
            <a
              href="/contact/"
              onClick={(event) => navigateTo(event, 6)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-warm-50/18 bg-ink-950/35 px-5 py-3 text-sm font-semibold text-warm-50 transition hover:border-redwood-300/80 hover:text-redwood-300 sm:w-auto"
            >
              Contact <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
                className="interactive-card inline-flex h-10 w-10 items-center justify-center rounded-md border border-warm-50/12 bg-warm-50/[0.045] transition hover:border-redwood-300/70 hover:bg-redwood-500/10"
              >
                <img
                  src={link.icon}
                  alt=""
                  className={`h-5 w-5 object-contain ${link.label === "GitHub" ? "theme-github-logo" : ""}`}
                />
                <span className="sr-only">{link.label} profile</span>
              </a>
            ))}
          </div>
        </div>

        <div className="surface w-full min-w-0 overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-warm-50/10 bg-ink-950/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-redwood-400" />
              <span className="h-3 w-3 rounded-full bg-signal-amber" />
              <span className="h-3 w-3 rounded-full bg-signal-jade" />
            </div>
            <div className="flex min-w-0 items-center gap-2 font-mono text-xs uppercase text-warm-300">
              <Terminal size={15} />
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
                    <p className="text-base leading-none">{env.icon}</p>
                    <p className="mt-1 text-[0.64rem] uppercase tracking-[0.16em] text-warm-200">{env.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-warm-50/10 bg-ink-950/70 p-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase text-redwood-300">ownership map</p>
                <p className="hidden text-[0.6rem] uppercase tracking-[0.12em] text-warm-500 sm:block">click to inspect</p>
              </div>
              <div className="mt-2 overflow-hidden rounded-md border border-warm-50/10">
                {controlPlaneMap.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={(event) => navigateTo(event, item.target, item.signal)}
                    className={`architecture-map-row grid w-full gap-1.5 px-3 py-2 text-left text-[0.72rem] leading-4 transition sm:grid-cols-[8.4rem_1fr] ${
                      index === 0 ? "" : "border-t border-warm-50/10"
                    } ${index % 2 === 0 ? "bg-warm-50/[0.025]" : "bg-ink-950/40"}`}
                  >
                    <p className="uppercase tracking-[0.12em] text-signal-jade">[{item.label}]</p>
                    <p className="min-w-0 break-words text-warm-200">{item.value}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
