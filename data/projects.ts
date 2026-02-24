import { ProjectPost } from "@/types/post";

export const projects: ProjectPost[] = [
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

      "The system integrates IoT sensors to continuously monitor critical environmental parameters such as water level, temperature, and nutrient conditions. These readings are transmitted in realtime to a centralized web dashboard, allowing users to track the system’s status and respond quickly to changes that could affect plant health.",

      "On the software side, I designed and implemented a role-based access control (RBAC) architecture to ensure secure and structured access to system features. Administrators can manage users and system configurations, while standard users are limited to monitoring and basic controls. This approach improved both system security and usability.",

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
  {
    id: 6,
    type: "project",
    slug: "excel-export-module",
    title: "Excel Export Module for Admin Reports",

    description:
      "A reusable Excel export module that generates structured administrative reports from database records.",

    tags: ["Backend", "Reporting", "Data Export", "Admin Tools"],

    highlights: [
      "Reusable export logic for multiple report types",
      "Optimized handling of large datasets",
      "Consistent formatting for business reports",
    ],

    tech: ["Laravel", "PHP", "Laravel Excel"],
  },

  {
    id: 7,
    type: "project",
    slug: "role-based-admin-panel",
    title: "Role-Based Admin Panel",

    description:
      "An admin panel with role-based access control that ensures secure and structured feature access.",

    tags: ["RBAC", "Security", "Admin Panel", "Access Control"],

    highlights: [
      "Centralized role and permission management",
      "Improved application security",
      "Scalable permission structure",
    ],

    tech: ["Laravel", "PostgreSQL", "RBAC"],
  },

  {
    id: 8,
    type: "project",
    slug: "secure-password-generator",
    title: "Secure Password Generator Utility",

    description:
      "A secure password generation utility that creates strong credentials and safely updates user records asynchronously.",

    tags: ["Security", "Authentication", "Utilities"],

    highlights: [
      "Cryptographically secure password generation",
      "Async-safe database updates",
      "Reusable utility for authentication workflows",
    ],

    tech: ["Node.js", "Security", "Async/Await"],
  },
];