import { ArrowUpRight, Download, FileText, Mail } from "lucide-react";

export default function Contact({ content }) {
  const { profile, ui } = content;
  const copy = ui.contact;
  const recruiterActions = [
    {
      label: copy.actions.linkedin[0],
      detail: copy.actions.linkedin[1],
      href: profile.linkedin,
      logo: "/assets/social/linkedin.svg"
    },
    {
      label: copy.actions.github[0],
      detail: copy.actions.github[1],
      href: profile.github,
      logo: "/assets/social/github.svg",
      invertOnLight: true
    },
    {
      label: copy.actions.cvOnline[0],
      detail: copy.actions.cvOnline[1],
      href: profile.cvHtml,
      Icon: FileText
    },
    {
      label: copy.actions.cvDownload[0],
      detail: copy.actions.cvDownload[1],
      href: profile.cv,
      Icon: Download,
      download: true
    }
  ];
  const emailSubject = copy.emailSubject;
  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(emailSubject)}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(emailSubject)}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(profile.email)}&subject=${encodeURIComponent(emailSubject)}`;

  return (
    <section id="contact" className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8">
      <div className="story-scroll-y mx-auto flex h-full w-full max-w-7xl flex-col justify-start overflow-y-auto py-2 lg:justify-center lg:py-0">
        <div className="contact-card rounded-lg border p-6 shadow-panel sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase text-redwood-700">{copy.eyebrow}</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {copy.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 opacity-75">
                {copy.body}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={mailtoHref}
                className="contact-action contact-action-primary sm:col-span-2"
                aria-label={`Send email to ${profile.name}`}
              >
                <span className="contact-action-icon bg-redwood-500 text-white">
                  <Mail size={17} aria-hidden="true" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-sm font-semibold">{copy.sendEmail}</span>
                  <span className="block truncate text-xs opacity-70">{profile.email}</span>
                </span>
              </a>
              <div className="contact-email-options sm:col-span-2" aria-label={copy.alternatives}>
                <a href={gmailHref} target="_blank" rel="noopener noreferrer">
                  Gmail
                </a>
                <span aria-hidden="true">·</span>
                <a href={outlookHref} target="_blank" rel="noopener noreferrer">
                  Outlook
                </a>
              </div>
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
      rel={!action.download && external ? "noopener noreferrer" : undefined}
      download={action.download ? "" : undefined}
    >
      <span className="contact-action-icon">
        {action.logo ? (
          <img
            src={action.logo}
            alt=""
            aria-hidden="true"
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
