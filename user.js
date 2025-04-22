// user.js
    const form = document.getElementById('recargaForm');
    const mensaje = document.getElementById('mensaje');
    const username = localStorage.getItem("username");

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