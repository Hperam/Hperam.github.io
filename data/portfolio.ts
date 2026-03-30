export const portfolio = {
  name: "Harshith Sai Peram",
  title: "Software Engineer building scalable, beautiful, intelligent products",
  location: "Seattle, WA",
  email: "harshithsai98@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Hperam" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/harshith-sai-peram-aa3b73138/"
    },
    { label: "Email", href: "mailto:harshithsai98@gmail.com" }
  ],
  nav: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Stack" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "credibility", label: "Credibility" },
    { id: "contact", label: "Contact" }
  ],
  intro:
    "Former Amazon engineer focused on high-scale systems, AI-forward product experiences, and cloud-native data platforms. I care about technical depth, product taste, and execution quality in equal measure.",
  stats: [
    { label: "Years Building", value: "5+" },
    { label: "Annual Savings", value: "$2M" },
    { label: "Fallback After Launch", value: "<0.1%" },
    { label: "Forecast Horizon", value: "16 weeks" }
  ],
  spotlight: [
    "Distributed systems",
    "AI product engineering",
    "Data platforms",
    "Frontend craft",
    "Cloud architecture",
    "Product-minded delivery"
  ],
  about:
    "I build systems that have to be trusted: planning platforms, production migrations, customer-facing applications, and intelligent interfaces. My edge is pairing engineering rigor with strong UI and product instincts so the software feels as good as it performs.",
  aboutPoints: [
    "Built and operated large-scale simulation workflows at Amazon for forecasting and operational planning.",
    "Delivered full-stack commerce systems at Flipkart using React, Node.js, MongoDB, Docker, and AWS.",
    "Comfortable across backend design, cloud systems, data pipelines, and polished product surfaces."
  ],
  metrics: [
    { label: "Production systems", detail: "Platform, simulation, and operational tooling" },
    { label: "Customer products", detail: "Commerce flows, auth, and responsive UIs" },
    { label: "Cloud depth", detail: "AWS services, observability, delivery, and rollout safety" }
  ],
  skillGroups: [
    {
      title: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "UX Systems"]
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
      impact: "Multimodal discovery, grounded recommendations, and session-scoped AI access",
      summary:
        "A polished commerce assistant that supports text, voice, and image input, ranks grounded catalog candidates first, and then generates structured AI recommendations with tradeoffs and share-ready summaries.",
      tech: ["Next.js portfolio integration", "OpenAI", "Node.js", "Express", "Browser voice input", "Session-only key flow"],
      role: "Product engineering, full-stack architecture, AI interaction design",
      result:
        "Demonstrates end-to-end product taste: recruiter-friendly presentation, real code, live demo access, and secure tab-scoped API usage.",
      links: [
        { label: "Open Demo", href: "/commerce-copilot/" },
        {
          label: "View Source",
          href: "https://github.com/Hperam/Hperam.github.io/tree/main/commerce-copilot"
        }
      ]
    },
    {
      title: "ScenarioOps AI",
      status: "Flagship concept",
      impact: "Decision systems for operations teams with explainable what-if planning",
      summary:
        "An AI-assisted planning workspace that combines scenario simulation, forecast evaluation, and natural-language explanation so operations teams can understand why a recommendation changed.",
      tech: ["Python", "Spark", "AWS", "Evaluation", "Data contracts", "Product analytics"],
      role: "Systems design, data quality architecture, decision tooling",
      result:
        "Translates prior Amazon-scale planning work into a differentiated, senior-level case study.",
      links: []
    },
    {
      title: "Runbook Agent",
      status: "High-leverage concept",
      impact: "Agentic triage grounded in logs, metrics, traces, and operational context",
      summary:
        "An incident response copilot for cloud services that retrieves telemetry and runbook context, generates grounded next steps, and keeps a human in the loop.",
      tech: ["OpenAI", "CloudWatch", "FastAPI", "Telemetry", "RAG", "Guardrails"],
      role: "Platform product thinking, observability-first AI systems",
      result:
        "Signals backend depth, operational empathy, and modern AI product judgment.",
      links: []
    }
  ],
  experience: [
    {
      company: "Amazon",
      role: "Software Engineer",
      duration: "2022 - 2026",
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
        "Built React interfaces and reusable frontend systems for smoother navigation and engagement.",
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
  credibility: {
    logos: ["Amazon", "Flipkart", "University at Buffalo", "AWS", "OpenAI"],
    testimonials: [
      {
        quote:
          "References and written recommendations available on request for hiring teams.",
        author: "Recommendation Placeholder",
        title: "Manager / Teammate reference"
      },
      {
        quote:
          "Portfolio designed to showcase both engineering depth and product taste, not just a list of technologies.",
        author: "Engineering Narrative",
        title: "Recruiter-facing positioning"
      }
    ],
    achievements: [
      "Built systems for operational planning at Amazon scale",
      "Strong full-stack foundation from Flipkart commerce delivery",
      "Open to backend, platform, AI product, and full-stack SDE 2 roles"
    ]
  }
};
