export const siteUrl = "https://aouroui.dev";

export const defaultSeo = {
  title: "Abderrahmane Ouroui | OCI DevOps & Platform Engineer",
  description:
    "Abderrahmane Ouroui is an OCI DevOps and Platform Engineer in Casablanca building Terraform, Kubernetes/OKE, secure networking, observability, data, and MLOps platforms.",
  image: `${siteUrl}/assets/aouroui-og.png`,
  imageAlt: "Abderrahmane Ouroui OCI DevOps and Platform Engineer portfolio preview"
};

export const storySections = [
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
    id: "about",
    label: "About",
    path: "/about/",
    title: "About Abderrahmane Ouroui | Platform Engineer",
    description:
      "Platform engineering profile focused on OCI architecture, delivery automation, production ownership, and reliable cloud operations.",
    priority: "0.8"
  },
  {
    id: "work",
    label: "Work",
    path: "/work/",
    title: "Platform Engineering Work | Abderrahmane Ouroui",
    description:
      "Public-safe case studies covering OCI landing zones, secure ingress, tenancy and data migration, observability, and MLOps foundations.",
    priority: "0.95"
  },
  {
    id: "stack",
    label: "Stack",
    path: "/stack/",
    title: "DevOps, OCI, Kubernetes, and MLOps Stack | Abderrahmane Ouroui",
    description:
      "A practical engineering stack covering Oracle Cloud Infrastructure, Terraform, Kubernetes/OKE, CI/CD, Grafana, data, and AI platform tooling.",
    priority: "0.85"
  },
  {
    id: "experience",
    label: "Experience",
    path: "/experience/",
    title: "Experience and Proof of Work | Abderrahmane Ouroui",
    description:
      "Career timeline, certifications, and public-safe proof of work for OCI DevOps, platform engineering, migration, and reliability work.",
    priority: "0.85"
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact/",
    title: "Contact Abderrahmane Ouroui | DevOps and Platform Engineer",
    description:
      "Contact Abderrahmane Ouroui for OCI, DevOps, platform engineering, Kubernetes, Terraform, observability, and MLOps work.",
    priority: "0.75"
  }
];

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
