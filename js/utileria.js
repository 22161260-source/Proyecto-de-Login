/**
 * utileria.js
 * Librería de funciones auxiliares (validaciones y helpers)
 * usadas en login.js y app.js
 */

/**
 * Valida que un correo tenga formato correcto: algo@algo.algo
 * @param {string} correo
 * @returns {boolean}
 */
function validarCorreo(correo) {
  if (typeof correo !== "string") return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo.trim());
}

/**
 * Valida que un texto contenga solo letras (incluye acentos y ñ) y espacios.
 * @param {string} texto
 * @returns {boolean}
 */
function soloLetras(texto) {
  if (typeof texto !== "string" || texto.trim() === "") return false;
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
  return regex.test(texto);
}

/**
 * Valida que una contraseña tenga al menos 8 caracteres, con
 * mayúscula, minúscula, número y carácter especial.
 * @param {string} password
 * @returns {boolean}
 */
function validarPassword(password) {
  if (typeof password !== "string") return false;
  const tieneMinimo8 = password.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneEspecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  return (
    tieneMinimo8 && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial
  );
}

/**
 * Genera una contraseña segura aleatoria (por defecto 12 caracteres),
 * garantizando mayúscula, minúscula, número y carácter especial.
 * @param {number} longitud
 * @returns {string}
 */
function generarPasswordSegura(longitud = 12) {
  const longitudFinal = longitud < 8 ? 8 : longitud;
  const mayusculas = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const minusculas = "abcdefghijkmnpqrstuvwxyz";
  const numeros = "0123456789";
  const especiales = "!@#$%^&*()_+-=";
  const todos = mayusculas + minusculas + numeros + especiales;
  let password = [
    mayusculas[Math.floor(Math.random() * mayusculas.length)],
    minusculas[Math.floor(Math.random() * minusculas.length)],
    numeros[Math.floor(Math.random() * numeros.length)],
    especiales[Math.floor(Math.random() * especiales.length)],
  ];
  for (let i = password.length; i < longitudFinal; i++) {
    password.push(todos[Math.floor(Math.random() * todos.length)]);
  }
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }
  return password.join("");
}

/**
 * Valida que el número de control tenga exactamente 8 dígitos numéricos.
 * @param {string} numeroControl
 * @returns {boolean}
 */
function validarNumeroControl(numeroControl) {
  if (numeroControl === null || numeroControl === undefined) return false;
  const soloDigitos = String(numeroControl).trim();
  return /^\d{6}$/.test(soloDigitos);
}

/**
 * Calcula la edad exacta a partir de una fecha de nacimiento (YYYY-MM-DD).
 * @param {string} fechaNacimiento
 * @returns {number}
 */
function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento + "T00:00:00");
  if (isNaN(nacimiento.getTime())) return NaN;
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const noHaCumplidoAnios =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() &&
      hoy.getDate() < nacimiento.getDate());
  if (noHaCumplidoAnios) edad--;
  return edad;
}

/**
 * Determina si una persona es mayor de edad (18+) a partir de su fecha de nacimiento.
 * @param {string} fechaNacimiento
 * @returns {boolean}
 */
function esMayorDeEdad(fechaNacimiento) {
  const edad = calcularEdad(fechaNacimiento);
  if (isNaN(edad)) return false;
  return edad >= 18;
}

/**
 * Obtiene un "nombre para mostrar" a partir de un correo,
 * tomando la parte antes de la @ y dándole formato de nombre propio.
 * Ej: "juan.perez@escuela.com" -> "Juan.perez"
 * @param {string} correo
 * @returns {string}
 */
function obtenerNombreDesdeCorreo(correo) {
  if (!correo) return "Usuario";
  const parte = String(correo).split("@")[0];
  return parte.charAt(0).toUpperCase() + parte.slice(1);
}
