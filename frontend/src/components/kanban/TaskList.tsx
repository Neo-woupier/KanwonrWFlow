// frontend/src/components/kanban/TaskList.tsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/data/mockTasks"; // ดึง Type มาจากไฟล์ mock
import { TaskRow } from "./TaskRow";
import { X, Goal, StickyNote, ChevronRight} from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  activeTab: string;
  tabCount: number;
  onUpdateStatus: (id: string, newStatus: string) => void; // รับรีโมทเปลี่ยนสถานะ
  onDeleteTask: (id: string) => void; // รับรีโมทลบงาน
}

export default function TaskList({
  tasks,
  activeTab,
  tabCount,
  onUpdateStatus,
  onDeleteTask,
}: TaskListProps) {
  const filteredTasks = tasks.filter((task) => task.status === activeTab);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="border border-zinc-700 rounded-md overflow-hidden bg-zinc-950">
      <Table>
        {/* Table container with border, rounded corners, and dark background */}
        {/* กล่อง/พื้นที่สำหรับใส่ตารางที่มีเส้นขอ(มี) มุมที่โค้งมนและมีพื้นหลังสีเข้ม*/}
        <TableHeader className="bg-zinc-900 hover:bg-zinc-900 border-b border-zinc-700">
          <TableRow className="hover:bg-transparent border-b-0">
            {/* ฝั่งซ้าย: โชว์จำนวน Task + ปุ่มเปิด Note */}
            <TableHead className="px-4 py-3 text-sm font-semibold text-zinc-300 h-auto align-middle">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span>
                  {tabCount} {activeTab} tasks
                </span>

                {/* ปุ่ม Item สำหรับกดเปิด Note (ปรับ UI ให้ดูเป็นปุ่มมากขึ้น) */}
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(true)} // 🎯 กดแล้วเรียก Popup
                  className="flex items-center gap-2.5 px-3 py-1.5 border border-zinc-700 rounded-md bg-transparent hover:bg-zinc-800 transition-colors w-fit cursor-pointer"
                >
                  {/* ไอคอนด้านซ้าย */}
                  <StickyNote className="w-4 h-4 text-zinc-400" />

                  {/* ข้อความตรงกลาง */}
                  <span className="text-sm font-medium text-zinc-300">
                    Board Notes
                  </span>

                  {/* ไอคอนลูกศรด้านขวา */}
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
            </TableHead>

            {/* ฝั่งขวา: Actions */}
            <TableHead className="text-right px-4 py-3 text-sm font-semibold text-dd-400 h-auto align-middle w-28 sm:w-[160px] whitespace-normal">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-dd-800/80">
          {filteredTasks.map((task) => (
            <TableRow
  key={task.id}
  onClick={() => router.push(`/task/${task.id}`)}
  {/* 1. เอา title={...} ของเก่าออก และมั่นใจว่ามีคำว่า "group" อยู่ใน className */}
  className="hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/80 last:border-b-0 cursor-pointer group"
>
  
  {/* 2. ในช่องแสดงชื่อ Task ให้ใส่ className="relative" เพื่อเป็นฐานให้ Tooltip ลอย */}
  <TableCell className="p-4 align-middle font-medium text-zinc-100 relative">
    
    {/* ข้อความชื่อ Task ปกติของบอส */}
    <span>{task.title}</span>

    {/* 🎯 3. กล่อง Tooltip ตัวใหญ่สะใจเวลาเมาส์ Hover */}
    {task.detail && (
      <div className="absolute left-4 bottom-full mb-2 z-50 hidden group-hover:block bg-zinc-900 border border-zinc-700 text-zinc-100 p-4 rounded-lg shadow-2xl max-w-sm pointer-events-none w-max animate-in fade-in zoom-in-95 duration-150">
        <p className="text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
          Task Description
        </p>
        {/* บอสปรับขนาดตัวหนังสือตรง text-base หรือ text-lg ได้ตามชอบเลยครับ */}
        <p className="text-base font-medium text-zinc-200 whitespace-pre-wrap leading-relaxed">
          {task.detail}
        </p>
      </div>
    )}

  </TableCell>

  {/* ... ช่องข้อมูลอื่นๆ เช่น Deadline ... */}

  {/* ช่องปุ่ม Actions เดิมของบอส */}
  <TableCell>...</TableCell>

</TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ถ้าเป็น 0 ให้โชว์กล่องนี้ */}
      {filteredTasks.length === 0 && (
        <div className="p-12 flex flex-col items-center justify-center text-center border-t border-zinc-800">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center mb-3">
            <span className="text-zinc-600">0</span>
          </div>
          <h3 className="text-zinc-300 font-medium mb-1">No tasks yet</h3>
          <p className="text-zinc-500 text-sm">
            Click &quot;New&quot; to create your first task.
          </p>
        </div>
      )}
    </div>
  );
}