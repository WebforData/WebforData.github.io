import { Cpu, GitBranch, RadioTower } from "lucide-react";
import Section from "./Section.jsx";
import { profile, workingStyle } from "../data/portfolio.js";

const pillars = [
  {
    icon: Cpu,
    title: "Cloud platform",
    text: "Builds OCI foundations, secure network paths, data services, and runtime changes that can move safely across environments."
  },
  {
    icon: RadioTower,
    title: "Production operations",
    text: "Handles the practical reliability work: monitoring, incident response, release checks, rollback planning, and support."
  },
  {
    icon: GitBranch,
    title: "Automation",
    text: "Turns repeated infrastructure and delivery tasks into Terraform modules, CI/CD workflows, runbooks, and cleaner release routines."
  }
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="identity"
      title="Platform engineer focused on cloud delivery that holds up in production."
      intro={profile.summary}
    >
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="surface rounded-lg p-6">
          <p className="font-mono text-xs uppercase text-redwood-300">{workingStyle.title}</p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-warm-50">Architecture, delivery, and production ownership in one loop.</h3>
          <p className="mt-4 text-sm leading-7 text-warm-300">{workingStyle.text}</p>
        </article>

        <div className="grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="surface-soft rounded-lg p-5">
              <pillar.icon className="text-redwood-300" size={23} />
              <h3 className="mt-4 text-lg font-semibold text-warm-50">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-warm-300">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
