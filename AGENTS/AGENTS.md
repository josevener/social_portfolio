# Purpose
This file defines how AI coding agents (e.g. Antigravity and Codex) should behave when working in this repository. Agents must follow the rules below to ensure code quality, consistency, and safety.

# General Rules
- Follow existing project structure and conventions.
- Prefer clarity over cleverness.
- Do not introduce unnecessary abstractions.
- Do not refactor unrelated code unless explicitly asked.
- Do not invent APIs, database schemas, or fields.
- If unsure, ask for clarification instead of guessing.
- Keep changes minimal and focused.
- Ensure all code is compatible with Windows (e.g. use proper path separators).
- Do not modify the following files unless explicitly asked:
  - `next.config.ts`
  - `tsconfig.json`
  - `package.json`
  - `postcss.config.mjs`
  - `tailwind.config.ts` (if applicable)
- Always ask for confirmation before implementing any changes unless explicitly stated that you can proceed or if it is obvious in the conversation that you can proceed even without asking for confirmation.

# Tech Stack

## Frontend / Core
- **Framework**: Next.js 16.1.6 (App Router)
- **Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4, CSS Modules, Vanilla CSS
- **UI Components**: Shadcn UI (Avatar, Dropdown, HoverCard, Popover, etc.)
- **Icons**: Lucide React

## Data & State
- **Data Fetching**: Next.js server/client patterns.
- **Static Data**: Managed in `@/data/*.ts`.

# General Coding Standards
- Use 2 spaces for indentation.
- Ensure variable names are descriptive and follow project conventions.
- **Naming Conventions**:
  - Components/Classes: `PascalCase` (e.g., `ProfileHeader.tsx`, `PostCard.tsx`).
  - Functions/Variables: `camelCase` (e.g., `getSortedPosts`, `isMenuOpen`).
  - Constants: `SCREAMING_SNAKE_CASE` (e.g., `MAX_POST_LIMIT`).
  - Types/Interfaces: `PascalCase` (e.g., `BlogPost`, `ProjectItem`).
- **AI-Generated Code**: All code written or suggested by an AI agent **must include comments** explaining the logic, especially for non-obvious or complex sections.

# Frontend Coding Standards

## UI Design Principles
- **User-Friendly**: Labels, buttons, and messages must use plain, everyday language.
- **Visual Excellence**: Maintain the premium look with smooth transitions, balanced spacing, and refined typography.
- **Responsiveness**: All components must be fully responsive using Tailwind's breakpoint prefixes (`sm:`, `md:`, `lg:`, etc.).
- **Consistency**: Use components from `@/components/layout/` and `@/components/ui/` (Radix) for a unified experience.

## Component Patterns
- **Hooks**: Prefer `const [state, setState] = useState()` for local state.
- **Refs**: Use `useRef` for DOM access and scroll management.
- **Performance**: Use dynamic imports or React.memo where appropriate for heavy components (e.g., games/previews).

# Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (layout, profile, feed, games).
- `data/`: Static content and mock data (posts, projects, experiences).
- `lib/`: Utility functions and shared logic.
- `public/`: Static assets (images, icons).
- `types/`: TypeScript interfaces and type definitions.

# Tool Usage
- Use `npm run dev` for local development.
- Use `npm run build` to verify production builds.
- Use `npm run lint` to ensure code quality.

# Final Note for Agents
This repository is a professional portfolio showcasing technical skills. Every line of code should reflect high quality and attention to detail.
