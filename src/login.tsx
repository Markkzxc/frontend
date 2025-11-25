import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [message, setMessage] = useState("");

const api = axios.create({
    baseURL: "https://backend2-9jkj.onrender.com", // your deployed backend
    headers: { "Content-Type": "application/json" },
});

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/login", { username, password });

      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);

        window.location.href =
          data.role === "admin" ? "/admindashboard" : "/dashboard";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error during login.");
    }
  };

  const handleRegister = async () => {
    if (!email || !username || !password || !fullname) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await api.post("/register", {
        fullname,
        username,
        password,
        email,
      });

      if (data.success) {
        setMessage("Registration successful! You can now log in.");
        setIsRegister(false);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error during registration.");
    }
  };

  return (
    <div className="login">
      <h2>{isRegister ? "Register" : "Login"} — To-Do App</h2>

      {isRegister ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>Register</button>

          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => setIsRegister(false)}>
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p>
            Don’t have an account?{" "}
            <span className="link" onClick={() => setIsRegister(true)}>
              Register
            </span>
          </p>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}
