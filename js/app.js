/**
 * app.js
 * Lógica del sistema (index.html): protección de sesión, sidebar,
 * navbar con usuario y captura de usuarios (con verificación de edad).
 * Usa las funciones de utileria.js: validarCorreo, validarPassword,
 * soloLetras, validarNumeroControl, esMayorDeEdad, calcularEdad,
 * generarPasswordSegura.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- 1. Protección de sesión simulada ----------
  const sesionActiva = sessionStorage.getItem("sesionActiva");
  if (sesionActiva !== "true") {
    window.location.href = "login.html";
    return;
  }

  const nombreUsuario = sessionStorage.getItem("usuarioNombre") || "Usuario";
  const correoUsuario = sessionStorage.getItem("usuarioCorreo") || "";

  document.getElementById("navbarUserName").textContent = nombreUsuario;
  document.getElementById("navbarUserEmail").textContent = correoUsuario;
  document.getElementById("bienvenidaNombre").textContent = nombreUsuario;

  // ---------- 1.1 Menú de usuario propio (sin bootstrap dropdown) ----------
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userMenuLista = document.getElementById("userMenuLista");

  function cerrarMenuUsuario() {
    userMenuLista.classList.add("oculto");
    userMenuBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMenuUsuario() {
    const abierto = !userMenuLista.classList.contains("oculto");
    if (abierto) {
      cerrarMenuUsuario();
    } else {
      userMenuLista.classList.remove("oculto");
      userMenuBtn.setAttribute("aria-expanded", "true");
    }
  }

  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenuUsuario();
  });

  document.addEventListener("click", (e) => {
    if (!userMenuLista.classList.contains("oculto") && !userMenuLista.contains(e.target) && e.target !== userMenuBtn) {
      cerrarMenuUsuario();
    }
  });

  // ---------- 2. Sidebar: hamburguesa (colapsar / expandir) ----------
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const btnHamburger = document.getElementById("btnHamburger");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  function esMovil() {
    return window.innerWidth <= 768;
  }

  btnHamburger.addEventListener("click", () => {
    if (esMovil()) {
      sidebar.classList.toggle("mobile-open");
      sidebarOverlay.classList.toggle("show");
    } else {
      sidebar.classList.toggle("collapsed");
      mainContent.classList.toggle("collapsed");
    }
  });

  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("mobile-open");
    sidebarOverlay.classList.remove("show");
  });

  // ---------- 3. Navegación entre secciones ----------
  const secciones = {
    inicio: document.getElementById("section-inicio"),
    captura: document.getElementById("section-captura"),
  };

  const titulos = {
    inicio: "Inicio",
    captura: "Captura",
  };

  const topbarTitle = document.getElementById("topbarTitle");
  const enlacesNav = document.querySelectorAll("[data-section]");

  function mostrarSeccion(nombre) {
    Object.values(secciones).forEach((sec) => sec.classList.add("oculto"));
    secciones[nombre].classList.remove("oculto");
    topbarTitle.textContent = titulos[nombre];

    enlacesNav.forEach((el) => el.classList.remove("active"));
    document
      .querySelectorAll(`[data-section="${nombre}"]`)
      .forEach((el) => el.classList.add("active"));

    if (esMovil()) {
      sidebar.classList.remove("mobile-open");
      sidebarOverlay.classList.remove("show");
    }
  }

  enlacesNav.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(enlace.dataset.section);
    });
  });

  // ---------- 4. Captura de usuarios + verificación de edad ----------
  const formCaptura = document.getElementById("formCaptura");
  const capNombre = document.getElementById("capNombre");
  const capCorreo = document.getElementById("capCorreo");
  const capPassword = document.getElementById("capPassword");
  const capNumeroControl = document.getElementById("capNumeroControl");
  const capFechaNacimiento = document.getElementById("capFechaNacimiento");
  const btnGenerarPassword = document.getElementById("btnGenerarPassword");
  const tablaUsuarios = document.getElementById("tablaUsuarios");
  const statUsuarios = document.getElementById("statUsuarios");
  const statMayores = document.getElementById("statMayores");

  let usuariosCapturados = [];

  // Botón para generar una contraseña segura automáticamente
  btnGenerarPassword.addEventListener("click", () => {
    capPassword.type = "text";
    capPassword.value = generarPasswordSegura(12);
    capPassword.classList.remove("is-invalid");
  });

  // ---------- Modal de edad propio (overlay + oculto, sin bootstrap.Modal) ----------
  const modalEdadEl = document.getElementById("modalEdad");
  const modalEdadIcono = document.getElementById("modalEdadIcono");
  const modalEdadTitulo = document.getElementById("modalEdadTitulo");
  const modalEdadDetalle = document.getElementById("modalEdadDetalle");
  const modalEdadCerrarX = document.getElementById("modalEdadCerrarX");
  const modalEdadCerrarBtn = document.getElementById("modalEdadCerrarBtn");

  const modalEdad = {
    show() {
      modalEdadEl.classList.remove("oculto");
    },
    hide() {
      modalEdadEl.classList.add("oculto");
    },
  };

  modalEdadCerrarX.addEventListener("click", () => modalEdad.hide());
  modalEdadCerrarBtn.addEventListener("click", () => modalEdad.hide());

  // Cerrar al hacer click fuera de la caja (sobre el overlay)
  modalEdadEl.addEventListener("click", (e) => {
    if (e.target === modalEdadEl) {
      modalEdad.hide();
    }
  });

  // Cerrar con la tecla Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalEdadEl.classList.contains("oculto")) {
      modalEdad.hide();
    }
  });

  // ---------- Validaciones en tiempo real (antes de enviar) ----------
  capNombre.addEventListener("blur", () => {
    if (capNombre.value.trim() !== "") {
      if (!soloLetras(capNombre.value)) {
        capNombre.classList.add("is-invalid");
      } else {
        capNombre.classList.remove("is-invalid");
      }
    }
  });
  capNombre.addEventListener("input", () => {
    if (capNombre.classList.contains("is-invalid") && soloLetras(capNombre.value)) {
      capNombre.classList.remove("is-invalid");
    }
  });

  capCorreo.addEventListener("blur", () => {
    if (capCorreo.value.trim() !== "") {
      if (!validarCorreo(capCorreo.value)) {
        capCorreo.classList.add("is-invalid");
      } else {
        capCorreo.classList.remove("is-invalid");
      }
    }
  });
  capCorreo.addEventListener("input", () => {
    if (capCorreo.classList.contains("is-invalid") && validarCorreo(capCorreo.value)) {
      capCorreo.classList.remove("is-invalid");
    }
  });

  capPassword.addEventListener("blur", () => {
    if (capPassword.value !== "") {
      if (!validarPassword(capPassword.value)) {
        capPassword.classList.add("is-invalid");
      } else {
        capPassword.classList.remove("is-invalid");
      }
    }
  });
  capPassword.addEventListener("input", () => {
    if (capPassword.classList.contains("is-invalid") && validarPassword(capPassword.value)) {
      capPassword.classList.remove("is-invalid");
    }
  });

  capNumeroControl.addEventListener("blur", () => {
    if (capNumeroControl.value.trim() !== "") {
      if (!validarNumeroControl(capNumeroControl.value)) {
        capNumeroControl.classList.add("is-invalid");
      } else {
        capNumeroControl.classList.remove("is-invalid");
      }
    }
  });
  capNumeroControl.addEventListener("input", () => {
    if (capNumeroControl.classList.contains("is-invalid") && validarNumeroControl(capNumeroControl.value)) {
      capNumeroControl.classList.remove("is-invalid");
    }
  });

  capFechaNacimiento.addEventListener("change", () => {
    if (capFechaNacimiento.value) {
      capFechaNacimiento.classList.remove("is-invalid");
    } else {
      capFechaNacimiento.classList.add("is-invalid");
    }
  });

  formCaptura.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    // Nombre: solo letras (utileria.js -> soloLetras)
    if (!soloLetras(capNombre.value)) {
      capNombre.classList.add("is-invalid");
      valido = false;
    } else {
      capNombre.classList.remove("is-invalid");
    }

    // Correo (utileria.js -> validarCorreo)
    if (!validarCorreo(capCorreo.value)) {
      capCorreo.classList.add("is-invalid");
      valido = false;
    } else {
      capCorreo.classList.remove("is-invalid");
    }

    // Contraseña: 8+ caracteres, mayúscula, minúscula, número y especial
    if (!validarPassword(capPassword.value)) {
      capPassword.classList.add("is-invalid");
      valido = false;
    } else {
      capPassword.classList.remove("is-invalid");
    }

    // Número de control: 8 dígitos (utileria.js -> validarNumeroControl)
    if (!validarNumeroControl(capNumeroControl.value)) {
      capNumeroControl.classList.add("is-invalid");
      valido = false;
    } else {
      capNumeroControl.classList.remove("is-invalid");
    }

    // Fecha de nacimiento requerida
    if (!capFechaNacimiento.value) {
      capFechaNacimiento.classList.add("is-invalid");
      valido = false;
    } else {
      capFechaNacimiento.classList.remove("is-invalid");
    }

    if (!valido) return;

    const edad = calcularEdad(capFechaNacimiento.value);
    const mayor = esMayorDeEdad(capFechaNacimiento.value);

    usuariosCapturados.push({
      nombre: capNombre.value.trim(),
      correo: capCorreo.value.trim(),
      numeroControl: capNumeroControl.value.trim(),
      edad,
      mayor,
    });

    renderTablaUsuarios();

    // Modal con el resultado de la verificación de edad (íconos SVG propios)
    const svgCheckCircle =
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.6l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"></path></svg>';
    const svgExclamationCircle =
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2zm0-4h-2V7h2z"></path></svg>';

    if (mayor) {
      modalEdadIcono.className = "modal-icono icono-mayor";
      modalEdadIcono.innerHTML = svgCheckCircle;
      modalEdadTitulo.textContent = "Usuario mayor de edad";
    } else {
      modalEdadIcono.className = "modal-icono icono-menor";
      modalEdadIcono.innerHTML = svgExclamationCircle;
      modalEdadTitulo.textContent = "Usuario menor de edad";
    }
    modalEdadDetalle.textContent = `${capNombre.value.trim()} tiene ${edad} años.`;
    modalEdad.show();

    formCaptura.reset();
    capPassword.type = "password";
    [capNombre, capCorreo, capPassword, capNumeroControl, capFechaNacimiento].forEach(
      (i) => i.classList.remove("is-invalid")
    );
  });

  function renderTablaUsuarios() {
    if (usuariosCapturados.length === 0) {
      tablaUsuarios.innerHTML =
        '<tr><td colspan="6" class="texto-muted" style="text-align:center;">Sin usuarios capturados aún</td></tr>';
    } else {
      tablaUsuarios.innerHTML = usuariosCapturados
        .map(
          (u, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${u.nombre}</td>
          <td>${u.correo}</td>
          <td>${u.numeroControl}</td>
          <td>${u.edad}</td>
          <td>
            <span class="etiqueta ${u.mayor ? "badge-mayor" : "badge-menor"}">
              ${u.mayor ? "Mayor de edad" : "Menor de edad"}
            </span>
          </td>
        </tr>`
        )
        .join("");
    }
    statUsuarios.textContent = usuariosCapturados.length;
    statMayores.textContent = usuariosCapturados.filter((u) => u.mayor).length;
  }

  // ---------- 5. Cerrar sesión ----------
  document.getElementById("btnLogout").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "login.html";
  });
});
