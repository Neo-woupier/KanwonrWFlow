"use client";

import React, { useState } from "react";
import { Plus, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskList from "@/components/kanban/TaskList";
import { initialTasks, Task } from "@/data/mockTasks";
import CreateTaskModal from "@/components/kanban/CreateTaskModel";

export default function KanbanTablePage() {
  const [activeTab, setActiveTab] = useState<string>("Todo");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { name: "Todo", count: tasks.filter(t => t.status === "Todo").length },
    { name: "In Progress", count: tasks.filter(t => t.status === "In Progress").length },
    { name: "Done", count: tasks.filter(t => t.status === "Done").length },
    { name: "On Hold", count: tasks.filter(t => t.status === "On Hold").length }
  ];

  // 🚨 เช็คตรงนี้: ต้องรับแค่ (title, deadline, description) 3 ค่าเท่านั้นครับบอส
  const handleSaveNewTask = (title: string, deadline: string, description: string) => {
    const newTask: Task = {
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      title: title,
      status: "Todo",
      priority: "Medium",
      createdAt: "9 Jun 2026",
      deadline: deadline || "No deadline set",
      description: description || "No description provided" // ถ้านไม่มีกำหนด จะขึ้นว่า No deadline set
    };

    setTasks([...tasks, newTask]);
    setIsModalOpen(false); // ปิด Pop-up
    setActiveTab("Todo");  // เด้งกลับมาหน้า Todo เพื่อดูงานที่สร้างใหม่
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-4 sm:p-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between sm:justify-end items-center gap-3 mb-6">
          <div className="text-xs sm:text-sm font-medium text-zinc-300">
            <span className="text-zinc-500 block sm:inline mr-1">
              @Neo-woupier
            </span>
            <span className="text-zinc-400 sm:text-zinc-300">
              Kanban workflow
            </span>
          </div>
          <button className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-all cursor-pointer shrink-0">
            <Settings className="w-5 h-5" />
          </button>
        </div>


        {/* Search & New Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex w-full max-w-md items-center">
            <Input
              type="text"
              placeholder={`Search in ${activeTab}...`}
              className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-zinc-600 rounded-md"
            />
          </div>

          <Button
            onClick={() => setIsModalOpen(true)} // เปลี่ยนมากดแล้วเปิด Pop-up แทน
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-medium ml-4 border border-[rgba(240,246,252,0.1)]"
          >
            <Plus className="mr-1 h-4 w-4" />
            New
          </Button>
        </div>

        {/* ตาราง */}
        <TaskList
          tasks={tasks}
          activeTab={activeTab}
          tabCount={tabs.find((t) => t.name === activeTab)?.count || 0}
          />
        </div>

        {/* --- เรียกใช้ Modal สั้นๆ แค่นี้เลย! --- */}
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNewTask}
        />
      </div>
  );
}