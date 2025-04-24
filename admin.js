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

const contentContainer = document.getElementById('content-container');
const messageContainer = document.getElementById('message-container');

function loadSection(section) {
  let url = '';
  if (section === 'manage') {
    url = 'admin_manage_users.html';
    loadManageUsers();
  }
  // ... otras secciones (si las hay) ...

  fetch(url)
    .then(response => response.text())
    .then(html => {
      contentContainer.innerHTML = html;
      if (section === 'manage') {
        initManageUsers();
      }
      // ... inicializar otras secciones ...
    })
    .catch(error => {
      console.error('Error al cargar la sección:', error);
      contentContainer.innerHTML = '<p>Error al cargar el contenido.</p>';
    });
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

  const users = getUsers();

  // Llenar el selector de usuarios
  users.forEach(user => {
    if (user.role !== 'admin') { // No mostrar al admin en la lista
      const option = document.createElement('option');
      option.value = user.username;
      option.textContent = user.username;
      userSelect.appendChild(option);
    }
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

  const users = getUsers();
  const user = users.find(u => u.username === selectedUsername);
  if (user) {
    user.active = !user.active;
    saveUsers(users);
    loadManageUsers(); // Recargar la sección para actualizar la lista
    displayMessage(`Usuario ${selectedUsername} ${user.active ? 'activado' : 'desactivado'}.`);
  }
}

function showEditForm() {
  const selectedUsername = document.getElementById('user-select').value;
  if (!selectedUsername) {
    displayMessage("Por favor, seleccione un usuario.", true);
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.username === selectedUsername);
  if (user) {
    document.getElementById('edit-user-form-container').style.display = 'block';
    document.getElementById('edit-nombre').value = user.username;
    document.getElementById('edit-tipo-perfil').value = user.role;
    document.getElementById('edit-celular').value = user.celular || '';
    document.getElementById('edit-correo').value = user.correo || '';
    document.getElementById('edit-contrasena').value = '';
    document.getElementById('edit-confirmar-contrasena').value = '';
  }
}

function saveEditedUser(e) {
  e.preventDefault();
  const selectedUsername = document.getElementById('user-select').value;
  const users = getUsers();
  const userIndex = users.findIndex(u => u.username === selectedUsername);

  if (userIndex !== -1) {
    users[userIndex].username = document.getElementById('edit-nombre').value;
    users[userIndex].role = document.getElementById('edit-tipo-perfil').value;
    users[userIndex].celular = document.getElementById('edit-celular').value;
    users[userIndex].correo = document.getElementById('edit-correo').value;
    const newPassword = document.getElementById('edit-contrasena').value;
    const confirmPassword = document.getElementById('edit-confirmar-contrasena').value;

    if (newPassword) {
      if (newPassword === confirmPassword) {
        users[userIndex].password = newPassword;
      } else {
        displayMessage("Las contraseñas no coinciden.", true);
        return;
      }
    }

    saveUsers(users);
    loadManageUsers();
    displayMessage("Usuario editado exitosamente.");
    document.getElementById('edit-user-form-container').style.display = 'none';
  }
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
  const users = getUsers();
  const updatedUsers = users.filter(u => u.username !== selectedUsername);
  saveUsers(updatedUsers);
  loadManageUsers();
  displayMessage(`Usuario ${selectedUsername} eliminado.`);
  document.getElementById('delete-confirmation').style.display = 'none';
}

function getUsers() {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [{ username: "admin", password: "admin123", role: "admin", active: true }];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
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

// Cargar la sección de registro por defecto
loadSection('manage');