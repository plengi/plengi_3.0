var equipos_table = null;
var searchValueEquipo = '';
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
//TABLA DE MATERIALES
equipos_table = $('#equiposTable').DataTable({
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
        url: 'equipos-read',
        data: function ( d ) {
            d.tipo_producto = 1,
            d.search = searchValueEquipo;
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
                html+= '<span id="editequipo_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info edit-equipo" style="margin-bottom: 0rem !important; min-width: 50px;">Editar</span>&nbsp;';
                html+= '<span id="deleteequipo_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-equipo" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                return html;
            }
        },
    ]
});
//CLICK BOTON EDITAR
equipos_table.on('click', '.edit-equipo', function() {
    clearFormEquipo ();
    $("#textEquiposCreate").hide();
    $("#textEquiposUpdate").show();
    $("#saveEquipoLoading").hide();
    $("#updateEquipo").show();
    $("#saveEquipo").hide();

    var id = this.id.split('_')[1];
    var data = getDataById(id, equipos_table);

    $("#id_equipo_up").val(data.id);
    $("#nombre").val(data.nombre);
    $("#valor_unitario").val(parseInt(data.valor));
    $("#cantidad").val(data.cantidad);
    $("#unidad_medida").val(data.unidad_medida);
    $("#tipo_proveedor").val(data.tipo_proveedor);

    $("#equiposFormModal").modal('show');
});
//CLICK BOTON DE ELIMINAR
equipos_table.on('click', '.drop-equipo', function() {
    var trEquipo = $(this).closest('tr');
    var id = this.id.split('_')[1];
    var data = getDataById(id, equipos_table);

    Swal.fire({
        title: 'Eliminar equipo: '+data.nombre+'?',
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
                url: 'equipos-delete',
                method: 'DELETE',
                data: JSON.stringify({id: id}),
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
            }).done((res) => {
                equipos_table.row(trEquipo).remove().draw();
                Swal.fire({
                    title: "Equipo eliminado!",
                    text: "El equipo "+data.nombre+" fue eliminado con exito!",
                    icon: "success",
                    timer: 1500
                })
            }).fail((res) => {
                Swal.fire({
                    title: "Error!",
                    text: "El equipo "+data.nombre+" no pudo ser eliminado!",
                    icon: "error",
                    timer: 1500
                });
            });
        }
    });
});
//LIMPIAR FORMULARIO
function clearFormEquipo () {
    $("#id_equipo_up").val('');
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
function searchEquipos (event) {
    if (event.keyCode == 20 || event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 18) {
        return;
    }
    var botonPrecionado = event.key.length == 1 ? event.key : '';
    searchValueEquipo = $('#searchInputEquipos').val();
    searchValueEquipo = searchValueEquipo+botonPrecionado;
    if(event.key == 'Backspace') searchValueEquipo = searchValueEquipo.slice(0, -1);

    equipos_table.context[0].jqXHR.abort();
    equipos_table.ajax.reload();
}
//TRAER DATOS DE MATERIALES POR PRIMERA VEZ
equipos_table.ajax.reload();
//BOTON ACCION ABRIR MODAL
$(document).on('click', '#createEquipo', function () {

    $("#equiposFormModal").modal('show');

    clearFormEquipo();
    $("#saveEquipo").show();
    $("#updateEquipo").hide();
    $("#saveEquipoLoading").hide();
    $("#textEquiposCreate").show();
});
//BOTON ACCION DE CREAR MATERIAL
$(document).on('click', '#saveEquipo', function () {
    var form = document.querySelector('#equiposForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#saveEquipo").hide();
    $("#saveEquipoLoading").show();

    let data = {
        nombre: $("#nombre").val(),
        unidad_medida: $("#unidad_medida").val(),
        valor: $("#valor_unitario").val(),
        tipo_proveedor: $("#tipo_proveedor").val(),
        cantidad: $("#cantidad").val(),
        tipo_producto: 1
    }

    $.ajax({
        url: 'equipos-create',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormEquipo();
            $("#saveEquipo").show();
            $("#saveEquipoLoading").hide();
            $("#equiposFormModal").modal('hide');

            equipos_table.ajax.reload();
            Swal.fire({
                title: "Producto creado!",
                text: "El producto fue creado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#saveEquipo').show();
        $('#saveEquipoLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo producto!",
            icon: "error",
            timer: 1500
        });
    });
});
//BOTON ACCION DE ACTUALIZAR MATERIAL
$(document).on('click', '#updateEquipo', function () {
    var form = document.querySelector('#equiposForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#updateEquipo").hide();
    $("#saveEquipoLoading").show();

    let data = {
        id: $("#id_equipo_up").val(),
        nombre: $("#nombre").val(),
        unidad_medida: $("#unidad_medida").val(),
        valor: $("#valor_unitario").val(),
        tipo_proveedor: $("#tipo_proveedor").val(),
        cantidad: $("#cantidad").val(),
        tipo_producto: 1
    }

    $.ajax({
        url: 'equipos-update',
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormEquipo();
            $("#updateEquipo").show();
            $("#saveEquipoLoading").hide();
            $("#equiposFormModal").modal('hide');

            equipos_table.ajax.reload();
            Swal.fire({
                title: "Producto actualizado!",
                text: "El producto fue actualizado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#updateEquipo').show();
        $('#saveEquipoLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo producto!",
            icon: "error",
            timer: 1500
        });
    });
});
