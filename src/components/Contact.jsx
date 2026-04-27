import { ArrowUpRight, Download, FileText, Mail } from "lucide-react";
import { profile } from "../data/portfolio.js";

const recruiterActions = [
  {
    label: "Open LinkedIn",
    detail: "Profile and professional history",
    href: profile.linkedin,
    logo: "/assets/social/linkedin.svg"
  },
  {
    label: "View GitHub",
    detail: "Code and platform examples",
    href: profile.github,
    logo: "/assets/social/github.svg",
    invertOnLight: true
  },
  {
    label: "View CV online",
    detail: "Readable web version",
    href: profile.cvHtml,
    Icon: FileText
  },
  {
    label: "Download CV",
    detail: "Recruiter-ready PDF",
    href: profile.cv,
    Icon: Download,
    download: true
  }
];

export default function Contact() {
  const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio inquiry")}`;

  return (
    <section id="contact" className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-start overflow-y-auto py-2 lg:justify-center lg:py-0">
        <div className="contact-card rounded-lg border p-6 shadow-panel sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase text-redwood-700">contact</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Let&apos;s build reliable cloud platforms.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 opacity-75">
                Hiring for OCI, DevOps, Platform Engineering, Kubernetes, Terraform, or MLOps work? My deepest production experience is on OCI, and I can apply the same secure, observable, automation-first standards across AWS, GCP, Azure, or other cloud environments.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={emailHref}
                className="contact-action"
                aria-label={`Email ${profile.name}`}
              >
                <span className="contact-action-icon bg-redwood-500 text-white">
                  <Mail size={17} aria-hidden="true" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-sm font-semibold">Email me</span>
                  <span className="block truncate text-xs opacity-70">{profile.email}</span>
                </span>
              </a>
              {recruiterActions.map((action) => (
                <ContactAction key={action.label} action={action} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactAction({ action }) {
  const Icon = action.Icon;
  const external = action.href.startsWith("http");

  return (
    <a
      href={action.href}
      className="contact-action"
      target={!action.download && external ? "_blank" : undefined}
      rel={!action.download && external ? "noreferrer noopener" : undefined}
      download={action.download ? "" : undefined}
    >
      <span className="contact-action-icon">
        {action.logo ? (
          <img
            src={action.logo}
            alt=""
            className={`h-5 w-5 object-contain ${action.invertOnLight ? "contact-github-logo theme-github-logo" : ""}`}
          />
        ) : (
          <Icon size={18} aria-hidden="true" />
        )}
      </span>
      <span className="min-w-0 text-left">
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          {action.label}
          {!action.download && external ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
        </span>
        <span className="block truncate text-xs opacity-70">{action.detail}</span>
      </span>
    </a>
  );
}
