const networkLayers = [
  {
    label: "Design",
    title: "VCN foundations",
    text: "VCNs, subnets, CIDR planning, route tables, and gateways.",
    chips: ["VCN", "Subnets", "Routes"]
  },
  {
    label: "Security",
    title: "Network rules",
    text: "Least-privilege ingress and egress with NSGs and security lists.",
    chips: ["NSG", "Security Lists", "Rules"]
  },
  {
    label: "Private",
    title: "Controlled access",
    text: "Private subnets, NAT, service gateways, private endpoints, and proxies.",
    chips: ["Private", "NAT", "Service GW"]
  },
  {
    label: "Runtime",
    title: "Platform services",
    text: "Load Balancer, API Gateway, Traefik, OKE, and Autonomous Database connectivity.",
    chips: ["LB", "API GW", "Traefik", "OKE"]
  }
];

const bestPracticeChips = ["VCN", "NSG", "Security Lists", "Route Tables", "NAT", "Service Gateway", "Traefik", "OKE"];

export default function Networking() {
  return (
    <section id="networking" className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-hidden px-3 pb-4 pt-8 sm:px-6 sm:pb-8 sm:pt-10 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-start overflow-hidden py-1 lg:justify-center lg:py-0">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="min-w-0">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-redwood-300 sm:text-xs">networking blueprint</p>
            <h2 className="mt-1 max-w-3xl break-words font-display text-[1.85rem] font-semibold leading-[1.05] text-warm-50 sm:mt-2 sm:text-5xl lg:text-4xl 2xl:text-5xl">
              OCI networking, secured by design.
            </h2>
          </div>

          <div className="surface rounded-lg p-4 sm:p-5">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-redwood-300 sm:text-xs">OCI best practices</p>
            <p className="mt-2 text-sm leading-6 text-warm-300 sm:text-base sm:leading-7">
              I design OCI network layers with private-first access, clear segmentation, least-privilege rules, and production observability.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              {bestPracticeChips.map((chip) => (
                <span key={chip} className="rounded border border-warm-50/10 bg-ink-950/45 px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.06em] text-warm-300 sm:px-3 sm:py-1.5 sm:text-[0.58rem]">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {networkLayers.map((layer) => (
            <article key={layer.label} className="surface-soft rounded-lg p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-mono text-[0.56rem] uppercase tracking-[0.1em] text-redwood-300 sm:text-[0.62rem]">{layer.label}</p>
                  <h3 className="mt-1 text-base font-semibold leading-tight text-warm-50 sm:text-lg">{layer.title}</h3>
                </div>
                <span className="text-base leading-none">🛰️</span>
              </div>
              <p className="mt-2 line-clamp-2 text-[0.68rem] leading-4 text-warm-400 sm:text-xs sm:leading-5">{layer.text}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {layer.chips.map((chip) => (
                  <span key={chip} className="rounded border border-warm-50/10 bg-ink-950/45 px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.06em] text-warm-300">
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
