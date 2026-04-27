export const profile = {
  name: "Abderrahmane Ouroui",
  role: "OCI Platform Engineer building Terraform, OKE, networking, and observability runways for production systems",
  positionTitle: "DevOps Engineer / Platform Engineer",
  location: "Casablanca, Morocco",
  email: "abdououroui123@gmail.com",
  github: "https://github.com/webfordata",
  linkedin: "https://www.linkedin.com/in/abderrahmane-ouroui-5b73b1216/",
  cvHtml: "/abderrahmane-ouroui-cv.html",
  cv: "/abderrahmane-ouroui-cv.pdf",
  cvFrHtml: "/abderrahmane-ouroui-cv-fr.html",
  cvFr: "/abderrahmane-ouroui-cv-fr.pdf",
  headline:
    "I help teams move cloud changes safely from architecture to release with Terraform, OKE/Kubernetes, guardrails, automation, and operational visibility.",
  summary:
    "OCI is my strongest environment. The operating model is portable: Infrastructure as Code, secure networking, IAM, Kubernetes, CI/CD, observability, cost awareness, and reproducible data/ML paths."
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
    value: "PaaS + containers",
    emoji: "🚀",
    brief: "Start PaaS work from scratch and package Kubernetes platform components with Helm.",
    detail: "Started a Platform-as-a-Service project from scratch while building runtime paths for Kubernetes platform packaging with Helm, compute, container images, private services, scaling, validation, and high availability.",
    stack: ["OKE", "K8s", "Helm", "Docker", "Linux"]
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
  { label: "Helm", image: "/assets/tools/helm.svg", tone: "border-[#0f1689]/35 bg-[#0f1689]/15" },
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
  { emoji: "🛤️", value: "Dev→Prod", label: "release guardrails" },
  { emoji: "🤖", value: "AI-ready", label: "traceable data/ML paths" }
];

export const caseStudies = [
  {
    slug: "terraform-safe-oci-platform-foundation",
    path: "/case-studies/terraform-safe-oci-platform-foundation/",
    title: "Terraform-Safe OCI Platform Foundation",
    eyebrow: "Platform architecture",
    summary:
      "Turned OCI environment changes into a reviewed Terraform path with state checks, IAM guardrails, and release gates.",
    problem: "Infrastructure changes were risky when ownership, state impact, and promotion steps were unclear.",
    approach:
      "Separated infrastructure concerns into reviewable units, protected state-sensitive resources, documented promotion expectations, and made release paths explicit before production execution.",
    action:
      "Defined Terraform boundaries, IAM checks, promotion gates, and a release-review flow; separated state-sensitive resources into reviewable units before production execution.",
    keyDecisions: [
      "Treat Terraform state as a production asset, not an implementation detail.",
      "Keep IAM, networking, and runtime boundaries visible during review.",
      "Use environment promotion gates to reduce drift and surprise recreation."
    ],
    outcome:
      "Protected 500+ OCI resources per environment and made platform changes safer to review, promote, and operate.",
    result:
      "Protected 500+ OCI resources per environment and made changes easier to review, promote, and operate.",
    evidence:
      "Environment promotion diagram and release checklist covering state impact, IAM boundary, network blast radius, and rollback path.",
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
      "Terraform boundaries, IAM guardrails, environment gates, and a reviewable release path.",
    impact: "Protected 500+ OCI resources per environment and reduced surprise recreation risk.",
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
      "Mapped private access paths across OCI networking, IAM, API Gateway, load balancers, Traefik, and authN/authZ.",
    problem: "Applications, APIs, databases, functions, and identity integrations lacked a simple, predictable private traffic model.",
    approach:
      "Mapped traffic flows by trust boundary, aligned IAM and network controls, reviewed ingress and service exposure patterns, and kept environment boundaries explicit.",
    action:
      "Mapped flows by trust boundary, aligned IAM with network controls, reviewed ingress and service exposure, and documented service ownership.",
    keyDecisions: [
      "Use private-first paths where production workloads did not need public exposure.",
      "Keep identity and network controls aligned rather than treating them as separate reviews.",
      "Prefer clear ingress ownership and observable routing behavior."
    ],
    outcome:
      "Improved routing clarity, security posture, and release confidence for private application paths.",
    result:
      "Clearer routing and a stronger security review process for private application paths.",
    evidence:
      "Private access diagram and security checklist for least privilege, network rules, TLS path, and ingress ownership.",
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
      "Controlled OCI traffic paths with load balancing, API gateways, NSGs, TLS, Traefik, functions, and authN/authZ.",
    impact: "Improved routing clarity and security review quality for private application paths.",
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
      "Connected MLflow, Object Storage, Data Flow/Spark, run metadata, and artifacts into a reproducible data/ML path on OCI.",
    problem: "Data and ML work risked one-off setup: unclear dataset locations, untracked runs, private execution gaps, and unmanaged artifacts.",
    approach:
      "Connected dataset storage, compute/runtime execution, model tracking, artifact handling, and operational checks into a repeatable foundation for ML and data workloads.",
    action:
      "Connected dataset storage, execution jobs, run tracking, artifact versioning, logging, and readiness checks across OCI services.",
    keyDecisions: [
      "Separate datasets, runtime images, experiments, and model artifacts as first-class platform concerns.",
      "Keep execution private and observable before scaling adoption.",
      "Use repeatable delivery patterns instead of one-off notebook or job setup."
    ],
    outcome:
      "Enabled AI-ready workflows with controlled execution, artifact flow, logging, and delivery governance.",
    result:
      "AI-ready workflows with controlled execution, traceable artifacts, and operational checks before broader adoption.",
    evidence:
      "Experiment lifecycle diagram and readiness checklist covering dataset location, run metadata, artifact versioning, and operational signals.",
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
      "Private data/ML path with OCI Data Science, MLflow, OCIR, Object Storage, MySQL, Data Flow, and Spark.",
    impact: "Enabled controlled data/ML workflows with traceable artifacts and readiness checks.",
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
    skills: ["Terraform", "Infrastructure as Code", "Helm", "Kubernetes Platform Packaging", "CI/CD", "GitLab", "Jenkins", "Docker", "OCIR", "Artifactory", "Release Management", "Rollback"]
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
    achievement: "Started a PaaS project from scratch alongside OCI guardrails, Terraform migrations, OKE releases, and observability.",
    detail:
      "Build and operate OCI-native capabilities across PaaS foundations, IaC, secure networking, CI/CD, data services, observability, release execution, and reproducible ML workflows."
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
    emoji: "🧩",
    title: "PaaS from scratch",
    handle: "0 to 1 platform service -> architecture, Kubernetes packaging, delivery path, guardrails.",
    signals: ["0 to 1", "PaaS"]
  },
  {
    emoji: "🏗️",
    title: "OCI guardrails",
    handle: "OCI shape -> IAM, VCN, compute, storage, Autonomous Database -> repeatable controls.",
    signals: ["OCI + IAM", "ADB"]
  },
  {
    emoji: "🔁",
    title: "Terraform-safe migration",
    handle: "Tenancy and data migration -> Terraform state, access, networking, data movement -> lower risk.",
    signals: ["state-safe", "data continuity"]
  },
  {
    emoji: "🔐",
    title: "Private ingress",
    handle: "Private paths -> LB, API Gateway, Traefik, TLS, authZ -> safer ingress.",
    signals: ["secure ingress", "private routing"]
  },
  {
    emoji: "🚀",
    title: "OKE runtime release",
    handle: "Kubernetes runtime -> OKE, images, gates, rollback -> validated releases.",
    signals: ["OKE", "dev to prod"]
  },
  {
    emoji: "📈",
    title: "Grafana observability",
    handle: "Signals -> logging, monitoring, Grafana dashboards, alarms -> faster triage.",
    signals: ["dashboards", "faster triage"]
  },
  {
    emoji: "🤖",
    title: "Data/ML workflows",
    handle: "AI-ready path -> MLflow, Data Science, Data Flow, artifacts -> controlled runs.",
    signals: ["MLflow", "pipelines"]
  }
];

export const workingStyle = {
  title: "Where I work best",
  text:
    "Ambiguous cloud problems where architecture, automation, operations, and incident learning need one repeatable operating model. OCI is my strongest environment; the standards are intentionally portable."
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

const heroContent = {
  en: {
    intro:
      "I help teams move cloud changes safely from architecture to release with guardrails, automation, and operational visibility.",
    primaryCta: "View case studies",
    cvCta: "Download CV",
    contactCta: "Contact",
    terminalTitle: "oci-architect.sh",
    terminalLines: [
      {
        command: "platform.status --summary",
        output: "Architecture -> release, with guardrails and visibility."
      }
    ],
    promotionLabel: "release path",
    ownershipLabel: "operating map",
    ownershipHint: "hover / click",
    signals: [
      {
        label: "OCI",
        value: "architecture",
        detail: "Identity, networking, compute, storage, Autonomous Database, and service boundaries."
      },
      {
        label: "IaC",
        value: "Terraform",
        detail: "State-aware modules, reviewable plans, environment gates, and controlled infrastructure change."
      },
      {
        label: "Runtime",
        value: "OKE / K8s",
        detail: "OKE workload paths, private services, release validation, rollback readiness, and health signals."
      }
    ],
    environmentRunway: [
      { icon: "🧩", label: "dev" },
      { icon: "🧪", label: "test" },
      { icon: "🛡️", label: "stage" },
      { icon: "🚀", label: "prod" }
    ],
    controlPlaneMap: [
      {
        label: "IaC",
        value: "Codify OCI with Terraform modules, state-aware reviews, and promotion gates.",
        target: 1,
        signal: "Terraform / IaC"
      },
      {
        label: "IAM",
        value: "Design compartments, policies, service principals, and app auth boundaries.",
        target: 1,
        signal: "Cloud architecture"
      },
      {
        label: "Networking",
        value: "Shape private VCN paths, LB/API Gateway, Traefik, and authN/authZ.",
        target: 1,
        signal: "Secure networking"
      },
      {
        label: "OKE",
        value: "Run workload runtime, images, validation, scaling, and service exposure.",
        target: 1,
        signal: "Runtime platforms"
      },
      {
        label: "Data",
        value: "Wire Autonomous Database, Object Storage, Spark/Data Flow, and data movement.",
        target: 1,
        signal: "Data platforms"
      },
      {
        label: "Observability",
        value: "Build logs, metrics, Grafana dashboards, alarms, and health signals.",
        target: 1,
        signal: "Observability"
      },
      {
        label: "MLOps",
        value: "Prepare MLflow, Data Science pipelines, datasets, and model artifacts.",
        target: 1,
        signal: "MLOps foundations"
      }
    ]
  },
  fr: {
    intro:
      "J'aide les équipes à faire passer les changements cloud de l'architecture à la release avec garde-fous, automatisation et visibilité opérationnelle.",
    primaryCta: "Voir les projets",
    cvCta: "Télécharger le CV",
    contactCta: "Contact",
    terminalTitle: "oci-architect.sh",
    terminalLines: [
      {
        command: "platform.status --summary",
        output: "Architecture -> release, avec garde-fous et visibilité."
      }
    ],
    promotionLabel: "chemin de release",
    ownershipLabel: "carte opératoire",
    ownershipHint: "survol / clic",
    signals: [
      {
        label: "OCI",
        value: "architecture",
        detail: "Identité, réseau, compute, stockage, Autonomous Database et frontières de service."
      },
      {
        label: "IaC",
        value: "Terraform",
        detail: "Modules sensibles à l'état, plans faciles à revoir, contrôles d'environnement et changements maîtrisés."
      },
      {
        label: "Runtime",
        value: "OKE / K8s",
        detail: "Workloads OKE, services privés, validation de release, rollback et signaux de santé."
      }
    ],
    environmentRunway: [
      { icon: "🧩", label: "dev" },
      { icon: "🧪", label: "test" },
      { icon: "🛡️", label: "préprod" },
      { icon: "🚀", label: "prod" }
    ],
    controlPlaneMap: [
      {
        label: "IaC",
        value: "Codifier OCI avec modules Terraform, revues sensibles à l'état et contrôles de promotion.",
        target: 1,
        signal: "Terraform / IaC"
      },
      {
        label: "IAM",
        value: "Concevoir compartiments, policies, principaux de service et frontières d'auth applicative.",
        target: 1,
        signal: "Architecture cloud"
      },
      {
        label: "Réseau",
        value: "Structurer VCN privés, LB/API Gateway, Traefik et authN/authZ.",
        target: 1,
        signal: "Réseau sécurisé"
      },
      {
        label: "OKE",
        value: "Opérer runtime, images, validation, scaling et exposition des services.",
        target: 1,
        signal: "Plateformes runtime"
      },
      {
        label: "Data",
        value: "Connecter Autonomous Database, Object Storage, Spark/Data Flow et mouvements de données.",
        target: 1,
        signal: "Plateformes data"
      },
      {
        label: "Observabilité",
        value: "Construire logs, métriques, dashboards Grafana, alarmes et signaux de santé.",
        target: 1,
        signal: "Observabilité"
      },
      {
        label: "MLOps",
        value: "Préparer MLflow, pipelines Data Science, datasets et artefacts modèles.",
        target: 1,
        signal: "Fondations MLOps"
      }
    ]
  }
};

const uiContent = {
  en: {
    language: "English",
    switchLanguage: "Passer en français",
    sectionLabels: {
      top: "Intro",
      capabilities: "Capabilities",
      work: "Case Studies",
      experience: "Experience",
      certifications: "Certificates",
      contact: "Contact"
    },
    storyControlsLabel: "Portfolio story controls",
    previousPage: "Previous portfolio page",
    nextPage: "Next portfolio page",
    goTo: "Go to",
    themeTitle: (nextTheme) => `Switch to ${nextTheme} theme`,
    cvLinkLabel: "Abderrahmane Ouroui CV",
    contact: {
      eyebrow: "contact",
      title: "Let's build reliable cloud platforms.",
      body:
        "Hiring for OCI, DevOps, Platform Engineering, Kubernetes, Terraform, or MLOps work? My deepest production experience is on OCI, and I can apply the same secure, observable, automation-first standards across AWS, GCP, Azure, or other cloud environments.",
      emailSubject: "Portfolio inquiry",
      sendEmail: "Send email",
      alternatives: "Alternative email options",
      actions: {
        linkedin: ["Open LinkedIn", "Profile and professional history"],
        github: ["View GitHub", "Code and platform examples"],
        cvOnline: ["View CV online", "PDF viewer"],
        cvDownload: ["Download CV", "Recruiter-ready PDF"]
      }
    },
    capabilities: {
      eyebrow: "capabilities",
      title: "The platform work I can own."
    },
    caseStudies: {
      eyebrow: "case studies",
      title: "Selected platform case studies.",
      intro:
        "Problem, action, result, and evidence from cloud architecture, release safety, private networking, and data/ML work.",
      read: "Read case study",
      proofLabels: {
        role: "Role",
        stack: "Stack",
        outcome: "Outcome"
      }
    },
    caseDetail: {
      index: "Case-study index",
      home: "Home",
      sections: ["Problem", "Action", "Result", "Evidence"],
      proofLabels: {
        role: "Role",
        stack: "Stack",
        outcome: "Outcome"
      },
      keyDecisions: "key decisions",
      architectureExamples: "evidence examples",
      portableStandard: "portable standard",
      representativeExample: "representative example"
    },
    experience: {
      eyebrow: "experience",
      title: "Experience and delivery patterns.",
      intro: "Roles, operating model, and examples from architecture through production.",
      operatingModel: "operating model",
      timeline: "career timeline",
      proof: "proof of work",
      proofTitle: "Patterns I can take on.",
      proofIntro: "Architecture, automation, runtime, and reliability patterns shaped by production work."
    },
    certifications: {
      eyebrow: "certifications",
      title: "Verified credentials.",
      intro: "Focused credentials that support OCI architecture, secure cloud work, and scalable backend services.",
      verify: "Verify",
      opens: (issuer) => `Opens the public verification record from ${issuer}.`
    }
  },
  fr: {
    language: "Français",
    switchLanguage: "Switch to English",
    sectionLabels: {
      top: "Intro",
      capabilities: "Compétences",
      work: "Projets",
      experience: "Expérience",
      certifications: "Certifications",
      contact: "Contact"
    },
    storyControlsLabel: "Contrôles du portfolio",
    previousPage: "Page précédente",
    nextPage: "Page suivante",
    goTo: "Aller à",
    themeTitle: (nextTheme) => `Passer au thème ${nextTheme === "dark" ? "sombre" : "clair"}`,
    cvLinkLabel: "CV français Abderrahmane Ouroui",
    contact: {
      eyebrow: "contact",
      title: "Construisons des plateformes cloud fiables.",
      body:
        "Vous recrutez sur OCI, DevOps, Platform Engineering, Kubernetes, Terraform ou MLOps ? Mon expérience production la plus forte est sur OCI, avec des standards sécurisés, observables et automatisés applicables aussi sur AWS, GCP, Azure ou d'autres clouds.",
      emailSubject: "Contact portfolio",
      sendEmail: "Envoyer un email",
      alternatives: "Options email alternatives",
      actions: {
        linkedin: ["Ouvrir LinkedIn", "Profil et parcours professionnel"],
        github: ["Voir GitHub", "Code et exemples plateforme"],
        cvOnline: ["Voir le CV en ligne", "Visionneuse PDF"],
        cvDownload: ["Télécharger le CV", "PDF prêt à partager"]
      }
    },
    capabilities: {
      eyebrow: "compétences",
      title: "Le travail plateforme que je peux prendre en charge."
    },
    caseStudies: {
      eyebrow: "projets",
      title: "Projets plateforme sélectionnés.",
      intro:
        "Problème, action, résultat et preuves issus d'architecture cloud, sécurité de release, réseau privé et data/ML.",
      read: "Lire le projet",
      proofLabels: {
        role: "Rôle",
        stack: "Stack",
        outcome: "Résultat"
      }
    },
    caseDetail: {
      index: "Index des projets",
      home: "Accueil",
      sections: ["Problème", "Action", "Résultat", "Preuve"],
      proofLabels: {
        role: "Rôle",
        stack: "Stack",
        outcome: "Résultat"
      },
      keyDecisions: "décisions clés",
      architectureExamples: "exemples de preuve",
      portableStandard: "standard portable",
      representativeExample: "exemple représentatif"
    },
    experience: {
      eyebrow: "expérience",
      title: "Expérience et modes de livraison.",
      intro: "Rôles, modèle opérationnel et exemples de l'architecture à la production.",
      operatingModel: "modèle opérationnel",
      timeline: "parcours",
      proof: "preuves de travail",
      proofTitle: "Patterns que je peux prendre en charge.",
      proofIntro: "Architecture, automatisation, runtime et fiabilité issus du travail de production."
    },
    certifications: {
      eyebrow: "certifications",
      title: "Certifications vérifiées.",
      intro: "Certifications soutenant l'architecture OCI, le cloud sécurisé et les services backend scalables.",
      verify: "Vérifier",
      opens: (issuer) => `Ouvre la page publique de vérification ${issuer}.`
    }
  }
};

const frProfile = {
  ...profile,
  role: "Ingénieur Plateforme OCI construisant des chemins Terraform, OKE, réseau et observabilité pour systèmes de production",
  positionTitle: "Ingénieur DevOps / Ingénieur Plateforme",
  location: "Casablanca, Maroc",
  cvHtml: profile.cvFrHtml,
  cv: profile.cvFr,
  headline:
    "J'aide les équipes à faire passer les changements cloud de l'architecture à la release avec Terraform, OKE/Kubernetes, garde-fous, automatisation et visibilité opérationnelle.",
  summary:
    "OCI est mon environnement le plus fort. Le modèle reste portable : Infrastructure as Code, réseau sécurisé, IAM, Kubernetes, CI/CD, observabilité, maîtrise des coûts et chemins data/ML reproductibles."
};

const frCloudPortability = {
  title: "Des standards cloud, pas un verrouillage fournisseur",
  text:
    "OCI est mon environnement de production le plus approfondi. Les standards sont portables : Terraform, Kubernetes, réseau sécurisé, IAM, CI/CD, observabilité, coûts et fondations MLOps peuvent être adaptés à AWS, GCP, Azure et autres clouds.",
  proofPoints: [
    "Expérience production prouvée sur OCI",
    "Standards d'ingénierie indépendants du fournisseur",
    "Même exigence, primitives cloud différentes"
  ]
};

const frCapabilityProofPoints = [
  { emoji: "🛡️", value: "500+", label: "ressources protégées par environnement" },
  { emoji: "🛤️", value: "Dev→Prod", label: "garde-fous de release" },
  { emoji: "🤖", value: "IA-ready", label: "chemins data/ML traçables" }
];

const frCapabilitySignals = [
  {
    label: "Architecture cloud",
    value: "fondations OCI",
    emoji: "🏗️",
    brief: "Concevoir identité, réseau, compute, stockage et base de données.",
    detail: "Concevoir des fondations OCI autour d'IAM, compartments, VCN, compute, stockage, Autonomous Database et chemins de service maîtrisés.",
    stack: ["OCI", "IAM", "VCN", "Compute", "ADB"]
  },
  {
    label: "Plateformes runtime",
    value: "PaaS + conteneurs",
    emoji: "🚀",
    brief: "Démarrer un PaaS depuis zéro et packager les composants Kubernetes avec Helm.",
    detail: "Démarrer un projet Platform-as-a-Service depuis zéro tout en construisant les chemins runtime pour le packaging Kubernetes avec Helm, compute, images conteneur, services privés, scaling, validation et haute disponibilité.",
    stack: ["OKE", "K8s", "Helm", "Docker", "Linux"]
  },
  {
    label: "Réseau sécurisé",
    value: "auth vers app",
    emoji: "🔐",
    brief: "Connecter utilisateurs, gateways, Traefik, functions, services et bases via des chemins contrôlés.",
    detail: "Structurer les chemins authentifiés avec Load Balancer, API Gateway, Traefik, OCI Functions, Okta et services data.",
    stack: ["LB", "API GW", "Traefik", "Functions", "AuthZ"]
  },
  {
    label: "Terraform / IaC",
    value: "contrôle d'état",
    emoji: "🧱",
    brief: "Transformer les changements infra en livraison revue, reproductible et sensible à l'état.",
    detail: "Concevoir les frontières de modules, préserver l'état, auditer les changements partagés et rendre la livraison OCI reproductible.",
    stack: ["Terraform", "OCI Provider", "State", "Modules", "Review"]
  },
  {
    label: "CI/CD + release",
    value: "dev vers prod",
    emoji: "🛤️",
    brief: "Faire progresser les changements avec validation, rollback et contrôles de release.",
    detail: "Promouvoir les changements de dev à prod avec validation, plan de rollback, contrôles post-release et automatisation.",
    stack: ["GitLab", "Jenkins", "CI/CD", "Artifacts", "Rollback"]
  },
  {
    label: "Observabilité",
    value: "signaux + alarmes",
    emoji: "📈",
    brief: "Rendre la production visible via logs, métriques, alarmes et dashboards.",
    detail: "Améliorer détection et troubleshooting avec OCI Logging, OCI Monitoring, Grafana, alarmes, fraîcheur data et signaux de capacité.",
    stack: ["Logging", "Monitoring", "Grafana", "Alarms", "SRE"]
  },
  {
    label: "Plateformes data",
    value: "ADB + pipelines",
    emoji: "🗄️",
    brief: "Supporter base de données, Object Storage, Spark et mouvements de données privés.",
    detail: "Supporter Autonomous Database, Object Storage, OCI Data Flow, Spark/PySpark, streams et workflows de mouvement de données.",
    stack: ["ADB", "Object Storage", "Data Flow", "Spark", "Streams"]
  },
  {
    label: "Fondations MLOps",
    value: "MLflow + pipelines",
    emoji: "🤖",
    brief: "Préparer entraînement privé, tracking, artefacts et chemins GPU-ready.",
    detail: "Activer MLflow, jobs et pipelines OCI Data Science, images OCIR, buckets datasets, artefacts modèles et readiness GPU.",
    stack: ["MLflow", "OCI DS", "OCIR", "GPU", "MLOps"]
  }
];

const frCaseStudyOverrides = {
  "terraform-safe-oci-platform-foundation": {
    title: "Fondation de plateforme OCI sécurisée avec Terraform",
    eyebrow: "Architecture plateforme",
    summary:
      "Transformation des changements OCI en chemin Terraform revu avec contrôles d'état, garde-fous IAM et gates de release.",
    problem: "Les changements infra devenaient risqués quand responsabilité, impact d'état et étapes de promotion restaient flous.",
    approach:
      "Séparer les responsabilités infra en unités faciles à revoir, protéger les ressources sensibles à l'état et clarifier les chemins de release avant production.",
    action:
      "Définir frontières Terraform, contrôles IAM, gates de promotion et revue de release; isoler les ressources sensibles à l'état avant exécution production.",
    keyDecisions: [
      "Traiter l'état Terraform comme un actif de production.",
      "Rendre visibles IAM, réseau et frontières runtime pendant la revue.",
      "Utiliser des contrôles de promotion pour réduire dérive et recréations surprises."
    ],
    outcome:
      "Protection de 500+ ressources OCI par environnement et changements plateforme plus sûrs à revoir, promouvoir et opérer.",
    result:
      "500+ ressources OCI protégées par environnement et changements plus faciles à revoir, promouvoir et opérer.",
    evidence:
      "Diagramme de promotion d'environnement et checklist release couvrant impact d'état, frontière IAM, blast radius réseau et rollback.",
    artifacts: [
      {
        title: "Flux de promotion d'environnement",
        type: "flow",
        description: "Comment les changements plateforme deviennent revus clairement avant production.",
        steps: ["Plan", "Review", "Dev", "Test", "Préprod", "Prod"],
        alt: "Flux de promotion de plan et revue vers dev, test, préprod et prod."
      },
      {
        title: "Checklist de release",
        type: "checklist",
        description: "Checklist pour changements plateforme Terraform-safe.",
        items: ["Impact d'état revu", "Frontière IAM vérifiée", "Blast radius réseau compris", "Chemin de rollback documenté"]
      }
    ],
    portability:
      "Les primitives changent selon le cloud, mais le standard reste portable : frontières d'état, moindre privilège, revues claires et promotion contrôlée.",
    solution:
      "Frontières Terraform, garde-fous IAM, gates d'environnement et chemin de release revuable.",
    impact: "500+ ressources OCI protégées par environnement et risque de recréation surprise réduit.",
    proof: {
      role: "Architecture + livraison",
      stack: "OCI / Terraform",
      outcome: "500+ ressources protégées"
    },
    signal: "Socle cloud"
  },
  "secure-network-and-identity-edge": {
    title: "Périmètre réseau et identité sécurisé",
    eyebrow: "Sécurité cloud",
    summary:
      "Cartographie de chemins privés entre réseau OCI, IAM, API Gateway, Load Balancer, Traefik et authN/authZ.",
    problem: "Applications, APIs, bases, functions et intégrations d'identité manquaient d'un modèle de trafic privé simple et prévisible.",
    approach:
      "Cartographier les flux par frontière de confiance, aligner IAM et réseau, revoir l'exposition service et garder les frontières explicites.",
    action:
      "Cartographier les flux par frontière de confiance, aligner IAM et réseau, revoir l'exposition service et documenter les responsabilités.",
    keyDecisions: [
      "Favoriser des chemins privés quand l'exposition publique n'est pas nécessaire.",
      "Aligner identité et réseau dans la même revue.",
      "Préférer une responsabilité ingress claire et un routage observable."
    ],
    outcome:
      "Routage plus clair, posture sécurité renforcée et releases plus confiantes pour les chemins applicatifs privés.",
    result:
      "Routage plus clair et revue sécurité renforcée pour les chemins applicatifs privés.",
    evidence:
      "Diagramme d'accès privé et checklist sécurité pour moindre privilège, règles réseau, chemin TLS et responsabilité ingress.",
    artifacts: [
      {
        title: "Pattern d'accès privé",
        type: "flow",
        description: "Pattern représentatif pour raisonner sur frontières de confiance et exposition service.",
        steps: ["Identité", "Gateway", "Ingress", "Service", "Data"],
        alt: "Pattern d'accès privé de l'identité vers gateway, ingress, service et data."
      },
      {
        title: "Checklist sécurité",
        type: "checklist",
        description: "Questions de revue pour réseau OCI et identité.",
        items: ["Moindre privilège vérifié", "Règles réseau revues", "Chemin TLS compris", "Responsable ingress identifié"]
      }
    ],
    portability:
      "Le même standard edge sécurisé se traduit vers AWS, GCP, Azure ou autre cloud en mappant IAM, réseau, ingress et policies équivalents.",
    solution:
      "Chemins OCI contrôlés avec Load Balancer, API Gateway, NSGs, TLS, Traefik, Functions et authN/authZ.",
    impact: "Routage plus clair et meilleure qualité de revue sécurité pour chemins privés.",
    proof: {
      role: "Réseau + identité",
      stack: "Gateway / Traefik",
      outcome: "Edge privé"
    },
    signal: "Edge privé"
  },
  "mlops-data-platform-foundation-oci": {
    title: "Fondation MLOps et plateforme data sur OCI",
    eyebrow: "Data et AI platform",
    summary:
      "Connexion de MLflow, Object Storage, Data Flow/Spark, métadonnées d'exécution et artefacts dans un chemin data/ML reproductible sur OCI.",
    problem: "Le travail data/ML risquait de rester ponctuel : datasets flous, runs non tracés, exécution privée incomplète et artefacts non gérés.",
    approach:
      "Relier stockage dataset, compute/runtime, tracking modèles, gestion d'artefacts et contrôles opérationnels dans une fondation répétable.",
    action:
      "Relier stockage dataset, jobs d'exécution, tracking de runs, versioning d'artefacts, logging et contrôles de readiness entre services OCI.",
    keyDecisions: [
      "Traiter datasets, images runtime, expériences et artefacts modèles comme sujets plateforme.",
      "Garder l'exécution privée et observable avant élargissement.",
      "Utiliser des patterns de livraison répétables plutôt que des notebooks isolés."
    ],
    outcome:
      "Workflows prêts pour l'IA avec exécution contrôlée, flux d'artefacts, logging et gouvernance de livraison.",
    result:
      "Workflows prêts pour l'IA avec exécution contrôlée, artefacts traçables et contrôles opérationnels avant adoption élargie.",
    evidence:
      "Diagramme du cycle d'expérience et checklist readiness couvrant dataset, métadonnées de run, versioning d'artefacts et signaux opérationnels.",
    artifacts: [
      {
        title: "Cycle expérience et artefact",
        type: "flow",
        description: "Cycle de vie pour travail data et ML reproductible.",
        steps: ["Dataset", "Job", "Track", "Artefact", "Valider", "Promouvoir"],
        alt: "Cycle MLOps de dataset à job, tracking, artefact, validation et promotion."
      },
      {
        title: "Checklist readiness MLOps",
        type: "checklist",
        description: "Contrôles avant de considérer un chemin data ou ML comme prêt plateforme.",
        items: ["Dataset défini", "Métadonnées capturées", "Artefacts versionnés", "Signaux opérationnels revus"]
      }
    ],
    portability:
      "OCI est la référence prouvée; le modèle MLOps s'adapte en mappant stockage, compute, tracking et primitives CI/CD d'un autre fournisseur.",
    solution:
      "Chemin data/ML privé avec OCI Data Science, MLflow, OCIR, Object Storage, MySQL, Data Flow et Spark.",
    impact: "Workflows data/ML contrôlés avec artefacts traçables et checks de readiness.",
    proof: {
      role: "Construction plateforme",
      stack: "MLflow / Data Flow",
      outcome: "Base IA-ready"
    },
    signal: "IA-ready"
  }
};

const frTimeline = [
  {
    period: "2023 - Présent",
    title: "Ingénieur DevOps II / Ingénieur Plateforme, Oracle",
    achievement: "Démarrage d'un projet PaaS depuis zéro avec garde-fous OCI, migrations Terraform, releases OKE et observabilité.",
    detail:
      "Construire et opérer des capacités OCI-native : fondations PaaS, IaC, réseau sécurisé, CI/CD, services data, observabilité, release et workflows ML reproductibles."
  },
  {
    period: "2023",
    title: "Assistant de recherche, Oracle",
    achievement: "Livraison backend et CI/CD avec Java, Groovy, Gradle, Jenkins et GitLab.",
    detail:
      "Travail sur services backend et workflows CI/CD avec Java, Groovy, Gradle, Jenkins, GitLab, JUnit et Mockito."
  },
  {
    period: "2022",
    title: "Développeur Full Stack, diaaland",
    achievement: "Applications produit et intégrations tierces côté backend, base de données et frontend React.",
    detail:
      "Développement de workflows fitness avec NestJS, MongoDB, React et intégrations Strava/Garmin."
  },
  {
    period: "2021",
    title: "Développeur Web, INTELLCAP SARL",
    achievement: "Fonctionnalités web marketplace avec React, GraphQL, PHP et WooCommerce.",
    detail:
      "Livraison d'une application web d'enchères d'art avec React, GraphQL, PHP et WooCommerce."
  }
];

const frProofOfWork = [
  {
    emoji: "🧩",
    title: "PaaS depuis zéro",
    handle: "Plateforme 0 à 1 -> architecture, packaging Kubernetes, livraison, garde-fous.",
    signals: ["0 à 1", "PaaS"]
  },
  {
    emoji: "🏗️",
    title: "Garde-fous OCI",
    handle: "Forme OCI -> IAM, VCN, compute, stockage, Autonomous Database -> contrôles répétables.",
    signals: ["OCI + IAM", "ADB"]
  },
  {
    emoji: "🔁",
    title: "Migration Terraform-safe",
    handle: "Migration tenancy/données -> état Terraform, accès, réseau, données -> risque réduit.",
    signals: ["état maîtrisé", "continuité data"]
  },
  {
    emoji: "🔐",
    title: "Ingress privé",
    handle: "Chemins privés -> LB, API Gateway, Traefik, TLS, authZ -> ingress plus sûr.",
    signals: ["ingress sécurisé", "routage privé"]
  },
  {
    emoji: "🚀",
    title: "Release OKE",
    handle: "Runtime Kubernetes -> OKE, images, contrôles, rollback -> releases validées.",
    signals: ["OKE", "dev à prod"]
  },
  {
    emoji: "📈",
    title: "Observabilité Grafana",
    handle: "Signaux -> logging, monitoring, dashboards Grafana, alarmes -> triage plus rapide.",
    signals: ["dashboards", "triage"]
  },
  {
    emoji: "🤖",
    title: "Workflows data/ML",
    handle: "Chemin prêt pour l'IA -> MLflow, Data Science, Data Flow, artefacts -> runs contrôlés.",
    signals: ["MLflow", "pipelines"]
  }
];

const frCertifications = certifications.map((certification) => ({
  ...certification,
  focus:
    certification.issuer === "Oracle"
      ? certification.name.includes("Architect")
        ? "Validation OCI niveau architecture couvrant identité, réseau, compute, stockage, base de données et design résilient."
        : "Fondamentaux OCI couvrant concepts cloud, bases sécurité, services plateforme et vocabulaire opérationnel."
      : "Signal backend pour design de services, microservices Java, scalabilité et fondations applicatives prêtes à livrer.",
  scope:
    certification.issuer === "Oracle"
      ? certification.name.includes("Architect")
        ? ["architecture OCI", "IAM", "réseau"]
        : ["fondations OCI", "sécurité", "services"]
      : ["microservices", "Java", "scalabilité"]
}));

const frSkillGroups = [
  {
    title: "Plateforme cloud",
    skills: ["OCI", "IAM", "Compartments", "VCN", "Subnets", "Route Tables", "Load Balancer", "API Gateway", "Functions", "Compute", "Object Storage", "Autonomous Database", "Certificates", "KMS"]
  },
  {
    title: "Livraison",
    skills: ["Terraform", "Infrastructure as Code", "Helm", "Packaging plateforme Kubernetes", "CI/CD", "GitLab", "Jenkins", "Docker", "OCIR", "Artifactory", "Release Management", "Rollback"]
  },
  {
    title: "Opérations",
    skills: ["Kubernetes", "OKE", "Linux", "Networking", "NSGs", "Security Lists", "OCI Logging", "OCI Monitoring", "OCI Events", "Alarms", "Grafana", "Incident Response", "Cost Optimization"]
  },
  {
    title: "Data et AI",
    skills: ["OCI Data Science", "OCI Data Flow", "Spark", "PySpark", "MLflow", "MySQL", "Autonomous Database", "Object Storage", "LLM Integration", "GPU Readiness", "MLOps Foundations"]
  }
];

const frCaseStudies = caseStudies.map((study) => ({
  ...study,
  ...(frCaseStudyOverrides[study.slug] ?? {})
}));

export function getPortfolioContent(language = "en") {
  if (language !== "fr") {
    return {
      language: "en",
      ui: uiContent.en,
      hero: heroContent.en,
      profile,
      targetRoles,
      heroHighlights,
      cloudPortability,
      certifications,
      metrics,
      capabilitySignals,
      capabilityLogoRail,
      capabilityProofPoints,
      caseStudies,
      additionalDeliveryPatterns,
      skillGroups,
      timeline,
      proofOfWork,
      workingStyle,
      publicProofRepos
    };
  }

  return {
    language: "fr",
    ui: uiContent.fr,
    hero: heroContent.fr,
    profile: frProfile,
    targetRoles: ["DevOps / Plateforme", "Production OCI", "Standards cloud portables"],
    heroHighlights: [
      "Architecture plateforme OCI",
      "Terraform, CI/CD et réseau sécurisé",
      "Observabilité, plateformes data et MLOps"
    ],
    cloudPortability: frCloudPortability,
    certifications: frCertifications,
    metrics: [
      { value: "500+", label: "ressources OCI protégées par environnement" },
      { value: "~3 ans", label: "construction et opération de plateformes cloud Oracle" },
      { value: "GA", label: "contribution à une première release générale" }
    ],
    capabilitySignals: frCapabilitySignals,
    capabilityLogoRail,
    capabilityProofPoints: frCapabilityProofPoints,
    caseStudies: frCaseStudies,
    additionalDeliveryPatterns: [
      {
        title: "Migration tenancy et données",
        summary:
          "Planification contrôlée de migration : fondation plateforme, IAM, réseau, données, validation, rollback et contrôles post-migration.",
        signal: "Chemin migration",
        technologies: ["OCI", "IAM", "Networking", "Object Storage", "Autonomous Database", "Terraform"]
      },
      {
        title: "Observabilité et fiabilité",
        summary:
          "Patterns répétables de logs, métriques, dashboards Grafana, alarmes et runbooks pour détection, fraîcheur data, capacité et santé production.",
        signal: "Signals as code",
        technologies: ["OCI Logging", "OCI Monitoring", "Grafana", "Events", "Alarms"]
      }
    ],
    skillGroups: frSkillGroups,
    timeline: frTimeline,
    proofOfWork: frProofOfWork,
    workingStyle: {
      title: "Là où je suis le plus utile",
      text:
        "Problèmes cloud ambigus où architecture, automatisation, opérations et apprentissage incident doivent devenir un modèle répétable. OCI est mon environnement le plus fort; les standards sont volontairement portables."
    },
    publicProofRepos
  };
}
