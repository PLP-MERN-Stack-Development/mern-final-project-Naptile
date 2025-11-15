import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token"); // JWT from login

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
      else throw new Error(data.message || "Failed to fetch tasks");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <TaskForm token={token} onTaskAdded={(task) => setTasks([task, ...tasks])} />

      <h2 className="text-xl font-semibold mt-6 mb-3">My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 mb-2 rounded">
            <strong>{task.title}</strong> - {task.status}
            {task.dueDate && ` (Due: ${new Date(task.dueDate).toLocaleDateString()})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
