var transportes_table = null;
var searchValueTransporte = '';
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
//TABLA DE EQUIPOS
transportes_table = $('#transportesTable').DataTable({
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
        url: 'transportes-read',
        data: function ( d ) {
            d.tipo_producto = 3,
            d.search = searchValueTransporte;
        }
    },
    columns: [
        {"data":'nombre'},
        {"data":'unidad_medida'},
        {"data":'valor', render: $.fn.dataTable.render.number(',', '.', 2, ''), className: 'dt-body-right'},
        {"data":'tipo_proveedor'},
        {
            "data": function (row, type, set){
                var html = '';
                html+= '<span id="edittransporte_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info edit-transporte" style="margin-bottom: 0rem !important; min-width: 50px;">Editar</span>&nbsp;';
                html+= '<span id="deletetransporte_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-transporte" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                return html;
            }
        },
    ]
});
//CLICK BOTON EDITAR
transportes_table.on('click', '.edit-transporte', function() {
    clearFormTransporte ();
    $("#textTransportesCreate").hide();
    $("#textTransportesUpdate").show();
    $("#saveTransporteLoading").hide();
    $("#updateTransporte").show();
    $("#saveTransporte").hide();

    var id = this.id.split('_')[1];
    var data = getDataById(id, transportes_table);

    $("#id_transporte_up").val(data.id);
    $("#nombre").val(data.nombre);
    $("#valor_unitario").val(parseInt(data.valor));
    $("#cantidad").val(data.cantidad);
    $("#unidad_medida").val(data.unidad_medida);
    $("#tipo_proveedor").val(data.tipo_proveedor);

    $("#transportesFormModal").modal('show');
});
//CLICK BOTON DE ELIMINAR
transportes_table.on('click', '.drop-transporte', function() {
    var trTransporte = $(this).closest('tr');
    var id = this.id.split('_')[1];
    var data = getDataById(id, transportes_table);

    Swal.fire({
        title: 'Eliminar transporte: '+data.nombre+'?',
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
                url: 'transportes-delete',
                method: 'DELETE',
                data: JSON.stringify({id: id}),
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
            }).done((res) => {
                transportes_table.row(trTransporte).remove().draw();
                Swal.fire({
                    title: "Transporte eliminado!",
                    text: "El transporte "+data.nombre+" fue eliminado con exito!",
                    icon: "success",
                    timer: 1500
                })
            }).fail((res) => {
                Swal.fire({
                    title: "Error!",
                    text: "El transporte "+data.nombre+" no pudo ser eliminado!",
                    icon: "error",
                    timer: 1500
                });
            });
        }
    });
});
//LIMPIAR FORMULARIO
function clearFormTransporte () {
    $("#id_transporte_up").val('');
    $("#nombre").val('');
    $("#valor_unitario").val(0);
    $("#cantidad").val(1);
}
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
//FUNCION PARA BUSCAR EN LA TABLA
function searchTransportes (event) {
    if (event.keyCode == 20 || event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 18) {
        return;
    }
    var botonPrecionado = event.key.length == 1 ? event.key : '';
    searchValueTransporte = $('#searchInputTransportes').val();
    searchValueTransporte = searchValueTransporte+botonPrecionado;
    if(event.key == 'Backspace') searchValueTransporte = searchValueTransporte.slice(0, -1);

    transportes_table.context[0].jqXHR.abort();
    transportes_table.ajax.reload();
}
//TRAER DATOS DE EQUIPOS POR PRIMERA VEZ
transportes_table.ajax.reload();
//BOTON ACCION ABRIR MODAL
$(document).on('click', '#createTransporte', function () {

    $("#transportesFormModal").modal('show');

    clearFormTransporte();
    $("#saveTransporte").show();
    $("#updateTransporte").hide();
    $("#saveTransporteLoading").hide();
    $("#textTransportesCreate").show();
});
//BOTON ACCION DE CREAR EQUIPO
$(document).on('click', '#saveTransporte', function () {
    var form = document.querySelector('#transportesForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#saveTransporte").hide();
    $("#saveTransporteLoading").show();

    let data = {
        nombre: $("#nombre").val(),
        unidad_medida: $("#unidad_medida").val(),
        valor: $("#valor_unitario").val(),
        tipo_proveedor: $("#tipo_proveedor").val(),
        cantidad: $("#cantidad").val(),
        tipo_producto: 1
    }

    $.ajax({
        url: 'transportes-create',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormTransporte();
            $("#saveTransporte").show();
            $("#saveTransporteLoading").hide();
            $("#transportesFormModal").modal('hide');

            transportes_table.ajax.reload();
            Swal.fire({
                title: "Producto creado!",
                text: "El producto fue creado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#saveTransporte').show();
        $('#saveTransporteLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo producto!",
            icon: "error",
            timer: 1500
        });
    });
});
//BOTON ACCION DE ACTUALIZAR EQUIPO
$(document).on('click', '#updateTransporte', function () {
    var form = document.querySelector('#transportesForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#updateTransporte").hide();
    $("#saveTransporteLoading").show();

    let data = {
        id: $("#id_transporte_up").val(),
        nombre: $("#nombre").val(),
        unidad_medida: $("#unidad_medida").val(),
        valor: $("#valor_unitario").val(),
        tipo_proveedor: $("#tipo_proveedor").val(),
        cantidad: $("#cantidad").val(),
        tipo_producto: 3
    }

    $.ajax({
        url: 'transportes-update',
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormTransporte();
            $("#updateTransporte").show();
            $("#saveTransporteLoading").hide();
            $("#transportesFormModal").modal('hide');

            transportes_table.ajax.reload();
            Swal.fire({
                title: "Producto actualizado!",
                text: "El producto fue actualizado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#updateTransporte').show();
        $('#saveTransporteLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo producto!",
            icon: "error",
            timer: 1500
        });
    });
});
