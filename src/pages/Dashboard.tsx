import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "../dashboard.css";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string; // Use status instead of completed
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null); // null = no message, true = success, false = error
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const api = axios.create({ baseURL: "https://backend2-9jkj.onrender.com" });

  // Helper for detailed error messages
  const handleError = (error: unknown, context: string) => {
    let msg = `Error in ${context}: `;
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      msg += axiosError.response
        ? `Response ${axiosError.response.status}: ${JSON.stringify(axiosError.response.data)}`
        : `No response from server: ${axiosError.message}`;
    } else if (error instanceof Error) {
      msg += error.message;
    } else {
      msg += JSON.stringify(error);
    }
    console.error(msg);
    setMessage(msg);
    setSuccess(false);
  };

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch (error) {
      handleError(error, "fetching todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or update todo
  const handleSaveTodo = async () => {
    if (!title || !description || !status) {
      setMessage("Please fill in all fields.");
      setSuccess(false);
      return;
    }

    try {
      if (editingTodo) {
        await api.put(`/todos/${editingTodo.id}`, { title, description, status });
        setMessage("✅ Task updated successfully!");
      } else {
        await api.post("/todos", { title, description });
        setMessage("✅ Task added successfully!");
      }
      setSuccess(true);
      setTitle("");
      setDescription("");
      setStatus("pending");
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      handleError(error, editingTodo ? "updating todo" : "adding todo");
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`);
      setMessage("✅ Task deleted successfully!");
      setSuccess(true);
      fetchTodos();
    } catch (error) {
      handleError(error, "deleting todo");
    }
  };

  // Edit todo
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setStatus(todo.status);
    setMessage(""); // Clear previous messages when editing
    setSuccess(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingTodo(null);
    setTitle("");
    setDescription("");
    setStatus("pending");
    setMessage(""); // Clear message on cancel
    setSuccess(null);
  };

  // Logout
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
          <h2>{editingTodo ? "Edit Task" : "Add a New Task"}</h2>
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
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={handleSaveTodo}>
            {editingTodo ? "Update Task" : "Add Task"}
          </button>
          {editingTodo && (
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          )}
          {message && (
            <p
              className="message"
              style={{
                color: success ? "green" : "red",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {message}
            </p>
          )}
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
                <p>
                  <strong>Status:</strong> {todo.status}
                </p>
                <div className="todo-actions">
                  <button onClick={() => handleEditTodo(todo)}>Edit</button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
