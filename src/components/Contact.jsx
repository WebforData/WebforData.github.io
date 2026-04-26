import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, FileText } from "lucide-react";
import { profile } from "../data/portfolio.js";

const recruiterActions = [
  {
    label: "Open LinkedIn",
    detail: "Profile and work history",
    href: profile.linkedin,
    logo: "/assets/social/linkedin.svg"
  },
  {
    label: "View CV Online",
    detail: "Indexable HTML resume",
    href: profile.cvHtml,
    Icon: FileText
  },
  {
    label: "Download CV",
    detail: "PDF resume",
    href: profile.cv,
    Icon: Download,
    download: true
  },
  {
    label: "View GitHub",
    detail: "Code and public repos",
    href: profile.github,
    logo: "/assets/social/github.svg",
    invertOnLight: true
  }
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-start overflow-y-auto py-2 lg:justify-center lg:py-0">
        <div className="contact-card rounded-lg border p-6 shadow-panel sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase text-redwood-700">contact</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Bring me in where cloud delivery and reliability have to work together.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 opacity-75">
                Fastest paths for recruiters and engineering teams: copy my email, review my public profile, read the CV online, or download it.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copyEmail}
                className="contact-action sm:col-span-2"
              >
                <span className="contact-action-icon bg-redwood-500 text-white">
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-sm font-semibold">{copied ? "Email copied" : "Copy email"}</span>
                  <span className="block truncate text-xs opacity-70">{profile.email}</span>
                </span>
              </button>
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

  return (
    <a
      href={action.href}
      className="contact-action"
      target={action.download ? undefined : "_blank"}
      rel={action.download ? undefined : "noreferrer"}
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
          <Icon size={18} />
        )}
      </span>
      <span className="min-w-0 text-left">
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          {action.label}
          {action.download ? null : <ArrowUpRight size={14} />}
        </span>
        <span className="block truncate text-xs opacity-70">{action.detail}</span>
      </span>
    </a>
  );
}
