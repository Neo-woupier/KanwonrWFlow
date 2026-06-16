import { NextRequest, NextResponse } from "next/server";
import { tasks, type Task } from "../store";

// =============================================================
// PATCH /api/tasks/[id] — Update fields of an existing task
// =============================================================
// Supported fields: title, status, priority, deadline, description
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return NextResponse.json(
      { error: `Task with ID '${id}' not found.` },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();

    // --- Whitelist only valid fields ---
    const validStatuses: Task["status"][] = ["Todo", "In Progress", "Done", "On Hold"];
    const validPriorities: Task["priority"][] = ["High", "Medium", "Low"];

    if (body.title !== undefined) {
      if (typeof body.title !== "string" || !body.title.trim()) {
        return NextResponse.json(
          { error: "'title' must be a non-empty string." },
          { status: 400 }
        );
      }
      tasks[taskIndex].title = body.title.trim();
    }

    if (body.status !== undefined) {
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: `'status' must be one of: ${validStatuses.join(", ")}` },
          { status: 400 }
        );
      }
      tasks[taskIndex].status = body.status;
    }

    if (body.priority !== undefined) {
      if (!validPriorities.includes(body.priority)) {
        return NextResponse.json(
          { error: `'priority' must be one of: ${validPriorities.join(", ")}` },
          { status: 400 }
        );
      }
      tasks[taskIndex].priority = body.priority;
    }

    if (body.deadline !== undefined) {
      tasks[taskIndex].deadline = String(body.deadline).trim() || "No deadline set";
    }

    if (body.description !== undefined) {
      tasks[taskIndex].description = String(body.description).trim() || "No description provided";
    }

    return NextResponse.json(tasks[taskIndex], { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }
}

// =============================================================
// DELETE /api/tasks/[id] — Remove a task from the store
// =============================================================
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return NextResponse.json(
      { error: `Task with ID '${id}' not found.` },
      { status: 404 }
    );
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);

  return NextResponse.json(
    { message: `Task '${deletedTask.title}' (${deletedTask.id}) deleted successfully.` },
    { status: 200 }
  );
}
