import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title) return setMessage("Title is required");
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description, status, dueDate: dueDate || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Task created!");
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Task deleted");
      fetchTasks();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Task marked as completed");
      fetchTasks();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to update task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{ backgroundColor: "#f44336", color: "white" }}>
          Logout
        </button>
      </div>

      {message && <p>{message}</p>}

      <form onSubmit={handleCreateTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select> */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit" style={{ backgroundColor: "#4caf50", color: "white" }}>
          Add Task
        </button>
      </form>

      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: "10px" }}>
            <div>
              <strong
                style={{
                  textDecoration: task.status === "completed" ? "line-through" : "none"
                }}
              >
                {task.title}
              </strong>{" "}
              - {task.description} - {task.status}{" "}
              {task.dueDate && `(Due: ${new Date(task.dueDate).toLocaleDateString()})`}
            </div>
            <div>
              {task.status !== "completed" && (
                <button onClick={() => handleCompleteTask(task._id)}>Mark Complete</button>
              )}
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
