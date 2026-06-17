// components/TaskRow.tsx
export const TaskRow = ({ task, onUpdateStatus, onDeleteTask }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>
        {/* รวมทุกปุ่มไว้ตรงนี้ ง่ายต่อการเพิ่มฟีเจอร์ในอนาคต */}
        {task.status === "Todo" && (
           <button onClick={() => onUpdateStatus(task.id, "in-progress")}>Start Progress</button>
        )}
        {task.status === "In Progress" && (
           <>
             <button onClick={() => onUpdateStatus(task.id, "done")}>Done</button>
             <button onClick={() => onUpdateStatus(task.id, "on-hold")}>On Hold</button>
           </>
        )}
        <button onClick={() => onDeleteTask(task.id)} className="text-red-500">Delete</button>
      </td>
    </tr>
  );
};