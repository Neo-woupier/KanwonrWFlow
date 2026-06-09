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
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [hasDeadline, setHasDeadline] = useState(false);
  const [noteMode, setNoteMode] = useState<"text" | "draw">("text");

  const tabs = [
    { name: "Todo", count: tasks.filter(t => t.status === "Todo").length },
    { name: "In Progress", count: tasks.filter(t => t.status === "In Progress").length },
    { name: "Done", count: tasks.filter(t => t.status === "Done").length },
    { name: "On Hold", count: tasks.filter(t => t.status === "On Hold").length }
  ];

  // รอรับ title กับ deadline ที่ส่งข้ามมาจาก CreateTaskModal
  const handleSaveNewTask = (title: string, deadline: string) => {
    const newTask: Task = {
      id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Todo",
      priority: "Medium",
      createdAt: "9 Jun 2026",
      title: title, // ใช้ title ที่รับมา
      deadline: deadline || "No deadline set" // ใช้ deadline ที่รับมา
    };

    setTasks([...tasks, newTask]);
    setIsModalOpen(false); // ปิด Modal
    setActiveTab("Todo"); // สลับกลับหน้า Todo
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-end items-center space-x-3 mb-6">
          <div className="text-sm font-medium text-zinc-300">
            <span className="text-zinc-500 mr-1">@Neo-woupier</span>
            Kanban workflow
          </div>
          <button className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-all cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* แถบ Tabs */}
        <nav className="flex space-x-2 border-b border-zinc-800 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.name
                  ? "border-orange-500 text-zinc-100"
                  : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {tab.name}
              <span className="ml-2 inline-flex items-center justify-center bg-zinc-800/80 text-zinc-300 text-xs rounded-full px-2 py-0.5">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>

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
        {/* ตาราง */}
        <TaskList 
          tasks={tasks} 
          activeTab={activeTab} 
          tabCount={tabs.find(t => t.name === activeTab)?.count || 0} 
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