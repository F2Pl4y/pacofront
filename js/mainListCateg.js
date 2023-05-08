// const domMainEmpleados = "https://f3rn4nd021py.pythonanywhere.com/";
const domMainListCateg = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    empSelect();
    if (url === "/index.html" || url === "/") {
        console.log("dentro del if cargar");
        console.log("la url del inicio es: " + url);
    } else {
        console.log("entre al else de la linea 9");
        const AgregarEmpleadoBtn = document.getElementById('AgregarListCatbtn');
        AgregarEmpleadoBtn.addEventListener('click', (e) => {
            $('#accionTrab').val('INSERT');
            // vaciarFormulario();
        });

        // insertarAdmiEmp();
        // modalCorroborarPassword();
        const boton1 = document.getElementById('btnEnviarE');
        const boton10 = document.getElementById('btnEnviarI');
        boton10.addEventListener('click', (e) => {
            if (url === "/pages/categorias.html" || url === "/pages/categorias.html") {
                console.log("deberia actualizar");
                empleadoUpdate();
            }
        });
        const boton11 = document.getElementById('btnEnviarINUEVO');
        boton11.addEventListener('click', (e) => {
            if (url === "/pages/categorias.html" || url === "/pages/categorias.html") {
                console.log("ESTOY EN btn Enviar INUEVO");
                // empleadoUpdate();
                crearCateg();
            }
        });
        // boton1.addEventListener('click', (e) => {
        //     if (url === "/pages/trabajadores.html" || url === "/pages/cuentasadmin.html") {
        //         empleadoUpdate();
        //     }
        // });
        // switch (url) {
        //     case "/pages/cuentasadmin.html": AdminSelect(); break;
        //     case "/pages/trabajadores.html": empSelect(); break;
        // }
    }
});

// function vaciarFormulario() {
//     $('#txtid Empleado').val("");
//     $('#txt nombreEmpleado').val("");
//     $('#txtpasswordEmpleado').val("");
//     $('#txtcorreoEmpleado').val("");
//     $('#contenidoCargosList3').val("");
// }


function modalCorroborarPassword(id) {
    $('#mensajeError').html("");
    // $('#txtPasswordC').val("");
    $('#idCategoria').val(id);
    // const btnConfirmarPassword = document.getElementById('btnConfirmarPassword');
    // btnConfirmarPassword.addEventListener('click', (e) => {
    const valores = new FormData();
    valores.append("id", $('#idCategoria').val());
    // valores.append("password", $('#txtPasswordC').val());
    $.ajax({
        type: "POST",
        url: domMainListCateg + "categorias/corroborar/",
        data: valores,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            // if (data["exito"] === false) {
            //     $('#mensajeError').html(data["resultado"]);
            // } else {
            // vaciarFormulario();
            $('#accionTrab').val('UPDATE');
            $('#modalCorroborarPassword').modal('hide');
            $('#crearTrabajadores').modal('show');
            // $('#txtid Empleado').val(data["resultado"]["id Empleado"]);
            $('#txtNombreCategoria').val(data["resultado"]["nombreCategoria"]);
            // $('#txt nombreEmpleado').val(data["resultado"]["nombreEmpleado"]);
            // $('#txtcorreoEmpleado').val(data["resultado"]["correoEmpleado"]);
            // $('#contenidoCargosList3').val(data["resultado"]["idCargo"]);
            // $('#tituloModal').html("Datos del empleado<br>''" + data["resultado"]["nombreEmpleado"] + "''");
            // }
            console.log("el valor es: " + data["resultado"]["nombreCategoria"]);
        }
    });
    // })
};

function insertarAdmiEmp() {
    const url = window.location.pathname;
    const boton2 = document.getElementById('btnEnviarLC');
    console.log("entre a insertAdminEmp");
    boton2.addEventListener('click', (e) => {
        if (url === "/pages/categorias.html" || url === "/pages/categorias") {
            // if ($('#accionTrab').val() === 'UPDATE') {
            //     console.log("dentro del sub if de la pagina");
            //     // empleadoUpdate();
            //     AdminInsert();
            // } else {
            //     console.log("dentro del sub else de la pagina");
            // }
            // AdminInsert();
        }
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            if ($('#accionTrab').val() === 'UPDATE') {
                empleadoUpdate();
            } else {
                crearCateg();
            }
        }
    });
}

function empSelect() {
    console.log("INICIOOOO");
    $.ajax({
        type: "GET",
        url: domMainListCateg + "categorias/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<tr>';
                template += '<td>' + valor["idCategoria"] + '</td>';
                template += '<td>' + valor["nombreCategoria"] + '</td>';
                // template += '<td>' + valor["estado"] + '</td>';
                template += '<td class="grupoBotones">';
                template += '<div class="btn-group">';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#crearTrabajadores" onclick="modalCorroborarPassword(' + valor["idCategoria"] + ')"><i class="gg-info"></i></a>';
                template += '</button>';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-danger" onclick="return deshabilitarCateg(' + valor["idCategoria"] + ')"><i class="gg-unavailable"></i></a>';
                template += '</button>';
                template += '</div>';
                template += '</td>';
                template += '</tr>';
                tabla += template;
            });
            $('#contenidoCategoria').html(tabla);
        }
    });
}

function deshabilitarCateg(id) {
    const url = window.location.pathname;
    $.ajax({
        type: "PUT",
        url: domMainListCateg + "categorias/disable/" + id + "/",
        dataType: "json",
        success: function (data) {
            console.log("supuestamente se deshabilito");
            if (url === "/pages/categorias.html" || url === "/pages/categorias") {
                // AdminSelect();
            }
            if (url === "/pages/categorias.html") {
                if ($('#myModal3X').is(':visible') == true) {
                    ocultar4();
                }
                empSelect();
            }
        }
    });
    return false;
}

function crearCateg() {
    var categCreate = new FormData();
    categCreate.append("txtnombreCategoriaInsert", $('#txtNombreCategoriaInsert').val());
    $.ajax({
        type: "POST",
        url: domMainListCateg + "categorias/create/",
        data: categCreate,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            empSelect();
        }
    });
}

function empleadoUpdate() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    registrosEmpl.append("idCategoria", $('#idCategoria').val());
    registrosEmpl.append("txtnombreCategoria", $('#txtNombreCategoria').val());
    $.ajax({
        type: "PUT",
        url: domMainListCateg + "categorias/update/" + registrosEmpl.get("idCategoria") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            console.log(data);
            console.log("SE deberia actualizar");
            if (url === "/pages/categorias.html" || url === "/pages/categorias") {
                // AdminSelect();
                console.log("entro al primer if de update");
                empSelect();
            }
            if (url === "/pages/categorias.html") {
                console.log("entro al segundo if de update");
                empSelect();
            }
        }
    });
}