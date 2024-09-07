var proyectos_table = null;
var searchValueMaterial = '';
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

$(document).on('click', '#createProyect', function () {
    clearFormProyectos();
    $("#proyectosFormModal").modal('show');
});

//LIMPIAR FORMULARIO
function clearFormProyectos () {
    $("#saveProyecto").show();
    $("#updateProyecto").hide();
    $("#textProyectosCreate").show();
    $("#textProyectosUpdate").hide();

    var dateNow = new Date();

    $("#nombre").val('');
    $("#id_proyecto_up").val('');
    $("#tipo_obra").val('');
    $("#fecha").val(dateNow.getFullYear()+'-'+("0" + (dateNow.getMonth() + 1)).slice(-2)+'-'+("0" + (dateNow.getDate())).slice(-2));
    $("#id_ciudad").val('').change();
}

//BOTON ACCION DE CREAR PROYECTOS
$(document).on('click', '#saveProyecto', function () {
    var form = document.querySelector('#proyectoForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#saveProyecto").hide();
    $("#saveProyectoLoading").show();

    let data = {
        nombre: $("#nombre").val(),
        tipo_obra: $("#tipo_obra").val(),
        id_ciudad: $("#id_ciudad").val(),
        fecha: $("#fecha").val()
    }

    $.ajax({
        url: 'proyecto',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            clearFormProyectos();
            $("#saveProyecto").show();
            $("#saveProyectoLoading").hide();
            $("#proyectosFormModal").modal('hide');
            
            proyectos_table.ajax.reload();
            Swal.fire({
                title: "Proyecto creado!",
                text: "El proyecto fue creado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $('#saveProyecto').show();
        $('#saveProyectoLoading').hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nuevo proyecto!",
            icon: "error",
            timer: 1500
        });
    });
});

$(function () {
    //TABLA DE MATERIALES
    proyectos_table = $('#proyectoTable').DataTable({
        pageLength: 15,
        dom: 'Brtp',
        paging: true,
        responsive: false,
        processing: true,
        serverSide: true,
        deferLoading: 0,
        initialLoad: false,
        language: lenguajeDatatable,
        sScrollX: "100%",
        ajax:  {
            type: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: 'proyecto',
            data: function ( d ) {
                d.tipo_producto = 0,
                d.search = searchValueMaterial;
            }
        },
        columns: [
            {"data":'nombre'},
            {"data":'tipo_obra'},
            {"data":'id_ciudad'},
            {"data":'fecha'},
            {
                "data": function (row, type, set){
                    var html = '<span id="selectproyecto_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info select-proyecto" style="margin-bottom: 0rem !important; min-width: 50px;">Seleccionar</span>&nbsp;';
                    // html+= '<span id="editproyecto_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info edit-proyecto" style="margin-bottom: 0rem !important; min-width: 50px;">Editar</span>&nbsp;';
                    // html+= '<span id="deleteproyecto_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-proyecto" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                    return html;
                }
            },
        ]
    });

    //CLICK BOTON EDITAR
    proyectos_table.on('click', '.select-proyecto', function() {

        var id = this.id.split('_')[1];

        $.ajax({
            url: 'proyecto-select',
            method: 'POST',
            data: JSON.stringify({id: id}),
            headers: {
                "Content-Type": "application/json",
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        }).done((res) => {
            if(res.success){
                setTimeout(function(){
                    location.reload();
                },1300);
                Swal.fire({
                    title: "Proyecto seleccionado!",
                    text: "El proyecto fue seleccionado con exito!",
                    icon: "success",
                    timer: 1500
                });
            }
        }).fail((err) => {
            $('#saveProyecto').show();
            $('#saveProyectoLoading').hide();
            Swal.fire({
                title: "Error!",
                text: "Error al crear seleccionar proyecto!",
                icon: "error",
                timer: 1500
            });
        });

    });

    $('#id_ciudad').select2({
        theme: 'bootstrap-5',
        delay: 250,
        dropdownParent: $('#proyectosFormModal'),
        placeholder: "Seleccione una ciudad",
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
            url: 'ciudades-combo',
            dataType: 'json',

            data: function (params) {
                var query = {
                    search: params.term
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

    proyectos_table.ajax.reload();
});