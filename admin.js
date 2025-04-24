import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

require('dotenv').config();

const nombreUsuarioElement = document.getElementById('nombreUsuario');
const fechaElement = document.getElementById('fecha');
const mainContent = document.querySelector('.main-content'); // Obtener la referencia aquí

// Configuración de Firebase (reemplaza con tus credenciales en el archivo .env)
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function actualizarFecha() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    fechaElement.textContent = now.toLocaleDateString('es-MX', options);
}

function loadSection(section) {
    let url = '';

    switch (section) {
        case 'miUnidad':
            url = 'admin_mi_unidad.html'; // Crea este archivo HTML
            break;
        case 'manage':
            url = 'admin_manage_users.html';
            break;
        case 'ingresarRecarga':
            url = 'admin_ingresar_recarga.html'; // Crea este archivo HTML
            break;
        case 'registro':
            url = 'admin_registro.html'; // Crea este archivo HTML
            break;
        case 'consultas':
            url = 'admin_consultas.html'; // Crea este archivo HTML
            break;
        case 'cambiarContrasena':
            url = 'admin_cambiar_contrasena.html'; // Crea este archivo HTML
            break;
        default:
            console.warn('Sección no reconocida:', section);
            mainContent.innerHTML = '<p>Sección no reconocida.</p>';
            return;
    }

    if (url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;
                // Aquí puedes agregar lógica para inicializar el contenido cargado
            })
            .catch(error => {
                console.error('Error al cargar la sección:', error);
                mainContent.innerHTML = '<p>Error al cargar el contenido.</p>';
            });
    }
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
    });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        nombreUsuarioElement.textContent = user.displayName || 'Administrador';
        actualizarFecha();
        setInterval(actualizarFecha, 60000);
    } else {
        window.location.href = 'index.html';
    }
});
