import { useState } from "react";

export default function Register({ setPage }) {
  const [data, setData] = useState({});

  const submit = async () => {
    await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });
    setPage("login");
  };

  return (
    <div>
      <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={submit}>Register</button>
    </div>
  );
}