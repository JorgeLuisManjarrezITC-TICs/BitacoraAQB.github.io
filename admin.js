
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

const username = localStorage.getItem("username");
const nombreUsuario = document.getElementById("nombreUsuario");
nombreUsuario.textContent = username;
const fechaActual = document.getElementById("fecha");
console.log("username:", username);
console.log("nombreUsuario:", nombreUsuario);
console.log("fechaActual:", fechaActual);

//const mostrarRecargaForm = document.getElementById("mostrarRecargaForm");
//const form = document.getElementById("recargaForm");
//const mensaje = document.getElementById("mensaje");
const bienvenidaDiv = document.getElementById("bienvenida");
function mostrarFechaActual() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    fechaActual.textContent = `${year}-${month}-${day}`;
}

mostrarFechaActual();

function mostrarFormulario() {
    //form.style.display = "block";
    bienvenidaDiv.style.display = "none";
}

bienvenidaDiv.addEventListener("click", mostrarFormulario);

//mostrarRecargaForm.addEventListener("click", function() {
//  form.style.display = "block";
//  mostrarRecargaForm.style.display = "none";
//});

//form.addEventListener("submit", function (e) {
//  e.preventDefault();
//
//  const nuevaRecarga = {
//    fecha: document.getElementById("fecha").value,
//    litros: parseFloat(document.getElementById("litros").value),
//    monto: parseFloat(document.getElementById("monto").value)
//  };
//
//  guardarRecarga(nuevaRecarga);
//  mensaje.textContent = "Recarga guardada correctamente.";
//  mensaje.style.color = "green";
//  form.reset();
//});

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

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}