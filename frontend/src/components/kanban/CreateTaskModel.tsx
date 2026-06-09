import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// กำหนดสะพานเชื่อม (Props) ให้ไฟล์นี้รับคำสั่งจากหน้า Page ได้
interface CreateTaskModalProps {
  isOpen: boolean; // เช็คว่าเปิดอยู่ไหม
  onClose: () => void; // ฟังก์ชันตอนกดปิด
  onSave: (title: string, deadline: string) => void; // ฟังก์ชันตอนกดเซฟ พร้อมส่งข้อมูลกลับ
}

export default function CreateTaskModal({ isOpen, onClose, onSave }: CreateTaskModalProps) {
  // ย้าย State ที่ใช้เฉพาะใน Pop-up มาไว้ในนี้ทั้งหมด
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [hasDeadline, setHasDeadline] = useState(false);
  const [noteMode, setNoteMode] = useState<"text" | "draw">("text");

  // ถ้าไม่ได้สั่งเปิด ให้คืนค่า null (ไม่แสดงอะไรเลย)
  if (!isOpen) return null;

  // ฟังก์ชันแพ็คข้อมูลส่งกลับ
  const handleSaveClick = () => {
    if (!newTaskTitle.trim()) return;
    
    // ส่งข้อมูลกลับไปให้หน้า Page ผ่าน onSave
    onSave(newTaskTitle, hasDeadline ? newTaskDeadline : "");
    
    // เคลียร์ค่าคืนสภาพเดิม
    setNewTaskTitle("");
    setNewTaskDeadline("");
    setHasDeadline(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-5 border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-semibold text-zinc-100">Create New Task</h2>
          <button 
            onClick={onClose} // ใช้คำสั่ง onClose ที่ส่งมาจากหน้า Page
            className="text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-900/50 hover:bg-zinc-800 p-1.5 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* 1. Task Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Task Title <span className="text-red-500">*</span></label>
            <Input 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Update user authentication..." 
              className="bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-zinc-700"
              autoFocus
            />
          </div>

          {/* 2. Custom Deadline */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Deadline</label>
            {!hasDeadline ? (
              <button 
                onClick={() => setHasDeadline(true)}
                className="w-full py-2 px-3 border border-dashed border-zinc-700 rounded-md text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900/50 transition-all text-sm text-left flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" /> Add a deadline
              </button>
            ) : (
              <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-top-1">
                <Input 
                  type="date"
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-800 text-zinc-100 [color-scheme:dark] flex-1" 
                />
                <button 
                  onClick={() => {
                    setHasDeadline(false);
                    setNewTaskDeadline("");
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
              <label className="block text-sm font-medium text-zinc-400">Notes / Details</label>
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
              />
            ) : (
              <div className="w-full h-32 rounded-md bg-zinc-900/30 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500 cursor-crosshair">
                <span className="text-xs">Drawing Canvas Ready (Coming Soon)</span>
              </div>
            )}
          </div>

        </div>

        <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-zinc-800/80">
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