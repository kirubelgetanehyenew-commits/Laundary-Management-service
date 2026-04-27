const { useState } = React;

function App() {

  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [order, setOrder] = useState({
    service: "",
    clothes: ""
  });

  const [message, setMessage] = useState("");

  const admin = { email: "admin", password: "1234" };

  // HANDLE INPUT
  const handleChange = (e, setter, data) => {
    setter({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // REGISTER
  const register = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    setMessage("Registered! Login now");
    setPage("login");
  };

  // LOGIN
  const loginUser = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("user"));

    if (login.email === admin.email && login.password === admin.password) {
      setPage("admin");
    } else if (
      saved &&
      saved.email === login.email &&
      saved.password === login.password
    ) {
      setUser(saved);
      setPage("dashboard");
    } else {
      setMessage("Wrong login");
    }
  };

  // PLACE ORDER
  const placeOrder = (e) => {
    e.preventDefault();

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      ...order,
      user: user.name
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    setMessage("Order placed!");
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
              <button onClick={() => setPage("register")}>Register</button>
              <button onClick={() => setPage("login")}>Login</button>
            </>
          )}

          {/* REGISTER */}
          {page === "register" && (
            <>
              <form onSubmit={register}>
                <input name="name" placeholder="Name" onChange={(e) => handleChange(e, setForm, form)} />
                <input name="email" placeholder="Email" onChange={(e) => handleChange(e, setForm, form)} />
                <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e, setForm, form)} />
                <button>Register</button>
              </form>
            </>
          )}

          {/* LOGIN */}
          {page === "login" && (
            <>
              <form onSubmit={loginUser}>
                <input name="email" placeholder="Email" onChange={(e) => handleChange(e, setLogin, login)} />
                <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e, setLogin, login)} />
                <button>Login</button>
              </form>
              <p>{message}</p>
            </>
          )}

          {/* CUSTOMER DASHBOARD */}
          {page === "dashboard" && (
            <>
              <h3>Welcome {user.name}</h3>

              <form onSubmit={placeOrder}>
                <select name="service" onChange={(e) => handleChange(e, setOrder, order)}>
                  <option>Wash</option>
                  <option>Dry Clean</option>
                </select>

                <input name="clothes" placeholder="Number of clothes" onChange={(e) => handleChange(e, setOrder, order)} />
                <button>Place Order</button>
              </form>
              <p>{message}</p>
            </>
          )}

          {/* ADMIN DASHBOARD */}
          {page === "admin" && (
            <>
              <h3>Admin Dashboard</h3>

              {orders.map((o, i) => (
                <div key={i} className="order">
                  {o.user} - {o.service} ({o.clothes})
                </div>
              ))}
            </>
          )}

        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);