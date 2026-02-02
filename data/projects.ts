
import { ProjectPost } from "@/types/post";

export const projects: ProjectPost[] = [
  {
    id: 5,
    type: "project",
    slug: "smart-hydroponics-with-realtime-monitoring-system",
    title: "Smart Hydroponics with Realtime Monitoring System",
    description:
      "A smart hydroponics system featuring real-time monitoring of environmental conditions such as water level, temperature, humidity, and pH levels. Includes a web-based dashboard, RBAC-secured user management, and data-driven insights for optimized plant cultivation.",
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
      "DS18B20",
      "Water & Nutrient Pumps",
    ],
    screenshots: [
        {
            src: "/projects/hydroponics/dashboard.png",
            alt: "Dashboard overview",
        },
        {
            src: "/projects/hydroponics/charts.png",
            alt: "Sensor data visualization",
        },
        {
            src: "/projects/hydroponics/mobile.png",
            alt: "Mobile responsive view",
        },
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
    description:
      "Reusable async utility that generates secure passwords and safely updates user records.",
    tech: ["Node.js", "Security", "Async/Await"],
  },
];