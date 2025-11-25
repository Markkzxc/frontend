// import { useState } from "react";
// import "./App.css";
// import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import axios from "axios";

// export default function AuthPage() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("user");
//   const [message, setMessage] = useState("");

//   const api = axios.create({
//     baseURL: "http://localhost:4000",
//     headers: { "Content-Type": "application/json" },
//   });

//   //  Login handler 
//   const handleLogin = async () => {
//     try {
//       const { data } = await api.post("/login", { username, password });

//       if (data.success) {
//         localStorage.setItem("fullname", data.fullname);
//         localStorage.setItem("role", data.role);

//         if (data.role === "admin") {
//           window.location.href = "/admindashboard";
//         } else {
//           window.location.href = "/dashboard";
//         }
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Server error during login.");
//     }
//   };

//   // Register handler 
//   const handleRegister = async () => {
//     if ( !email || !username || !password) {
//       setMessage("Please fill in all fields.");
//       return;
//     }

//     try {
//       const { data } = await api.post("/register", { username, password,email,role });

//       if (data.success) {
//         setMessage("Registration successful! You can now log in.");
//         setIsRegister(false);
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setMessage("Server error during registration.");
//     }
//   };

//   // Google Login 
//   const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
//     try {
//       if (!credentialResponse.credential) {
//         setMessage("No Google credentials found");
//         return;
//       }

//       const res = await axios.post("http://localhost:4000/google-login", {
//         token: credentialResponse.credential,
//       });

//       if (res.data.success) {
//         localStorage.setItem("fullname", res.data.fullname);
//         window.location.href = "/dashboard";
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       setMessage("Google login failed");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="232251275213-rn0onv8qit31gdf6nomncpcre73j9p2n.apps.googleusercontent.com">
//       <div className="login">
//         <h2>{isRegister ? "Register" : "Login"} Using React + Express + MySQL</h2>

//         {isRegister ? (
//           <>
            
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <br />
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <br/>
        
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <br />
//             <select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//             <br />
//             <button onClick={handleRegister}>Register</button>
//             <p>
//               Already have an account?{" "}
//               <button onClick={() => setIsRegister(false)}>Login</button>
//             </p>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <br />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleLogin}>Login</button>
//             <hr />
//             <h3>Or login with Google</h3>
//             <GoogleLogin
//               onSuccess={handleGoogleLogin}
//               onError={() => setMessage("Google login failed")}
//             />
//             <p>
//               Don’t have an account?{" "}
//               <button onClick={() => setIsRegister(true)}>Register</button>
//             </p>
//           </>
//         )}

//         <p>{message}</p>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }