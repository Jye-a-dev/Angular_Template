# Modern Angular Architectural Conventions & Rules

## Core Paradigms

- **Standalone Only**: Zero `NgModule` usage. All components, directives, and pipes are standalone (default in Angular 19+).
- **Dependency Injection**: Always use `inject()` function at field declaration. Do not use constructor parameter injection.
- **Signal-Based Reactivity**: Prefer Angular Signals (`signal`, `computed`, `effect`) for component and service states.
- **Component Inputs & Outputs**: Use `input()`, `input.required()`, and `output()` API functions instead of `@Input` / `@Output` decorators.
- **Control Flow**: Exclusively use built-in control flow (`@if`, `@else`, `@for`, `@switch`, `@defer`). Do not use `*ngIf` or `*ngFor`.
- **Change Detection**: Enable `provideZonelessChangeDetection()` and use `ChangeDetectionStrategy.OnPush` across components.
- **Routing & Interceptors**: Use Functional Guards (`CanActivateFn`) and Functional Interceptors (`HttpInterceptorFn`).

## Styling & Utilities

- **Tailwind CSS v4 Engine**: Configured via `@tailwindcss/postcss` in `.postcssrc.json` and `@import "tailwindcss";` in `src/styles.css`. No legacy `tailwind.config.js`.
- **Class Merging**: Always combine dynamic CSS classes using the `cn()` utility (`clsx` + `tailwind-merge`) located at `@/shared/utils/cn`.

## Directory Structure

- `src/app/core/`: Singleton services, functional guards, HTTP interceptors, typed environment config.
- `src/app/features/<feature>/`: Feature isolation containing dedicated `components/`, `models/`, `schemas/`, `services/`, and `<feature>.routes.ts`.
- `src/app/layouts/`: Application layout shell components with `<router-outlet />`.
- `src/app/shared/`: Reusable UI components, custom directives, pipes, and utility functions.

## Validation & Environment

- **Typed Config**: All environment variables are parsed and validated via Zod in `src/app/core/config/env.ts`.
- **Sync Scripts**: Environment synchronization handled via `scripts/sync-env.mjs` before dev and build phases.

## Code Quality & Git

- **Lint & Format**: ESLint v9 Flat Config integrated with `eslint-config-prettier` and Prettier HTML Angular parser.
- **Commit Standards**: Enforce Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`) checked by Husky & Commitlint.
