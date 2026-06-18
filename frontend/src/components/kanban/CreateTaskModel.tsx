// frontend/src/components/kanban/CreateTaskModel.tsx

import React, { useState } from "react";
import { format } from "date-fns";
import { X, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar"; // 🎯 ปรับให้เรียกจากตำแหน่งโฟลเดอร์ที่ถูกต้อง
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // 🎯 ปรับตำแหน่งโฟลเดอร์
import { Input } from "../ui/input"; // หรือ "@/components/ui/input" ตามโครงสร้างไฟล์บอส
import { title } from "process";
import { Task } from "@/data/mockTasks"; // ดึง Type มาจากไฟล์ mock

// กำหนดสะพานเชื่อม (Props) ให้ไฟล์นี้รับคำสั่งจากหน้า Page ได้
interface CreateTaskModalProps {
  isOpen: boolean; // เช็คว่าเปิดอยู่ไหม
  onClose: () => void; // ฟังก์ชันตอนกดปิด
  onSave: (title: string, deadline: string, description: string) => void; // ฟังก์ชันตอนกดเซฟ พร้อมส่งข้อมูลกลับ
  onAddNote?: (note: string) => void;
  onAddDrawing?: (drawingData: string) => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSave,
}: CreateTaskModalProps) {
  // ย้าย State ที่ใช้เฉพาะใน Pop-up มาไว้ในนี้ทั้งหมด
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [hasDeadline, setHasDeadline] = useState(false);
  const [noteMode, setNoteMode] = useState<"text" | "draw">("text");
  const [selectedDate, setSelectedDate] = useState<Date>(); // ใช้เก็บก้อนวัตถุวันที่ของปฏิทิน
  const [noteText, setNoteText] = useState("");

  // ถ้าไม่ได้สั่งเปิด ให้คืนค่า null (ไม่แสดงอะไรเลย)
  if (!isOpen) return null;

  // ฟังก์ชันแพ็คข้อมูลส่งกลับ
  const handleSaveClick = () => {
    if (!newTaskTitle.trim()) return;
    // --- ส่งวันที่ที่แปลงร่างเป็น DD/MM/YYYY เรียบร้อยแล้วข้ามไปที่หน้า Page ---
    let finalDeadline = "";
    if (hasDeadline && newTaskDeadline) {
      finalDeadline = newTaskDeadline;
    }
    if (newTaskTitle.trim()) {
      // กำหนดค่า finalDeadline เผื่อไว้ถ้าบอสมีการคำนวณฟอร์แมตวันที่
      const finalDeadline = newTaskDeadline;
      onSave(newTaskTitle, finalDeadline, noteText); // ส่งไปแค่นี้คลีนๆ บรรทัดเดียวพอครับบอส ลบตัวซ้ำออกให้หมด
      onClose();
    }

    // เคลียร์ค่าคืนสภาพเดิม
    setNewTaskTitle("");
    setNewTaskDeadline("");
    setHasDeadline(false);
    setSelectedDate(undefined);
    setNoteText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg shadow-2xl max-h-[calc(100vh-2rem)] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-5 border-b border-zinc-800 pb-4 shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-100">
            Create New Task
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-900/50 hover:bg-zinc-800 p-1.5 rounded-md cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto flex-1 pr-1 -mr-1">
          {/* 1. Task Title */}
          <div className="w-full">
            <label className="block text-xs sm:text-sm font-medium text-zinc-400 mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={newTaskTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTaskTitle(e.target.value)
              }
              placeholder="e.g. Update user authentication..."
              className="w-full bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-zinc-700 h-9 sm:h-10 text-sm placeholder:text-zinc-600"
              autoFocus
            />
          </div>

          {/* 2. Custom Deadline (เปลี่ยนมาใช้ Shadcn DatePicker เรียบร้อย) */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-400 mb-1.5">
              Deadline
            </label>
            {!hasDeadline ? (
              <button
                type="button"
                onClick={() => setHasDeadline(true)}
                className="w-full h-9 sm:h-10 px-3 border border-dashed border-zinc-700 rounded-md text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900/50 transition-all text-xs sm:text-sm text-left flex items-center cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2 shrink-0" /> Add a deadline
              </button>
            ) : (
              <div className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-top-1">
                <Popover>
                  {/* 🎯 จุดเปลี่ยนสำคัญ: ลบ asChild ออก และเปลี่ยน <PopoverTrigger> ให้ทำหน้าที่เป็นปุ่มแทนสไตล์เดิมเลยครับ */}
                  <PopoverTrigger className="flex-1 inline-flex items-center justify-start text-left font-normal bg-zinc-900/50 border border-zinc-800 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100 [color-scheme:dark] rounded-md h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm transition-colors cursor-pointer min-w-0 overflow-hidden">
                    <CalendarIcon className="mr-2 h-4 w-4 text-zinc-400 shrink-0" />
                    <span className="truncate">
                      {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy")
                      ) : (
                        <span className="text-zinc-500">Pick a date</span>
                      )}
                    </span>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto max-w-[calc(100vw-2rem)] sm:max-w-none p-0 bg-zinc-950 border-zinc-800 z-50 pointer-events-auto"
                    align="center"
                    sideOffset={4}
                  >
                    <div className="w-full max-w-[280px] sm:max-w-none overflow-x-auto [color-scheme:dark]">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          if (date) {
                            setNewTaskDeadline(format(date, "dd/MM/yyyy"));
                          }
                        }}
                        className="p-3 bg-zinc-950 text-zinc-100"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <button
                  onClick={() => {
                    setHasDeadline(false);
                    setNewTaskDeadline("");
                    setSelectedDate(undefined);
                  }}
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* 3. Note Feature */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-zinc-400">
                Notes / Details
              </label>
              <div className="flex bg-zinc-900 rounded-md p-1 border border-zinc-800">
                <button
                  onClick={() => setNoteMode("text")}
                  className={`text-xs px-3 py-1 rounded-sm transition-all ${noteMode === "text" ? "bg-zinc-700 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  Text
                </button>
                <button
                  onClick={() => setNoteMode("draw")}
                  className={`text-xs px-3 py-1 rounded-sm transition-all ${noteMode === "draw" ? "bg-zinc-700 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  Draw (Beta)
                </button>
              </div>
            </div>

            {noteMode === "text" ? (
              <textarea
                placeholder="Add details, links, or context here..."
                className="w-full h-24 rounded-md bg-zinc-900/50 border border-zinc-800 text-zinc-100 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-700 resize-none"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            ) : (
              <div className="w-full h-32 rounded-md bg-zinc-900/30 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500 cursor-crosshair">
                <span className="text-xs">
                  Drawing Canvas Ready (Coming Soon)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-t-zinc-800/80">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            className="bg-[#238636] hover:bg-[#2ea043] text-white shadow-lg shadow-green-900/20"
          >
            Save Task
          </Button>
        </div>

      </div>
    </div>
  );
}
