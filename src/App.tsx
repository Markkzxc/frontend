// import './App.css'
// import { JSX, useState } from 'react';


// type BMICategory = "Underweight" | "Normal weight" | "Overweight" | "Obese" ;
// type BMIResult = {
//   bmi: number;
//   category: BMICategory;
//   tip: string;
// };

// function App() {
//   const [height, setHeight] = useState<string>("");
//   const [weight, setWeight] = useState<string>("");
//   const [bmiResult, setBmiResult] = useState<BMIResult|null >();

//   const calculateBMI = (): void => {
//     const heights = Number(height)
//     const weights = Number(weight);

   
   


//     const bmiValue = weights / (heights * heights);
    
    
    
//     let category: BMICategory;
//     let tip: string;

   
    
    
//     if(heights ===0||weights ===0){
//       alert("Invalid Number");
//     }else{
//         if (bmiValue < 18.5) {
//         category = "Underweight";
//         tip = "Focus on nutrient-dense food";
//       } else if (bmiValue >= 18.5 && bmiValue < 25) {
//         category = "Normal weight";
//         tip = "Maintained balance eating";
//       } else if (bmiValue >= 25 && bmiValue < 30) {
//         category = "Overweight";
//         tip = "Aim for gradual lifestyle changes";
//       } else if(bmiValue >30){
//         category = "Obese";
//         tip = "Work closely with healthcare provides";
        
//       } else {
        
//         return;
//       }
//     }
    
//      setBmiResult({
//       bmi:bmiValue,
//       category,
//       tip
//     });

    
//   };

//   const clear = (): void => {
//     setHeight("");
//     setWeight("");
//     setBmiResult(null);
//   };

  
//   const getCategoryColor = (category:BMICategory): string => {
//     switch (category) {
//       case "Underweight":
//         return "Red";
//       case "Normal weight":
//         return "Green";
//       case "Overweight":
//         return "orange";
//       case "Obese":
//         return "yellow";
//       default:
//        return "black";
//     }
//   };

//   return (
//     <>
//       <h1>BMI Calculator</h1>
      
//       <label>Height:</label>
//       <input 
//         type="number" 
//         value={height} 
//         onChange={(e) => setHeight(e.target.value)}
//       /><br /><br />
      
//       <label>Weight:</label>
//       <input 
//         type="number" 
//         value={weight} 
//         onChange={(e) => setWeight(e.target.value)}
//       /><br /><br />
      
//       <button onClick={calculateBMI}>Calculate BMI</button>
//       <button onClick={clear}>Clear</button>

      

//       {bmiResult && (
//         <>
//           <p>Your BMI :<strong style={{ color: getCategoryColor(bmiResult.category) }}> {bmiResult.bmi} </strong></p>
//           <p>Category :
//             <strong style={{ color: getCategoryColor(bmiResult.category) }}> {bmiResult.category}</strong>
//           </p>
//           <p>
//             Tip :
//             <strong style={{ color: getCategoryColor(bmiResult.category) }}> {bmiResult.tip}</strong>
//           </p>
//         </>
//       )}
//     </>
//   );
// }

// export default App;


// export default function App(){

//   interface Book{
//     name: string,
//     author: string,
//     year?: number

//     readonly x: number,
//     readonly y: number
//   }

//   const book: Book = {
//     name: "Harry Potter",
//     author: "Jk Rowling",
//     x: 45,
//     y: 90
    
//   }

//   interface MathOperation {
//      (x: number, y: number): number
//   }

//   const Add: MathOperation = (x,y) => x+y;
//   const Subtract: MathOperation = (x,y) => x - y;

//   interface Person{
//     nationality: string
//   }

//   interface Jhon extends Person{
//     age: number
//   }

//   const ace: Jhon = {
//     nationality: "Pinoy",
//     age: 56
//   }

//   interface Box <Dwight>{
//     value: Dwight
//     value2?: Dwight
//   }

//   const boxes: Box<string> = {
//     value: "Hello Dwight"
//   }

//   const boxes2: Box<number> ={
//     value: 69
//   }

//   //type assertion
//   let grade: unknown = "1";
//   let equivalentGrade: number = (grade as number) + 1;
//   console.log(equivalentGrade)

//   //const assertion

//   let danielsGF = ["Daniela", "Gabriela", "Viola"] as const;
//   danielsGF.push("Mathilda");

//   function add(a: number, b: number, ...rest: number[]){
//     return a + b + rest.reduce((p,c) => p + c, 3);
//   }

//   return(
//   <>
//     {/* <h1>{book.x =89}</h1> */}
//     {add(2,2, 10,4,6,7,3,6,9,8,10,3)}
//     {danielsGF}
//     <h1>{boxes.value}, {boxes2.value}</h1>
//     <h1>{ace.nationality} & {ace.age} </h1>
//   </>)
// }

// export default function App(){

  

    
//     const [userInput, setUserInput] = useState<string>('');
//     const [user, setUser] = useState<Select>();
//     const [result, setResult] = useState<string | number>('');
//     const [num1, setNum1] = useState<number>();
//     const [num2, setNum2] = useState<number>();
//     const [lastTotal, setLastTotal] = useState<number>(); 

//     type Select = "default" | "admin" | "guest";

//     interface Operation {
//         (num1: number, num2: number): number;
//     }

   
//     const handleSubmit = () => {
//         if (user === 'admin') {
//             setResult('admin');
//         } else if (user === 'guest') {
//             setResult('guest');
//         }
//     }

//     const logout = () => {
//       if (confirm("Are you sure you want to logout?")) {
//         setResult('');
//         setUser(undefined);
//         setUserInput('');
//         setNum1(undefined);
//         setNum2(undefined);
//         setLastTotal(undefined);
//       }
//     };

//     const handleAdd = () => {
//        const add: Operation = (num1, num2) => num1 + num2;
//         if (num1 !== undefined && num2 !== undefined) {
//             setLastTotal(add(num1, num2));
//         }
//     }

//     const handleSub = () => {
//        const sub: Operation = (num1, num2) => num1 - num2;
//         if (num1 !== undefined && num2 !== undefined) {
//             setLastTotal(sub(num1, num2));
//         }
//     }

//     const handleMul = () => {
//        const mul: Operation = (num1, num2) => num1 * num2;
//         if (num1 !== undefined && num2 !== undefined) {
//             setLastTotal(mul(num1, num2));
//         }
//     }

//     const handleDiv = () => {
//        const div: Operation = (num1, num2) => num1 / num2;
//         if (num1 !== undefined && num2 !== undefined) {
//             setLastTotal(div(num1, num2));
//         }
//     }

//     return (
//         <>
//             {result === 'admin' ?
//                 <div>
//                     <h1>Welcome {userInput} ({result})</h1>
//                     <p>num1:</p>
//                     <input type="number" value={num1 ||''} onChange={(e) => setNum1(Number(e.target.value))} />
//                     <p>num2:</p>
//                     <input type="number" value={num2 ||  ''} onChange={(e) => setNum2(Number(e.target.value))} />
//                     <br />
//                     <button onClick={handleAdd}>Add</button>
//                     <button onClick={handleSub}>Subtract</button>
//                     <button onClick={handleMul}>Multiply</button>
//                     <button onClick={handleDiv}>Divide</button>
//                     <br />
//                     <h2>Result: {lastTotal}</h2>
//                     <button onClick={logout}>Logout</button>
//                 </div>
//                 : result === 'guest' ? <div><h1>Guest</h1> <button onClick={logout}>Logout</button></div> :
//                     <div>
//                         <h1>Calculator Login</h1>
//                         <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
//                         <br />
//                         <select name="type" onChange={(e) => setUser(e.target.value as Select)}>
//                             <option value="default">Select</option>
//                             <option value="admin">Admin</option>
//                             <option value="guest">Guest</option>
//                         </select>
//                         <br />
//                         <button onClick={handleSubmit}>Login</button>
//                     </div>
//             }
//         </>
//     );
  

// }




// interface Item {
//   id: number;
//   name: string;
//   descriptions: string;
//   getLabel: () => string;
//   getDescription: () => string;
// }

// const createItem = (id: number, name: string, descriptions: string): Item => {
//   return {
//     id,
//     name,
//     descriptions,
//     getDescription: () => `${descriptions}`,
//     getLabel: () => `${name}`,
//   };
// };

// function App() {
//   const [items, setItems] = useState<Item[]>([
//     createItem(1, "Apple", "A red fruit"),
//     createItem(2, "Banana", "A yellow fruit"),
//     createItem(3, "Carrot", "An orange vegetable"),
//   ]);

//   const [query, setQuery] = useState("");
//   const [updates, setUpdates] = useState<{ [key: number]: string }>({});

//   const filtered = items.filter((item) =>
//     item.name.toLowerCase().includes(query.toLowerCase())
//   );

//   const handleUpdate = (id: number) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id && updates[id]
//           ? createItem(item.id, item.name, updates[id])
//           : item
//       )
//     );
//   };


//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Midterm Exam | Search and Update Item using Array</h3>

//       <p>
//         Search:{" "}
//         <input
//           placeholder="Search Item"
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={() => setQuery("")}>Clear</button>
//       </p>

//       {filtered.map((item) => (
//         <div key={item.id} style={{ marginBottom: "10px" }}>
//           <strong>{item.getLabel()}</strong>
//           <br />
//           {item.getDescription()}
//           <br />
//           <input
//             type="text"
//             placeholder="New description"
//             value={updates[item.id] ?? ""}   
//             onChange={(e) =>
//               setUpdates((prev) => ({ ...prev, [item.id]: e.target.value }))
//             }
//           />

//           <button onClick={() => handleUpdate(item.id)}>Update</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;



// type Rule = {
//     label: string;
//     valid: (pw: string) => boolean;
// };

// const rules: Rule[] = [
//   {
//     label: "Must be at least 8 characters long",
//     valid: (pw) => pw.length >= 8,
//   },
//   {
//     label: "Must end with a backtick (`)",
//     valid: (pw) => pw.endsWith("`"),
//   },
//   {
//     label: "Must include at least one of !, @, #",
//     valid: (pw) => /[!@#]/.test(pw),
//   },
//   {
//     label: "Must not contain sequences like abcd or 1234 (4+ in a row)",
//     valid: (pw) => {
//       const lower = pw.toLowerCase();
//       for (let i = 0; i <= lower.length - 4; i++) {
//         const slice = lower.slice(i, i + 4);
//         if (/^[a-z]+$/.test(slice) || /^[0-9]+$/.test(slice)) {
//           let asc = true;
//           let desc = true;
//           for (let j = 1; j < slice.length; j++) {
//             if (slice.charCodeAt(j) !== slice.charCodeAt(j - 1) + 1) asc = false;
//             if (slice.charCodeAt(j) !== slice.charCodeAt(j - 1) - 1) desc = false;
//           }
//           if (asc || desc) return false;
//         }
//       }
//       return true;
//     },
//   },
//   {
//     label: "Must not contain 4+ repeated characters in the same case (aaaa / AAAA)",
//     valid: (pw) => {
//       let runChar = "";
//       let runCount = 0;
//       let runCase: "upper" | "lower" | "other" | null = null;

//       for (const ch of pw) {
//         const isUpper = ch >= "A" && ch <= "Z";
//         const isLower = ch >= "a" && ch <= "z";
//         const thisCase = isUpper ? "upper" : isLower ? "lower" : "other";

//         if (ch === runChar && thisCase === runCase) {
//           runCount++;
//         } else {
//           runChar = ch;
//           runCount = 1;
//           runCase = thisCase;
//         }

//         if (runCount >= 4 && (runCase === "upper" || runCase === "lower")) {
//           return false;
//         }
//       }
//       return true;
//     },
//   },
// ];

// const PasswordChecker: React.FC = () => {
//   const [password, setPassword] = useState("");

//   const allValid = rules.every((rule) => rule.valid(password));

//   return (
//     <div
//       style={{
//         maxWidth: 450,
//         margin: "2rem auto",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h2>Password Checker</h2>
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter password"
//         style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
//       />

//       <ul style={{ listStyle: "none", paddingLeft: 0 }}>
//         {rules.map((rule, idx) => {
//           const valid = rule.valid(password);
//           return (
//             <li
//               key={idx}
//               style={{
//                 marginBottom: "6px",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <span style={{ marginRight: "8px" }}>
//                 {valid ? "✅" : "❌"}
//               </span>
//               <span style={{ color: valid ? "green" : "red" }}>
//                 {rule.label}
//               </span>
//             </li>
//           );
//         })}
//       </ul>

//       {password && (
//         <p
//           style={{
//             marginTop: "10px",
//             fontWeight: "bold",
//             color: allValid ? "green" : "red",
//           }}
//         >
//           {allValid
//             ? "✅ Password is valid!"
//             : "❌ Password is invalid."}
//         </p>
//       )}
//     </div>
//   );
// };

// export default PasswordChecker;

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "./login";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/adminDashboard";

export default function App() {
  const fullname = localStorage.getItem("fullname");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Prevent back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/"
        element={
          fullname ? (
            role === "admin" && location.pathname !== "/admindashboard" ? (
              <Navigate to="/admindashboard" replace />
            ) : role === "user" && location.pathname !== "/dashboard" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              role === "admin" ? <AdminDashboard /> : <Dashboard />
            )
          ) : (
            <Login />
          )
        }
      />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          fullname && role === "user" ? <Dashboard /> : <Navigate to="/" replace />
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admindashboard"
        element={
          fullname && role === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />
        }
      />

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}





















































// const validatePassword = (password: string) => {
//   const exclamationCount = (password.match(/!/g) || []).length;

//   const rules = [
//     { label: "At least one uppercase letter", test: /[A-Z]/.test(password) },
//     { label: "At least one lowercase letter", test: /[a-z]/.test(password) },
//     { label: "At least one number", test: /[0-9]/.test(password) },
//     { label: "Contains the word 'key' (any case)", test: /key/i.test(password) },
//     {
//       label: "Ends with '!'",
//       test: password.length > 1 && password.endsWith("!") && exclamationCount >=1,
//     },
//     { label: "At least 8 characters long", test: password.length >= 8 },
//   ];

//   return {
//     rules,
//     isValid: rules.every((rule) => rule.test),
//   };
// };


// function App() {
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { rules, isValid } = validatePassword(password);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen font-sans">
//       <h1 className="text-2xl font-bold mb-4"> Password Checker</h1>

     
//       <div >
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter password"
//           className="p-2 flex-grow outline-none"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           type="button"
          
//           onClick={() => setShowPassword((prev) => !prev)}
//         >
//           {showPassword ? " Hide" : " Show"}
//         </button>
//       </div>

      
//       <div className="bg-gray-100 p-3 rounded text-sm mt-4 w-80">
//         <h2 className="font-semibold mb-1">Password Requirements:</h2>
//         <ul className="list-disc ml-5">
//           {rules.map((rule, idx) => (
//             <li
//               key={idx}
//               className={rule.test ? "text-green-600" : "text-red-600"}
//             >
//               {rule.test ? "✅" : "❌"} {rule.label}
//             </li>
//           ))}
//         </ul>
//       </div>

      
//       <p className={`mt-3 font-semibold ${isValid ? "text-green-600" : "text-red-600"}`}>
//         {isValid ? "✅ Password is valid!" : "❌ Password does not meet requirements"}
//       </p>
//     </div>
//   );
// }

// export default App;





