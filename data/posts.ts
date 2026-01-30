import { Post } from "@/types/post";

export const posts: Post[] = [
  // 🔹 EXPERIENCE
  {
    id: 1,
    type: "experience",
    title: "🚨 Fixed a Blasting Email Bug in Production",
    description:
      "A client experienced unexpected mass email notifications. Root cause was an undeclared variable in a Node.js service causing data reuse across requests. Implemented a fix and provided a non-technical RCA.",
    tech: ["Node.js", "PostgreSQL", "Production Debugging"],
  },
  {
    id: 2,
    type: "experience",
    title: "📉 Investigated Intermittent Client Connectivity Issues",
    description:
      "Diagnosed intermittent connectivity issues reported by a client. Verified logs, ruled out server-side faults, and coordinated findings with support.",
    tech: ["Troubleshooting", "Logs", "Client Support"],
  },

  // 🔹 PROJECTS
  {
    id: 3,
    type: "project",
    title: "🔐 Secure Password Generator Utility",
    description:
      "Created a reusable async utility that generates secure passwords, hashes them, and updates user records safely in the database.",
    tech: ["Node.js", "Security", "Async/Await"],
  },
  {
    id: 4,
    type: "project",
    title: "📦 Excel Export Module for Admin Reports",
    description:
      "Built a structured Excel export system using Laravel Excel to support reporting needs while keeping export logic clean and reusable.",
    tech: ["Laravel", "PHP", "Laravel Excel"],
  },
  {
    id: 5,
    type: "project",
    title: "🧩 Role-Based Admin Panel",
    description:
      "Implemented role-based access control for admin users, separating JS admins and standard admins without introducing redundant user types.",
    tech: ["Laravel", "PostgreSQL", "RBAC"],
  },

  // 🔹 POSTS / LEARNINGS
  {
    id: 6,
    type: "post",
    title: "🧠 Promise.all vs Sequential await",
    description:
      "Compared Promise.all with sequential awaits and documented when parallel execution improves performance and when it introduces risk.",
    tech: ["JavaScript", "Async", "Performance"],
  },
  {
    id: 7,
    type: "post",
    title: "🧪 Why Declaring Variables Matters in Node.js",
    description:
      "A real-world reminder that undeclared variables can leak state across requests and cause severe production issues.",
    tech: ["Node.js", "JavaScript", "Best Practices"],
  },
  {
    id: 8,
    type: "post",
    title: "🎨 Organizing MUI / ShadCN Forms Cleanly",
    description:
      "Refactored complex checkbox grids into reusable components for better readability and maintainability.",
    tech: ["React", "ShadCN UI", "Clean Code"],
  },
];