export type Task = {
  id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done" | "On Hold";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  deadline: string;
  description: string;
  detail?: string;
};

// 2. เคลียร์ข้อมูลให้เป็น 0 ตามที่ต้องการ 
export const initialTasks: Task[] = [];