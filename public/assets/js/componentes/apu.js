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

var id_materiales = 0;
var id_equipos = 0;
var id_manos = 0;
var id_transportes = 0;
var totalGeneralApu = 0;

let arrayProductos = {
    'materiales': [],
    'equipos': [],
    'mano_obra': [],
    'transportes': []
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

$(document).on('click', '#createApu', function () {
    $("#actions-apu-component").hide();
    $("#table-apu-component").hide();
    $("#actions-apu-create").show();
    $("#create-apu-component").show();
});

apu_table.on('click', '.edit-apu', function() {
    clearFormAPU();

    var id = this.id.split('_')[1];
    var data = getDataById(id, apu_table);

    $("#crearApu").hide();
    $("#actualizarApu").show();
    $('#id_apu_up').val(data.id);
    $('#nombre_apu').val(data.nombre);

    $("#totalGeneralApu").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        data.valor_total
    ));

    if (data.detalles.length) {
        var productos = data.detalles
        for (let index = 0; index < productos.length; index++) {
            var producto = productos[index];
            console.log('producto: ',producto);
            if (producto.producto.tipo_producto == 0) {

                id_materiales++;
                var data = {
                    'consecutivo': id_materiales,
                    'id_producto': producto.producto.id,
                    'nombre_producto': producto.producto.nombre,
                    'unidad_medida': producto.producto.unidad_medida,
                    'cantidad': producto.cantidad,
                    'prestaciones': 0,
                    'cantidad_total': producto.cantidad_total,
                    'costo_unitario': parseFloat(producto.costo),
                    'costo': parseFloat(producto.costo),
                    'porcentaje_desperdicio': producto.desperdicio,
                    'porcentaje_rendimiento': producto.rendimiento,
                    'distancia': producto.distancia,
                    'costo_total': parseFloat(producto.total)
                }
                arrayProductos.materiales.push(data);
                addItemToTable(data, 'materiales');
            }

            if (producto.producto.tipo_producto == 1) {
                id_equipos++;
                var data = {
                    'consecutivo': id_equipos,
                    'id_producto': producto.producto.id,
                    'nombre_producto': producto.producto.nombre,
                    'unidad_medida': producto.producto.unidad_medida,
                    'cantidad': producto.cantidad,
                    'prestaciones': 0,
                    'cantidad_total': producto.cantidad_total,
                    'costo_unitario': parseFloat(producto.costo),
                    'costo': parseFloat(producto.costo),
                    'porcentaje_desperdicio': producto.desperdicio,
                    'porcentaje_rendimiento': producto.rendimiento,
                    'distancia': producto.distancia,
                    'costo_total': parseFloat(producto.total)
                }
                arrayProductos.equipos.push(data);
                addItemToTable(data, 'equipos');
            }

            if (producto.producto.tipo_producto == 2) {
                id_manos++;
                var prestaciones = producto.prestaciones;
                var data = {
                    'consecutivo': id_manos,
                    'id_producto': producto.producto.id,
                    'nombre_producto': producto.producto.nombre,
                    'unidad_medida': producto.producto.unidad_medida,
                    'cantidad': producto.cantidad,
                    'prestaciones': prestaciones,
                    'cantidad_total': producto.cantidad_total,
                    'costo_unitario': parseFloat(producto.costo) * prestaciones,
                    'costo': parseFloat(producto.costo),
                    'porcentaje_desperdicio': producto.desperdicio,
                    'porcentaje_rendimiento': producto.rendimiento,
                    'distancia': producto.distancia,
                    'costo_total': parseFloat(producto.total)
                }
                arrayProductos.mano_obra.push(data);
                addItemToTable(data, 'mano_obra');
            }

            if (producto.producto.tipo_producto == 3) {
                id_transportes++;
                var data = {
                    'consecutivo': id_transportes,
                    'id_producto': producto.producto.id,
                    'nombre_producto': producto.producto.nombre,
                    'unidad_medida': producto.producto.unidad_medida,
                    'cantidad': producto.cantidad,
                    'prestaciones': 0,
                    'cantidad_total': producto.cantidad_total,
                    'costo_unitario': parseFloat(producto.costo),
                    'costo': parseFloat(producto.costo),
                    'porcentaje_desperdicio': producto.desperdicio,
                    'porcentaje_rendimiento': producto.rendimiento,
                    'distancia': producto.distancia,
                    'costo_total': parseFloat(producto.total)
                }
                arrayProductos.transportes.push(data);
                addItemToTable(data, 'transportes');
            }
        }
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
        varlor_total: totalGeneralApu,
        productos: getProductos(),
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
        varlor_total: totalGeneralApu,
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

    if (arrayProductos['transportes'].length) {
        for (let index = 0; index < arrayProductos['transportes'].length; index++) {
            var element = arrayProductos['transportes'][index];
            productos.push(element);
        }
    }

    return productos;
}

function calcularProducto (tipo, consecutivo) {

    var index = encontrarIndex(arrayProductos[tipo], consecutivo);
    var data = arrayProductos[tipo][index];

    var cantidad = parseInt($("#cantidad_"+tipo+"_"+consecutivo).val());

    if (tipo == 'equipos') {
        var rendimiento = $("#desperdicio_"+tipo+"_"+consecutivo).val();
        var totalEquipo = (cantidad * data.costo) / rendimiento;

        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalEquipo
        ));

        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].porcentaje_rendimiento = rendimiento;
        arrayProductos[tipo][index].costo_total = totalEquipo;
    }

    if (tipo == 'materiales') {
        var desperdicio = parseInt($("#desperdicio_"+tipo+"_"+consecutivo).val());
        var cantidadTotal = desperdicio ? cantidad + (cantidad * (desperdicio / 100)) : cantidad;
        var totalMaterial = cantidadTotal * data.costo;

        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalMaterial
        ));

        $("#cantidadtotal_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            cantidadTotal
        ));

        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].porcentaje_desperdicio = desperdicio;
        arrayProductos[tipo][index].cantidad_total = cantidadTotal;
        arrayProductos[tipo][index].costo_total = totalMaterial;
    }

    if (tipo == 'mano_obra') {
        var rendimiento = $("#desperdicio_"+tipo+"_"+consecutivo).val();
        var totalEquipo = (cantidad * data.costo_unitario) / rendimiento;

        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalEquipo
        ));

        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].porcentaje_rendimiento = rendimiento;
        arrayProductos[tipo][index].costo_total = totalEquipo;
    }

    if (tipo == 'transportes') {
        var distancia = $("#distancia_"+tipo+"_"+consecutivo).val();
        var totalTransporte = cantidad * data.costo * distancia;

        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalTransporte
        ));

        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].distancia = distancia;
        arrayProductos[tipo][index].costo_total = totalTransporte;
    }

    calcularTotalesProductos();
}

function calcularTotalesProductos () {
    var subtotalEquipos = 0;
    arrayProductos['equipos'].forEach(equipo => {
        subtotalEquipos+= equipo.costo_total;
    });
    $("#apuEquiposTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalEquipos
    ));

    var subtotalMateriales = 0;
    arrayProductos['materiales'].forEach(equipo => {
        subtotalMateriales+= equipo.costo_total;
    });
    $("#apuMaterialesTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalMateriales
    ));

    var subtotalManoObra = 0;
    arrayProductos['mano_obra'].forEach(equipo => {
        subtotalManoObra+= equipo.costo_total;
    });
    $("#apuManoObraTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalManoObra
    ));

    var subtotalTransportes = 0;
    arrayProductos['transportes'].forEach(transporte => {
        subtotalTransportes+= transporte.costo_total;
    });
    $("#apuTransportesTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalTransportes
    ));

    totalGeneralApu = subtotalEquipos + subtotalMateriales + subtotalManoObra + subtotalTransportes;
    $("#totalGeneralApu").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        totalGeneralApu
    ));

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
    var unidadMedidaGeneral = $("#unidad_medida").val();
    if (tipo == 'equipos') {
        var html = `
            <td>${data.nombre_producto}</td>
            <td style="padding: 3px 0px;">
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="cantidad_${tipo}_${data.consecutivo}" value="${data.cantidad}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </td>
            <td>${data.unidad_medida.toUpperCase()}</td>
            <td id="costo_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo,
            )}</td>
            <td style="padding: 3px 0px;">
            <div class="input-group">
                <span style="height: 30px;"><p style="font-size: 11px; font-weight: bold; margin-top: -3px;">${unidadMedidaGeneral.toUpperCase()}/${data.unidad_medida.toUpperCase()}</p></span>
                <input type="number" style="text-align: end; height: 30px; " class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.porcentaje_rendimiento}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </div>
            </td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total,
              )}</td>
            <td style="text-align: -webkit-center;">
                <span class="btn badge bg-gradient-danger drop-row-grid" onclick="deleteProductos('${tipo}', ${data.consecutivo})" style="margin-bottom: 0;">
                    <i class="fa fa-trash"></i>
                </span>
            </td>
        `;
    }

    if (tipo == 'materiales') {
        var html = `
            <td>${data.nombre_producto}</td>
            <td style="padding: 3px 0px;">
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="cantidad_${tipo}_${data.consecutivo}" value="${data.cantidad}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </td>
            <td>${data.unidad_medida.toUpperCase()}</td>
            <td style="padding: 3px 0px;">
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.porcentaje_desperdicio}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </td>
            <td id="cantidadtotal_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.cantidad_total,
            )}</td>
            <td id="costo_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo,
            )}</td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total,
            )}</td>
            <td style="text-align: -webkit-center;">
                <span class="btn badge bg-gradient-danger drop-row-grid" onclick="deleteProductos('${tipo}', ${data.consecutivo})" style="margin-bottom: 0;">
                    <i class="fa fa-trash"></i>
                </span>
            </td>
        `;
    }

    if (tipo == 'mano_obra') {
        var html = `
            <td>${data.nombre_producto}</td>
            <td style="padding: 3px 0px;">
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="cantidad_${tipo}_${data.consecutivo}" value="${data.cantidad}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </td>
            <td>${new Intl.NumberFormat('de-DE').format(
                data.costo,
            )}</td>
            <td id="costo_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.prestaciones,
            )}</td>
            <td id="costo_unitario_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_unitario,
            )}</td>
            <td style="padding: 3px 0px;">
                <div class="input-group">
                    <span style="height: 30px;"><p style="font-size: 11px; font-weight: bold; margin-top: -3px;">${data.unidad_medida.toUpperCase()}/DÍA</p></span>
                    <input type="number" style="text-align: end; height: 30px;" class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.porcentaje_rendimiento}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
                </div>
            </td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total,
              )}</td>
            <td style="text-align: -webkit-center;">
                <span class="btn badge bg-gradient-danger drop-row-grid" onclick="deleteProductos('${tipo}', ${data.consecutivo})" style="margin-bottom: 0;">
                    <i class="fa fa-trash"></i>
                </span>
            </td>
        `;
    }

    if (tipo == 'transportes') {
        var html = `
            <td>${data.nombre_producto}</td>
            <td style="padding: 3px 0px;">
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="cantidad_${tipo}_${data.consecutivo}" value="${data.cantidad}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </td>
            <td>${data.unidad_medida.toUpperCase()}</td>
            <td id="costo_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo,
            )}</td>
            <td style="padding: 3px 0px;">
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.distancia}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total,
              )}</td>
            <td style="text-align: -webkit-center;">
                <span class="btn badge bg-gradient-danger drop-row-grid" onclick="deleteProductos('${tipo}', ${data.consecutivo})" style="margin-bottom: 0;">
                    <i class="fa fa-trash"></i>
                </span>
            </td>
        `;
    }

    var item = document.createElement('tr');
    item.setAttribute("id", "tr_"+tipo+"_"+data.consecutivo);
    item.innerHTML = [
        html
    ].join('');
    document.getElementById('items-'+tipo).insertBefore(item, null);

    calcularTotalesProductos();
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
    $('#items-transportes').empty();

    $("#crearApu").show();
    $("#actualizarApu").hide();
    $("#crearApuLoading").hide();

    $('#id_apu_up').val("");
    $('#nombre_apu').val("");

    arrayProductos = {
        'materiales': [],
        'equipos': [],
        'mano_obra': [],
        'transportes': []
    }

    id_materiales = 0;
    id_equipos = 0;
    id_manos = 0;
    id_transportes = 0;

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
                    'prestaciones': 0,
                    'cantidad_total': 1,
                    'costo_unitario': parseFloat(dataProducto.valor),
                    'costo': parseFloat(dataProducto.valor),
                    'porcentaje_desperdicio': 5,
                    'porcentaje_rendimiento': 0,
                    'distancia': 0,
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
                    'prestaciones': 0,
                    'cantidad_total': 1,
                    'costo_unitario': parseFloat(dataProducto.valor),
                    'costo': parseFloat(dataProducto.valor),
                    'porcentaje_desperdicio': 0,
                    'porcentaje_rendimiento': 1,
                    'distancia': 0,
                    'costo_total': parseFloat(dataProducto.valor)

                }
                arrayProductos.equipos.push(data);
                addItemToTable(data, 'equipos');
            }

            if (dataProducto.tipo_producto == 2) {
                id_manos++;
                var prestaciones = 1.83;
                var data = {
                    'consecutivo': id_manos,
                    'id_producto': parseInt(dataProducto.id),
                    'nombre_producto': dataProducto.nombre,
                    'unidad_medida': dataProducto.unidad_medida,
                    'cantidad': 1,
                    'prestaciones': 1.83,
                    'cantidad_total': 1,
                    'costo_unitario': parseFloat(dataProducto.valor) * 1.83,
                    'costo': parseFloat(dataProducto.valor),
                    'porcentaje_desperdicio': 0,
                    'porcentaje_rendimiento': 1,
                    'distancia': 0,
                    'costo_total': prestaciones * parseFloat(dataProducto.valor)
                }
                arrayProductos.mano_obra.push(data);
                addItemToTable(data, 'mano_obra');
            }

            if (dataProducto.tipo_producto == 3) {
                id_transportes++;
                var data = {
                    'consecutivo': id_transportes,
                    'id_producto': parseInt(dataProducto.id),
                    'nombre_producto': dataProducto.nombre,
                    'unidad_medida': dataProducto.unidad_medida,
                    'cantidad': 1,
                    'prestaciones': 0,
                    'cantidad_total': 1,
                    'costo_unitario': parseFloat(dataProducto.valor),
                    'costo': parseFloat(dataProducto.valor),
                    'porcentaje_desperdicio': 0,
                    'porcentaje_rendimiento': 0,
                    'distancia': 1,
                    'costo_total': parseFloat(dataProducto.valor)

                }
                arrayProductos.transportes.push(data);
                addItemToTable(data, 'transportes');
            }

            calcularTotalesProductos();
            $('#id_producto').val('');
            $('#id_producto').change();
        }
    });

});
