function validarCorreo(correo) {
    var patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(correo);
}

function soloLetras(texto) {
    var patron = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    return patron.test(texto);
}

function validarLongitud(numero, maxLongitud) {
    var soloDigitos = String(numero).replace(/[^0-9]/g, "");
    return soloDigitos.length <= maxLongitud;
}

function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var nacimiento = new Date(fechaNacimiento + "T00:00:00");

    var edad = hoy.getFullYear() - nacimiento.getFullYear();
    var diferenciaMes = hoy.getMonth() - nacimiento.getMonth();

    if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

function validarPassword(password) {
    if (password.length < 8) {
        return false;
    }

    var hayMayuscula = /[A-Z]/.test(password);
    var hayMinuscula = /[a-z]/.test(password);
    var hayNumero = /[0-9]/.test(password);
    var hayEspecial = /[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?\/~`\\]/.test(password);

    if (hayMayuscula && hayMinuscula && hayNumero && hayEspecial) {
        return true;
    } else {
        return false;
    }
}

function formatearTelefono(telefono) {
    var nums = String(telefono).replace(/\D/g, "");

    if (nums.length != 10) {
        return null;
    }

    var resultado = "(" + nums.substring(0, 3) + ") " + nums.substring(3, 6) + "-" + nums.substring(6, 10);
    return resultado;
}

function contarPalabras(texto) {
    if (!texto || texto.trim() == "") {
        return 0;
    }
    var palabras = texto.trim().split(/\s+/);
    return palabras.length;
}

