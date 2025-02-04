var empresas_table = null;
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
//TABLA DE TRANSPORTE
empresas_table = $('#empresasTable').DataTable({
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
        url: 'empresas-read',
        data: function ( d ) {
            d.tipo_producto = 3,
            d.search = searchValueTransporte;
        }
    },
    columns: [
        {"data":'razon_social'},
        {"data":'email'},
        {"data":'telefono'},
        {"data":'direccion'},
        {
            "data": function (row, type, set){
                var html = '';
                html+= '<span id="seelctempresa_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info select-empresa" style="margin-bottom: 0rem !important; min-width: 50px;">Seleccionar</span>&nbsp;';
                // html+= '<span id="deletetransporte_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-transporte" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                return html;
            }
        },
    ]
});
empresas_table.on('click', '.select-empresa', function() {

    var id = this.id.split('_')[1];
    var data = getDataById(id, empresas_table);
    console.log('data selected: ',data);
    $.ajax({
        url: 'empresas-select',
        method: 'POST',
        data: JSON.stringify({
            id_empresa: data.id
        }),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
    }).done((res) => {
        if(res.success){
            Swal.fire({
                title: "Empresa creada!",
                text: "La empresa fue seleccionada con exito!",
                icon: "success",
                timer: 1500
            });

            location.reload();
        }
    }).fail((err) => {
        var errorsMsg = "";
        var mensaje = err.responseJSON.message;
        if(typeof mensaje  === 'object' || Array.isArray(mensaje)){
            for (field in mensaje) {
                var errores = mensaje[field];
                for (campo in errores) {
                    errorsMsg += "- "+errores[campo]+" <br>";
                }
            };
        } else {
            errorsMsg = mensaje
        }
        agregarToast('error', 'Creación errada', errorsMsg);
    });
});
//
//LIMPIAR FORMULARIO
function clearFormEmpresa () {
    $("#razon_social_empresa").val(null);
    $("#email_empresa").val(null);
    $("#nit_empresa").val(null);
    $("#dv_empresa").val(null);
    $("#telefono_empresa").val(null);
    $("#direccion_empresa").val(null);
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
//TRAER DATOS DE TRANSPORTES POR PRIMERA VEZ
empresas_table.ajax.reload();
//BOTON ACCION ABRIR MODAL
$(document).on('click', '#createEmpresa', function () {

    $("#empresaFormModal").modal('show');

    clearFormEmpresa();
    $("#saveEmpresa").show();
    $("#updateEmpresa").hide();
    $("#saveEmpresaLoading").hide();
    $("#textEmpresaCreate").show();
    $("#textEmpresaUpdate").hide();
});
//BOTON ACCION DE CREAR EQUIPO
$(document).on('click', '#saveEmpresa', function () {
    var form = document.querySelector('#empresaForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#saveEmpresa").hide();
    $("#saveEmpresaLoading").show();

    let data = {
        razon_social: $("#razon_social_empresa").val(),
        email: $("#email_empresa").val(),
        nit: $("#nit_empresa").val(),
        dv: $("#dv_empresa").val(),
        telefono: $("#telefono_empresa").val(),
        direccion: $("#direccion_empresa").val()
    }

    $.ajax({
        url: 'empresas-create',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormEmpresa();

            $("#saveEmpresa").show();
            $("#saveEmpresaLoading").hide();
            $("#empresaFormModal").modal('hide');

            empresas_table.ajax.reload();

            Swal.fire({
                title: "Empresa creada!",
                text: "La empresa fue creado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#saveEmpresa').show();
        $('#saveEmpresaLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nueva empresa!",
            icon: "error",
            timer: 1500
        });
    });
});