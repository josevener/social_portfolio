import { Post } from "@/types/post";

export const posts: Post[] = [
  // EXPERIENCE
  {
    id: 1,
    type: "experience",
    period: "2024 — Present",
    title: "Full-Stack Developer",
    description: "Freelance",
    tech: [
      "Node.js", "Laravel", "PHP", "React.js", "Next.js", "C#.NET", "Visual Basic.NET", "PostgreSQL", "MySQL",
      "Flutter", "Android Development", "IoT Development", "Arduino Uno R3"
    ],
  },
  {
    id: 2,
    type: "experience",
    period: "July 2025",
    title: "Graduate – BS Information Technology",
    description: "Colegio de Sta. Teresa de Avila",
    tech: [],
  },
  {
    id: 3,
    type: "experience",
    period: "February — May 2025",
    title: "Web Developer",
    description: "BFD Corporation | Internship",
    tech: ["Laravel API", "Next.js", "MySQL", "Postman"],
  },
  {
    id: 4,
    type: "experience",
    period: "June 2025 – Present",
    title: "Software Developer",
    description: "JeonSoft Corporation",
    tech: ["Node.js", "React.js", "Python 3.8", "PostgreSQL", "SQL", "MySQL", "Ruby on Rails", "Webix", "Vanilla JS"],
  },

  // PROJECTS
  {
    id: 5,
    type: "project",
    slug: "smart-hydroponics-with-realtime-monitoring-system",
    title: "Smart Hydroponics with Realtime Monitoring System",
    description: `A smart hydroponics system featuring real-time monitoring
     of environmental conditions such as water level, temperature, humidity, 
     and pH levels. Includes a web-based dashboard for visualizing plant growth data, 
     user and role management secured with Role-Based Access Control (RBAC), 
     and data-driven insights to support efficient and optimized plant cultivation.`,
    tech: [
      "PHP", "HTML5", "Bootstrap 5", "CSS", "MySQL", 
      "Arduino Uno R3", "ESP8266 NodeMCU", "Total Dissolved Solids (TDS) Sensor",
      "pH Sensor", "Temperature Sensor (DHT11)", "Water Level Sensor", 
      "DS18B20 Water Temperature Sensor", "Water and Nutrient Pumps"
    ],
  },
  {
    id: 6,
    type: "project",
    slug: "excel-export-module",
    title: "Excel Export Module for Admin Reports",
    description:
      "Structured Excel export system with reusable logic for reporting needs.",
    tech: ["Laravel", "PHP", "Laravel Excel"],
  },
  {
    id: 7,
    type: "project",
    slug: "role-based-admin-panel",
    title: "Role-Based Admin Panel",
    description:
      "Implemented RBAC without introducing redundant user types.",
    tech: ["Laravel", "PostgreSQL", "RBAC"],
  },
  {
    id: 8,
    type: "project",
    slug: "secure-password-generator",
    title: "Secure Password Generator Utility",
    description: "Reusable async utility that generates secure passwords and safely updates user records.",
    tech: ["Node.js", "Security", "Async/Await"],
  },

  // POSTS
  {
    id: 9,
    type: "post",
    title: "Promise.all vs Sequential await",
    description:
      "When parallel execution helps and when it introduces risk.",
    tech: ["JavaScript", "Async", "Performance"],
  },
  {
    id: 10,
    type: "post",
    title: "Why Declaring Variables Matters in Node.js",
    description:
      "Real-world reminder of how undeclared variables can break production.",
    tech: ["Node.js", "Best Practices"],
  },
];