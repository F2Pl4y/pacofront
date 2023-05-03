// const domMainCategorias = "https://f3rn4nd021py.pythonanywhere.com";
const domDetallePedido = "http://127.0.0.1:5000/";
function detalleSelect(idPedido){
    console.log("entro a detalle pedido");
    $.ajax({
        type: "GET",
        url: `${domDetallePedido}/detallepedido/selectDetallePedido/${idPedido}/`,
        dataType: "json",
        success: function (data) {
            let contenido = ``;
            $.each(data["resultado"], function (llave, valor) {
                contenido += `<tr>`;
                    contenido += `<td>${valor["nombreProducto"]}</td>`;
                    contenido += `<td><img src="${domDetallePedido}/platillos/foto/${valor["imagen"]}" style="width: 100px;"></td>`;
                    contenido += `</td>`
                    contenido += `<td>${valor["cantidad"]}</td>`;
                    contenido += `<td>${valor["costodetalle"]}</td>`;
                contenido += `</tr>`;
            });
            $('#tablaDetallePedido').html(contenido);
        }
    });
}