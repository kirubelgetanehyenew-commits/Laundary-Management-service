import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  if (page === "register") return <Register setPage={setPage} />;
  if (page === "dashboard") return <Dashboard user={user} />;
  if (page === "admin") return <Admin />;

  return <Login setPage={setPage} setUser={setUser} />;
}

export default App;