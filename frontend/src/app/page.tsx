"use client";

import React, { useState } from "react";
import { Plus, Settings, X } from "lucide-react"; // เพิ่ม X สำหรับปุ่มปิด
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskList from "@/components/kanban/TaskList";
import { initialTasks, Task } from "@/data/mockTasks";

export default function KanbanTablePage() {
  const [activeTab, setActiveTab] = useState<string>("Todo");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // --- State สำหรับคุม Pop-up ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const tabs = [
    { name: "Todo", count: tasks.filter(t => t.status === "Todo").length },
    { name: "In Progress", count: tasks.filter(t => t.status === "In Progress").length },
    { name: "Done", count: tasks.filter(t => t.status === "Done").length },
    { name: "On Hold", count: tasks.filter(t => t.status === "On Hold").length }
  ];

  // --- ฟังก์ชันบันทึกข้อมูลจาก Pop-up ---
  const handleSaveNewTask = () => {
    // ป้องกันคนไม่กรอกชื่อแล้วกดเซฟ
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTaskTitle,
      status: "Todo", // บังคับให้งานใหม่ไปตกที่ Todo เสมอ ตามรีเควสบอส!
      priority: "Medium",
      createdAt: "9 Jun 2026",
      deadline: newTaskDeadline || "No deadline set" // ดึงค่าจากช่องกรอก หรือใส่ค่า default ถ้าไม่กรอก
    };

    setTasks([...tasks, newTask]);
    
    // เคลียร์ค่าและปิด Pop-up
    setNewTaskTitle("");
    setNewTaskDeadline("");
    setIsModalOpen(false);
    
    // สลับหน้าจอไปที่ Tab Todo อัตโนมัติเพื่อให้เห็นงานใหม่
    setActiveTab("Todo");
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
        <TaskList 
          tasks={tasks} 
          activeTab={activeTab} 
          tabCount={tabs.find(t => t.name === activeTab)?.count || 0} 
        />

      </div>

      {/* --- ส่วนที่เพิ่มใหม่: Pop-up Modal สร้าง Task ใหม่ --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-700 rounded-xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-zinc-100">Create New Task</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Task Title</label>
                <Input 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Update user authentication..." 
                  className="bg-zinc-900 border-zinc-700 text-zinc-100"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Deadline</label>
                <Input 
                  type="date"
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 [color-scheme:dark]" // ทำให้ไอคอนปฏิทินเป็นสีเข้ม
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <Button 
                variant="ghost" 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveNewTask}
                className="bg-[#238636] hover:bg-[#2ea043] text-white"
              >
                Save Task
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}