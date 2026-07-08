

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  const inputCorreo = document.getElementById("correo");
  const inputPassword = document.getElementById("password");
  const mensajeLogin = document.getElementById("mensajeLogin");
  const btnVerPassword = document.getElementById("btnVerPassword");

  const svgOjo =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  const svgOjoTachado =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"></path><path d="M10.6 10.6a3 3 0 0 0 4.24 4.24"></path><path d="M6.6 6.7C4 8.3 2 12 2 12s4 7 11 7c1.7 0 3.2-.4 4.5-1"></path><path d="M17.9 17.9C20.4 16.3 22 12 22 12s-1.4-2.5-3.8-4.4"></path></svg>';

  btnVerPassword.addEventListener("click", () => {
    const esPassword = inputPassword.type === "password";
    inputPassword.type = esPassword ? "text" : "password";
    btnVerPassword.innerHTML = esPassword ? svgOjoTachado : svgOjo;
  });

  inputCorreo.addEventListener("blur", () => {
    if (inputCorreo.value.trim() !== "") {
      if (!validarCorreo(inputCorreo.value.trim())) {
        inputCorreo.classList.add("is-invalid");
      } else {
        inputCorreo.classList.remove("is-invalid");
      }
    }
  });
  inputCorreo.addEventListener("input", () => {
    if (inputCorreo.classList.contains("is-invalid") && validarCorreo(inputCorreo.value.trim())) {
      inputCorreo.classList.remove("is-invalid");
    }
  });

  inputPassword.addEventListener("blur", () => {
    if (inputPassword.value !== "") {
      if (!validarPassword(inputPassword.value)) {
        inputPassword.classList.add("is-invalid");
      } else {
        inputPassword.classList.remove("is-invalid");
      }
    }
  });
  inputPassword.addEventListener("input", () => {
    if (inputPassword.classList.contains("is-invalid") && validarPassword(inputPassword.value)) {
      inputPassword.classList.remove("is-invalid");
    }
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mensajeLogin.classList.add("oculto");

    const correo = inputCorreo.value.trim();
    const password = inputPassword.value;

    let esValido = true;

    if (!validarCorreo(correo)) {
      inputCorreo.classList.add("is-invalid");
      esValido = false;
    } else {
      inputCorreo.classList.remove("is-invalid");
    }

    if (!validarPassword(password)) {
      inputPassword.classList.add("is-invalid");
      esValido = false;
    } else {
      inputPassword.classList.remove("is-invalid");
    }

    if (!esValido) {
      mensajeLogin.textContent =
        "Revisa los campos marcados: el correo debe tener formato válido y la contraseña al menos 8 caracteres con mayúscula, minúscula, número y carácter especial.";
      mensajeLogin.classList.remove("oculto");
      return;
    }

    const nombreUsuario = obtenerNombreDesdeCorreo(correo);

    sessionStorage.setItem("usuarioCorreo", correo);
    sessionStorage.setItem("usuarioNombre", nombreUsuario);
    sessionStorage.setItem("sesionActiva", "true");

    window.location.href = "index.html";
  });
});
