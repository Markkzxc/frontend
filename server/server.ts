import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "typescript2",
  port: Number(process.env.DB_PORT) || 3306,
});
export default db;

interface Todo {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
}

const app = express();

app.use(cors({
  origin: ["https://tenio-frontend.vercel.app"] // your deployed frontend URL
}));
app.use(express.json());

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "typescript2",
// });

// ===== TODOS CRUD =====

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM todos");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ success: false, message: "Error fetching todos" });
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }
  try {
    await db.query(
      "INSERT INTO todos (title, description, status) VALUES (?, ?, 'pending')",
      [title, description]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding todo" });
  }
});

// Update a todo (title, description, status)
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    await db.query(
      "UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status ?? 'pending', id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating todo" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM todos WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting todo" });
  }
});

// ===== USER AUTH =====

// Registration
app.post("/register", async (req, res) => {
  const { fullname, username, password, email } = req.body;
  if (!fullname || !username || !password || !email) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    const [existing] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existing.length > 0) {
      return res.json({ success: false, message: "Username or email already exists" });
    }

    await db.query("INSERT INTO users (fullname, username, password, email) VALUES (?, ?, ?, ?)", [
      fullname,
      username,
      password,
      email,
    ]);

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ success: false, message: "Username and password required" });

  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) return res.json({ success: false, message: "Invalid credentials" });

    const user = rows[0];
    res.json({ success: true, fullname: user.fullname, role: "user", message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
