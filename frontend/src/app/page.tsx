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
    { name: "Todo", count: tasks.filter((t) => t.status === "Todo").length },
    {
      name: "In Progress",
      count: tasks.filter((t) => t.status === "In Progress").length,
    },
    { name: "Done", count: tasks.filter((t) => t.status === "Done").length },
    {
      name: "On Hold",
      count: tasks.filter((t) => t.status === "On Hold").length,
    },
  ];

  // 🚨 เช็คตรงนี้: ต้องรับแค่ (title, deadline, description) 3 ค่าเท่านั้นครับบอส
  const handleSaveNewTask = (
    title: string,
    deadline: string,
    description: string,
  ) => {
    const newTask: Task = {
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      title: title,
      status: "Todo",
      priority: "Medium",
      createdAt: "9 Jun 2026",
      deadline: deadline || "No deadline set",
      description: description || "No description provided", // ถ้านไม่มีกำหนด จะขึ้นว่า No deadline set
    };

    setTasks([...tasks, newTask]);
    setIsModalOpen(false); // ปิด Pop-up
    setActiveTab("Todo"); // เด้งกลับมาหน้า Todo เพื่อดูงานที่สร้างใหม่
  };

  // วางไว้ด้านบนใน component ของ page.tsx
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus as any } : task,
      ),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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

        {/* Tabs Menu */}
        <nav className="flex space-x-1 sm:space-x-2 border-b border-zinc-800 mb-6 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 shrink-0 cursor-pointer ${
                activeTab === tab.name
                  ? "border-orange-500 text-zinc-100"
                  : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {tab.name}
              <span className="ml-2 inline-flex items-center justify-center bg-zinc-800/80 text-zinc-300 text-xs rounded-full px-2 py-0.5 font-semibold">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>

        {/* Search & New Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center mb-4 w-full">
          <div className="w-full sm:max-w-md">
            <Input
              type="text"
              placeholder={`Search in ${activeTab}...`}
              className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-zinc-600 rounded-md w-full"
            />
          </div>

          <Button
            onClick={() => setIsModalOpen(true)} // เปลี่ยนมากดแล้วเปิด Pop-up แทน
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-medium border border-[rgba(240,246,252,0.1)] w-full sm:w-auto justify-center"
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
          onUpdateStatus={handleUpdateStatus}
          onDeleteTask={handleDeleteTask}
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