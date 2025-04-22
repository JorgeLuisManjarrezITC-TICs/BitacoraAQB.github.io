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

    const nombreUsuario = document.getElementById("username");
    const fechaActual = document.getElementById("fecha");
    //const mostrarRecargaForm = document.getElementById("mostrarRecargaForm");
    //const form = document.getElementById("recargaForm");
    //const mensaje = document.getElementById("mensaje");
    const bienvenidaDiv = document.getElementById("bienvenida");
    
    nombreUsuario.textContent = username;
    
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