export const profile = {
  name: "Abderrahmane Ouroui",
  role: "OCI Platform Engineer building reliable production runways",
  positionTitle: "DevOps Engineer / Platform Engineer",
  location: "Casablanca, Morocco",
  email: "abdououroui123@gmail.com",
  github: "https://github.com/webfordata",
  linkedin: "https://www.linkedin.com/in/abderrahmane-ouroui-5b73b1216/",
  cvHtml: "/abderrahmane-ouroui-cv.html",
  cv: "/abderrahmane-ouroui-cv.pdf",
  headline:
    "I build secure, observable, production-ready cloud platforms with Terraform, OKE/Kubernetes, CI/CD, and MLOps foundations - proven on OCI and adaptable across AWS, GCP, Azure, and beyond.",
  summary:
    "OCI is my strongest production platform. My operating model is portable: Infrastructure as Code, secure networking, IAM, Kubernetes, CI/CD, observability, cost awareness, and MLOps foundations."
};

export const targetRoles = [
  "DevOps / Platform",
  "OCI production",
  "Cloud-portable standards"
];

export const heroHighlights = [
  "OCI platform architecture",
  "Terraform, CI/CD, and secure networking",
  "Observability, data platforms, and MLOps"
];

export const cloudPortability = {
  title: "Cloud standards, not cloud lock-in",
  text:
    "OCI is my deepest production environment. The standards are portable: Terraform, Kubernetes, secure networking, IAM, CI/CD, observability, cost awareness, and MLOps foundations can be adapted across AWS, GCP, Azure, and other clouds.",
  proofPoints: [
    "Proven production depth on OCI",
    "Provider-agnostic engineering standards",
    "Same standards, different cloud primitives"
  ]
};

export const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5DCB8BDEE987AB0D33F444C6F0144AEC8E9596EF9BA9A3528575CBDC6F3F67AE",
    focus: "Architecture-level OCI validation across identity, networking, compute, storage, database, and resilient platform design.",
    scope: ["OCI architecture", "IAM", "networking"]
  },
  {
    name: "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=703518BB3025293CEBF2E2E2207E532FEF6B4989E515803FA6B2A07A3956C00F",
    focus: "Core OCI service fundamentals covering cloud concepts, security basics, platform services, and operational vocabulary.",
    scope: ["OCI foundations", "security", "services"]
  },
  {
    name: "Building Scalable Java Microservices with Spring Boot and Spring Cloud",
    issuer: "Google / Coursera",
    href: "https://www.coursera.org/account/accomplishments/certificate/SD425CFMRN48",
    focus: "Backend engineering signal for service design, Java microservices, scalability patterns, and delivery-ready application foundations.",
    scope: ["microservices", "Java", "scalability"]
  }
];

export const metrics = [
  {
    value: "500+",
    label: "per-environment OCI resources protected"
  },
  {
    value: "~3 yrs",
    label: "building and operating Oracle cloud platforms"
  },
  {
    value: "GA",
    label: "contributor to a first general availability release"
  }
];

export const capabilitySignals = [
  {
    label: "Cloud architecture",
    value: "OCI foundations",
    emoji: "🏗️",
    brief: "Design the base cloud shape: identity, network, compute, storage, and database.",
    detail: "Design OCI foundations across IAM, compartments, VCN, compute, storage, Autonomous Database, and trusted service paths.",
    stack: ["OCI", "IAM", "VCN", "Compute", "ADB"]
  },
  {
    label: "Runtime platforms",
    value: "Containers + compute",
    emoji: "🚀",
    brief: "Run platform workloads across Kubernetes, compute, containers, and private services.",
    detail: "Build runtime paths for Kubernetes, compute, container images, private services, scaling, validation, and high availability.",
    stack: ["OKE", "K8s", "Compute", "Docker", "Linux"]
  },
  {
    label: "Secure networking",
    value: "Auth to app flow",
    emoji: "🔐",
    brief: "Connect users, gateways, Traefik, functions, services, and databases through controlled paths.",
    detail: "Shape authenticated traffic paths across load balancing, API gateways, Traefik, OCI Functions, Okta, and database services.",
    stack: ["LB", "API GW", "Traefik", "Functions", "AuthZ"]
  },
  {
    label: "Terraform / IaC",
    value: "Stateful control",
    emoji: "🧱",
    brief: "Turn infrastructure changes into reviewed, repeatable, state-aware delivery.",
    detail: "Design module boundaries, preserve state, audit shared changes, and make OCI delivery repeatable.",
    stack: ["Terraform", "OCI Provider", "State", "Modules", "Review"]
  },
  {
    label: "CI/CD + release",
    value: "Dev to prod runway",
    emoji: "🛤️",
    brief: "Move change across environments with validation, rollback, and release checks.",
    detail: "Promote change through dev, test, stage, and prod with validation, rollback planning, post-release checks, and automation.",
    stack: ["GitLab", "Jenkins", "CI/CD", "Artifacts", "Rollback"]
  },
  {
    label: "Observability",
    value: "Signals + alarms",
    emoji: "📈",
    brief: "Make production behavior visible through logs, metrics, alarms, and dashboards.",
    detail: "Improve detection and troubleshooting with OCI Logging, OCI Monitoring, Grafana, alarms, data freshness, and capacity signals.",
    stack: ["Logging", "Monitoring", "Grafana", "Alarms", "SRE"]
  },
  {
    label: "Data platforms",
    value: "ADB + pipelines",
    emoji: "🗄️",
    brief: "Support database, object storage, Spark, and private data movement workflows.",
    detail: "Support Autonomous Database, Object Storage, OCI Data Flow, Spark/PySpark, streams, and data movement workflows.",
    stack: ["ADB", "Object Storage", "Data Flow", "Spark", "Streams"]
  },
  {
    label: "MLOps foundations",
    value: "MLflow + pipelines",
    emoji: "🤖",
    brief: "Prepare private model training, tracking, artifact flow, and GPU-ready platform paths.",
    detail: "Enable MLflow, OCI Data Science jobs and pipelines, OCIR images, dataset buckets, model artifacts, and GPU readiness.",
    stack: ["MLflow", "OCI DS", "OCIR", "GPU", "MLOps"]
  },
  {
    label: "Optimization",
    value: "Scale efficiency",
    emoji: "⚙️",
    brief: "Reduce waste and improve capacity, scaling behavior, and cloud efficiency.",
    detail: "Improve scalability, resource utilization, idle capacity behavior, Data Flow sizing, and cloud cost efficiency.",
    stack: ["Cost", "Capacity", "Scaling", "Data Flow", "Tuning"]
  },
  {
    label: "Security hygiene",
    value: "Guardrails",
    emoji: "🛡️",
    brief: "Close findings across secrets, hosts, images, artifacts, and repositories.",
    detail: "Handle security findings, secrets cleanup, certificates, host updates, container vulnerability work, and artifact hygiene.",
    stack: ["Security", "Secrets", "KMS", "Certificates", "Images"]
  },
  {
    label: "Product delivery",
    value: "GA + adoption",
    emoji: "🎯",
    brief: "Support readiness, POCs, workshops, and adoption for platform services.",
    detail: "Support beta programs, POCs, workshops, release readiness, and production adoption for cloud platform services.",
    stack: ["GA", "POC", "Workshop", "Adoption", "Support"]
  },
  {
    label: "Team enablement",
    value: "Mentor + docs",
    emoji: "🧭",
    brief: "Convert troubleshooting and delivery work into docs, handoffs, and mentoring.",
    detail: "Onboard engineers, document operating procedures, share troubleshooting knowledge, and turn fixes into repeatable practices.",
    stack: ["Docs", "Mentoring", "Runbooks", "Handoff", "Support"]
  }
];

export const capabilityLogoRail = [
  { label: "OCI", image: "/assets/oracle-logo.svg", tone: "border-redwood-300/30 bg-redwood-500/10" },
  { label: "Terraform", image: "/assets/tools/terraform.svg", tone: "border-[#7b42bc]/35 bg-[#7b42bc]/15" },
  { label: "Kubernetes", image: "/assets/tools/kubernetes.svg", tone: "border-[#3970e4]/35 bg-[#3970e4]/15" },
  { label: "Docker", image: "/assets/tools/docker.svg", tone: "border-[#2496ed]/35 bg-[#2496ed]/15" },
  { label: "Traefik", image: "/assets/tools/traefik.svg", tone: "border-[#24a1c1]/35 bg-[#24a1c1]/15" },
  { label: "GitLab", image: "/assets/tools/gitlab.svg", tone: "border-[#fc6d26]/35 bg-[#fc6d26]/15" },
  { label: "Jenkins", image: "/assets/tools/jenkins.svg", tone: "border-[#d24939]/35 bg-[#d24939]/15" },
  { label: "Grafana", image: "/assets/tools/grafana.svg", tone: "border-[#f46800]/35 bg-[#f46800]/15" },
  { label: "Linux", image: "/assets/tools/linux.svg", tone: "border-signal-jade/35 bg-signal-jade/10" },
  { label: "Python", image: "/assets/tools/python.svg", tone: "border-[#3776ab]/35 bg-[#3776ab]/15" },
  { label: "MLflow", image: "/assets/tools/mlflow.svg", tone: "border-[#0194e2]/35 bg-[#0194e2]/15" },
  { label: "MySQL", image: "/assets/tools/mysql.svg", tone: "border-[#4479a1]/35 bg-[#4479a1]/15" },
  { label: "OpenJDK", image: "/assets/tools/openjdk.svg", tone: "border-[#f80000]/35 bg-[#f80000]/15" },
  { label: "Gradle", image: "/assets/tools/gradle.svg", tone: "border-[#4aa29d]/35 bg-[#4aa29d]/15" },
  { label: "Spark", image: "/assets/tools/spark.svg", tone: "border-[#e25a1c]/35 bg-[#e25a1c]/15" },
  { label: "MongoDB", image: "/assets/tools/mongodb.svg", tone: "border-[#47a248]/35 bg-[#47a248]/15" },
  { label: "OpenAI", image: "/assets/tools/openai.svg", invert: true, tone: "border-warm-50/20 bg-warm-50/[0.06]" },
  { label: "JFrog", image: "/assets/tools/jfrog.svg", tone: "border-[#40be46]/35 bg-[#40be46]/15" },
  { label: "Okta", image: "/assets/tools/okta.svg", tone: "border-[#3b74ff]/35 bg-[#3b74ff]/15" }
];

export const capabilityProofPoints = [
  { emoji: "🛡️", value: "500+", label: "per-environment resource safeguards" },
  { emoji: "🛤️", value: "Dev→Prod", label: "release ownership" },
  { emoji: "🤖", value: "AI-ready", label: "MLOps platform foundations" }
];

export const caseStudies = [
  {
    slug: "terraform-safe-oci-platform-foundation",
    path: "/case-studies/terraform-safe-oci-platform-foundation/",
    title: "Terraform-Safe OCI Platform Foundation",
    eyebrow: "Platform architecture",
    summary:
      "Designed a safer delivery runway for OCI environments using Terraform boundaries, IAM guardrails, promotion gates, and reviewable release paths.",
    problem: "Cloud environments needed repeatable change without drift, resource recreation, or unclear ownership.",
    context:
      "OCI was the primary platform. The work focused on keeping infrastructure changes reviewable, state-aware, and safe across dev, test, stage, and production environments.",
    ownership:
      "Owned Terraform boundary design, IAM guardrails, environment promotion checks, release review structure, and operational validation.",
    approach:
      "Separated infrastructure concerns into reviewable units, protected state-sensitive resources, documented promotion expectations, and made release paths explicit before production execution.",
    keyDecisions: [
      "Treat Terraform state as a production asset, not an implementation detail.",
      "Keep IAM, networking, and runtime boundaries visible during review.",
      "Use environment promotion gates to reduce drift and surprise recreation."
    ],
    outcome:
      "Protected 500+ OCI resources per environment and made platform changes safer to review, promote, and operate.",
    artifacts: [
      {
        title: "Environment promotion flow",
        type: "flow",
        description: "How platform changes become reviewable before production.",
        steps: ["Plan", "Review", "Dev", "Test", "Stage", "Prod"],
        alt: "Environment promotion flow from plan and review through dev, test, stage, and prod."
      },
      {
        title: "Release checklist",
        type: "checklist",
        description: "A release checklist for Terraform-safe platform changes.",
        items: ["State impact reviewed", "IAM boundary checked", "Network blast radius understood", "Rollback path documented"]
      }
    ],
    portability:
      "The cloud primitives change by provider, but the standard is portable: state boundaries, least privilege, review gates, and controlled promotion.",
    solution:
      "Owned Terraform boundaries, IAM guardrails, environment promotion gates, and reviewable release paths.",
    impact: "Protected 500+ OCI resources per environment and made platform changes safer to review, promote, and operate.",
    technologies: ["OCI", "Terraform", "IAM", "VCN", "Release Management"],
    proof: {
      role: "Architecture + delivery",
      stack: "OCI / Terraform",
      outcome: "500+ resources protected"
    },
    signal: "Cloud runway"
  },
  {
    slug: "secure-network-and-identity-edge",
    path: "/case-studies/secure-network-and-identity-edge/",
    title: "Secure Network and Identity Edge",
    eyebrow: "Cloud security",
    summary:
      "Built secure access patterns across OCI networking, IAM, ingress, and environment boundaries to support production workloads.",
    problem: "Applications, APIs, databases, functions, and third-party identity paths needed predictable private connectivity.",
    context:
      "Production platform paths needed secure-by-default networking and identity boundaries that stayed understandable during delivery and operations.",
    ownership:
      "Owned OCI networking patterns, IAM alignment, private ingress behavior, load balancer and gateway paths, Traefik routing, and authN/authZ coordination.",
    approach:
      "Mapped traffic flows by trust boundary, aligned IAM and network controls, reviewed ingress and service exposure patterns, and kept environment boundaries explicit.",
    keyDecisions: [
      "Use private-first paths where production workloads did not need public exposure.",
      "Keep identity and network controls aligned rather than treating them as separate reviews.",
      "Prefer clear ingress ownership and observable routing behavior."
    ],
    outcome:
      "Improved routing clarity, security posture, and release confidence for private application paths.",
    artifacts: [
      {
        title: "Private access pattern",
        type: "flow",
        description: "A representative pattern for reasoning about trust boundaries and service exposure.",
        steps: ["Identity", "Gateway", "Ingress", "Service", "Data"],
        alt: "Private access pattern from identity through gateway, ingress, service, and data."
      },
      {
        title: "Security review checklist",
        type: "checklist",
        description: "Review prompts for OCI networking and identity work.",
        items: ["Least privilege checked", "Network rules reviewed", "TLS path understood", "Ingress owner identified"]
      }
    ],
    portability:
      "The same secure edge standard can be translated to AWS, GCP, Azure, or another cloud by mapping equivalent IAM, networking, ingress, and policy primitives.",
    solution:
      "Owned controlled OCI traffic paths with load balancing, API gateways, NSGs, TLS, Traefik, functions, and authN/authZ.",
    impact: "Improved routing clarity, security posture, and release confidence for private application paths.",
    technologies: ["OCI Networking", "API Gateway", "Load Balancer", "Traefik", "AuthN/AuthZ"],
    proof: {
      role: "Network + identity",
      stack: "Gateway / Traefik",
      outcome: "Private edge"
    },
    signal: "Private edge"
  },
  {
    slug: "mlops-data-platform-foundation-oci",
    path: "/case-studies/mlops-data-platform-foundation-oci/",
    title: "MLOps and Data Platform Foundation on OCI",
    eyebrow: "Data and AI platform",
    summary:
      "Created foundations for MLflow, OCI Object Storage, Data Flow/Spark, artifact tracking, and reproducible data/ML workflows.",
    problem: "Data and ML workloads needed repeatable training, model tracking, private execution, and artifact flow.",
    context:
      "The platform needed AI/MLOps foundations that could support controlled execution, reproducible artifacts, and reliable data movement on OCI.",
    ownership:
      "Owned platform foundations across OCI Data Science, MLflow, Object Storage, Data Flow/Spark, image/artifact flow, logging, and delivery governance.",
    approach:
      "Connected dataset storage, compute/runtime execution, model tracking, artifact handling, and operational checks into a repeatable foundation for ML and data workloads.",
    keyDecisions: [
      "Separate datasets, runtime images, experiments, and model artifacts as first-class platform concerns.",
      "Keep execution private and observable before scaling adoption.",
      "Use repeatable delivery patterns instead of one-off notebook or job setup."
    ],
    outcome:
      "Enabled AI-ready workflows with controlled execution, artifact flow, logging, and delivery governance.",
    artifacts: [
      {
        title: "Experiment and artifact lifecycle",
        type: "flow",
        description: "Lifecycle for reproducible data and ML work.",
        steps: ["Dataset", "Job", "Track", "Artifact", "Validate", "Promote"],
        alt: "MLOps lifecycle from dataset to job, tracking, artifact, validation, and promotion."
      },
      {
        title: "MLOps readiness checklist",
        type: "checklist",
        description: "Checks before treating a data or ML path as platform-ready.",
        items: ["Dataset location defined", "Run metadata captured", "Artifacts versioned", "Operational signals reviewed"]
      }
    ],
    portability:
      "OCI is the proven reference platform here; the MLOps operating model can be adapted by mapping storage, compute, experiment tracking, and CI/CD primitives in another provider.",
    solution:
      "Owned private foundations with OCI Data Science, MLflow, OCIR, Object Storage, MySQL, Data Flow, and Spark.",
    impact: "Enabled AI-ready workflows with controlled execution, artifact flow, logging, and delivery governance.",
    technologies: ["OCI Data Science", "MLflow", "Data Flow", "Spark", "MySQL", "Terraform"],
    proof: {
      role: "Platform builder",
      stack: "MLflow / Data Flow",
      outcome: "AI-ready base"
    },
    signal: "AI-ready"
  }
];

export const additionalDeliveryPatterns = [
  {
    title: "Tenancy and data migration",
    summary:
      "Controlled migration planning across platform-foundation readiness, IAM and networking dependencies, data movement, validation, rollback, and post-migration checks.",
    signal: "Migration runway",
    technologies: ["OCI", "IAM", "Networking", "Object Storage", "Autonomous Database", "Terraform"]
  },
  {
    title: "Observability and reliability fabric",
    summary:
      "Repeatable logging, metrics, Grafana dashboards, alarms, and runbook patterns for incident detection, data freshness, capacity, and production health.",
    signal: "Signals as code",
    technologies: ["OCI Logging", "OCI Monitoring", "Grafana", "Events", "Alarms"]
  }
];

export const skillGroups = [
  {
    title: "Cloud Platform",
    skills: ["OCI", "IAM", "Compartments", "VCN", "Subnets", "Route Tables", "Load Balancer", "API Gateway", "Functions", "Compute", "Object Storage", "Autonomous Database", "Certificates", "KMS"]
  },
  {
    title: "Delivery",
    skills: ["Terraform", "Infrastructure as Code", "CI/CD", "GitLab", "Jenkins", "Docker", "OCIR", "Artifactory", "Release Management", "Rollback"]
  },
  {
    title: "Operations",
    skills: ["Kubernetes", "OKE", "Linux", "Networking", "NSGs", "Security Lists", "OCI Logging", "OCI Monitoring", "OCI Events", "Alarms", "Grafana", "Incident Response", "Cost Optimization"]
  },
  {
    title: "Data and AI",
    skills: ["OCI Data Science", "OCI Data Flow", "Spark", "PySpark", "MLflow", "MySQL", "Autonomous Database", "Object Storage", "LLM Integration", "GPU Readiness", "MLOps Foundations"]
  }
];

export const timeline = [
  {
    period: "2023 - Present",
    title: "DevOps Engineer II / Platform Engineer, Oracle",
    achievement: "Owned OCI architecture, Terraform migration, OKE, releases, observability, and MLOps-ready foundations.",
    detail:
      "Build and operate OCI-native platform capabilities across IaC, secure networking, CI/CD, data platforms, observability, release execution, and MLOps foundations."
  },
  {
    period: "2023",
    title: "Research Assistant, Oracle",
    achievement: "Delivered backend and CI/CD workflows across Java, Groovy, Gradle, Jenkins, and GitLab.",
    detail:
      "Worked on backend services and CI/CD workflows using Java, Groovy, Gradle, Jenkins, GitLab, JUnit, and Mockito."
  },
  {
    period: "2022",
    title: "Full Stack Developer, diaaland",
    achievement: "Built product workflows and third-party integrations across backend, database, and React frontend.",
    detail:
      "Built fitness platform workflows with NestJS, MongoDB, React, and integrations with Strava and Garmin."
  },
  {
    period: "2021",
    title: "Web Developer, INTELLCAP SARL",
    achievement: "Delivered marketplace-style web functionality across React, GraphQL, PHP, and WooCommerce.",
    detail:
      "Delivered a fine art auction web application using React, GraphQL, PHP, and WooCommerce."
  }
];

export const proofOfWork = [
  {
    emoji: "🏗️",
    title: "OCI platform foundations",
    handle: "Owned OCI platform foundations -> IAM, VCN, compute, storage, Autonomous Database -> repeatable guardrails.",
    signals: ["OCI + IAM", "ADB"]
  },
  {
    emoji: "🔁",
    title: "Terraform-safe migration",
    handle: "Owned tenancy and data migration -> Terraform state, access, networking, data movement -> lower risk.",
    signals: ["state-safe", "data continuity"]
  },
  {
    emoji: "🔐",
    title: "Private ingress",
    handle: "Owned private paths -> LB, API Gateway, Traefik, TLS, authZ -> safer ingress.",
    signals: ["secure ingress", "private routing"]
  },
  {
    emoji: "🚀",
    title: "OKE runtime delivery",
    handle: "Owned Kubernetes delivery -> OKE, images, gates, rollback -> validated releases.",
    signals: ["OKE", "dev to prod"]
  },
  {
    emoji: "📈",
    title: "Grafana observability",
    handle: "Owned signals -> logging, monitoring, Grafana dashboards, alarms -> faster triage.",
    signals: ["dashboards", "faster triage"]
  },
  {
    emoji: "🤖",
    title: "MLOps pipelines",
    handle: "Owned AI-ready base -> MLflow, Data Science, Data Flow, artifacts -> controlled pipelines.",
    signals: ["MLflow", "pipelines"]
  }
];

export const workingStyle = {
  title: "Where I work best",
  text:
    "Ambiguous platform problems where cloud architecture, delivery automation, production ownership, and incident learning need to become one repeatable operating model. OCI is my strongest production environment; the standards are intentionally portable."
};

export const publicProofRepos = [
  {
    name: "oci-platform-foundation-blueprint",
    status: "planned example",
    focus: "Terraform boundaries, IAM guardrails, VCN shape, and promotion checklist"
  },
  {
    name: "oke-release-runway",
    status: "planned example",
    focus: "Kubernetes/OKE deployment gates, image promotion, rollback, and validation"
  },
  {
    name: "mlops-on-oci-foundation",
    status: "planned example",
    focus: "MLflow, Object Storage, Data Flow/Spark, artifacts, and observability checks"
  },
  {
    name: "cloud-platform-standards-playbook",
    status: "planned example",
    focus: "Provider-agnostic standards for IAM, networking, CI/CD, observability, and cost awareness"
  }
];
