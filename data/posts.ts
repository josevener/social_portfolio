import { BlogPost } from "@/types/post";

export const posts: BlogPost[] = [
  {
    id: 9,
    type: "post",
    slug: "promise-all-vs-sequential-await",
    title: "Promise.all vs Sequential await",
    description: "When parallel execution helps and when it introduces risk.",
    tech: ["JavaScript", "Async", "Performance"],
    author: "Jose Vener Rafael",
    publishedAt: "March 18, 2026",
    introduction:
      "In modern JavaScript development, handling asynchronous operations efficiently is often the difference between a snappy UI and a sluggish one. Choosing between sequential 'await' and Promise.all can have a massive impact on your application's speed, especially as your data requirements grow.",
    images: [
      {
        src: "/images/blogs/promise-all-vs-sequential-await/hero.png",
        alt: "Parallel vs sequential execution diagram",
      },
    ],
    sections: [
      {
        heading: "The Bottleneck: Sequential await",
        content: [
          "Sequential execution happens when you await promises one after another. If you have three independent API calls, awaiting them sequentially means the start of the second call is blocked by the completion of the first. This is a common pitfall that leads to 'waterfall' loading patterns.",
          "In a typical dashboard, you might fetch user profiles, recent notifications, and analytics. If each takes 800ms, your user waits nearly 2.5 seconds just for the primary data to arrive.",
        ],
        code: {
          language: "javascript",
          snippet: `// Waterfall loading: ~2.4 seconds total
const user = await fetchUser();
const notifications = await fetchNotifications();
const analytics = await fetchAnalytics();`,
        },
      },
      {
        heading: "Concurrency with Promise.all",
        content: [
          "Promise.all allows you to trigger all promises simultaneously. The browser or Node.js runtime can handle the network requests in parallel. The total time becomes equal to the slowest single request, which is a massive performance win.",
          "This is especially useful when the tasks are computationally expensive or involve high-latency network requests. By grouping them, you ensure the CPU and network are used more efficiently.",
        ],
        code: {
          language: "javascript",
          snippet: `// Concurrent loading: ~800ms total
const [user, notifications, analytics] = await Promise.all([
  fetchUser(),
  fetchNotifications(),
  fetchAnalytics()
]);`,
        },
      },
      {
        heading: "The Fail-Fast Trap",
        content: [
          "While Promise.all is fast, it's also unforgiving. It uses a 'fail-fast' mechanism: if any single promise in the array rejects, the entire Promise.all call rejects immediately. This can be problematic if you still want the data from the successful requests.",
        ],
        list: {
          items: [
            "Atomic operations: Use Promise.all if you need ALL data to proceed.",
            "Partial success: Use Promise.allSettled if you can handle some failures.",
            "Error isolation: Individual try/catch blocks within the map can also prevent total failure.",
          ],
        },
      },
      {
        heading: "Advanced Concurrency Control",
        content: [
          "Sometimes you don't want ALL promises to run at once (e.g., hitting a rate-limited API). In these cases, libraries like p-limit or custom batching logic should be used alongside Promise.all to throttle the concurrency level.",
        ],
      },
    ],
    conclusion:
      "Default to Promise.all for independent asynchronous tasks to maximize speed. If you need robustness against individual failures or need to handle rate limits, upgrade your strategy with Promise.allSettled or a concurrency limiter. Optimizing these 'waterfalls' is the first step toward a premium user experience.",
  },
  {
    id: 10,
    type: "post",
    slug: "why-declaring-variables-matters-in-nodejs",
    title: "Why Declaring Variables Matters in Node.js",
    description:
      "Real-world reminder of how undeclared variables can break production.",
    tech: ["Node.js", "Best Practices"],
    author: "Jose Vener Rafael",
    publishedAt: "March 15, 2026",
    introduction:
      "One of the most common yet avoidable bugs in Node.js server environments is the use of undeclared variables. Unlike a quick browser script that reloads on every refresh, Node.js servers are long-running processes, making accidental globals a silent killer for performance and stability.",
    images: [
      {
        src: "/images/blogs/why-declaring-variables-matters-in-nodejs/hero.png",
        alt: "Node.js variable declaration importance",
      },
    ],
    sections: [
      {
        heading: "The 'Accidental Global' Leak",
        content: [
          "Assigning a value to a variable without 'const', 'let', or 'var' attaches it to the 'global' object in Node.js. This object persists for the entire lifetime of the process. In a high-traffic server, this means data from one request can bleed into another.",
          "Imagine setting 'currentUser' globally. If Request A sets it and Request B arrives before A finishes, Request B might start using Request A's data.",
        ],
        code: {
          language: "javascript",
          snippet: `async function handleRequest(req, res) {
  // OOPS: user becomes global and shared!
  user = await db.users.find(req.params.id); 
  res.json(user);
}`,
        },
      },
      {
        heading: "The Memory Leak Spiral",
        content: [
          "Global variables are never cleaned up by the garbage collector (GC) because they are always reachable from the root. Over time, as more unique values are assigned to undeclared variables, your server's memory heap will grow indefinitely.",
          "This lead to a 'sawtooth' memory graph followed by a flatline crash when the process hits its heap limit (OOM).",
        ],
      },
      {
        heading: "Debugging the Invisible",
        content: [
          "Finding these leaks in a large codebase is notoriously difficult because the code looks 'technically' correct to the untrained eye. However, the impact on production is undeniable.",
        ],
        list: {
          items: [
            "Data corruption: Shared state leads to unpredictable logic.",
            "Security risks: Accidentally exposing sensitive info to the wrong request.",
            "Heavier GC cycles: The runtime struggles to free up memory.",
          ],
        },
      },
      {
        heading: "Best Practices for Prevention",
        content: [
          "Enabling 'use strict' at the top of your files or using ESM (which is strict by default) is your first line of defense. Linters like ESLint with the 'no-undef' rule are also essential for catching these during development.",
        ],
        code: {
          language: "javascript",
          snippet: `// Modern approach: ESM and strict rules
'use strict';

const processData = (data) => {
  const result = transform(data); // declared correctly
  return result;
};`,
        },
      },
    ],
    conclusion:
      "A stable Node.js application depends on predictable state. By strictly scoping your variables and leveraging modern tooling, you protect your server from data contamination and fatal memory leaks. Clean code isn't just about aesthetics; it's about production reliability.",
  },
];