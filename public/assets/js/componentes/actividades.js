var actividades_table = null;
var searchValueActividades = '';
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

//TABLA APU
actividades_table = $('#actividadesTable').DataTable({
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
        url: 'actividades-read',
        data: function ( d ) {
            d.search = searchValueActividades;
        }
    },
    columns: [
        {"data":'nombre'},
        {"data":'valor_total', render: $.fn.dataTable.render.number(',', '.', 2, ''), className: 'dt-body-right'},
        {
            "data": function (row, type, set){
                var html = '';
                html+= '<span id="editactividades_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-info edit-actividades" style="margin-bottom: 0rem !important; min-width: 50px;">Editar</span>&nbsp;';
                html+= '<span id="deleteactividades_'+row.id+'" href="javascript:void(0)" class="btn badge bg-gradient-danger drop-actividades" style="margin-bottom: 0rem !important; min-width: 50px;">Eliminar</span>';
                return html;
            }
        },
    ]
});

var id_apu = 0;
var id_tarjeta = 0;
let arrayActividades = [];

actividades_table.ajax.reload();

setTimeout(function(){
    new Sortable(example5, {
        group: 'nested',
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65
    });
},50);

$(document).on('click', '#createActividades', function () {
    $("#actions-actividades-component").hide();
    $("#table-actividades-component").hide();
    $("#actions-actividades-create").show();
    $("#create-actividades-component").show();
});

$(document).on('click', '#agregarTarjeta', function () {
    $("#nombre_tarjeta").removeClass("is-invalid");

    var nombreTarjeta = $("#nombre_tarjeta").val();
    if (!nombreTarjeta) $("#nombre_tarjeta").addClass("is-invalid");
    id_tarjeta++;

    let data = {
        'consecutivo': id_tarjeta,
        'nombre': nombreTarjeta,
        'subtotal': 0,
        'apus': []
    }

    arrayActividades.push(data);
    $("#nombre_tarjeta").val('');

    var html = `
        <p class="text-nombre">${nombreTarjeta}</p>
        <p class="text-numero">${arrayActividades.length}.</p>

        <div class="list-group nested-sortable item-actividades">
        </div>

        <div class="row foot-totals">
            <div class="col-8 item-componente-2"><p style="margin-bottom: 0px;"></p></div>
            <div class="col-2 item-componente-2"><p style="margin-bottom: 0px;">Subtotal</p></div>
            <div class="col-2 item-componente-3">
                <p id="subtotal-tarjeta-${id_tarjeta}" style="margin-bottom: 0px; text-align: end;">
                0 &nbsp;
                </p>
            </div>
        </div>
    `;

    var item = document.createElement('div');
    item.setAttribute("id", "tarjeta"+id_tarjeta);
    item.setAttribute("class", "list-group-item tarjeta-desing");
    item.innerHTML = [
        html
    ].join('');
    document.getElementById('example5').insertBefore(item, null);
});

$(document).on('click', '#volverActividades', function () {
    volverAPU();
});

function volverAPU () {
    $("#actions-actividades-component").show();
    $("#table-actividades-component").show();
    $("#actions-actividades-create").hide();
    $("#create-actividades-component").hide();

    actividades_table.ajax.reload();
}