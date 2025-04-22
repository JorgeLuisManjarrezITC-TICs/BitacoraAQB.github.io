//solo existe un usuario admin con contraseña admin123

// Lista de usuarios (en un entorno real, esto debería estar en una base de datos)
const users = [
  { username: "admin", password: "admin", role: "admin" }
];

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  // Buscar usuario que coincida con las credenciales
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
      // Guardar datos en localStorage
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("username", user.username);

      // Redirigir al dashboard
      window.location.href = "dashboard.html";
  } else {
      // Mostrar mensaje de error
      errorMsg.textContent = "Usuario o contraseña incorrectos.";
      errorMsg.style.color = "red"; // Opcional: Estilizar el mensaje de error
  }
}
  