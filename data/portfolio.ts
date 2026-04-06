export const portfolio = {
  name: "Harshith Sai Peram",
  title: "Software Engineer focused on backend, full-stack, and intelligent systems",
  location: "Seattle, WA",
  email: "harshith18sai@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Hperam" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/harshith-sai-peram-aa3b73138/"
    },
    { label: "Email", href: "mailto:harshith18sai@gmail.com" }
  ],
  nav: [
    { id: "hero", label: "Home" },
    { id: "about", label: "Values" },
    { id: "skills", label: "Stack" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ],
  intro:
    "Amazon engineer focused on backend platforms, full-stack delivery, and cloud-native systems at scale. I care about reliable architecture, strong execution, and building software that holds up in production.",
  stats: [
    { label: "Years Building", value: "5+" },
    { label: "Annual Savings", value: "$2M" },
    { label: "Fallback After Launch", value: "<0.1%" },
    { label: "Forecast Horizon", value: "16 weeks" }
  ],
  spotlight: [
    "Distributed systems",
    "Backend engineering",
    "Data platforms",
    "Full-stack delivery",
    "Cloud architecture",
    "Production reliability"
  ],
  metrics: [
    { label: "Production systems", detail: "Platform, simulation, and operational tooling" },
    { label: "Full-stack ownership", detail: "Commerce flows, APIs, auth, and shipped user experiences" },
    { label: "Cloud depth", detail: "AWS services, observability, delivery, and rollout safety" }
  ],
  skillGroups: [
    {
      title: "Full-Stack",
      items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "App Architecture"]
    },
    {
      title: "Backend",
      items: ["Java", "Node.js", "Express", "Python", "API Design", "Microservices"]
    },
    {
      title: "Cloud / DevOps",
      items: ["AWS", "Docker", "Terraform", "ECS", "Lambda", "CloudWatch"]
    },
    {
      title: "Databases",
      items: ["Postgres", "MongoDB", "DynamoDB", "Redis", "Athena", "Redshift"]
    },
    {
      title: "AI / ML",
      items: ["OpenAI", "Structured Outputs", "RAG", "Evaluation Loops", "Prompt Design", "Multimodal UX"]
    },
    {
      title: "Tools",
      items: ["GitHub Actions", "Kafka", "Spark", "Airflow", "Feature Flags", "Observability"]
    }
  ],
  projects: [
    {
      title: "Commerce Copilot",
      status: "Live demo",
      impact: "Multimodal discovery, grounded retrieval, and explainable AI recommendations",
      summary:
        "A multimodal commerce assistant that combines catalog-grounded retrieval with structured AI recommendations. Users can search by text, voice, or image, review ranked candidates, and generate explainable product picks with tradeoff summaries.",
      tech: ["Static GitHub Pages demo", "OpenAI", "Catalog ranking", "Browser voice input", "Image upload", "Session-only key flow"],
      role: "Client-first product engineering, full-stack architecture thinking, AI interaction design",
      result:
        "Demonstrates end-to-end product engineering, secure session-scoped API usage, grounded recommendation design, and strong UI judgment inside a static-hosted environment.",
      links: [
        { label: "Open Live Demo", href: "/commerce-copilot/", target: "_blank" },
        {
          label: "View Source",
          href: "https://github.com/Hperam/incident-copilot-api"
        }
      ]
    },
    {
      title: "Search-as-a-Service",
      status: "Open source",
      impact: "Inverted index with TF-IDF ranking, pluggable storage, and JMH benchmarks",
      summary:
        "A production-grade full-text search engine built in Java from first principles. Inverted index with TF-IDF scoring, pluggable storage (in-memory or PostgreSQL), REST API, Testcontainers integration tests, and JMH benchmarks measured at 10k and 100k document corpus sizes.",
      tech: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "Testcontainers", "JMH", "Docker"],
      role: "Full system design — core algorithm, storage abstraction, REST API, test strategy, benchmarking",
      result:
        "Demonstrates algorithmic depth (inverted index, TF-IDF), systems thinking (pluggable storage, thread safety), and production habits (Flyway migrations, Testcontainers, JMH benchmarks).",
      links: [
        { label: "View Source", href: "https://github.com/Hperam/search-service" }
      ]
    }
  ],
  experience: [
    {
      company: "Amazon",
      role: "Software Engineer",
      duration: "2022 - Present",
      highlight:
        "Built large-scale fulfillment simulations and supporting data pipelines for demand forecasting and staffing decisions.",
      bullets: [
        "Created reproducible simulation inputs with versioning, auditability, and scenario comparison.",
        "Introduced rollout safety mechanisms and data contract improvements during production migration.",
        "Reduced post-launch fallback below 0.1 percent and helped unlock $2M in annual savings."
      ]
    },
    {
      company: "Flipkart",
      role: "Software Development Engineer",
      duration: "2019 - 2021",
      highlight:
        "Delivered responsive commerce experiences with React, Node.js, MongoDB, Docker, Terraform, and AWS.",
      bullets: [
        "Built React interfaces where needed while owning the underlying service and commerce workflow integration.",
        "Developed APIs for listings, auth, orders, and checkout workflows.",
        "Owned secure access patterns and cloud deployment setup."
      ]
    },
    {
      company: "University at Buffalo",
      role: "M.S. Computer Science",
      duration: "2021 - 2022",
      highlight:
        "Graduate training that sharpened systems thinking, software engineering fundamentals, and technical communication.",
      bullets: [
        "Built on an engineering foundation from VIT University with IoT and sensors specialization.",
        "Expanded focus toward scalable backend systems, cloud architecture, and AI product work.",
        "Strengthened the bridge between theory, experimentation, and shipping software."
      ]
    }
  ],
};
