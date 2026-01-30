import { Post } from "@/types/post";

export const posts: Post[] = [
  // EXPERIENCE
  {
    id: 1,
    type: "experience",
    period: "July 2025",
    title: "Graduate – BS Information Technology",
    description: "Colegio de Sta. Teresa de Avila",
    tech: [],
  },
  {
    id: 2,
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
    id: 3,
    type: "experience",
    period: "June 2025 – Present",
    title: "Software Developer",
    description: "JeonSoft Corporation",
    tech: ["Node.js", "React.js", "Python 3.8", "PostgreSQL", "SQL", "MySQL", "Ruby on Rails", "Webix", "Vanilla JS"],
  },

  // PROJECTS
  {
    id: 4,
    type: "project",
    slug: "secure-password-generator",
    title: "Secure Password Generator Utility",
    description:
      "Reusable async utility that generates secure passwords and safely updates user records.",
    tech: ["Node.js", "Security", "Async/Await"],
  },
  {
    id: 5,
    type: "project",
    slug: "excel-export-module",
    title: "Excel Export Module for Admin Reports",
    description:
      "Structured Excel export system with reusable logic for reporting needs.",
    tech: ["Laravel", "PHP", "Laravel Excel"],
  },
  {
    id: 6,
    type: "project",
    slug: "role-based-admin-panel",
    title: "Role-Based Admin Panel",
    description:
      "Implemented RBAC without introducing redundant user types.",
    tech: ["Laravel", "PostgreSQL", "RBAC"],
  },

  // POSTS
  {
    id: 7,
    type: "post",
    title: "Promise.all vs Sequential await",
    description:
      "When parallel execution helps and when it introduces risk.",
    tech: ["JavaScript", "Async", "Performance"],
  },
  {
    id: 8,
    type: "post",
    title: "Why Declaring Variables Matters in Node.js",
    description:
      "Real-world reminder of how undeclared variables can break production.",
    tech: ["Node.js", "Best Practices"],
  },
];