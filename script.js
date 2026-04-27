const { useState } = React;

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [orderData, setOrderData] = useState({
    service: "Wash",
    clothes: ""
  });

  // ADMIN ACCOUNT
  const admin = {
    email: "admin",
    password: "1234"
  };

  // HANDLE INPUT
  const handleChange = (e, setter, data) => {
    setter({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();

    if (!registerData.name || !registerData.email || !registerData.password) {
      setMessage("Fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify(registerData));

    setMessage("Registered! Please login");
    setRegisterData({ name: "", email: "", password: "" });
    setPage("customerLogin");
  };

  // CUSTOMER LOGIN
  const handleCustomerLogin = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("user"));

    if (
      saved &&
      saved.email === loginData.email &&
      saved.password === loginData.password
    ) {
      setUser(saved);
      setMessage("");
      setLoginData({ email: "", password: "" });
      setPage("dashboard");
    } else {
      setMessage("Invalid credentials");
    }
  };

  // ADMIN LOGIN
  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (
      loginData.email === admin.email &&
      loginData.password === admin.password
    ) {
      setPage("adminDashboard");
      setMessage("");
    } else {
      setMessage("Wrong admin login");
    }
  };

  // PLACE ORDER
  const placeOrder = (e) => {
    e.preventDefault();

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      user: user.name,
      service: orderData.service,
      clothes: orderData.clothes
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    setMessage("Order placed!");
    setOrderData({ service: "Wash", clothes: "" });
  };

  // DELETE ORDER (ADMIN)
  const deleteOrder = (index) => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.splice(index, 1);

    localStorage.setItem("orders", JSON.stringify(orders));
    window.location.reload();
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="container">

      <div className="left">
        <h2>Laundry Service</h2>
      </div>

      <div className="right">
        <div className="card">

          {/* HOME */}
          {page === "home" && (
            <>
              <h3>Welcome</h3>
              <button onClick={() => setPage("register")}>Customer Register</button>
              <button onClick={() => setPage("customerLogin")}>Customer Login</button>
              <button onClick={() => setPage("adminLogin")}>Admin Login</button>
            </>
          )}

          {/* REGISTER */}
          {page === "register" && (
            <>
              <h3>Register</h3>
              <form onSubmit={handleRegister}>
                <input name="name" placeholder="Name" value={registerData.name} onChange={(e)=>handleChange(e,setRegisterData,registerData)} />
                <input name="email" placeholder="Email" value={registerData.email} onChange={(e)=>handleChange(e,setRegisterData,registerData)} />
                <input name="password" type="password" placeholder="Password" value={registerData.password} onChange={(e)=>handleChange(e,setRegisterData,registerData)} />
                <button>Register</button>
              </form>
              <p className="switch" onClick={() => setPage("home")}>Back</p>
              <p className="message">{message}</p>
            </>
          )}

          {/* CUSTOMER LOGIN */}
          {page === "customerLogin" && (
            <>
              <h3>Customer Login</h3>
              <form onSubmit={handleCustomerLogin}>
                <input name="email" placeholder="Email" value={loginData.email} onChange={(e)=>handleChange(e,setLoginData,loginData)} />
                <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={(e)=>handleChange(e,setLoginData,loginData)} />
                <button>Login</button>
              </form>
              <p className="switch" onClick={() => setPage("home")}>Back</p>
              <p className="message">{message}</p>
            </>
          )}

          {/* ADMIN LOGIN */}
          {page === "adminLogin" && (
            <>
              <h3>Admin Login</h3>
              <form onSubmit={handleAdminLogin}>
                <input name="email" placeholder="Admin Email" value={loginData.email} onChange={(e)=>handleChange(e,setLoginData,loginData)} />
                <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={(e)=>handleChange(e,setLoginData,loginData)} />
                <button>Login</button>
              </form>
              <p className="switch" onClick={() => setPage("home")}>Back</p>
              <p className="message">{message}</p>
            </>
          )}

          {/* CUSTOMER DASHBOARD */}
          {page === "dashboard" && user && (
            <>
              <h3>Welcome {user.name}</h3>

              <form onSubmit={placeOrder}>
                <select name="service" value={orderData.service} onChange={(e)=>handleChange(e,setOrderData,orderData)}>
                  <option>Wash</option>
                  <option>Dry Clean</option>
                </select>

                <input name="clothes" placeholder="Number of clothes" value={orderData.clothes} onChange={(e)=>handleChange(e,setOrderData,orderData)} />
                <button>Place Order</button>
              </form>

              <p className="message">{message}</p>

              <button onClick={() => setPage("home")}>Logout</button>
            </>
          )}

          {/* ADMIN DASHBOARD */}
          {page === "adminDashboard" && (
            <>
              <h3>Admin Dashboard</h3>

              {orders.length === 0 && <p>No orders yet</p>}

              {orders.map((o, i) => (
                <div key={i} className="order">
                  {o.user} - {o.service} ({o.clothes})
                  <button onClick={() => deleteOrder(i)}>Delete</button>
                </div>
              ))}

              <button onClick={() => setPage("home")}>Logout</button>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);