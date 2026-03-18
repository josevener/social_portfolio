import { BlogPost } from "@/types/post";

export const posts: BlogPost[] = [
  {
    id: 9,
    type: "post",
    slug: "promise-all-vs-sequential-await",
    title: "Promise.all vs Sequential await",
    description:
      "When parallel execution helps and when it introduces risk.",
    tech: ["JavaScript", "Async", "Performance"],
    images: [
      {
        src: "/images/blogs/promise-all-vs-sequential-await/hero.png",
        alt: "Parallel vs sequential execution diagram",
      },
    ],
  },
  {
    id: 10,
    type: "post",
    slug: "why-declaring-variables-matters-in-nodejs",
    title: "Why Declaring Variables Matters in Node.js",
    description:
      "Real-world reminder of how undeclared variables can break production.",
    tech: ["Node.js", "Best Practices"],
    images: [
      {
        src: "/images/blogs/why-declaring-variables-matters-in-nodejs/hero.png",
        alt: "Node.js variable declaration importance",
      },
    ],
  },
];