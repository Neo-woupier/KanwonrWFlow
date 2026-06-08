"use client";

import React, { useState } from "react";
import { Plus, Settings } from "lucide-react"; // เพิ่ม Settings เข้ามาตรงนี้
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

// (สมมติว่าคุณมี initialTasks อยู่ด้านบนโค้ดเหมือนเดิม)
const initialTasks = [
  { id: "TASK-8782", title: "สร้างฐานข้อมูล PostgreSQL", status: "Todo", priority: "High" },
  { id: "TASK-7878", title: "ออกแบบหน้า UI สำหรับ Login", status: "In Progress", priority: "Medium" },
  { id: "TASK-7839", title: "อัปเดตเอกสาร API", status: "Done", priority: "Low" },
];

export default function KanbanTablePage() {
  const [activeTab, setActiveTab] = useState("Todo");

  // เมนูด้านบน (สไตล์ Tabs ของ GitHub)
  const tabs = [
    { name: "Todo", count: 12 },
    { name: "In Progress", count: 3 },
    { name: "Done", count: 24 },
    { name: "On Hold", count: 1 }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* --- ส่วนที่เพิ่มใหม่: Header (Username & Settings) มุมขวาบน --- */}
        <div className="flex justify-end items-center space-x-3 mb-6">
          <div className="text-sm font-medium text-zinc-300">
            <span className="text-zinc-500 mr-1">@Neo-woupier</span>
            Kanban workflow
          </div>
          <button 
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-all cursor-pointer"
            title="Settings (Coming soon)"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* --- 1. แถบ Tabs ด้านบน --- */}
        <nav className="flex space-x-2 border-b border-zinc-800 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.name
                  ? "border-orange-500 text-zinc-100" // สีไฮไลท์ Tab สไตล์ GitHub
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

        {/* --- 2. แถบ Search และปุ่ม New --- */}
        <div className="flex justify-between items-center mb-4">
          {/* ช่อง Search ด้านซ้าย */}
          <div className="flex w-full max-w-md items-center">
            <Input 
              type="text" 
              placeholder={`Search in ${activeTab}...`} 
              className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-zinc-600 rounded-md"
            />
          </div>

          {/* ปุ่ม New ด้านขวา (สีเขียว GitHub) */}
          <Button className="bg-[#238636] hover:bg-[#2ea043] text-white font-medium ml-4 border border-[rgba(240,246,252,0.1)]">
            <Plus className="mr-1 h-4 w-4" />
            New
          </Button>
        </div>

        {/* --- 3. ตารางแสดงรายการ Tasks (UI Components) --- */}
        <div className="border border-zinc-700 rounded-md overflow-hidden bg-zinc-950">
          
          <Table>
            {/* ส่วนหัวของตาราง */}
            <TableHeader className="bg-zinc-900 hover:bg-zinc-900 border-b border-zinc-700">
              <TableRow className="hover:bg-transparent border-b-0">
                <TableHead className="px-4 py-3 text-sm font-semibold text-zinc-300 h-auto align-middle">
                  {tabs.find(t => t.name === activeTab)?.count} {activeTab} tasks
                </TableHead>
                <TableHead className="text-right px-4 py-3 text-sm font-semibold text-zinc-400 h-auto align-middle cursor-pointer hover:text-zinc-200 w-[120px]">
                  Sort ▾
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* ส่วนเนื้อหา */}
            <TableBody className="divide-y divide-zinc-800/80">
              {initialTasks
                .filter(task => task.status === activeTab)
                .map((task) => (
                  <TableRow 
                    key={task.id} 
                    className="hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/80 last:border-b-0"
                  >
                    <TableCell className="p-4 align-top">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1 flex-shrink-0">
                          <div className="h-4 w-4 rounded-full border-[2.5px] border-[#3fb950]"></div>
                        </div>

                        <div>
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <a href="#" className="text-[16px] font-semibold text-zinc-100 hover:text-blue-400 transition-colors">
                              {task.title}
                            </a>
                            
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                              task.priority === 'High' ? 'bg-[#ff7b721a] text-[#ff7b72] border-[#ff7b7266]' :
                              task.priority === 'Medium' ? 'bg-[#d299221a] text-[#d29922] border-[#d2992266]' :
                              'bg-[#58a6ff1a] text-[#58a6ff] border-[#58a6ff66]'
                            }`}>
                              {task.priority}
                            </span>
                          </div>

                          <div className="text-xs text-zinc-500 mt-1">
                            <span>#{task.id}</span>
                            <span className="mx-1">•</span>
                            <span>{task.status}</span>
                            <span className="mx-1">•</span>
                            <span>created on 4 Jun 2026</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="p-4 text-right align-middle text-zinc-500 text-xs w-[120px]">
                      <div className="flex items-center justify-end">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        2
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {initialTasks.filter(task => task.status === activeTab).length === 0 && (
            <div className="p-8 text-center text-zinc-500 text-sm border-t border-zinc-800">
              No tasks match your search or current tab.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}