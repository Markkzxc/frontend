import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

const api = axios.create({
    baseURL: "https://backend2-9jkj.onrender.com", // your deployed backend
    headers: { "Content-Type": "application/json" },
});

  const handleRegister = async () => {
    if (!email || !username || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await api.post("/register", {
        username,
        password,
        email,
        role,
      });

      if (data.success) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Server error during registration.");
    }
  };

  return (
    <div className="login">
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Choose a Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select> */}

        <button className="primary-btn" onClick={handleRegister}>
        Register
        </button>

        <p>
        Already have an account?{" "}
        <span className="link-text" onClick={() => (window.location.href = "/login")}>
            Login
        </span>
        </p>

      <p>{message}</p>
    </div>
  );
}
