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
        { label: "View Source", href: "https://github.com/Hperam/incident-copilot-api" }
      ]
    },
    {
      title: "Search-as-a-Service",
      status: "Open source",
      impact: "Inverted index, TF-IDF ranking, pluggable storage, JMH benchmarks",
      summary:
        "Production-grade full-text search engine built in Java from first principles. Inverted index with TF-IDF scoring, pluggable storage (in-memory or PostgreSQL via JPA), REST API, Testcontainers integration tests, and JMH benchmarks at 10k and 100k document corpus sizes.",
      tech: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "Testcontainers", "JMH", "Docker"],
      role: "Full system design: core algorithm, storage abstraction, REST API, test strategy, benchmarking",
      result:
        "Algorithmic depth (inverted index, TF-IDF), systems thinking (pluggable storage, thread safety), and production habits (Flyway, Testcontainers, JMH).",
      links: [
        { label: "View Source", href: "https://github.com/Hperam/search-service" }
      ]
    },
    {
      title: "Order Pipeline",
      status: "Open source",
      impact: "Kafka outbox pattern, 3 microservices, saga choreography, idempotent consumers",
      summary:
        "Event-driven order processing system with three independent microservices communicating via Kafka. The order-service uses the Outbox Pattern to guarantee at-least-once delivery. Inventory reservation uses pessimistic locking with idempotency checks. Full Testcontainers integration tests.",
      tech: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL", "Flyway", "Testcontainers", "Docker Compose"],
      role: "Full system design: event schema, outbox pattern, saga flow, idempotency, integration testing",
      result:
        "Demonstrates distributed systems depth: reliable messaging without 2PC, saga choreography, idempotent consumer patterns, and multi-service Testcontainers testing.",
      links: [
        { label: "View Source", href: "https://github.com/Hperam/order-pipeline" }
      ]
    },
    {
      title: "Rate Limiter",
      status: "Open source",
      impact: "Token Bucket, Sliding Window, Fixed Window with atomic Lua scripts on Redis",
      summary:
        "Distributed rate limiting library for Spring Boot with three algorithms implemented via atomic Redis Lua scripts. Includes a Spring AOP @RateLimit annotation with SpEL key resolution, so any method can be rate-limited with a single annotation. Testcontainers tests verify correctness and concurrency.",
      tech: ["Java 21", "Spring Boot", "Redis", "Lua scripts", "Spring AOP", "SpEL", "Testcontainers"],
      role: "Library design: interface abstraction, Lua script atomicity, AOP annotation, factory pattern",
      result:
        "Pluggable, production-ready rate limiting. Three algorithms in one library with atomic Redis operations preventing race conditions under concurrent load.",
      links: [
        { label: "View Source", href: "https://github.com/Hperam/rate-limiter" }
      ]
    },
    {
      title: "Feature Store",
      status: "Open source",
      impact: "DuckDB columnar storage, point-in-time correct lookups, training dataset generation",
      summary:
        "Offline ML feature store with DuckDB for columnar feature vector storage and PostgreSQL for metadata. Enforces point-in-time correctness: lookups at a given timestamp never return features computed after that time, preventing training/serving skew and label leakage.",
      tech: ["Python 3.11", "FastAPI", "DuckDB", "SQLAlchemy 2.0", "Alembic", "PostgreSQL", "Docker"],
      role: "System design: storage architecture, point-in-time query logic, training dataset merge, REST API",
      result:
        "Purpose-built offline feature store that solves label leakage at the data layer. DuckDB columnar scans make training dataset generation significantly faster than row-oriented alternatives.",
      links: [
        { label: "View Source", href: "https://github.com/Hperam/feature-store" }
      ]
    },
    {
      title: "Leaderboard API",
      status: "Open source",
      impact: "Redis sorted sets, WebSocket live updates, O(log N) rank operations",
      summary:
        "Real-time leaderboard service backed by Redis sorted sets with WebSocket (STOMP) live updates pushed to all connected clients on score change. Score deduplication ensures only the highest score per player is kept. Full score history in PostgreSQL for analytics.",
      tech: ["Java 21", "Spring Boot", "Redis", "WebSocket", "STOMP", "PostgreSQL", "Flyway"],
      role: "Full system design: Redis data model, WebSocket broadcast, score deduplication, REST and WS APIs",
      result:
        "O(log N) rank operations via Redis ZREVRANK. WebSocket push eliminates polling. Clean separation between real-time leaderboard (Redis) and persistent history (PostgreSQL).",
      links: [
        { label: "View Source", href: "https://github.com/Hperam/leaderboard-api" }
      ]
    },
    {
      title: "URL Intelligence",
      status: "Open source",
      impact: "Async fetch, redirect chain tracking, heuristic phishing detection, Redis caching",
      summary:
        "URL metadata extraction and risk scoring service built with async FastAPI. Follows redirect chains, extracts HTML metadata (og:title, og:description, og:image), and applies heuristic risk scoring across signals: suspicious TLDs, URL entropy, Cyrillic homograph detection, and IP-as-hostname.",
      tech: ["Python 3.11", "FastAPI", "PostgreSQL", "Redis", "httpx", "BeautifulSoup4", "Docker"],
      role: "Service design: async fetch pipeline, risk scoring heuristics, Redis caching strategy, REST API",
      result:
        "Lightweight phishing detection without external APIs. Redis SHA-256 keyed caching avoids redundant fetches. Risk score and redirect chain exposed in a single API response.",
      links: [
        { label: "View Source", href: "https://github.com/Hperam/url-intelligence" }
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
