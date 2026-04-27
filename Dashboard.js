import { useState } from "react";

export default function Dashboard({ user }) {
  const [order, setOrder] = useState({});

  const submit = async () => {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({...order, userId: user._id})
    });
  };

  return (
    <div>
      <h3>Welcome {user.name}</h3>

      <select onChange={e=>setOrder({...order, service:e.target.value})}>
        <option>Wash</option>
        <option>Dry Clean</option>
      </select>

      <input placeholder="Clothes" onChange={e=>setOrder({...order, clothes:e.target.value})}/>
      <button onClick={submit}>Place Order</button>
    </div>
  );
}