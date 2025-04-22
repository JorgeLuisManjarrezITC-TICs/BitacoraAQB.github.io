
    const form = document.getElementById('registerForm');
    const msg = document.getElementById('msg');

    function getUsers() {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [{ username: "admin", password: "admin123", role: "admin" }];
    }

    function saveUsers(users) {
      localStorage.setItem('users', JSON.stringify(users));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('newUsername').value.trim();
      const password = document.getElementById('newPassword').value.trim();

      const users = getUsers();

      if (users.find(u => u.username === username)) {
        msg.textContent = "Ese usuario ya existe.";
        msg.style.color = "red";
        return;
      }

      users.push({ username, password, role: "user" });
      saveUsers(users);

      msg.textContent = "Usuario creado exitosamente.";
      msg.style.color = "green";
      form.reset();
    });

    function logout() {
      localStorage.clear();
      window.location.href = "index.html";
    }

const mensaje = document.getElementById('mensaje');
const username = localStorage.getItem("username");
const nombreUsuario = document.getElementById("nombreUsuario"); // Obtener el span del nombre
const bienvenidaDiv = document.getElementById("bienvenida");
//const recargaForm = document.getElementById("recargaForm");

nombreUsuario.textContent = username; // Mostrar el nombre de usuario

function mostrarFormulario() {
  form.style.display = "block";
  bienvenidaDiv.style.display = "none";
}

bienvenidaDiv.addEventListener("click", mostrarFormulario);
//recargaForm.style.display = "none";

function obtenerRecargas() {
    const datos = localStorage.getItem("recargas");
    return datos ? JSON.parse(datos) : {};
}

function guardarRecarga(recarga) {
    const recargas = obtenerRecargas();
    if (!recargas[username]) {
        recargas[username] = [];
    }
    recargas[username].push(recarga);
    localStorage.setItem("recargas", JSON.stringify(recargas));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevaRecarga = {
        fecha: document.getElementById("fecha").value,
        litros: parseFloat(document.getElementById("litros").value),
        monto: parseFloat(document.getElementById("monto").value)
    };

    guardarRecarga(nuevaRecarga);
    mensaje.textContent = "Recarga guardada correctamente.";
    mensaje.style.color = "green";
    form.reset();
});

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}