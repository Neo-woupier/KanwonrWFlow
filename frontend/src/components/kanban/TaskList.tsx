// frontend/src/components/kanban/TaskList.tsx

import React from "react";
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

interface TaskListProps {
  tasks: Task[];
  activeTab: string;
  tabCount: number;
}

export default function TaskList({ tasks, activeTab, tabCount }: TaskListProps) {
  const filteredTasks = tasks.filter(task => task.status === activeTab);

  return (
    <div className="border border-zinc-700 rounded-md overflow-hidden bg-zinc-950">
      <Table>
        <TableHeader className="bg-zinc-900 hover:bg-zinc-900 border-b border-zinc-700">
          <TableRow className="hover:bg-transparent border-b-0">
            <TableHead className="px-4 py-3 text-sm font-semibold text-zinc-300 h-auto align-middle">
              {tabCount} {activeTab} tasks
            </TableHead>
            <TableHead className="text-right px-4 py-3 text-sm font-semibold text-zinc-400 h-auto align-middle w-28 sm:w-[160px] whitespace-normal">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-zinc-800/80">
          {filteredTasks.map((task) => (
            <TableRow
              key={task.id}
              className="hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/80 last:border-b-0"
            >
              {/* รายละเอียด Task */}
              <TableCell className="p-4 align-top whitespace-normal break-words">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-4 w-4 rounded-full bg-[#3fb950]"></div>
                  </div>
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <span className="text-[16px] font-semibold text-zinc-100">
                        {task.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold border bg-[#58a6ff1a] text-[#58a6ff] border-[#58a6ff66]">
                        {task.priority}
                      </span>
                    </div>

                    {/* โชว์ Deadline สีส้มให้เห็นชัดๆ */}
                    <div className="text-xs text-zinc-500 mt-1 flex items-center space-x-2">
                      {/* 🚨🚨🚨 [BACKEND COMMENT] 🚨🚨🚨
                          ตอนนี้ดึงวันที่ปัจจุบันจากเครื่องคอมพิวเตอร์ (Mock ไว้ก่อน)
                          ถ้าต่อ Backend เสร็จแล้ว ให้เปลี่ยนจาก new Date().toLocaleDateString(...) 
                          เป็นวันที่จริงจากฐานข้อมูล เช่น task.createdAt หรือ task.date ได้เลยครับบอส! */}
                      <span>
                        {new Date().toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>

                      <span>•</span>
                      <span className="text-orange-400/80 font-medium">
                        Deadline: {task.deadline}
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* ปุ่ม Action ย้ายสถานะ */}
              <TableCell className="p-4 text-right align-middle text-zinc-500 text-xs w-28 sm:w-[160px] whitespace-normal">
                {task.status === "Todo" ? (
                  <button className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 border border-blue-500/30 rounded-md transition-colors font-medium text-[11px] sm:text-xs">
                    Start Progress
                  </button>
                ) : (
                  <span className="text-zinc-500 italic">No action</span>
                )}
              </TableCell>
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