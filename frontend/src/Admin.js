import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  const updateStatus = async (id) => {
    await fetch("http://localhost:5000/api/orders/" + id, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ status: "Done" })
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {orders.map(o => (
        <div key={o._id}>
          {o.service} - {o.clothes} ({o.status})
          <button onClick={() => updateStatus(o._id)}>Mark Done</button>
        </div>
      ))}
    </div>
  );
}