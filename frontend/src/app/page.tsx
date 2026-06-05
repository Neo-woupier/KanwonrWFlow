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

// First Data input and user note is here
const initialTasks = [
  { id: "TASK-8782", title: "สร้างฐานข้อมูล PostgreSQL", status: "Todo", priority: "High" },
  { id: "TASK-7878", title: "ออกแบบหน้า UI สำหรับ Login", status: "In Progress", priority: "Medium" },
  { id: "TASK-7839", title: "อัปเดตเอกสาร API", status: "Done", priority: "Low" },
];

export default function KanbanTablePage() {
  const [activeTab, setActiveTab] = useState("Todo");

  //top tabs menu  main page 
  const tabs = [
    { name: "Todo", count: 12 },
    { name: "In Progress", count: 3 },
    { name: "Done", count: 24 },
    { name: "On Hold", count: 1 }
  ];
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* --- 1. แถบ Tabs ด้านบน (แทน Code, Issues ฯลฯ) --- */}
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

          {/* ปุ่ม New ด้านขวา (สีเขียวสไตล์ GitHub) */}
          <Button className="bg-[#238636] hover:bg-[#2ea043] text-white font-medium ml-4 border border-[rgba(240,246,252,0.1)]">
            <Plus className="mr-1 h-4 w-4" />
            New
          </Button>
        </div>

        {/* --- 3. กล่องรายการ Tasks (สไตล์ GitHub Issues List) --- */}
        <div className="border border-zinc-700 rounded-md overflow-hidden bg-zinc-950">
          
          {/* ส่วนหัวของ List (Header) */}
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-700 flex justify-between items-center text-sm text-zinc-400">
            <div className="flex items-center space-x-4 font-semibold text-zinc-300">
              {/* จำลองตัวเลข Open / Closed */}
              <span>{tabs.find(t => t.name === activeTab)?.count} {activeTab} tasks</span>
            </div>
            <div className="flex space-x-4">
              <span className="cursor-pointer hover:text-zinc-200">Sort ▾</span>
            </div>
          </div>

          {/* ลิสต์รายการ Task */}
          <div className="divide-y divide-zinc-800/80">
            {initialTasks
              .filter(task => task.status === activeTab) // กรองข้อมูลตาม Tab ที่กด (ถ้ายังไม่มีข้อมูลให้แสดงหมด ลบ .filter ออกได้ครับ)
              .map((task) => (
              <div key={task.id} className="p-4 hover:bg-zinc-900/50 transition-colors flex items-start space-x-3">
                
                {/* ไอคอนหน้า Task (สถานะ Open/Closed) */}
                <div className="mt-1">
                  <div className="h-4 w-4 rounded-full border-[2.5px] border-[#3fb950]"></div>
                </div>

                {/* รายละเอียด Task */}
                <div className="flex-1">
                  
                  {/* ชื่อ Task (ตัวใหญ่) และ Tag (ยืม priority มาใช้เป็นหมวดหมู่ก่อน) */}
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <a href="#" className="text-[16px] font-semibold text-zinc-100 hover:text-blue-400 transition-colors">
                      {task.title}
                    </a>
                    
                    {/* ป้าย Category (จำลองสีตาม Priority) */}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                      task.priority === 'High' ? 'bg-[#ff7b721a] text-[#ff7b72] border-[#ff7b7266]' :
                      task.priority === 'Medium' ? 'bg-[#d299221a] text-[#d29922] border-[#d2992266]' :
                      'bg-[#58a6ff1a] text-[#58a6ff] border-[#58a6ff66]'
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* ข้อมูลหมวดหมู่ และ วันที่สร้าง (ตามรีเควส: #หมวดหมู่ วันที่) */}
                  <div className="text-xs text-zinc-500 mt-1">
                    <span>#{task.id}</span>
                    <span className="mx-1">•</span>
                    <span>{task.status}</span>
                    <span className="mx-1">•</span>
                    <span>created on 4 Jun 2026</span> {/* จำลองวันที่แบบ Hardcode ไว้ก่อน */}
                  </div>
                </div>

                {/* จำนวนคอมเมนต์ (ขวาสุด) */}
                <div className="flex items-center text-zinc-500 text-xs">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  2
                </div>

              </div>
            ))}
            
            {/* โชว์ข้อความเผื่อกรณีไม่มี Task ในหน้านั้นๆ */}
            {initialTasks.filter(task => task.status === activeTab).length === 0 && (
              <div className="p-8 text-center text-zinc-500 text-sm">
                No tasks match your search or current tab.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );  
}