const API = "http://localhost:3000";

// 📝 REGISTER
function register() {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const message = document.getElementById("message");

      if (!email || !password) {
            message.style.color = "red";
            message.textContent = "Fill all fields";
            return;
      }

      fetch(API + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
      })
            .then(res => res.json())
            .then(() => {
                  message.style.color = "green";
                  message.textContent = "Registered successfully ✔";

                  setTimeout(() => {
                        window.location.href = "login.html";
                  }, 1000);
            })
            .catch(() => {
                  message.style.color = "red";
                  message.textContent = "Registration failed";
            });
}

// 🔐 LOGIN
function login() {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const message = document.getElementById("message");

      if (!email || !password) {
            message.style.color = "red";
            message.textContent = "Fill all fields";
            return;
      }

      fetch(API + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
      })
            .then(res => {
                  if (!res.ok) throw new Error();
                  return res.json();
            })
            .then(data => {
                  localStorage.setItem("role", data.role);

                  message.style.color = "green";
                  message.textContent = "Login successful ✔";

                  setTimeout(() => {
                        if (data.role === "owner") {
                              window.location.href = "owner.html";
                        } else {
                              window.location.href = "customer.html";
                        }
                  }, 1000);
            })
            .catch(() => {
                  message.style.color = "red";
                  message.textContent = "Invalid login";
            });
}

// 🔓 LOGOUT
function logout() {
      localStorage.clear();
      window.location.href = "login.html";
}

// 🔐 PROTECT PAGE
function protectPage(role) {
      const userRole = localStorage.getItem("role");
      if (!userRole || userRole !== role) {
            window.location.href = "login.html";
      }
}

// 📦 PLACE ORDER
function placeOrder() {
      const name = document.getElementById("name").value;
      const service = document.getElementById("service").value;
      const quantity = document.getElementById("quantity").value;
      const message = document.getElementById("message");

      fetch(API + "/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, service, quantity })
      })
            .then(() => {
                  message.style.color = "green";
                  message.textContent = "Order placed ✔";
            });
}

// 📋 LOAD ORDERS
function loadOrders() {
      fetch(API + "/orders")
            .then(res => res.json())
            .then(data => {
                  const list = document.getElementById("orders");
                  list.innerHTML = "";

                  data.forEach((order, index) => {
                        const li = document.createElement("li");

                        li.innerHTML = `
<strong>${order.name}</strong><br>
${order.service} (${order.quantity})<br>
<span>${order.status}</span><br>
<button onclick="updateStatus(${index})">Done</button>
`;

                        list.appendChild(li);
                  });
            });
}

// 🔄 UPDATE STATUS
function updateStatus(index) {
      fetch(API + "/order/" + index, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Done" })
      })
            .then(() => loadOrders());
}