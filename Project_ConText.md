# 🚀 My Kanban Board - AI Co-pilot Knowledge Base

## 1. Project Overview
- **Goal:** Create a personal Kanban board web application supporting "To Do", "In Progress", and "Done" statuses.
- **Future Plan:** Potential to open-source the project later. Code must be highly clean, readable, and type-safe.
- **Architecture:** Clear separation between `frontend/` and `backend/` directories (Monorepo style setup).
- **Environment:** Developed on openSUSE Tumbleweed-Slowroll operating system using VS Code.

## 2. Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Type-safe)
- **Styling:** Tailwind CSS v4 (Light/Dark mode initialized via CSS variables in globals.css)
- **Database (Planned):** PostgreSQL coupled with Prisma ORM
- **Drag-and-Drop (Planned):** @dnd-kit/core

## 3. Directory Layout & Architecture
This project follows a clean architecture structure where the web application lives entirely inside the `frontend/` folder:

```text
MY-KANBAN-BOARD/
├── backend/          # (Reserved for future API/Database services)
├── docs/             # (Documentation, architecture notes, and user guides)
└── frontend/         # (Next.js App Router root application)
    ├── public/       # (Static assets such as global images and icons)
    ├── src/
    │   ├── app/      # # Core Routing (Strictly requires layout.tsx and page.tsx)
    │   ├── assets/   # (Local media assets: images, icons, and sounds used in code)
    │   ├── components/ # (Reusable UI components: Card, Button, Column, etc.)
    │   ├── services/ # (API client functions and data-fetching logic)
    │   └── store/    # (Global client state management)