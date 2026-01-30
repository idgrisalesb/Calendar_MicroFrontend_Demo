---
project_name: 'Siesa-Agents'
user_name: 'SiesaTeam'
date: '2026-01-30'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 50
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Frontend Core:** Vite 6+, React 18.3+ (Singleton Required), TypeScript 5.5+ (Strict Mode).
- **Microfrontends:** Module Federation v2+ (via `@module-federation/vite`).
- **Routing:** TanStack Router 1+ (File-based, Type-safe).
- **State Management:** Zustand 5+ (Client), TanStack Query 5+ (Server).
- **Styling:** TailwindCSS v4 + CSS Modules + `siesa-ui-kit`.
- **Backend Core:** .NET 10, C# Minimal API.
- **Data Access:** Entity Framework Core 10 (Primary), linq2db (Performance), DynamicLinq (Runtime filters).
- **Database:** PostgreSQL 18+ (UUID Primary Keys Mandatory).

## Critical Implementation Rules

### Language-Specific Rules

- **TypeScript Strict Mode:** Absolutely no `any`. Use `unknown` or proper Generics if needed.
- **Path Aliases:** ALWAYS use aliases (e.g., `@/shared/components`) instead of relative paths (`../../../shared`).
- **Clean Architecture Imports:** Imports MUST flow inward: Presentation -> Application -> Domain. Never import Presentation from Domain.
- **C# Records:** Use `record` types for all DTOs, Commands, and Queries to ensure immutability.
- **Async/Await:** All I/O operations must be `async`. Avoid `.Result` or `.Wait()` to prevent deadlocks.

### Framework-Specific Rules

- **Frontend Logic:** ALL business logic must live in Custom Hooks (`useMyCase`) or Zustand Actions. Components are for rendering ONLY.
- **Fetching:** NEVER use `useEffect` for data fetching. Use `TanStack Query` hooks (`useQuery`, `useMutation`).
- **State Management:** Use `Zustand` for global client state and `URL Search Params` for shareable UI state (filters, sorting).
- **Component Source:** CHECK `siesa-ui-kit` FIRST. If not found, use shadcn/ui. Avoid custom UI implementations.
- **Microfrontends:** ALWAYS expose components via `remoteEntry.js` defined in `vite.config.ts`.

### Testing Rules

- **Frontend Tests:** Use **Vitest** for all frontend tests. Co-locate unit tests in `__tests__` folders.
- **Backend Tests:** Use **xUnit** for .NET.
- **API Mocking:** ALWAYS use **MSW** (Mock Service Worker) for API integration tests. Never mock `axios` directly.
- **Database Tests:** Use **TestContainers** for C# integration tests. NO shared databases between tests.
- **Critical Path:** prioritized testing for Domain Entities and Application Use Cases (>80% coverage).

### Code Quality & Style Rules

- **Naming Conventions:**
  - **Database:** `snake_case` (e.g., `user_id`, `is_active`).
  - **C#:** `PascalCase` (e.g., `UserId`, `IsActive`).
  - **TS Files:** `kebab-case` (e.g., `user-profile.tsx`).
  - **React Components:** `PascalCase` (e.g., `UserProfile`).
- **Structure:** Follow `Module/Domain/Feature` hierarchy strictly.
- **Layers:** Maintain strict `Clean Architecture` boundaries. Presentation Layer cannot access Infrastructure directly.
- **Linting:** CI fails on warnings. Remove unused imports/variables immediately.

### Development Workflow Rules

- **Branch Naming:** `type/scope/short-description` (e.g., `feat/calendar/month-view`).
- **Commits:** Follow **Conventional Commits**: `feat(scope): description`.
- **Pull Requests:** Must pass CI (Lint + Test + Build) before merge.
- **Review:** Remove all `console.log` and commented-out code before requesting review.
- **Deployment:** Docker images for Backend; Static assets for Frontend MFEs.

### Critical Don't-Miss Rules

- **NO DateTime:** Use `DateTimeOffset.UtcNow` for ALL timestamps. Never `DateTime`.
- **Localization:** UI Text = **Spanish**. Code/Comments = **English**.
- **No Direct Access:** Frontend never touches DB. Presentation never touches Infrastructure directly.
- **State Isolation:** MFE stores must be isolated to avoid polluting the Host App state.
- **Security:** Sanitize inputs. No hardcoded secrets. Validate Permissions on Backend.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-01-30
