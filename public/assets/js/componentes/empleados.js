var empleados_table = null;
var searchValueEmpleados = '';
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
//TABLA DE EMPLEADOS
empleados_table = $('#empleadosTable').DataTable({
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
        url: 'empleados-read',
        data: function ( d ) {
            d.search = searchValueEmpleados;
        }
    },
    columns: [
        {"data":'nombre'},
        {"data":'tipo'},
        {"data":'salario', render: $.fn.dataTable.render.number(',', '.', 2, ''), className: 'dt-body-right'},
        {
            "data": function (row, type, set){
                var html = '';
                html+= '<span id="prestacionesempleado_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-success prestaciones-empleado" style="margin-bottom: 0rem !important; min-width: 50px;">Prestaciones</span>&nbsp;';
                html+= '<span id="editempleado_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info edit-empleado" style="margin-bottom: 0rem !important; min-width: 50px;">Editar</span>&nbsp;';
                html+= '<span id="deleteempleado_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-empleado" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                return html;
            }
        },
    ]
});

//CLICK BOTON EDITAR
empleados_table.on('click', '.edit-empleado', function() {
    clearFormEmpleado ();
    $("#textEmpleadosCreate").hide();
    $("#textEmpleadosUpdate").show();
    $("#saveEmpleadoLoading").hide();
    $("#updateEmpleado").show();
    $("#saveEmpleado").hide();

    var id = this.id.split('_')[1];
    var data = getDataById(id, empleados_table);

    $("#id_empleado_up").val(data.id);
    $("#nombre").val(data.nombre);
    $("#tipo").val(data.tipo);
    $("#salario").val(parseInt(data.salario));

    $("#empleadosFormModal").modal('show');
});
//CLICK BOTON DE ELIMINAR
empleados_table.on('click', '.drop-empleado', function() {
    var trEmpleado = $(this).closest('tr');
    var id = this.id.split('_')[1];
    var data = getDataById(id, empleados_table);

    Swal.fire({
        title: 'Eliminar empleado: '+data.nombre+'?',
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
                url: 'empleados-delete',
                method: 'DELETE',
                data: JSON.stringify({id: id}),
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
            }).done((res) => {
                empleados_table.row(trEmpleado).remove().draw();
                Swal.fire({
                    title: "Empleado eliminado!",
                    text: "El empleado "+data.nombre+" fue eliminado con exito!",
                    icon: "success",
                    timer: 1500
                })
            }).fail((res) => {
                Swal.fire({
                    title: "Error!",
                    text: "El empleado "+data.nombre+" no pudo ser eliminada!",
                    icon: "error",
                    timer: 1500
                });
            });
        }
    });
});
//LIMPIAR FORMULARIO
function clearFormEmpleado () {
    $("#id_empleado_up").val('');
    $("#nombre").val('');
    $("#salario").val(1300000);
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
function searchEmpleados (event) {
    if (event.keyCode == 20 || event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 18) {
        return;
    }
    var botonPrecionado = event.key.length == 1 ? event.key : '';
    searchValueEmpleado = $('#searchInputEmpleados').val();
    searchValueEmpleado = searchValueEmpleado+botonPrecionado;
    if(event.key == 'Backspace') searchValueEmpleado = searchValueEmpleado.slice(0, -1);

    empleados_table.context[0].jqXHR.abort();
    empleados_table.ajax.reload();
}
//TRAER DATOS DE EMPLEADO POR PRIMERA VEZ
empleados_table.ajax.reload();
//BOTON ACCION ABRIR MODAL
$(document).on('click', '#createEmpleado', function () {

    $("#empleadosFormModal").modal('show');

    clearFormEmpleado();
    $("#saveEmpleado").show();
    $("#updateEmpleado").hide();
    $("#saveEmpleadoLoading").hide();
    $("#textEmpleadosCreate").show();
});
//BOTON ACCION DE CREAR EMPLEADO
$(document).on('click', '#saveEmpleado', function () {
    var form = document.querySelector('#empleadosForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#saveEmpleado").hide();
    $("#saveEmpleadoLoading").show();

    let data = {
        nombre: $("#nombre").val(),
        tipo: $("#tipo").val(),
        salario: $("#salario").val(),
    }

    $.ajax({
        url: 'empleados-create',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormEmpleado();
            $("#saveEmpleado").show();
            $("#saveEmpleadoLoading").hide();
            $("#empleadosFormModal").modal('hide');

            empleados_table.ajax.reload();
            Swal.fire({
                title: "Empleado creado!",
                text: "El Empleado fue creado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#saveEmpleado').show();
        $('#saveEmpleadoLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo Empleado!",
            icon: "error",
            timer: 1500
        });
    });
});
//BOTON ACCION DE ACTUALIZAR EMPLEADO
$(document).on('click', '#updateEmpleado', function () {
    var form = document.querySelector('#empleadosForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#updateEmpleado").hide();
    $("#saveEmpleadoLoading").show();

    let data = {
        id: $("#id_empleado_up").val(),
        nombre: $("#nombre").val(),
        tipo: $("#tipo").val(),
        salario: $("#salario").val(),
    }

    $.ajax({
        url: 'empleados-update',
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormEmpleado();
            $("#updateEmpleado").show();
            $("#saveEmpleadoLoading").hide();
            $("#empleadosFormModal").modal('hide');

            empleados_table.ajax.reload();
            Swal.fire({
                title: "Empleado actualizado!",
                text: "El empleado fue actualizado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#updateEmpleado').show();
        $('#saveEmpleadoLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al actualizar el empleado!",
            icon: "error",
            timer: 1500
        });
    });
});
