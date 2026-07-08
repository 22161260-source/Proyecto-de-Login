# 🎓 Sistema Escolar — Login + Panel Administrativo

## Portada

**Proyecto:** Login funcional simulado + Panel de sistema (Sidebar / Navbar)
**Materia:** _PROGRAMACION WEB_
**Integrantes:**

- [Vargas Vicente Ivonee Montserrat] — usuario de GitHub: `ivonee_montserrat_vargas_vicente`
- [Matias Carreño Manuel de jesus ] — usuario de GitHub: `manueldJMatias`

**Descripción breve:**
Aplicación web de dos pantallas construida con HTML, CSS y JavaScript puro(sin frameworks ni librerías externas). Simula el acceso a un sistema escolar:
* el usuario inicia sesión en `login.html` con validaciones en JavaScript (sin backend) y,si son correctas, es redirigido a `index.html`, donde puede capturar un usuario (nombre, correo, contraseña, número de control de 6 dígitos y fecha de nacimiento) y verificar en el mismo formulario si es mayor de edad mediante un modal. Desde el navbar puede cerrar sesión y regresar al login.

---

## Links

- **Repositorio:** `https://github.com/22161260-soLogin.git'`
- **GitHub Pages (demo en vivo):** `https://usuario1.github.io/nombre-del-repo/login.html`

---

## Documentación técnica

### Framework CSS utilizado

No se utiliza ningún framework CSS ni de JavaScript (nada de Bootstrap, Tailwind, React ni Vue). Todo el maquetado (grid de formularios, botones, tarjetas, tabla, menú de usuario y modal) está hecho a mano en `css/style.css` y `css/login.css` con CSS puro (Flexbox, CSS Grid y la pseudo-clase `:has()`), y toda la interactividad (menú desplegable, modal, validaciones) está hecha con JavaScript puro (Vanilla JS), sin dependencias externas. Los íconos son SVG en línea, no una fuente de íconos externa.

### Flujo del login hacia el sistema

1. El usuario llena el formulario de `login.html` (correo y contraseña).
2. Al enviar el formulario, `js/login.js` valida los campos usando las
   funciones `validarCorreo()` y `validarPassword()` de `js/utileria.js`.
3. Si ambos campos son válidos, se simula el "login" guardando en
   `sessionStorage`:
   - `sesionActiva = "true"`
   - `usuarioCorreo` = correo capturado
   - `usuarioNombre` = nombre derivado del correo (con `obtenerNombreDesdeCorreo()`)
4. Se redirige con `window.location.href = "index.html"`.
5. En `index.html`, `js/app.js` revisa al cargar la página si existe
   `sesionActiva` en `sessionStorage`. Si no existe, redirige
   automáticamente de vuelta a `login.html` (protección básica de la
   pantalla interna).

### Cómo se pasa el nombre de usuario del login al navbar

El nombre y el correo se guardan en **`sessionStorage`** (persiste solo
durante la pestaña/sesión del navegador, se borra al cerrar sesión o la
pestaña). En `index.html`, al cargar el DOM, `app.js` lee esos valores:

```js
const nombreUsuario = sessionStorage.getItem("usuarioNombre") || "Usuario";
const correoUsuario = sessionStorage.getItem("usuarioCorreo") || "";
document.getElementById("navbarUserName").textContent = nombreUsuario;
document.getElementById("navbarUserEmail").textContent = correoUsuario;
```

Así el navbar muestra el nombre del usuario que inició sesión, con un
menú desplegable propio (hecho a mano con JS: se abre/cierra al hacer
clic y se cierra al hacer clic fuera de él) que incluye la opción
**"Salir del sistema"**.

### Métodos / funciones principales

**`js/utileria.js`** (librería de utilerías):

| Función | Descripción |
|---|---|
| `validarCorreo(correo)` | Valida formato de correo electrónico con expresión regular. |
| `soloLetras(texto)` | Valida que un texto contenga solo letras (con acentos/ñ) y espacios. |
| `validarPassword(password)` | Valida contraseña de mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial. |
| `generarPasswordSegura(longitud)` | Genera una contraseña segura aleatoria (botón de "varita" en Captura). |
| `validarNumeroControl(numeroControl)` | Valida que el número de control tenga exactamente 8 dígitos. |
| `calcularEdad(fechaNacimiento)` | Calcula la edad exacta a partir de una fecha de nacimiento. |
| `esMayorDeEdad(fechaNacimiento)` | Regresa `true`/`false` si la persona es mayor de edad. |
| `obtenerNombreDesdeCorreo(correo)` | Obtiene un nombre "para mostrar" a partir del correo. |

**`js/login.js`**:
- Controla el envío del formulario de login, valida los campos y hace
  la redirección simulada guardando la sesión en `sessionStorage`.
- Incluye botón para mostrar/ocultar la contraseña.

**`js/app.js`**:
- `mostrarSeccion(nombre)`: cambia entre las secciones Inicio / Captura sin recargar la página.
- Manejo del **sidebar**: botón hamburguesa para colapsar/expandir en escritorio y abrir/cerrar en móvil.
- Manejo del formulario de **Captura** (nombre, correo, contraseña, número de control y fecha de nacimiento en un solo formulario), validado con `soloLetras`, `validarCorreo`, `validarPassword` y `validarNumeroControl`. Al enviarlo, calcula la edad con `calcularEdad`/`esMayorDeEdad` y abre el **modal** indicando si el usuario es mayor o menor de edad.
- Botón de "varita" que genera una contraseña segura con `generarPasswordSegura`.
- Cierre de sesión: limpia `sessionStorage` y redirige a `login.html`.

---

## 🛠️ Proceso de creación (paso a paso)

> Reemplacen esta sección con sus propias capturas de pantalla y ajusten
> la narrativa según cómo dividieron el trabajo real entre ambos.

### 1. Login (`login.html`, `css/login.css`, `js/login.js`)
- Se creó el formulario con campos de correo y contraseña usando clases propias (`campo`, `campo-grupo`, `campo-input-wrap`, `btn`).
- Se conectó `utileria.js` para validar los campos antes de "iniciar sesión".
- Se guardó la sesión simulada en `sessionStorage` y se hizo la redirección a `index.html`.

_Captura: pantalla de login vacía_
`![Login vacío](img/capturas/01-login.png)`

_Captura: error de validación_
`![Errores de validación](img/capturas/02-login-error.png)`

### 2. Sidebar y navbar (`index.html`, `css/style.css`)
- Se construyó el sidebar con el enlace **Captura** y el botón hamburguesa.
- Se construyó el navbar con el nombre de usuario a la derecha y el dropdown con "Salir del sistema".

_Captura: sidebar abierto/cerrado_
`![Sidebar](img/capturas/03-sidebar.png)`

_Captura: dropdown de usuario_
`![Dropdown usuario](img/capturas/04-navbar-dropdown.png)`

### 3. Número de control y modal de edad (`js/app.js`)
- Se agregó el campo de número de control (8 dígitos) y fecha de nacimiento al mismo formulario de Captura.
- Se implementó un modal propio (overlay + `div` con clase `oculto`/mostrar por JS) que muestra si el usuario es mayor o menor de edad usando `calcularEdad()` y `esMayorDeEdad()`. Se cierra con la X, el botón "Cerrar", haciendo clic fuera de la caja o con la tecla Esc.

_Captura: formulario de captura con verificación de edad_
`![Formulario captura](img/capturas/05-captura.png)`

_Captura: modal de edad_
`![Modal edad](img/capturas/06-modal-edad.png)`

### 4. Flujo completo funcionando
_Captura: login → panel → cierre de sesión_
`![Flujo completo](img/capturas/07-flujo-completo.png)`

---

## 📁 Estructura del proyecto

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
    └── capturas/        <- agregar aquí las capturas de pantalla
```

---

## ✅ Cómo probarlo localmente

1. Clonar el repositorio.
2. Abrir `login.html` directamente en el navegador (o servirlo con
   Live Server / `python3 -m http.server`).
3. Ingresar cualquier correo con formato válido (ej. `usuario@escuela.com`)
   y una contraseña de al menos 8 caracteres con mayúscula, minúscula,
   número y carácter especial (ej. `Abc123!@`).
4. Verificar que redirige a `index.html` y que el navbar muestra el
   nombre derivado del correo.
5. Probar el sidebar, la captura de usuarios con número de control
   (8 dígitos) y fecha de nacimiento, y el modal de edad.
6. Cerrar sesión desde el dropdown del navbar y confirmar que regresa a `login.html`.

---

## 👥 Participación del equipo

| Integrante | Partes desarrolladas |
|---|---|
| [Nombre 1] | Login (`login.html`, `css/login.css`, `js/login.js`) + Navbar |
| [Nombre 2] | Sidebar + Captura de usuarios + Modal de edad (`index.html`, `css/style.css`, `js/app.js`) |

Ambos integrantes hicieron commits directamente sobre sus propias partes,
con una participación aproximada 50/50 (ver historial de commits del repositorio).
