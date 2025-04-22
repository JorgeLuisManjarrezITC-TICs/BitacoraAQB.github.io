
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