//solo existe un usuario admin con contraseña admin123
const users = [
    { username: "admin", password: "Jorge2025#", role: "admin" }
  ];
  
  function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("username", user.username);
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
  }
