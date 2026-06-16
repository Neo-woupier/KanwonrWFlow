// src/app/api/tasks/route.ts

import { NextRequest, NextResponse } from "next/server";
import { tasks, generateTaskId, getCurrentTimestamp, type Task } from "./store";

// =============================================================
// GET /api/tasks — Return the full list of mock tasks
// =============================================================
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(tasks, { status: 200 });
}

// =============================================================
// POST /api/tasks — Create a new task and append to the store
// =============================================================
// Expected body: { title: string, deadline?: string, description?: string, priority?: string }
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // --- Validation ---
    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { error: "Field 'title' is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const validPriorities = ["High", "Medium", "Low"] as const;
    const priority = validPriorities.includes(body.priority)
      ? (body.priority as Task["priority"])
      : "Medium";

    // --- Build new task ---
    const newTask: Task = {
      id: generateTaskId(),
      title: body.title.trim(),
      status: "Todo",
      priority,
      createdAt: getCurrentTimestamp(),
      deadline: body.deadline?.trim() || "No deadline set",
      description: body.description?.trim() || "No description provided",
    };

    tasks.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }
}
