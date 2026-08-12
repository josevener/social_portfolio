import { ProjectPost } from "@/types/post";

export const projects: ProjectPost[] = [
  {
    id: 10,
    type: "project",
    slug: "brokerage-platform",
    title: "Brokerage Platform",
    description:
      "A polished Medicare lead-generation and CRM platform that helps licensed brokers capture inquiries, manage consultations, and maintain compliance-focused workflows.",
    liveUrl: "https://medicji.vercel.app",
    tags: ["Healthcare", "CRM", "Lead Management", "Compliance", "Next.js"],
    content: [
      "Brokerage Platform is a healthcare-focused web product built for a licensed Medicare brokerage workflow. It combines a public-facing marketing site with internal operational tools so the same product can educate visitors, capture qualified leads, and support broker follow-through.",
      "On the customer side, the experience is designed to reduce confusion around Medicare plan options while encouraging appointment requests and lead submissions. The product includes educational pages, plan comparison flows, and structured forms for inquiries, follow-ups, and appointment scheduling.",
      "On the internal side, I implemented CRM-style features for tracking leads, appointments, outreach, consent records, and audit activity. This made it easier to manage operational visibility while keeping compliance-sensitive data organized and accessible to the team.",
      "A key part of the build was shaping the system around trust. The interface emphasizes clarity, calm visual hierarchy, and transparent messaging, while the application logic supports role-aware access, secure sessions, and records that fit privacy-conscious healthcare workflows.",
    ],
    problem:
      "Medicare-focused sales and support workflows often get split across disconnected landing pages, manual spreadsheets, and ad hoc follow-up processes, which makes customer trust and internal coordination harder to maintain.",
    solution:
      "I built a single experience that combines patient-friendly marketing pages with internal lead, appointment, consent, and audit tooling so the team can manage outreach and follow-through inside one cohesive platform.",
    highlights: [
      "Built both the public acquisition funnel and the internal CRM dashboard in one product",
      "Added lead, appointment, consent, document, and audit-log workflows for broker operations",
      "Designed the UX around trust, clarity, and compliance-aware messaging for healthcare users",
    ],
    screenshots: [
      {
        src: "/images/projects/brokerage-platform/cover.png",
        alt: "Medicare brokerage CRM dashboard with lead, consultation, and compliance panels",
      },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "SQLite",
      "Server Actions",
      "Session Auth",
    ],
  },
  {
    id: 9,
    type: "project",
    slug: "task-management-platform",
    title: "Task Management Platform",
    description:
      "A premium team task management platform with workspace organization, secure authentication, and a real-time dashboard for projects, assignments, and team activity.",
    tags: ["Productivity", "Collaboration", "Dashboard", "Authentication"],
    content: [
      "Task Management Platform is a collaboration product built to help teams organize projects, assign work, and keep day-to-day execution visible. The product balances polished UI presentation with practical workspace and task flows for ongoing team use.",
      "The application includes a modern dashboard for project metrics, overdue and upcoming tasks, and broader team activity. I structured the experience so users can move quickly between high-level project visibility and the detailed work needed to keep tasks progressing.",
      "I also implemented authentication, password recovery, email workflows, and workspace management to support a more complete product feel. That made the project stronger not just as a task board, but as a usable full-stack SaaS-style system.",
      "A big focus for this build was perceived quality. The interface uses a premium visual direction with glassmorphism accents, clear spacing, and motion details, while the backend supports the operational features needed for real team coordination.",
    ],
    problem:
      "Teams need more than a basic checklist. Without structured workspaces, task visibility, and reliable account flows, productivity tools quickly become hard to trust and harder to adopt consistently.",
    solution:
      "I built a full-stack task management platform with organized workspaces, role-aware collaboration flows, dashboard metrics, and supporting auth and email systems so the product feels production-minded from both UX and engineering perspectives.",
    highlights: [
      "Created a premium dashboard for tasks, projects, and team activity summaries",
      "Implemented secure authentication, OTP verification, and password recovery flows",
      "Combined a Next.js frontend with an Express and MySQL backend for end-to-end product behavior",
    ],
    screenshots: [
      {
        src: "/images/projects/task-management-platform/cover.png",
        alt: "Task management dashboard with project metrics, workflow columns, and team activity",
      },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MySQL",
      "Nodemailer",
    ],
  },
  {
    id: 5,
    type: "project",
    slug: "smart-hydroponics-with-realtime-monitoring-system",
    title: "Smart Hydroponics with Realtime Monitoring System",
    description:
      "An IoT-based smart hydroponics system that enables real-time monitoring, automation, and data-driven plant cultivation through a secure web dashboard.",
    tags: [
      "IoT",
      "Smart Farming",
      "Web Dashboard",
      "Automation",
      "Capstone Project",
    ],
    context: {
      program: "BS Information Technology — Graduate",
      institution: "Colegio de Sta. Teresa de Avila",
      period: "July 2025",
    },
    content: [
      "For my capstone project, I led the development of a Smart Hydroponics System designed to modernize plant cultivation through automation, realtime monitoring, and data-driven decision-making. The goal of the project was to help growers maintain optimal growing conditions while reducing manual effort and human error.",
      "The system integrates IoT sensors to continuously monitor critical environmental parameters such as water level, temperature, and nutrient conditions. These readings are transmitted in realtime to a centralized web dashboard, allowing users to track the system's status and respond quickly to changes that could affect plant health.",
      "On the software side, I designed and implemented a role-based access control architecture to ensure secure and structured access to system features. Administrators can manage users and system configurations, while standard users are limited to monitoring and basic controls. This approach improved both system security and usability.",
      "I also worked on the data visualization layer, transforming raw sensor data into clear, user-friendly charts and status indicators. This made it easier for users to interpret trends, detect anomalies, and make informed adjustments to the hydroponics setup.",
      "As the project lead, I coordinated development using Git for version control and followed an Agile-style workflow, breaking the system into manageable features and iterating based on testing and feedback. This experience strengthened my skills in collaboration, system design, and translating real-world problems into functional technical solutions.",
    ],
    tech: [
      "PHP",
      "HTML5",
      "Bootstrap 5",
      "CSS",
      "MySQL",
      "Arduino Uno R3",
      "ESP8266 NodeMCU",
      "TDS Sensor",
      "pH Sensor",
      "DHT11",
      "Water Level Sensor",
      "DS18B20 Water Temperature Sensor",
      "Water & Nutrient Pumps",
    ],
    screenshots: [
      {
        src: "/images/projects/hydroponics/one.png",
        alt: "Hydroponics",
      },
      {
        src: "/images/projects/hydroponics/two.png",
        alt: "Hydroponics",
      },
      {
        src: "/images/projects/hydroponics/three.png",
        alt: "Hydroponics",
      },
    ],
  },
];
