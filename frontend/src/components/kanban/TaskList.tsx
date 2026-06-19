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
import { X, Goal } from "lucide-react";

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
              className="hover:bg-dd-900/50 transition-colors border-b border-zinc-800/80 last:border-b-0"
            >
              {/* ส่วนรายละเอียด Task คงรูปแบบเดิมไว้ทั้งหมด */}
              <TableCell className="p-4 align-top whitespace-normal break-words">
                <div className="flex items-start space-x-3">
                  {/* ส่วนไอคอนเป้าธนู */}
                  <div className="mt-0.5 flex-shrink-0">
                    <Goal className="h-5 w-5 text-green-500 animate-pulse" />
                  </div>
                  <div></div>
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <span className="text-[16px] font-semibold text-zinc-100">
                        {task.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold border bg-[#58a6ff1a] text-[#58a6ff] border-[#58a6ff66]">
                        {task.priority}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-500 mt-1 flex items-center space-x-2">
                      {/* รอเปลี่ยนเป็นวันที่จาก Backend */}
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

              {/* ส่วน Actions: จัดการปุ่มตาม Status ของ Task */}
              <TableCell className="p-4 text-right align-middle text-zinc-500 w-28 sm:w-[200px] whitespace-normal">
                <div className="flex items-center justify-end gap-2">
                  {/* ปุ่มสำหรับ Todo */}
                  {task.status === "Todo" && (
                    <button
                      onClick={() => onUpdateStatus(task.id, "In Progress")}
                      className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 border border-blue-500/30 rounded-md transition-colors font-medium text-[11px] sm:text-xs cursor-pointer"
                    >
                      Start Progress
                    </button>
                  )}

                  {/* ปุ่มสำหรับ In Progress */}
                  {task.status === "In Progress" && (
                    <>
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(task.id, "Done")}
                        className="min-w-[80px] px-3 py-1.5 bg-green-900/40 text-green-300 hover:bg-green-800/60 border border-green-700/50 rounded-md transition-all font-medium text-[11px] sm:text-xs cursor-pointer shadow-sm active:scale-95"
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(task.id, "On Hold")}
                        className="min-w-[80px] px-3 py-1.5 bg-yellow-900/40 text-yellow-300 hover:bg-yellow-800/60 border border-yellow-700/50 rounded-md transition-all font-medium text-[11px] sm:text-xs cursor-pointer shadow-sm active:scale-95"
                      >
                        On Hold
                      </button>
                    </>
                  )}

                  {/* ไม่มีปุ่ม Action พิเศษสำหรับ Done หรือ On Hold ให้แสดงข้อความ */}
                  {(task.status === "Done" || task.status === "On Hold") && (
                    <span className="text-zinc-600 italic text-xs mr-2">
                      No action
                    </span>
                  )}

                  {/* ปุ่มลบงาน แสดงตลอดทุกสถานะ */}
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
                    title="Delete Task"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
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