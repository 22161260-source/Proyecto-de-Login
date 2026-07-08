# Sistema Escolar — Login + Panel Administrativo

## Portada

**Proyecto:** Login funcional simulado + Panel de sistema (Sidebar / Navbar)
**Materia:** Programación Web

**Integrantes:**

| Nombre | Usuario de GitHub |
|---|---|
| Vargas Vicente Ivonee Montserrat | `ivonee_montserrat_vargas_vicente` |
| Matias Carreño Manuel de Jesús | `manueldJMatias` |

**Descripción breve:**

Aplicación web de dos pantallas construida con HTML, CSS y JavaScript puro, sin frameworks ni librerías externas. Simula el acceso a un sistema escolar: el usuario inicia sesión en `login.html` con validaciones en JavaScript (sin backend) y, si son correctas, es redirigido a `index.html`, donde puede capturar un usuario (nombre, correo, contraseña, número de control y fecha de nacimiento) y verificar en el mismo formulario si es mayor de edad mediante un modal. Desde el navbar puede cerrar sesión y regresar al login.

---

## Enlaces

- **Repositorio:** `https://github.com/22161260-source/Proyecto-de-Login`
- **GitHub Pages (demo en vivo):** `https://usuario1.github.io/nombre-del-repo/login.html`

---

## Documentación técnica

### Framework CSS utilizado

No se utiliza ningún framework CSS ni de JavaScript (nada de Bootstrap, Tailwind, React ni Vue). Todo el maquetado —grid de formularios, botones, tarjetas, tabla, menú de usuario y modal— está hecho a mano en `css/style.css` y `css/login.css` con CSS puro (Flexbox, CSS Grid y la pseudoclase `:has()`). Toda la interactividad (menú desplegable, modal, validaciones) está hecha con JavaScript puro (Vanilla JS), sin dependencias externas. Los íconos son SVG en línea, no una fuente de íconos externa.

### Flujo del login hacia el sistema

1. El usuario llena el formulario de `login.html` (correo y contraseña).
2. Al enviar el formulario, `js/login.js` valida los campos usando las funciones `validarCorreo()` y `validarPassword()` de `js/utileria.js`.
3. Si ambos campos son válidos, se simula el inicio de sesión guardando en `sessionStorage`:
   - `sesionActiva = "true"`
   - `usuarioCorreo` = correo capturado
   - `usuarioNombre` = nombre derivado del correo (con `obtenerNombreDesdeCorreo()`)
4. Se redirige con `window.location.href = "index.html"`.
5. En `index.html`, `js/app.js` revisa al cargar la página si existe `sesionActiva` en `sessionStorage`. Si no existe, redirige automáticamente de vuelta a `login.html` (protección básica de la pantalla interna).

### Cómo se pasa el nombre de usuario del login al navbar

El nombre y el correo se guardan en `sessionStorage` (persiste solo durante la pestaña o sesión del navegador, y se borra al cerrar sesión o la pestaña). En `index.html`, al cargar el DOM, `app.js` lee esos valores:

```js
const nombreUsuario = sessionStorage.getItem("usuarioNombre") || "Usuario";
const correoUsuario = sessionStorage.getItem("usuarioCorreo") || "";
document.getElementById("navbarUserName").textContent = nombreUsuario;
document.getElementById("navbarUserEmail").textContent = correoUsuario;
```

Así, el navbar muestra el nombre del usuario que inició sesión, con un menú desplegable propio (hecho a mano con JavaScript: se abre y cierra al hacer clic, y se cierra al hacer clic fuera de él) que incluye la opción **Salir del sistema**.

### Funciones principales

**`js/utileria.js`** (librería de utilerías):

| Función | Descripción |
|---|---|
| `validarCorreo(correo)` | Valida formato de correo electrónico con expresión regular. |
| `soloLetras(texto)` | Valida que un texto contenga solo letras (con acentos y ñ) y espacios. |
| `validarPassword(password)` | Valida contraseña de mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial. |
| `generarPasswordSegura(longitud)` | Genera una contraseña segura aleatoria (botón de "varita" en Captura). |
| `validarNumeroControl(numeroControl)` | Valida el formato del número de control. |
| `calcularEdad(fechaNacimiento)` | Calcula la edad exacta a partir de una fecha de nacimiento. |
| `esMayorDeEdad(fechaNacimiento)` | Regresa `true` o `false` según si la persona es mayor de edad. |
| `obtenerNombreDesdeCorreo(correo)` | Obtiene un nombre para mostrar a partir del correo. |

**`js/login.js`**

- Controla el envío del formulario de login, valida los campos y hace la redirección simulada guardando la sesión en `sessionStorage`.
- Incluye botón para mostrar u ocultar la contraseña.

**`js/app.js`**

- `mostrarSeccion(nombre)`: cambia entre las secciones Inicio y Captura sin recargar la página.
- Manejo del sidebar: botón hamburguesa para colapsar o expandir en escritorio, y abrir o cerrar en móvil.
- Manejo del formulario de Captura (nombre, correo, contraseña, número de control y fecha de nacimiento en un solo formulario), validado con `soloLetras`, `validarCorreo`, `validarPassword` y `validarNumeroControl`. Al enviarlo, calcula la edad con `calcularEdad` y `esMayorDeEdad`, y abre el modal indicando si el usuario es mayor o menor de edad.
- Botón de "varita" que genera una contraseña segura con `generarPasswordSegura`.
- Cierre de sesión: limpia `sessionStorage` y redirige a `login.html`.

---

## Proceso de creación

### 1. Login (`login.html`, `css/login.css`, `js/login.js`)

- Se creó el formulario con campos de correo y contraseña usando clases propias (`campo`, `campo-grupo`, `campo-input-wrap`, `btn`).
- Se conectó `utileria.js` para validar los campos antes de iniciar sesión.
- Se guardó la sesión simulada en `sessionStorage` y se hizo la redirección a `index.html`.

Capturas de referencia:

- Pantalla de login vacía — `<img width="663" height="467" alt="image" src="https://github.com/user-attachments/assets/ee3947c4-ceb1-4e12-8330-0c20408b1f50" />
`
- Error de validación — `<img width="425" height="494" alt="image" src="https://github.com/user-attachments/assets/3f0d1adc-a8df-406c-9fef-ffc8d736101d" />
`

### 2. Sidebar y navbar (`index.html`, `css/style.css`)

- Se construyó el sidebar con el enlace Captura y el botón hamburguesa.
- Se construyó el navbar con el nombre de usuario a la derecha y el menú desplegable con la opción Salir del sistema.

Capturas de referencia:

- Sidebar abierto y cerrado — `<img width="705" height="203" alt="image" src="https://github.com/user-attachments/assets/68644ce9-9aa8-4756-93a9-6721b29fa35f" />
`
- Menú de usuario — `<img width="465" height="238" alt="image" src="https://github.com/user-attachments/assets/b292c02c-bfd0-45d8-9de7-e5ec6e5662dc" />
`

### 3. Número de control y modal de edad (`js/app.js`)

- Se agregó el campo de número de control y fecha de nacimiento al mismo formulario de Captura.
- Se implementó un modal propio (overlay más un `div` con clase `oculto` que se muestra u oculta por JavaScript) que indica si el usuario es mayor o menor de edad, usando `calcularEdad()` y `esMayorDeEdad()`. Se cierra con la X, el botón Cerrar, haciendo clic fuera de la caja o con la tecla Esc.

Capturas de referencia:

- Formulario de captura con verificación de edad — `<img width="605" height="133" alt="image" src="https://github.com/user-attachments/assets/f7c662ea-2911-4c38-99f8-276a08e89bed" />
`
- Modal de edad — `<img width="332" height="248" alt="image" src="https://github.com/user-attachments/assets/68973ee2-ca3f-40ec-a2f0-84a914612ed0" />
`

### 4. Flujo completo funcionando

Captura de referencia: login, panel y cierre de sesión — `<img width="1366" height="278" alt="image" src="https://github.com/user-attachments/assets/971b51b5-8b32-463d-bc93-1b4198eee461" />
`

---
Captura de referencia: Captura — `<img width="1366" height="551" alt="image" src="https://github.com/user-attachments/assets/68f3f95c-1eef-4779-9f81-7ca56a4cacbb" />

`
## Estructura del proyecto

```
proyecto-login/
├── README.md
├── login.html
├── index.html
├── css/
│   ├── login.css
│   └── style.css
├── js/
│   ├── login.js
│   ├── app.js
│   └── utileria.js
└── img/
    ├── logo.svg
    ├── user-icon.svg
    └── capturas/        (agregar aquí las capturas de pantalla)
```

---

## Cómo probarlo localmente

1. Clonar el repositorio.
2. Abrir `login.html` directamente en el navegador, o servirlo con Live Server o `python3 -m http.server`.
3. Ingresar cualquier correo con formato válido (por ejemplo `usuario@escuela.com`) y una contraseña de al menos 8 caracteres con mayúscula, minúscula, número y carácter especial (por ejemplo `Abc123!@`).
4. Verificar que redirige a `index.html` y que el navbar muestra el nombre derivado del correo.
5. Probar el sidebar, la captura de usuarios con número de control y fecha de nacimiento, y el modal de edad.
6. Cerrar sesión desde el menú del navbar y confirmar que regresa a `login.html`.

---

## Participación del equipo

| Integrante | Partes desarrolladas |
|---|---|
| Vargas Vicente Ivonee Montserrat | Login (`login.html`, `css/login.css`, `js/login.js`) y navbar |
| Matias Carreño Manuel de Jesús | Sidebar, captura de usuarios y modal de edad (`index.html`, `css/style.css`, `js/app.js`) |

Ambos integrantes hicieron commits directamente sobre sus propias partes, con una participación aproximada de 50/50 (ver historial de commits del repositorio).
