// src/app/api/tasks/store.ts

/**
 * ============================================================
 * 📦 In-Memory Task Store (Mock Database)
 * ============================================================
 * Module-scoped array that persists across API calls within
 * the same serverless function lifecycle.
 *
 * ⚠️ IMPORTANT: Data resets on every cold start / redeploy.
 * This is intentional for the mock phase. Replace with
 * Prisma + PostgreSQL when migrating to production.
 * ============================================================
 */

export interface Task {
  id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done" | "On Hold";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  deadline: string;
  description: string;
}

/**
 * The single source of truth for all tasks in the mock backend.
 * Exported as a mutable reference so both `/api/tasks` and
 * `/api/tasks/[id]` route handlers share the same dataset.
 */
export const tasks: Task[] = [];

/**
 * Generate a unique task ID in the format `TASK-XXXX`.
 */
export function generateTaskId(): string {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TASK-${randomPart}`;
}

/**
 * Get the current timestamp formatted as `DD Mon YYYY`.
 * Example: "16 Jun 2026"
 */
export function getCurrentTimestamp(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
