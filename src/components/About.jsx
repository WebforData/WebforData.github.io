import { Cpu, GitBranch, RadioTower } from "lucide-react";
import Section from "./Section.jsx";
import { cloudPortability, profile, workingStyle } from "../data/portfolio.js";

const pillars = [
  {
    icon: Cpu,
    title: "Cloud platform",
    text: "Shapes OCI guardrails, secure network paths, data services, and runtime changes that can move safely across environments."
  },
  {
    icon: RadioTower,
    title: "Production operations",
    text: "Handles the practical reliability work: monitoring, incident response, release checks, rollback planning, and support."
  },
  {
    icon: GitBranch,
    title: "Automation",
    text: "Turns repeated infrastructure and release tasks into Terraform modules, CI/CD workflows, runbooks, and cleaner routines."
  }
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="identity"
      title="Platform engineer focused on cloud changes that hold up in production."
      intro={profile.summary}
    >
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="surface rounded-lg p-6">
          <p className="font-mono text-xs uppercase text-redwood-300">{workingStyle.title}</p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-warm-50">Architecture, release, and operations in one loop.</h3>
          <p className="mt-4 text-sm leading-7 text-warm-300">{workingStyle.text}</p>
        </article>

        <div className="grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="surface-soft rounded-lg p-5">
              <pillar.icon className="text-redwood-300" size={23} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-warm-50">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-warm-300">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>

      <article className="surface mt-4 rounded-lg p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase text-redwood-300">portable operating model</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-warm-50">{cloudPortability.title}</h3>
          </div>
          <div>
            <p className="text-sm leading-7 text-warm-300 sm:text-base sm:leading-8">{cloudPortability.text}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {cloudPortability.proofPoints.map((point) => (
                <li key={point} className="rounded-md border border-warm-50/10 bg-warm-50/[0.04] px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-warm-300">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Section>
  );
}
