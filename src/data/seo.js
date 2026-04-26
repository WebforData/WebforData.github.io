export const siteUrl = "https://aouroui.dev";

export const defaultSeo = {
  title: "Abderrahmane Ouroui - OCI Platform Engineer",
  description:
    "OCI Platform Engineer and DevOps Engineer focused on Terraform, OKE/Kubernetes, secure networking, observability, CI/CD, and MLOps-ready production platforms, with cloud-portable standards adaptable across AWS, GCP, Azure, and beyond.",
  image: `${siteUrl}/assets/aouroui-og.png`,
  imageAlt: "Abderrahmane Ouroui OCI Platform Engineer portfolio preview"
};

export const portfolioSections = [
  {
    id: "top",
    label: "Intro",
    path: "/",
    title: defaultSeo.title,
    description: defaultSeo.description,
    priority: "1.0"
  },
  {
    id: "capabilities",
    label: "Capabilities",
    path: "/capabilities/",
    title: "Cloud Platform Capabilities | Abderrahmane Ouroui",
    description:
      "OCI platform capabilities across IAM, networking, Terraform, OKE, observability, data platforms, and MLOps foundations.",
    priority: "0.9"
  },
  {
    id: "work",
    label: "Case Studies",
    path: "/work/",
    title: "Platform Engineering Case Studies | Abderrahmane Ouroui",
    description:
      "Platform engineering case studies covering Terraform-safe OCI landing zones, secure network and identity edge patterns, and MLOps/data platform foundations.",
    priority: "0.95"
  },
  {
    id: "experience",
    label: "Experience",
    path: "/experience/",
    title: "Experience and Proof of Work | Abderrahmane Ouroui",
    description:
      "Career timeline and delivery patterns for OCI DevOps, platform engineering, migration, and reliability work.",
    priority: "0.85"
  },
  {
    id: "certifications",
    label: "Certificates",
    path: "/certifications/",
    title: "Certifications | Abderrahmane Ouroui",
    description:
      "Verified Oracle Cloud Infrastructure and engineering certifications for Abderrahmane Ouroui.",
    priority: "0.8"
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact/",
    title: "Contact Abderrahmane Ouroui | DevOps and Platform Engineer",
    description:
      "Contact Abderrahmane Ouroui for OCI, DevOps, platform engineering, Kubernetes, Terraform, observability, MLOps, and cloud-platform work adaptable across providers.",
    priority: "0.75"
  }
];

export const caseStudySections = [
  {
    id: "case-terraform-safe-oci-landing-zone-runway",
    label: "Landing Zone",
    path: "/case-studies/terraform-safe-oci-landing-zone-runway/",
    title: "Terraform-Safe OCI Landing Zone Runway | Abderrahmane Ouroui",
    description:
      "Case study on safer OCI environment delivery with Terraform boundaries, IAM guardrails, promotion gates, and reviewable release paths.",
    priority: "0.85"
  },
  {
    id: "case-secure-network-and-identity-edge",
    label: "Secure Edge",
    path: "/case-studies/secure-network-and-identity-edge/",
    title: "Secure Network and Identity Edge | Abderrahmane Ouroui",
    description:
      "Case study on OCI networking, IAM, private ingress, Traefik, and authN/authZ patterns for production platform workloads.",
    priority: "0.85"
  },
  {
    id: "case-mlops-data-platform-foundation-oci",
    label: "MLOps Base",
    path: "/case-studies/mlops-data-platform-foundation-oci/",
    title: "MLOps and Data Platform Foundation on OCI | Abderrahmane Ouroui",
    description:
      "Case study on OCI MLOps foundations using MLflow, Object Storage, Data Flow/Spark, artifact tracking, and reproducible workflows.",
    priority: "0.85"
  }
];

export const storySections = [...portfolioSections, ...caseStudySections];

export const extraSitemapUrls = [
  {
    path: "/abderrahmane-ouroui-cv.html",
    priority: "0.7"
  },
  {
    path: "/abderrahmane-ouroui-cv.pdf",
    priority: "0.65"
  }
];

export function canonicalUrl(path = "/") {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}
