# 🗄️ Backend — KanwonrWFlow

> **Status:** Reserved for future implementation.

## Overview

This directory is the designated home for the production backend services of the KanwonrWFlow Kanban Board application.

The current phase of development uses **Next.js Route Handlers** (`frontend/src/app/api/`) as a serverless mock backend deployed on **Vercel**. Once the project matures, the real backend will be migrated here.

---

## Planned Tech Stack

| Layer              | Technology        | Purpose                                              |
| :----------------- | :---------------- | :--------------------------------------------------- |
| **Runtime**        | Node.js / Go      | Core API server runtime                              |
| **Database**       | PostgreSQL         | Persistent relational data store for tasks and users  |
| **ORM**            | Prisma ORM         | Type-safe database client and schema migration tool   |
| **Authentication** | Google OAuth / JWT | Secure user identity and session management           |

## Migration Checklist

- [ ] Initialize Prisma schema with `Task`, `User`, and `Board` models
- [ ] Set up PostgreSQL instance (local Docker or hosted service)
- [ ] Migrate mock in-memory data to persistent database
- [ ] Replace Next.js Route Handlers with dedicated API endpoints
- [ ] Implement authentication middleware
- [ ] Add rate limiting and input validation

---

> ⚠️ **Do not place production backend code in the `frontend/` directory.** The current API routes in `frontend/src/app/api/` are temporary mock endpoints only.
