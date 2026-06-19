// frontend/src/app/api/tasks/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

// กำหนด Type มารองรับข้อมูลจาก API
interface Task {
  id: string;
  title: string;
  detail: string;
  status: string;
  deadline: string;
}

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🎯 ยิง API ของจริงไปดึงข้อมูลตาม ID จาก Route ที่ Agent สร้างไว้
  useEffect(() => {
    if (!taskId) return;

    async function fetchTaskData() {
      try {
        setLoading(true);
        setError(null);
        
        // เรียกไปยัง endpoint: /api/tasks/[id]
        const response = await fetch(`/api/tasks/${taskId}`);
        
        if (!response.ok) {
          throw new Error("ไม่พบข้อมูล Task นี้ในระบบ หรือ API มีปัญหา");
        }
        
        const data = await response.json();
        setTask(data);
      } catch (err: any) {
        console.error("Fetch task error:", err);
        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    }

    fetchTaskData();
  }, [taskId]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 🔙 ปุ่มย้อนกลับ */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Kanban Board
        </button>

        {/* ⏳ สถานะกำลังโหลดข้อมูล */}
        {loading && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center text-zinc-400 animate-pulse">
            กำลังดึงข้อมูลจาก API Backend...
          </div>
        )}

        {/* ❌ สถานะเมื่อเกิด Error (หาไอดีไม่เจอ หรือ API พัง) */}
        {error && (
          <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 text-red-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 📝 ส่วนเนื้อหาหลักเมื่อโหลดข้อมูลสำเร็จ */}
        {!loading && !error && task && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-lg">
            
            {/* Header & Status */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 leading-snug">
                {task.title}
              </h1>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-800/50">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {task.status}
                </span>
              </div>
            </div>

            <hr className="border-zinc-800" />

            {/* Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                Task Details
              </h3>
              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {task.detail || "ไม่มีรายละเอียดระบุไว้"}
              </p>
            </div>

            {/* Footer Info */}
            <div className="bg-zinc-950/50 rounded-lg p-4 flex items-center justify-between border border-zinc-800/50">
              <div className="flex items-center text-sm text-zinc-400">
                <Calendar className="w-4 h-4 mr-2 text-zinc-500" />
                Deadline: <span className="ml-1 text-zinc-300 font-medium">{task.deadline || "--/--/----"}</span>
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                Task ID: {task.id}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}