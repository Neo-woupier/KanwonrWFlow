"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. จำลองข้อมูล (Mock Data) สำหรับ Data Table
const initialTasks = [
  { id: "TASK-8782", title: "สร้างฐานข้อมูล PostgreSQL", status: "Todo", priority: "High" },
  { id: "TASK-7878", title: "ออกแบบหน้า UI สำหรับ Login", status: "In Progress", priority: "Medium" },
  { id: "TASK-7839", title: "อัปเดตเอกสาร API", status: "Done", priority: "Low" },
];

export default function KanbanTablePage() {
  const [activeMenu, setActiveMenu] = useState("Todo");

  // รายการเมนูด้านบน (เหมือน Home, Docs ของ shadcn)
  const menus = ["Todo", "In Progress", "Done", "On Hold"];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      
      {/* --- HEADER SECTION --- */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-zinc-800">
        
        {/* ซ้าย: แถบเมนู (Navigation แบบ shadcn site) */}
        <nav className="flex items-center space-x-6 text-sm font-medium text-zinc-400">
          {menus.map((menu) => (
            <span
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`cursor-pointer transition-colors hover:text-white ${
                activeMenu === menu ? "text-white" : ""
              }`}
            >
              {menu}
            </span>
          ))}
        </nav>

        {/* ขวา: ช่องเพิ่มงาน + ชื่อโปรเจกต์ */}
        <div className="flex items-center space-x-6">
          
          {/* ช่อง Input และปุ่ม Add Node */}
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Task name..." 
              className="h-8 w-[200px] bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700" 
            />
            <Button variant="outline" size="sm" className="h-8 bg-black text-white border-zinc-800 hover:bg-zinc-800 hover:text-white">
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
          </div>

          {/* ชื่อ My Kanban Workflow (ขวาบนสุด) */}
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent border-l border-zinc-800 pl-6">
            My Kanban Workflow
          </h1>
          
        </div>
      </header>

      {/* --- MAIN CONTENT (DATA TABLE) --- */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white">{activeMenu} Tasks</h2>
          <p className="text-sm text-zinc-400 mt-1">รายการงานทั้งหมดที่อยู่ในสถานะ {activeMenu}</p>
        </div>

        {/* ตาราง Data Table */}
        <div className="rounded-md border border-zinc-800 overflow-hidden bg-zinc-950/50">
          <Table>
            <TableHeader className="bg-zinc-900/50 hover:bg-zinc-900/50">
              <TableRow className="border-zinc-800">
                <TableHead className="w-[120px] text-zinc-400">Task ID</TableHead>
                <TableHead className="text-zinc-400">Title</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-right text-zinc-400">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialTasks.map((task) => (
                <TableRow key={task.id} className="border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                  <TableCell className="font-medium text-zinc-300">{task.id}</TableCell>
                  <TableCell className="text-zinc-100">{task.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-zinc-300">{task.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </main>
    </div>
  );
}