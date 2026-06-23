// frontend/src/components/kanban/TaskRow.tsx

import { X, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"; 

// 1. กำหนดรูปแบบข้อมูล Task ให้ตรงตามมาตรฐาน TypeScript
interface Task {
  id: string;
  title: string;
  detail: noteText,
  status: "Todo" | "In Progress" | "Done" | "On Hold";
  // ถ้าบอสมี deadline หรือ field อื่นๆ ใส่เพิ่มตรงนี้ได้เลยครับ เช่น deadline?: string;
}

// 2. กำหนด Props ที่ TaskRow ตัวนี้จะรับมาจากหน้าหลัก (page.tsx)
interface TaskRowProps {
  task: Task;
  onUpdateStatus: (id: string, newStatus: "Todo" | "In Progress" | "Done" | "On Hold") => void;
  onDeleteTask: (id: string) => void;
}

// 3. ประกอบร่าง Component
export const TaskRow = ({ task, onUpdateStatus, onDeleteTask }: TaskRowProps) => {
  return (
    <tr className="border-b border-zinc-900 hover:bg-zinc-900/20 transition-colors">
      {/* ฝั่งซ้าย: แสดงชื่อ Task */}
      <td className="p-4 align-middle font-medium text-zinc-100">
        {task.title}
      </td>

      {/* ฝั่งขวา: ปุ่ม Action ย้ายสถานะ (โค้ดที่บอสส่งมา+อัปเกรด Logic) */}
      <td className="p-4 text-right align-middle text-zinc-500 text-xs w-28 sm:w-[200px] whitespace-normal">
        <div className="flex items-center justify-end gap-2">
          
          {/* 🔵 ถ้าสถานะเป็น Todo -> โชว์ปุ่ม Start Progress */}
          {task.status === "Todo" && (
            <button
              type="button"
              onClick={() => onUpdateStatus(task.id, "In Progress")}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 border border-blue-500/30 rounded-md transition-colors font-medium text-[11px] sm:text-xs cursor-pointer"
            >
              Start Progress
            </button>
          )}

          {/* 🟠 ถ้าสถานะเป็น In Progress -> โชว์ปุ่ม Done และ On Hold */}
          {task.status === "In Progress" && (
            <>
              <button
                type="button"
                onClick={() => onUpdateStatus(task.id, "Done")}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-green-600/20 text-green-400 hover:bg-green-600/40 border border-green-500/30 rounded-md transition-colors font-medium text-[11px] sm:text-xs cursor-pointer"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => onUpdateStatus(task.id, "On Hold")}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/40 border border-yellow-500/30 rounded-md transition-colors font-medium text-[11px] sm:text-xs cursor-pointer"
              >
                On Hold
              </button>
            </>
          )}

          {/* 🔴 ปุ่มลบ "ไม่ทำละลบทั้งแม่ง" สำหรับทุกสถานะ */}
          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
            title="ลบงานนี้ทิ้ง"
          >
            <X className="w-4 h-4" />
          </button>

        </div>
      </td>
    </tr>
  );
};