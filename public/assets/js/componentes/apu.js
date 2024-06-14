var apu_table = null;
var searchValueApu = '';
let lenguajeDatatable = {
    "sProcessing":     "",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún registro disponible",
    "sInfo":           "Registros del _START_ al _END_ de un total de _TOTAL_ ",
    "sInfoEmpty":      "Registros del 0 al 0 de un total de 0 ",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     ">",
        "sPrevious": "<"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}

let arrayProductos = {
    'materiales': [],
    'equipos': [],
    'mano_obra': []
};

//TABLA APU
apu_table = $('#apuTable').DataTable({
    pageLength: 15,
    dom: 'Brtip',
    paging: true,
    responsive: false,
    processing: true,
    serverSide: true,
    fixedHeader: true,
    deferLoading: 0,
    initialLoad: false,
    language: lenguajeDatatable,
    sScrollX: "100%",
    fixedColumns : {
        left: 0,
        right : 1,
    },
    ajax:  {
        type: "GET",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: 'apu-read',
        data: function ( d ) {
            d.search = searchValueApu;
        }
    },
    columns: [
        {"data":'nombre'},
        {"data":'unidad_medida'},
        {"data":'valor_total', render: $.fn.dataTable.render.number(',', '.', 2, ''), className: 'dt-body-right'},
        {
            "data": function (row, type, set){
                var html = '';
                html+= '<span id="editapu_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info edit-apu" style="margin-bottom: 0rem !important; min-width: 50px;">Editar</span>&nbsp;';
                html+= '<span id="deleteapu_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-apu" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                return html;
            }
        },
    ]
});

apu_table.on('click', '.edit-apu', function() {
    clearFormAPU();

    var id = this.id.split('_')[1];
    var data = getDataById(id, apu_table);

    console.log('data: ',data);

    $('#id_apu_up').val(data.id);
    $('#nombre_apu').val(data.nombre);

    $("#crearApu").hide();
    $("#actualizarApu").show();

    if (data.detalles.length) {
        var productos = data.detalles
        for (let index = 0; index < productos.length; index++) {
            var producto = productos[index];

            if (producto.producto.tipo_producto == 0) {
                id_materiales++;
                var data = {
                    'consecutivo': id_materiales,
                    'id_producto': parseInt(producto.producto.id),
                    'nombre_producto': producto.producto.nombre,
                    'unidad_medida': producto.producto.unidad_medida,
                    'cantidad': producto.cantidad,
                    'unidad_medida': producto.producto.unidad_medida,
                    'costo': parseFloat(producto.costo),
                    'porcentaje_desperdicio': parseFloat(producto.desperdicio),
                    'costo_total': parseFloat(producto.total)
                }
                arrayProductos.materiales.push(data);
                addItemToTable(data, 'materiales');
            }

            if (producto.producto.tipo_producto == 1) {
                id_equipos++;
                var data = {
                    'consecutivo': id_equipos,
                    'id_producto': parseInt(producto.producto.id),
                    'nombre_producto': producto.producto.nombre,
                    'unidad_medida': producto.producto.unidad_medida,
                    'cantidad': producto.cantidad,
                    'unidad_medida': producto.producto.unidad_medida,
                    'costo': parseFloat(producto.costo),
                    'porcentaje_desperdicio': parseFloat(producto.desperdicio),
                    'costo_total': parseFloat(producto.total)
                }
                arrayProductos.equipos.push(data);
                addItemToTable(data, 'equipos');
            }

            if (producto.producto.tipo_producto == 2) {
                id_manos++;
                var data = {
                    'consecutivo': id_manos,
                    'id_producto': parseInt(producto.producto.id),
                    'nombre_producto': producto.producto.nombre,
                    'unidad_medida': producto.producto.unidad_medida,
                    'cantidad': producto.cantidad,
                    'unidad_medida': producto.producto.unidad_medida,
                    'costo': parseFloat(producto.costo),
                    'porcentaje_desperdicio': parseFloat(producto.desperdicio),
                    'costo_total': parseFloat(producto.total)
                }
                arrayProductos.mano_obra.push();
                addItemToTable(data, 'mano_obra');
            }
        }

        $('#id_producto').val('').trigger('change');
        calcularTotalesProductos();
    }

    $("#actions-apu-component").hide();
    $("#table-apu-component").hide();
    $("#actions-apu-create").show();
    $("#create-apu-component").show();
});

apu_table.on('click', '.drop-apu', function() {
    var trApu = $(this).closest('tr');
    var id = this.id.split('_')[1];
    var data = getDataById(id, apu_table);

    Swal.fire({
        title: 'Eliminar APU: '+data.nombre+'?',
        text: "No se podrá revertir!",
        type: 'warning',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar!',
        reverseButtons: true,
    }).then((result) => {
        if (result.value){
            $.ajax({
                url: 'apu-delete',
                method: 'DELETE',
                data: JSON.stringify({id: id}),
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
            }).done((res) => {
                apu_table.row(trApu).remove().draw();
                Swal.fire({
                    title: "Apu eliminado!",
                    text: "El material "+data.nombre+" fue eliminado con exito!",
                    icon: "success",
                    timer: 1500
                })
            }).fail((res) => {
                Swal.fire({
                    title: "Error!",
                    text: "El apu "+data.nombre+" no pudo ser eliminado!",
                    icon: "error",
                    timer: 1500
                });
            });
        }
    });
});

apu_table.ajax.reload();

var id_materiales = 0;
var id_equipos = 0;
var id_manos = 0;

$(document).on('click', '#createApu', function () {
    $("#actions-apu-component").hide();
    $("#table-apu-component").hide();
    $("#actions-apu-create").show();
    $("#create-apu-component").show();
});

$(document).on('click', '#volverApu', function () {
    volverAPU();
});

function volverAPU () {
    $("#actions-apu-component").show();
    $("#table-apu-component").show();
    $("#actions-apu-create").hide();
    $("#create-apu-component").hide();

    apu_table.ajax.reload();
}

$(document).on('click', '#crearApu', function () {
    var form = document.querySelector('#apuForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#volverApu").hide();
    $("#crearApu").hide();
    $("#crearApuLoading").show();

    let data = {
        nombre: $("#nombre_apu").val(),
        unidad_medida: $("#unidad_medida").val(),
        productos: getProductos()
    }

    $.ajax({
        url: 'apu',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormAPU();
            $("#volverApu").show();
            $("#crearApu").show();
            $("#crearApuLoading").hide();
            volverAPU();
            Swal.fire({
                title: "APU creado!",
                text: "El APU fue creado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $("#volverApu").show();
        $("#crearApu").show();
        $("#crearApuLoading").hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo APU!",
            icon: "error",
            timer: 1500
        });
    });
    
});

$(document).on('click', '#actualizarApu', function () {
    console.log('actualizarApu');
    var form = document.querySelector('#apuForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#volverApu").hide();
    $("#actualizarApu").hide();
    $("#crearApuLoading").show();

    let data = {
        id: $("#id_apu_up").val(),
        nombre: $("#nombre_apu").val(),
        unidad_medida: $("#unidad_medida").val(),
        productos: getProductos()
    }

    $.ajax({
        url: 'apu',
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormAPU();
            $("#volverApu").show();
            $("#crearApu").show();
            $("#crearApuLoading").hide();
            volverAPU();
            Swal.fire({
                title: "APU actualizado!",
                text: "El APU fue actualizado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $("#volverApu").show();
        $("#crearApu").show();
        $("#crearApuLoading").hide();
        Swal.fire({
            title: "Error!",
            text: "Error al actualizar APU!",
            icon: "error",
            timer: 1500
        });
    });
});

//OBTENER DATOS DE LA TABLA
function getDataById(idData, tabla) {
    var data = tabla.rows().data();
    for (let index = 0; index < data.length; index++) {
        var element = data[index];
        if(element.id == idData){
            return element;
        }
    }
    return false;
}

function getProductos () {
    var productos = [];

    if (arrayProductos['materiales'].length) {
        for (let index = 0; index < arrayProductos['materiales'].length; index++) {
            var element = arrayProductos['materiales'][index];
            productos.push(element);
        }
    }

    if (arrayProductos['equipos'].length) {
        for (let index = 0; index < arrayProductos['equipos'].length; index++) {
            var element = arrayProductos['equipos'][index];
            productos.push(element);
        }
    }

    if (arrayProductos['mano_obra'].length) {
        for (let index = 0; index < arrayProductos['mano_obra'].length; index++) {
            var element = arrayProductos['mano_obra'][index];
            productos.push(element);
        }
    }

    return productos;
}

function calcularProducto (tipo, consecutivo) {
    console.log('tipo: ',tipo);
    console.log('arrayProductos: ',arrayProductos);
    console.log('consecutivo: ',consecutivo);
    var index = encontrarIndex(arrayProductos[tipo], consecutivo);
    var data = arrayProductos[tipo][index];
    
    var cantidad = $("#cantidad_"+tipo+"_"+consecutivo).val();
    var desperdicio = $("#desperdicio_"+tipo+"_"+consecutivo).val();

    if (tipo == 'materiales') {
        var totalDesperdicio = data.costo * (desperdicio / 100);
        var totalProducto = cantidad * (data.costo + totalDesperdicio);
    
        $("#costo_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE').format(
            data.costo + totalDesperdicio
        ));
    
        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE').format(
            totalProducto
        ));
    } else {
        var totalCosto = data.costo * (desperdicio / 100);
        var totalProducto = cantidad * totalCosto;
        
        $("#costo_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE').format(
            totalCosto
        ));
    
        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE').format(
            totalProducto
        ));
    }

    arrayProductos[tipo][index].cantidad = cantidad;
    arrayProductos[tipo][index].porcentaje_desperdicio = desperdicio;

    calcularTotalesProductos();
}

function encontrarIndex (array, id) {
    if (array && array.length) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.consecutivo == id) {
                return index;
            }
        }
    }

    return '';
}

function addItemToTable (data, tipo) {
    var html = `
        <td style="text-align: -webkit-center;">
            <span class="btn badge bg-gradient-danger drop-row-grid" onclick="deleteProductos('${tipo}', ${data.consecutivo})" style="margin-bottom: 0;">
                <i class="fas fa-trash-alt"></i>
            </span>
        </td>
        <td>${data.nombre_producto}</td>
        <td style="padding: 3px 0px;">
            <input type="number" style="text-align: end;" class="form-control form-control-sm" id="cantidad_${tipo}_${data.consecutivo}" value="${data.cantidad}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
        </td>
        <td>${data.unidad_medida.toUpperCase()}</td>
        <td style="padding: 3px 0px;">
            <input type="number" style="text-align: end;" class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.porcentaje_desperdicio}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
        </td>
        <td id="costo_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
            data.costo,
          )}</td>
        <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
            data.costo,
          )}</td>
    `;

    var item = document.createElement('tr');
    item.setAttribute("id", "tr_"+tipo+"_"+data.consecutivo);
    item.innerHTML = [
        html
    ].join('');
    document.getElementById('items-'+tipo).insertBefore(item, null);
}

function calcularTotalesProductos () {
    var totales = {
        'materiales': { cantidad: 0, costo: 0, total: 0 },
        'equipos': { cantidad: 0, costo: 0, total: 0 },
        'mano_obra': { cantidad: 0, costo: 0, total: 0 }
    };

    if (arrayProductos['materiales'].length) {
        for (let index = 0; index < arrayProductos['materiales'].length; index++) {
            var element = arrayProductos['materiales'][index];
            var cantidad = $("#cantidad_materiales_"+element.consecutivo).val();
            var desperdicio = $("#desperdicio_materiales_"+element.consecutivo).val();
            var totalDesperdicio = element.costo * (desperdicio / 100);
            var totalProducto = cantidad * (element.costo + totalDesperdicio);
            totales.materiales.cantidad+= parseFloat(cantidad);
            totales.materiales.costo+= parseFloat(element.costo + totalDesperdicio);
            totales.materiales.total+= parseFloat(totalProducto);
        }
        
        $("#cantidad_total_materiales").text(new Intl.NumberFormat('de-DE').format(
            totales.materiales.cantidad
        ));
        $("#costo_total_materiales").text(new Intl.NumberFormat('de-DE').format(
            totales.materiales.costo
        ));
        $("#valor_total_materiales").text(new Intl.NumberFormat('de-DE').format(
            totales.materiales.total
        ));
    } else {
        $("#cantidad_total_materiales").text(0);
        $("#costo_total_materiales").text(0);
        $("#valor_total_materiales").text(0);
    }

    if (arrayProductos['equipos'].length) {
        for (let index = 0; index < arrayProductos['equipos'].length; index++) {
            var element = arrayProductos['equipos'][index];
            var cantidad = $("#cantidad_equipos_"+element.consecutivo).val();
            var desperdicio = $("#desperdicio_equipos_"+element.consecutivo).val();
            var totalCosto = element.costo * (desperdicio / 100);
            var totalProducto = cantidad * totalCosto;
            totales.equipos.cantidad+= parseFloat(cantidad);
            totales.equipos.costo+= parseFloat(totalCosto);
            totales.equipos.total+= parseFloat(totalProducto);
        }
        
        $("#cantidad_total_equipos").text(new Intl.NumberFormat('de-DE').format(
            totales.equipos.cantidad
        ));
        $("#costo_total_equipos").text(new Intl.NumberFormat('de-DE').format(
            totales.equipos.costo
        ));
        $("#valor_total_equipos").text(new Intl.NumberFormat('de-DE').format(
            totales.equipos.total
        ));
    } else {
        $("#cantidad_total_equipos").text();
        $("#costo_total_equipos").text();
        $("#valor_total_equipos").text();
    }

    if (arrayProductos['mano_obra'].length) {
        for (let index = 0; index < arrayProductos['mano_obra'].length; index++) {
            var element = arrayProductos['mano_obra'][index];
            var cantidad = $("#cantidad_mano_obra_"+element.consecutivo).val();
            var desperdicio = $("#desperdicio_mano_obra_"+element.consecutivo).val();
            var totalCosto = element.costo * (desperdicio / 100);
            var totalProducto = cantidad * totalCosto;
            console.log('cantidad: ',cantidad);
            console.log('desperdicio: ',desperdicio);
            console.log('totalCosto: ',totalCosto);
            totales.mano_obra.cantidad+= parseFloat(cantidad);
            totales.mano_obra.costo+= parseFloat(element.costo + totalCosto);
            totales.mano_obra.total+= parseFloat(totalProducto);
        }
        
        $("#cantidad_total_manoobra").text(new Intl.NumberFormat('de-DE').format(
            totales.mano_obra.cantidad
        ));
        $("#costo_total_manoobra").text(new Intl.NumberFormat('de-DE').format(
            totales.mano_obra.costo
        ));
        $("#valor_total_manoobra").text(new Intl.NumberFormat('de-DE').format(
            totales.mano_obra.total
        ));
    } else {
        $("#cantidad_total_manoobra").text();
        $("#costo_total_manoobra").text();
        $("#valor_total_manoobra").text();
    }    

    $("#cantidad_total_apu").text(new Intl.NumberFormat('de-DE').format(
        totales.equipos.cantidad + totales.mano_obra.cantidad + totales.materiales.cantidad
    ));
    $("#costo_total_apu").text(new Intl.NumberFormat('de-DE').format(
        totales.equipos.costo + totales.mano_obra.costo + totales.materiales.costo
    ));
    $("#valor_total_apu").text(new Intl.NumberFormat('de-DE').format(
        totales.equipos.total + totales.mano_obra.total + totales.materiales.total
    ));
}

function deleteProductos (tipo, consecutivo) {
    var index = encontrarIndex(arrayProductos[tipo], consecutivo);
    arrayProductos[tipo].splice(index,1);
    document.getElementById("tr_"+tipo+"_"+consecutivo).remove();
    calcularTotalesProductos();
}

function clearFormAPU () {
    $('#items-materiales').empty();
    $('#items-equipos').empty();
    $('#items-mano_obra').empty();

    $("#crearApu").show();
    $("#actualizarApu").hide();
    
    $('#id_apu_up').val("");
    $('#nombre_apu').val("");

    arrayProductos = {
        'materiales': [],
        'equipos': [],
        'mano_obra': []
    }
    
    id_materiales = 0;
    id_equipos = 0;
    id_manos = 0;

    calcularTotalesProductos();
}

$(function () {

    $('#id_producto').select2({
        theme: 'bootstrap-5',
        delay: 250,
        placeholder: "Seleccione un recurso",
        language: {
            noResults: function() {
                return "No hay resultado";        
            },
            searching: function() {
                return "Buscando..";
            },
            inputTooShort: function () {
                return "Por favor introduce 1 o más caracteres";
            }
        },
        ajax: {
            url: 'productos-combo',
            dataType: 'json',

            data: function (params) {
                var query = {
                    search: params.term,
                    tipo_producto: $("#tipo_recurso").val(),
                }
                return query;
            },
            processResults: function (data) {
                return {
                    results: data.data
                };
            }
        }
    });

    $('#id_producto').on('select2:close', function(event) {
        var dataProducto = $('#id_producto').select2('data');
        if (dataProducto && dataProducto.length) {
            dataProducto = dataProducto[0];

            if (dataProducto.tipo_producto == 0) {
                id_materiales++;
                var data = {
                    'consecutivo': id_materiales,
                    'id_producto': parseInt(dataProducto.id),
                    'nombre_producto': dataProducto.nombre,
                    'unidad_medida': dataProducto.unidad_medida,
                    'cantidad': 1,
                    'unidad_medida': dataProducto.unidad_medida,
                    'costo': parseFloat(dataProducto.valor),
                    'porcentaje_desperdicio': 0,
                    'costo_total': parseFloat(dataProducto.valor)
                }
                arrayProductos.materiales.push(data);
                addItemToTable(data, 'materiales');
            }
    
            if (dataProducto.tipo_producto == 1) {
                id_equipos++;
                var data = {
                    'consecutivo': id_equipos,
                    'id_producto': parseInt(dataProducto.id),
                    'nombre_producto': dataProducto.nombre,
                    'unidad_medida': dataProducto.unidad_medida,
                    'cantidad': 1,
                    'unidad_medida': dataProducto.unidad_medida,
                    'costo': parseFloat(dataProducto.valor),
                    'porcentaje_desperdicio': 100,
                    'costo_total': parseFloat(dataProducto.valor)
                }
                arrayProductos.equipos.push(data);
                addItemToTable(data, 'equipos');
            }
    
            if (dataProducto.tipo_producto == 2) {
                id_manos++;
                var data = {
                    'consecutivo': id_manos,
                    'id_producto': parseInt(dataProducto.id),
                    'nombre_producto': dataProducto.nombre,
                    'unidad_medida': dataProducto.unidad_medida,
                    'cantidad': 1,
                    'unidad_medida': dataProducto.unidad_medida,
                    'costo': parseFloat(dataProducto.valor),
                    'porcentaje_desperdicio': 100,
                    'costo_total': parseFloat(dataProducto.valor)
                }
                arrayProductos.mano_obra.push(data);
                addItemToTable(data, 'mano_obra');
            }

            $('#id_producto').val('').trigger('change');
            calcularTotalesProductos();
        }
    });

});