import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";

interface Todo {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
}

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "typescript2",
});

// Get all todos
app.get("/todos", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM todos");
  res.json(rows);
});

// Add a new todo
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  await db.query(
    "INSERT INTO todos (title, description, completed) VALUES (?, ?, false)",
    [title, description]
  );
  res.json({ success: true });
});


// ===== Registration =====
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

    await db.query(
      "INSERT INTO users (fullname, username, password, email) VALUES (?, ?, ?, ?)",
      [fullname, username, password, email]
    );

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== Login =====
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: "Username and password required" });
  }

  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const user = rows[0];
    res.json({
      success: true,
      fullname: user.fullname,
      role: "user", // Default role
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
