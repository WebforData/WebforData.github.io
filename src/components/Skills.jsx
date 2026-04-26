import { skillGroups } from "../data/portfolio.js";
import Section from "./Section.jsx";

export default function Skills() {
  return (
    <Section
      id="stack"
      eyebrow="stack"
      title="Delivery patterns and platform stack."
      intro="Grouped by the work it supports: Infrastructure as Code, Kubernetes/OKE runtime, secure networking and IAM, CI/CD promotion, observability and triage, MLOps/data foundations, and cost-aware architecture."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <article key={group.title} className="surface-soft rounded-lg p-5">
            <h3 className="text-lg font-semibold text-warm-50">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="rounded-md border border-warm-50/10 bg-ink-900 px-3 py-1.5 text-xs text-warm-200">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
