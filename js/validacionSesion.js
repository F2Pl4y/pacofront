// const domValidacionSesion = "https://f3rn4nd021py.pythonanywhere.com/";
const domValidacionSesion = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    if (url === "/index.html" || url === "/") {
        operacionLoguear();
        login();
        visualizarPassword();
    } else {
        validarSesssion();
        cerrarSesion();
        llenarPerfil();
    }
});

// Este apartado te muestra: Admin->dash Power BI; Empleado->encuestas
// function redireccionDefecto(idCargo) {
//     if (idCargo === 2) window.location.href = "/pages/dashboard.html";
//     else window.location.href = "/pages/moduloEncuesta.html";
// }
// Lo cambio por lo siguiente:
function redireccionDefecto(idCargo) {
    if (idCargo === 2) window.location.href = "/pages/pedidos.html";
    // else window.location.href = "/pages/moduloEncuesta.html";
}

function cerrarSesion() {
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', (e) => {
        sessionStorage.setItem("idEmpleado", null);
        window.location.href = "/";
    });
}

function visualizarPassword() {
    btnPasswordVision = document.getElementById('btnPasswordVision');
    txtPassword = document.getElementById('txtPassword');
    icono = document.querySelector('#btnPasswordVision i');
    btnPasswordVision.addEventListener('click', (e) => {
        if (txtPassword.type === 'password') {
            txtPassword.type = 'text';
            icono.className = 'bx bxs-show';
        } else {
            txtPassword.type = 'password';
            icono.className = 'bx bxs-hide';
        }
    });

}

function validarOperaciones(idCargo) {
    let cadena = "";
    if (idCargo === 2) {
        cadena = '<li>' +
            // '<a href="dashboard.html">' +
            // '<i class="fa fa-check-square-o"></i>Dashboard' +
            // '</a>' +
            '</li>' +



            '<li>' +
            '<a href="platillos.html">' +
            '<i class="fa fa-utensils"></i>Platillos' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="pedidos.html">' +
            '<i class="fa fa-utensils"></i>Pedidos' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="categorias.html">' +
            '<i class="fa fa-utensils"></i>Categorias' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="trabajadores.html">' +
            '<i class="fa fa-lock-open"></i>Cargos' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="registroVenta.html">' +
            '<i class="fa fa-user-tie"></i>Ventas' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="clientes.html">' +
            '<i class="fa fa-user-tie"></i>Clientes' +
            '</a>' +
            '</li>'
            // '<li>' +
            // '<a href="carta.html">' +
            // '<i class="fa fa-utensils"></i>Carta' +
            // '</a>' +
            // '</li>' +

            ;
    } else {
        cadena = '<li>' +
            '<a href="pedidos.html">' +
            '<i class="fa fa-utensils"></i>Pedidos' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="carta.html">' +
            '<i class="fa fa-utensils"></i>Carta' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="moduloEncuesta.html">' +
            '<i class="fa fa-check-square-o"></i>Modulo de encuestas' +
            '</a>' +
            '</li>';
    }
    $('#main-nav').html(cadena);
}

function validarSesssion() {
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if (idEmpleado === null) {
        window.location.href = "/index.html";
    } else {
        $.ajax({
            type: "GET",
            url: domValidacionSesion + "empleados/get/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                validarOperaciones(data["resultado"]["idCargo"]);
            }
        });

    }
}

function operacionLoguear() {
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if (idEmpleado !== 'null') {
        $.ajax({
            type: "GET",
            url: domValidacionSesion + "empleados/get/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                if (data["exito"] === true) {
                    redireccionDefecto(data["resultado"]["idCargo"]);
                    validarOperaciones(data["resultado"]["idCargo"]);
                }
            }
        });
    }
}

function login() {
    const txtCorreo = document.getElementById('txtCorreo');
    const txtPassword = document.getElementById('txtPassword');
    const logIncorrecto = document.getElementById('logIncorrecto');
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        const registro = new FormData();
        registro.append("txtCorreo", txtCorreo.value);
        registro.append("txtPassword", txtPassword.value);
        $.ajax({
            type: "POST",
            url: domValidacionSesion + "empleados/login/",
            data: registro,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function (data) {
                if (data["exito"] === true) {
                    sessionStorage.setItem("idEmpleado", data["resultado"]["idEmpleado"]);
                    redireccionDefecto(data["resultado"]["idCargo"]);
                    validarOperaciones(data["resultado"]["idCargo"]);
                } else {
                    logIncorrecto.textContent = data["resultado"]
                }
            }
        });
    });
}

function llenarPerfil() {
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if (idEmpleado !== null) {
        $.ajax({
            type: "GET",
            url: domValidacionSesion + "empleados/loginget/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                if (data["exito"] === true) {
                    let carta = `<div>Correo: ${data["resultado"]["correoEmpleado"]}</div>`
                    carta += `<div>Nombre: ${data["resultado"]["nombreEmpleado"]}
                    </div>`
                    carta += `<div>Cargo: ${data["resultado"]["nombreCargo"]}
                    </div>`
                    $('#perfil').html(carta)
                }
            }
        });
    }
}