import React, { useEffect, useState } from "react";
import axios from "axios";
import "../dashboard.css"; // Import the CSS file

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const api = axios.create({ baseURL: "http://localhost:4000" });

  // Fetch existing todos
  const fetchTodos = async () => {
    try {
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch (error) {
      console.error(error);
      setMessage("Error fetching tasks.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!title || !description) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      await api.post("/todos", { title, description });
      setTitle("");
      setDescription("");
      setMessage("Task added!");
      fetchTodos();
    } catch (error) {
      console.error(error);
      setMessage("Server error.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My To-Do App</h1>
        <p>Manage your tasks efficiently</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        {/* Form */}
        <div className="form-container">
          <h2>Add a New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Task</button>
          {message && <p className="message">{message}</p>}
        </div>

        {/* Todos */}
        <div className="todos-container">
          {todos.length === 0 ? (
            <p className="empty">No tasks yet. Add your first task!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
