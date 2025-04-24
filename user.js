import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

require('dotenv').config();

const welcomeSection = document.getElementById('welcome-section');
const profileImage = document.getElementById('profile-image');
const welcomeMessage = document.getElementById('welcome-message');
const userNameDisplay = document.getElementById('user-name');
const currentDateDisplay = document.getElementById('current-date');
const logoutButton = document.getElementById('logout-button'); // Asegúrate de tener un botón de logout en user.html

// Firebase configuration (REPLACE WITH YOUR ACTUAL CREDENTIALS IN .env FILE)
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

function updateWelcomeSection(user) {
  if (user) {
    // Aquí puedes obtener más información del usuario desde la base de datos si es necesario
    const displayName = user.displayName || 'Usuario';
    const photoURL = user.photoURL || 'img/default-profile.png'; // Usa una imagen por defecto

    profileImage.src = photoURL;
    welcomeMessage.textContent = `¡Bienvenido de nuevo!`;
    userNameDisplay.textContent = displayName;

    // Mostrar la fecha actual
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = now.toLocaleDateString('es-MX', options); // Formato local

    // Ocultar cualquier otra sección y mostrar la bienvenida
    const contentSections = document.querySelectorAll('.content-section'); // Clase para tus otras secciones
    contentSections.forEach(section => section.classList.add('hidden'));
    welcomeSection.classList.remove('hidden');
  } else {
    // El usuario no está autenticado, redirigir al login
    window.location.href = 'index.html';
  }
}

// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
  updateWelcomeSection(user);
});

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
      // Redirección al login después del logout
      window.location.href = 'index.html';
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      // Mostrar un mensaje de error al usuario si es necesario
    });
  });
}

// Ocultar inicialmente la sección de bienvenida y otras secciones de contenido
document.addEventListener('DOMContentLoaded', () => {
  if (welcomeSection) {
    welcomeSection.classList.add('hidden');
  }
  const contentSections = document.querySelectorAll('.content-section');
  contentSections.forEach(section => section.classList.add('hidden'));
});

// Función para cargar otras secciones del menú (similar a admin.js)
function loadSection(sectionId) {
  const contentSections = document.querySelectorAll('.content-section');
  contentSections.forEach(section => section.classList.add('hidden'));

  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.remove('hidden');
    // Aquí puedes agregar lógica específica para inicializar cada sección
  }
}

// Ejemplo de cómo podrías tener botones en tu menú de usuario
const recargasButton = document.getElementById('recargas-button'); // Ejemplo de un botón
if (recargasButton) {
  recargasButton.addEventListener('click', () => {
    loadSection('recargas-section'); // ID de la sección de recargas
    // Aquí podrías cargar el contenido de las recargas mediante fetch o Firebase
  });
}

// Asegúrate de tener las siguientes secciones y elementos en tu user.html:
/*
<div id="welcome-section">
  <img id="profile-image" src="img/default-profile.png" alt="Foto de perfil">
  <h1 id="welcome-message"></h1>
  <p id="user-name"></p>
  <p id="current-date"></p>
</div>

<div id="recargas-section" class="content-section hidden">
  <h2>Mis Recargas</h2>
  </div>

<button id="logout-button">Cerrar Sesión</button>

<nav>
  <button id="dashboard-button" onclick="loadSection('dashboard-section')">Dashboard</button>
  <button id="recargas-button">Recargas</button>
  </nav>

<div id="dashboard-section" class="content-section hidden">
  <h2>Dashboard de Usuario</h2>
  </div>

*/