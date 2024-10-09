var manoObras_table = null;
var searchValueManoObra = '';
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
manoObras_table = $('#manoObrasTable').DataTable({
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
        url: 'mano-obras-read',
        data: function ( d ) {
            d.tipo_producto = 2,
            d.search = searchValueManoObra;
        }
    },
    columns: [
        {"data":'nombre'},
        {"data":'unidad_medida'},
        {
            "data": function (row, type, set){
                var html = '';
                html+= '<h5 id="valor_'+row.id+'" style="font-size: 14px; padding-bottom: 0px; margin-bottom: 0px; font-weight: 400;" >'+row.valor+'</h5>';
                setTimeout(function(){
                    var countUp = new CountUp('valor_'+row.id, 0, row.valor, 2, 0.5);
                        countUp.start();
                },100);
                return html;
            }, className: 'dt-body-right'
        },
        {
            "data": function (row, type, set){
                var html = '';
                html+= '<span id="editmanoObra_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info edit-manoObra" style="margin-bottom: 0rem !important; min-width: 50px;">Editar</span>&nbsp;';
                html+= '<span id="deletemanoObra_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-manoObra" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                return html;
            }
        },
    ]
});
//CLICK BOTON EDITAR
manoObras_table.on('click', '.edit-manoObra', function() {
    clearFormManoObra ();
    $("#textManoObrasCreate").hide();
    $("#textManoObrasUpdate").show();
    $("#saveManoObraLoading").hide();
    $("#updateManoObra").show();
    $("#saveManoObra").hide();

    var id = this.id.split('_')[1];
    var data = getDataById(id, manoObras_table);

    $("#id_manoObra_up").val(data.id);
    $("#nombre").val(data.nombre);
    $("#valor_unitario").val(parseInt(data.valor));
    $("#cantidad").val(data.cantidad);
    $("#unidad_medida").val(data.unidad_medida);
    $("#tipo_proveedor").val(data.tipo_proveedor);

    $("#manoObrasFormModal").modal('show');
});
//CLICK BOTON DE ELIMINAR
manoObras_table.on('click', '.drop-manoObra', function() {
    var trManoObra = $(this).closest('tr');
    var id = this.id.split('_')[1];
    var data = getDataById(id, manoObras_table);

    Swal.fire({
        title: 'Eliminar mano de obra: '+data.nombre+'?',
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
                url: 'mano-obras-delete',
                method: 'DELETE',
                data: JSON.stringify({id: id}),
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
            }).done((res) => {
                manoObras_table.row(trManoObra).remove().draw();
                Swal.fire({
                    title: "Mano de obra eliminado!",
                    text: "La mano de obra "+data.nombre+" fue eliminado con exito!",
                    icon: "success",
                    timer: 1500
                })
            }).fail((res) => {
                Swal.fire({
                    title: "Error!",
                    text: "La mano de obra "+data.nombre+" no pudo ser eliminada!",
                    icon: "error",
                    timer: 1500
                });
            });
        }
    });
});
//LIMPIAR FORMULARIO
function clearFormManoObra () {
    $("#id_manoObra_up").val('');
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
function searchManoObras (event) {
    if (event.keyCode == 20 || event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 18) {
        return;
    }
    var botonPrecionado = event.key.length == 1 ? event.key : '';
    searchValueManoObra = $('#searchInputManoObras').val();
    searchValueManoObra = searchValueManoObra+botonPrecionado;
    if(event.key == 'Backspace') searchValueManoObra = searchValueManoObra.slice(0, -1);

    manoObras_table.context[0].jqXHR.abort();
    manoObras_table.ajax.reload();
}
//TRAER DATOS DE MATERIALES POR PRIMERA VEZ
manoObras_table.ajax.reload();
//BOTON ACCION ABRIR MODAL
$(document).on('click', '#createManoObra', function () {

    $("#manoObrasFormModal").modal('show');

    clearFormManoObra();
    $("#saveManoObra").show();
    $("#updateManoObra").hide();
    $("#saveManoObraLoading").hide();
    $("#textManoObrasCreate").show();
});
//BOTON ACCION DE CREAR MATERIAL
$(document).on('click', '#saveManoObra', function () {
    var form = document.querySelector('#manoObrasForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#saveManoObra").hide();
    $("#saveManoObraLoading").show();

    let data = {
        nombre: $("#nombre").val(),
        unidad_medida: $("#unidad_medida").val(),
        valor: $("#valor_unitario").val(),
        tipo_proveedor: $("#tipo_proveedor").val(),
        cantidad: $("#cantidad").val(),
        tipo_producto: 2
    }

    $.ajax({
        url: 'mano-obras-create',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormManoObra();
            $("#saveManoObra").show();
            $("#saveManoObraLoading").hide();
            $("#manoObrasFormModal").modal('hide');

            manoObras_table.ajax.reload();
            Swal.fire({
                title: "Producto creado!",
                text: "El producto fue creado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#saveManoObra').show();
        $('#saveManoObraLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo producto!",
            icon: "error",
            timer: 1500
        });
    });
});
//BOTON ACCION DE ACTUALIZAR MATERIAL
$(document).on('click', '#updateManoObra', function () {
    var form = document.querySelector('#manoObrasForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#updateManoObra").hide();
    $("#saveManoObraLoading").show();

    let data = {
        id: $("#id_manoObra_up").val(),
        nombre: $("#nombre").val(),
        unidad_medida: $("#unidad_medida").val(),
        valor: $("#valor_unitario").val(),
        tipo_proveedor: $("#tipo_proveedor").val(),
        cantidad: $("#cantidad").val(),
        tipo_producto: 2
    }

    $.ajax({
        url: 'mano-obras-update',
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormManoObra();
            $("#updateManoObra").show();
            $("#saveManoObraLoading").hide();
            $("#manoObrasFormModal").modal('hide');

            manoObras_table.ajax.reload();
            Swal.fire({
                title: "Producto actualizado!",
                text: "El producto fue actualizado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#updateManoObra').show();
        $('#saveManoObraLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo producto!",
            icon: "error",
            timer: 1500
        });
    });
});
