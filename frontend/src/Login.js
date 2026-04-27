import { useState } from "react";

export default function Login({ setPage, setUser }) {
  const [data, setData] = useState({});

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });

    const user = await res.json();
    setUser(user);

    if (user.role === "admin") setPage("admin");
    else setPage("dashboard");
  };

  return (
    <div>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}