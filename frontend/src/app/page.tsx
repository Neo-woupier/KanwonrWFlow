// /frontend/src/app/page.tsx

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. กำหนด Type สำหรับโครงสร้างข้อมูลของคอลัมน์และงาน (Type-safe)
interface Task {
  id: string;
  title: string;
  description: string;
}

interface KanbanColumn {
  id: "todo" | "in-progress" | "done";
  title: string;
  tasks: Task[];
}

// 2. Mock data เริ่มต้นสำหรับการแสดงผล UI
const initialColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "1", title: "Setup Project Repository", description: "Initialize Git and Next.js app" },
      { id: "2", title: "Install Tailwind v4 & Shadcn", description: "Configure basic styling utilities" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "3", title: "Design Kanban Board UI", description: "Create the main dashboard layout" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "4", title: "Project Brainstorming", description: "Define core features and tech stack" },
    ],
  },
];

export default function KanbanPage() {
  // ในอนาคตเราจะเปลี่ยนไปใช้ State management หรือ Fetch จาก Database จริง
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns);

  return (
    <div className="min-h-screen bg-black text-zinc-50 flex flex-col font-sans">
      
      {/* --- HEADER SECTION --- */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          My Kanban Workflow
        </h1>
        {/* มุมขวาบนแสดง @username ตามโจทย์ */}
        <div className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
          @username
        </div>
      </header>

      {/* --- KANBAN BOARD SECTION --- */}
      <main className="flex-1 p-8 overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-7xl mx-auto h-full">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col h-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 gap-4">
              
              {/* หัวข้อของแต่ละ Column */}
              <div className="flex justify-between items-center px-2">
                <h2 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">
                  {column.title}
                </h2>
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-mono">
                  {column.tasks.length}
                </span>
              </div>

              {/* ส่วนแสดงรายการ Task การ์ดด้านใน */}
              <div className="flex flex-col gap-3 min-h-[500px] rounded-lg">
                {column.tasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all cursor-grab active:cursor-grabbing shadow-md group"
                  >
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium text-zinc-100 group-hover:text-white">
                        {task.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {task.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}

                {column.tasks.length === 0 && (
                  <div className="flex items-center justify-center h-24 border border-dashed border-zinc-800 rounded-lg text-xs text-zinc-500">
                    No tasks here
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
