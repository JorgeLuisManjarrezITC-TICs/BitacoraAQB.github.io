const form = document.getElementById('registerForm');
const msg = document.getElementById('msg');

localStorage.setItem("username", username.username); // Guardar
const username = localStorage.getItem("username"); // Obtener

    function logout() {
      localStorage.clear();
      window.location.href = "index.html";
    }

const nombreUsuario = document.getElementById("username");
const fechaActual = document.getElementById("fecha");
console.log("username:", username);
console.log("nombreUsuario:", nombreUsuario);
console.log("fechaActual:", fechaActual);

const bienvenidaDiv = document.getElementById("bienvenida");
function mostrarFechaActual() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    fechaActual.textContent = `${day}-${month}-${year}`;
}
mostrarFechaActual();

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}