// Firebase configuration (REPLACE WITH YOUR ACTUAL CREDENTIALS)
require('dotenv').config();
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const contentContainer = document.getElementById('content-container');
const messageContainer = document.getElementById('message-container');

// Firebase configuration using environment variables
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function loadSection(section) {
  let url = '';
  if (section === 'manage') {
    url = 'admin_manage_users.html';
    loadManageUsers();
  }
  // ... otras secciones (si las hay) ...
}

function displayMessage(message, isError = false) {
  messageContainer.innerHTML = `<p class="${isError ? 'mensaje-error' : 'mensaje-confirmacion'}">${message}</p>`;
  setTimeout(() => messageContainer.innerHTML = '', 3000);
}

function loadManageUsers() {
  fetch('admin_manage_users.html')
    .then(response => response.text())
    .then(html => {
      contentContainer.innerHTML = html;
      initManageUsers();
    })
    .catch(error => {
      console.error('Error al cargar la sección de administrar usuarios:', error);
      contentContainer.innerHTML = '<p>Error al cargar el contenido.</p>';
    });
}

function initManageUsers() {
  const userSelect = document.getElementById('user-select');
  const toggleStatusBtn = document.getElementById('toggle-status-btn');
  const deleteUserBtn = document.getElementById('delete-user-btn');
  const editUserBtn = document.getElementById('edit-user-btn');
  const deleteConfirmation = document.getElementById('delete-confirmation');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const editFormContainer = document.getElementById('edit-user-form-container');
  const editForm = document.getElementById('edit-user-form');
  const togglePasswordEditBtn = document.getElementById('toggle-password-edit');
  const toggleConfirmPasswordEditBtn = document.getElementById('toggle-confirm-password-edit');

  // Obtener usuarios de Firebase
  getUsersFromFirebase().then(users => {
    // Llenar el selector de usuarios
    users.forEach(user => {
      if (user.role !== 'admin') {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        userSelect.appendChild(option);
      }
    });
  });

  toggleStatusBtn.addEventListener('click', toggleUserStatus);
  deleteUserBtn.addEventListener('click', showDeleteConfirmation);
  editUserBtn.addEventListener('click', showEditForm);
  confirmDeleteBtn.addEventListener('click', performDeleteUser);
  editForm.addEventListener('submit', saveEditedUser);
  togglePasswordEditBtn.addEventListener('click', togglePasswordVisibility);
  toggleConfirmPasswordEditBtn.addEventListener('click', toggleConfirmPasswordVisibility);
}

function toggleUserStatus() {
  const selectedUsername = document.getElementById('user-select').value;
  if (!selectedUsername) {
    displayMessage("Por favor, seleccione un usuario.", true);
    return;
  }

  // Obtener el usuario de Firebase y cambiar su estado
  getUserFromFirebase(selectedUsername).then(user => {
    if (user) {
      updateUserInFirebase(selectedUsername, { active: !user.active })
        .then(() => {
          loadManageUsers(); // Recargar la sección para actualizar la lista
          displayMessage(`Usuario ${selectedUsername} ${user.active ? 'activado' : 'desactivado'}.`);
        });
    }
  });
}

function showEditForm() {
  const selectedUsername = document.getElementById('user-select').value;
  if (!selectedUsername) {
    displayMessage("Por favor, seleccione un usuario.", true);
    return;
  }

  // Obtener el usuario de Firebase y mostrar el formulario
  getUserFromFirebase(selectedUsername).then(user => {
    if (user) {
      document.getElementById('edit-user-form-container').style.display = 'block';
      document.getElementById('edit-nombre').value = user.username;
      document.getElementById('edit-tipo-perfil').value = user.role;
      document.getElementById('edit-celular').value = user.celular || '';
      document.getElementById('edit-correo').value = user.correo || '';
      document.getElementById('edit-contrasena').value = '';
      document.getElementById('edit-confirmar-contrasena').value = '';
    }
  });
}

function saveEditedUser(e) {
  e.preventDefault();
  const selectedUsername = document.getElementById('user-select').value;
  // ... (Obtener datos del formulario)
  const updatedUserData = {
    username: document.getElementById('edit-nombre').value,
    role: document.getElementById('edit-tipo-perfil').value,
    celular: document.getElementById('edit-celular').value,
    correo: document.getElementById('edit-correo').value,
  };

  const newPassword = document.getElementById('edit-contrasena').value;
  const confirmPassword = document.getElementById('edit-confirmar-contrasena').value;

  if (newPassword) {
    if (newPassword === confirmPassword) {
      updatedUserData.password = newPassword;
    } else {
      displayMessage("Las contraseñas no coinciden.", true);
      return;
    }
  }

  // Actualizar el usuario en Firebase
  updateUserInFirebase(selectedUsername, updatedUserData).then(() => {
    loadManageUsers();
    displayMessage("Usuario editado exitosamente.");
    document.getElementById('edit-user-form-container').style.display = 'none';
  });
}

function showDeleteConfirmation() {
  const selectedUsername = document.getElementById('user-select').value;
  if (!selectedUsername) {
    displayMessage("Por favor, seleccione un usuario.", true);
    return;
  }
  document.getElementById('delete-confirmation').style.display = 'block';
}

function performDeleteUser() {
  const selectedUsername = document.getElementById('user-select').value;
  // Eliminar el usuario de Firebase
  deleteUserFromFirebase(selectedUsername).then(() => {
    loadManageUsers();
    displayMessage(`Usuario ${selectedUsername} eliminado.`);
    document.getElementById('delete-confirmation').style.display = 'none';
  });
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('edit-contrasena');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.textContent = this.textContent === 'Mostrar' ? 'Ocultar' : 'Mostrar';
}

function toggleConfirmPasswordVisibility() {
  const passwordInput = document.getElementById('edit-confirmar-contrasena');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.textContent = this.textContent === 'Mostrar' ? 'Ocultar' : 'Mostrar';
}

// Firebase utility functions

// Obtener todos los usuarios
function getUsersFromFirebase() {
  const dbRef = ref(database, 'users');
  return get(dbRef).then(snapshot => {
    const users = [];
    snapshot.forEach(childSnapshot => {
      users.push(childSnapshot.val());
    });
    return users;
  }).catch(error => {
    console.error("Error getting users:", error);
    displayMessage("Error al obtener usuarios.", true);
    return []; // Return an empty array in case of error
  });
}

// Obtener un usuario por su nombre de usuario
function getUserFromFirebase(username) {
  const dbRef = ref(database, 'users');
  const userQuery = query(dbRef, orderByChild('username'), equalTo(username));

  return get(userQuery).then(snapshot => {
    let user = null;
    snapshot.forEach(childSnapshot => {
      user = childSnapshot.val();
    });
    return user;
  }).catch(error => {
    console.error("Error getting user:", error);
    displayMessage("Error al obtener usuario.", true);
    return null; // Return null in case of error
  });
}

// Guardar un nuevo usuario
function saveUserToFirebase(userData) {
  const dbRef = ref(database, 'users');
  return push(dbRef, userData).then(() => {
    displayMessage("Usuario guardado exitosamente.");
  }).catch(error => {
    console.error("Error saving user:", error);
    displayMessage("Error al guardar usuario.", true);
  });
}

// Actualizar un usuario existente
function updateUserInFirebase(username, userData) {
  const dbRef = ref(database, 'users');
  const userQuery = query(dbRef, orderByChild('username'), equalTo(username));

  return get(userQuery).then(snapshot => {
    let updates = {};
    snapshot.forEach(childSnapshot => {
      updates[childSnapshot.key] = userData;
    });
    return update(ref(database, 'users'), updates);
  }).then(() => {
    displayMessage("Usuario actualizado exitosamente.");
  }).catch(error => {
    console.error("Error updating user:", error);
    displayMessage("Error al actualizar usuario.", true);
  });
}

// Eliminar un usuario
function deleteUserFromFirebase(username) {
  const dbRef = ref(database, 'users');
  const userQuery = query(dbRef, orderByChild('username'), equalTo(username));

  return get(userQuery).then(snapshot => {
    let updates = {};
    snapshot.forEach(childSnapshot => {
      updates[childSnapshot.key] = null;
    });
    return update(ref(database, 'users'), updates);
  }).then(() => {
    displayMessage("Usuario eliminado exitosamente.");
  }).catch(error => {
    console.error("Error deleting user:", error);
    displayMessage("Error al eliminar usuario.", true);
  });
}


// Cargar la sección de registro por defecto
loadSection('manage');