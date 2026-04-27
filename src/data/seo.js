export const siteUrl = "https://aouroui.dev";

export const defaultSeo = {
  title: "Abderrahmane Ouroui | OCI DevOps & Platform Engineer",
  description:
    "OCI Platform Engineer in Casablanca building Terraform, OKE/Kubernetes, secure networking, observability, release, and MLOps-ready production platforms.",
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
    path: "/#capabilities",
    title: "Cloud Platform Capabilities | Abderrahmane Ouroui",
    description:
      "Capabilities across OCI IAM, networking, Terraform, OKE, observability, data services, and reproducible ML workflows.",
    priority: "0.9"
  },
  {
    id: "work",
    label: "Case Studies",
    path: "/#work",
    title: "Platform Engineering Case Studies | Abderrahmane Ouroui",
    description:
      "Problem, action, result, and evidence from Terraform-safe OCI changes, private network paths, and data/ML workflow design.",
    priority: "0.95"
  },
  {
    id: "experience",
    label: "Experience",
    path: "/#experience",
    title: "Experience and Proof of Work | Abderrahmane Ouroui",
    description:
      "Career timeline and examples across OCI DevOps, Terraform migration, Kubernetes runtime, and reliability work.",
    priority: "0.85"
  },
  {
    id: "certifications",
    label: "Certificates",
    path: "/#certifications",
    title: "Certifications | Abderrahmane Ouroui",
    description:
      "Verified Oracle Cloud Infrastructure and engineering certifications for Abderrahmane Ouroui.",
    priority: "0.8"
  },
  {
    id: "contact",
    label: "Contact",
    path: "/#contact",
    title: "Contact Abderrahmane Ouroui | DevOps and Platform Engineer",
    description:
      "Contact Abderrahmane Ouroui for OCI, DevOps, Kubernetes, Terraform, observability, and cloud architecture-to-release work.",
    priority: "0.75"
  }
];

export const caseStudySections = [
  {
    id: "case-terraform-safe-oci-platform-foundation",
    label: "OCI Foundation",
    path: "/case-studies/terraform-safe-oci-platform-foundation/",
    title: "Terraform-Safe OCI Platform Foundation | Abderrahmane Ouroui",
    description:
      "Case study on safer OCI environment changes using Terraform boundaries, IAM guardrails, state checks, and release gates.",
    priority: "0.85"
  },
  {
    id: "case-secure-network-and-identity-edge",
    label: "Secure Edge",
    path: "/case-studies/secure-network-and-identity-edge/",
    title: "Secure Network and Identity Edge | Abderrahmane Ouroui",
    description:
      "Case study on private OCI traffic paths across networking, IAM, API Gateway, load balancers, Traefik, and authN/authZ.",
    priority: "0.85"
  },
  {
    id: "case-mlops-data-platform-foundation-oci",
    label: "MLOps Base",
    path: "/case-studies/mlops-data-platform-foundation-oci/",
    title: "MLOps and Data Platform Foundation on OCI | Abderrahmane Ouroui",
    description:
      "Case study on reproducible OCI data and ML workflows using MLflow, Object Storage, Data Flow/Spark, and artifact tracking.",
    priority: "0.85"
  }
];

export const storySections = [...portfolioSections, ...caseStudySections];
export const prerenderRoutes = [portfolioSections[0], ...caseStudySections];
export const sitemapSections = [portfolioSections[0], ...caseStudySections];

export const extraSitemapUrls = [
  {
    path: "/abderrahmane-ouroui-cv.html",
    priority: "0.7"
  },
  {
    path: "/abderrahmane-ouroui-cv.pdf",
    priority: "0.65"
  },
  {
    path: "/abderrahmane-ouroui-cv-fr.html",
    priority: "0.7"
  },
  {
    path: "/abderrahmane-ouroui-cv-fr.pdf",
    priority: "0.65"
  }
];

export function canonicalUrl(path = "/") {
  const [pathOnly] = path.split("#");
  const canonicalPath = pathOnly || "/";
  return `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;
}
