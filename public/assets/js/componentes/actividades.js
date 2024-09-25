var actividades_table = null;
var searchValueActividades = '';
var id_apu = 0;
var id_tarjeta = 0;
let arrayTarjetas = [];
let arrayApuUsados = [];
let arrayOrden = [];
var costoDirecto = 0;
var costoIndirecto = 0;
var costoTotal = 0;
let itemsCostosIndirectos = [
    { 'nombre': 'administracion', 'porcentaje': 0, 'total': 0 },
    { 'nombre': 'imprevistos', 'porcentaje': 0, 'total': 0 },
    { 'nombre': 'utilidad', 'porcentaje': 0, 'total': 0 },
];
let initialState;
var el = document.getElementById('example5');
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

//INICIAR ACTIVIDADES
function initData () {
    if (actividad_general) {
        setTimeout(function(){

            $('#crearActividades').hide();
            $('#actualizarActividades').show();
    
            clearFormActividad();
            var data = actividad_general;
        
            $("#actions-actividades-component").hide();
            $("#table-actividades-component").hide();
            $("#actions-actividades-create").show();
            $("#create-actividades-component").show();
        
            $("#crearActividades").hide();
            $("#actualizarActividades").show();
            $('#id_actividades_up').val(data.id);
            $('#nombre_actividades').val(data.nombre);
        
            itemsCostosIndirectos = [
                { 'nombre': 'administracion', 'porcentaje': data.porcentaje_administracion, 'total': 0 },
                { 'nombre': 'imprevistos', 'porcentaje': data.porcentaje_imprevistos, 'total': 0 },
                { 'nombre': 'utilidad', 'porcentaje': data.porcentaje_utilidad, 'total': 0 },
            ];
        
            $("#administracion-porcentaje").val(parseInt(data.porcentaje_administracion));
            $("#imprevistos-porcentaje").val(parseInt(data.porcentaje_imprevistos));
            $("#utilidad-porcentaje").val(parseInt(data.porcentaje_utilidad));
        
            //AGREGAR COMPONENTES
            data.detalles.forEach(detalle => {
                id_apu++;
                var tarjetaEncontrada = arrayTarjetas.find(tarjeta => tarjeta.codigo_tarjeta === detalle.codigo_tarjeta);
                //AGREGAR TARJETAS
                if (!tarjetaEncontrada) {
                    id_tarjeta++;
                    tarjetaEncontrada = {
                        'codigo_tarjeta': detalle.codigo_tarjeta,
                        'consecutivo': id_tarjeta,
                        'nombre': detalle.nombre_tarjeta,
                        'subtotal': 0,
                    }
                    arrayTarjetas.push(tarjetaEncontrada);
                    crearTarjetaHtml(detalle.nombre_tarjeta);
                }
                //AGREGAR APUS
                let data = {
                    'id_tarjeta': tarjetaEncontrada.consecutivo,
                    'id_apu': detalle.id_apu,
                    'consecutivo': id_apu,
                    'nombre': detalle.apu.nombre,
                    'unidad_medida': detalle.apu.unidad_medida,
                    'cantidad': parseInt(detalle.cantidad),
                    'valor_unidad': detalle.apu.valor_total,
                    'valor_total': detalle.valor_total,
                }
                arrayApuUsados.push(data);
                crearAPUItemHtml(data);
            });
            //CALCULAR TOTALES
            actualizarOrdenItems();
            calcularCostosDirectos();
            calcularCostosIndirectos();
            calcularTotal();
        },100);


    } else {
        $('#crearActividades').show();
        $('#actualizarActividades').hide();
    }
}

//INICIALIZAR SORTABLEJS
setTimeout(function(){
    new Sortable(example5, {
        group: 'nested',
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onStart: function(evt) {
            // Clona el estado inicial del DOM cuando se comienza a arrastrar
            el = document.getElementById('example5');
            initialState = el.cloneNode(true);
        },
        onEnd: function (evt) {
            actualizarOrdenItems();
            calcularCostosDirectos();
        }
    });
},50);
//MOSTRAR CREACIÓN DE ACTIVIDADES
$(document).on('click', '#createActividades', function () {
    $("#actions-actividades-component").hide();
    $("#table-actividades-component").hide();
    $("#actions-actividades-create").show();
    $("#create-actividades-component").show();
    clearFormActividad();
});
//CREAR ITEM DE TARJETA
$(document).on('click', '#agregarTarjeta', function () {
    $("#nombre_tarjeta").removeClass("is-invalid");

    var nombreTarjeta = $("#nombre_tarjeta").val();
    if (!nombreTarjeta) {
        $("#nombre_tarjeta").addClass("is-invalid");
        return;
    }
    id_tarjeta++;

    let data = {
        'consecutivo': id_tarjeta,
        'nombre': nombreTarjeta,
        'subtotal': 0,
    }
    
    arrayTarjetas.push(data);
    $("#nombre_tarjeta").val('');

    crearTarjetaHtml(nombreTarjeta);
});
//GENERAR ITEM DE TARJETA
function crearTarjetaHtml (nombreTarjeta = null) {
    var html = `
        <p class="text-nombre">${nombreTarjeta}</p>
        <p class="text-numero" id="text-numero-${id_tarjeta}">${arrayTarjetas.length}.</p>

        <div class="list-group nested-sortable item-actividades" id="group-tarjeta-${id_tarjeta}">
        </div>

        <div class="row foot-totals">
            <div class="col-8 item-componente-2"><p style="margin-bottom: 0px;"></p></div>
            <div class="col-2 item-componente-2"><p style="margin-bottom: 0px; text-align: end;">Subtotal</p></div>
            <div class="col-2 item-componente-3">
                <p id="subtotal-tarjeta-${id_tarjeta}" style="margin-bottom: 0px; text-align: end;">
                0 &nbsp;
                </p>
            </div>
        </div>
    `;

    var item = document.createElement('div');
    item.setAttribute("id", "tarjeta-"+id_tarjeta);
    item.setAttribute("class", "list-group-item tarjeta-desing");
    item.innerHTML = [
        html
    ].join('');
    document.getElementById('example5').insertBefore(item, null);
}
//GENERAR ITEM DE APU
function crearAPUItemHtml (dataApu) {
    var html = `
        <div class="col-1 item-componente-1" id="apu-numero-${id_apu}">
            ${dataApu.id_tarjeta+'.'+id_apu}
        </div>
        <div class="col-4 item-componente-1">
            ${dataApu.nombre}
        </div>
        <div class="col-1 item-componente-1">
            ${dataApu.unidad_medida}
        </div>
        <div class="col-2 item-componente-1">
            <input id="input-apu-${id_apu}" type="text" class="input-cantidad" value="${dataApu.cantidad}" onchange="changeValorDirecto()" onfocus="this.select();" />
        </div>
        <div class="col-2 item-componente-1" style="text-align: end;">
            ${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
                dataApu.valor_unidad
            )}
        </div>
        <div class="col-2 item-componente-2" >
            <div style="position: absolute; background-color: #2d67ce; color: white; padding: 1px 5px 1px 5px; border-radius: 20px; cursor: pointer;" onclick="verApg(${dataApu.consecutivo})">
                <i class="fa fa-eye" aria-hidden="true"></i>
            </div>
            <div class="" id="total-apu-${id_apu}" style="text-align: end;"">
                ${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
                    dataApu.valor_total
                )}
            </div>
        </div>
    `;

    var item = document.createElement('div');
    item.setAttribute("id", "apu-item-"+id_apu);
    item.setAttribute("class", "list-group-item row item-group");
    item.innerHTML = [
        html
    ].join('');
    document.getElementById('group-tarjeta-'+dataApu.id_tarjeta).insertBefore(item, null);

    el = document.getElementById('example5');
    initialState = el.cloneNode(true);
    revertToInitialState(el);
}
//VOLVER A TABLA INICIAL
function volverActividades () {
    $("#actions-actividades-component"). show();
    $("#table-actividades-component"). show();
    $("#actions-actividades-create").hide();
    $("#create-actividades-component").hide();

    actividades_table.ajax.reload();
    clearFormActividad();
}
//ACTUALIZAR ARRAY ORDENADO POR ITEMS
function actualizarOrdenItems() {
    arrayOrden = [];
    var tarjetas = $(".tarjeta-desing");

    if (tarjetas.length) {
        for (let i = 0; i < tarjetas.length; i++) {
            let tarjeta = tarjetas[i];
            let childrens = tarjeta.children;
            let idTarjeta = tarjeta.id.split('-')[1];
            let tarjetaEncontrada = arrayTarjetas.find(actividad => actividad.consecutivo === parseInt(idTarjeta));

            let dataGrupo = {
                'consecutivo': tarjetaEncontrada.consecutivo,
                'nombre': tarjetaEncontrada.nombre,
                'subtotal': 0,
                'apus': []
            };
            
            let grupoTarjeta = childrens[2].children;

            for (let j = 0; j < grupoTarjeta.length; j++) {
                let itemApu = grupoTarjeta[j];
                let idApu = itemApu.id.split('-')[2];
                if (itemApu.id.split('-')[0] == 'tarjeta') {
                    Swal.fire({
                        title: "Error!",
                        text: "La tarjera no puede estar dentro de otra tarjeta!",
                        icon: "error",
                        timer: 3000
                    });
                    revertToInitialState(el)
                }
                let apuEncontrado = arrayApuUsados.find(apu => apu.consecutivo === parseInt(idApu));
                if (!apuEncontrado) continue;
                let dataApu = {
                    'id_apu': apuEncontrado.id_apu,
                    'consecutivo': apuEncontrado.consecutivo,
                    'nombre': apuEncontrado.nombre,
                    'unidad_medida': apuEncontrado.unidad_medida,
                    'cantidad': 0,
                    'valor_unidad': apuEncontrado.valor_unidad,
                    'valor_total': 0,
                }
                dataGrupo.apus.push(dataApu);
            }
            arrayOrden.push(dataGrupo);
        }
        actualizarEnumeracion();
    }
}
//ACTUALIZAR NUMERACIÓN DE ITEMS
function actualizarEnumeracion() {
    if (!arrayOrden.length) return;

    for (let i = 0; i < arrayOrden.length; i++) {
        let tarjeta = arrayOrden[i];
        $("#text-numero-"+tarjeta.consecutivo).text((i+1)+'.');
        if (!tarjeta.apus) continue;
        for (let j = 0; j < tarjeta.apus.length; j++) {
            let apu = tarjeta.apus[j];
            $("#apu-numero-"+apu.consecutivo).text((i+1)+'.'+(j+1)+'.');
        }
    }
}
//REVERTIR MOVIMIENTO DE TARJETA
function revertToInitialState(container) {
    // Elimina todos los elementos actuales
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Añade de nuevo los elementos clonados
    [...initialState.children].forEach(child => {
        container.appendChild(child.cloneNode(true));
    });
    //REINICIAR SORTABLE JS
    var nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));
    for (var i = 0; i < nestedSortables.length; i++) {
        new Sortable(nestedSortables[i], {
            group: 'nested',
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65,
            onStart: function(evt) {
                // Clona el estado inicial del DOM cuando se comienza a arrastrar
                el = document.getElementById('example5');
                initialState = el.cloneNode(true);
            },
            onEnd: function (evt) {
                actualizarOrdenItems();
                calcularCostosDirectos();
            }
        });
    }
}

function calcularCostosDirectos() {
    if (!arrayOrden.length) return;
    costoDirecto = 0;

    for (let i = 0; i < arrayOrden.length; i++) {
        let tarjeta = arrayOrden[i];
        var totalTarjeta = 0;
        if (tarjeta.apus.length) {
            for (let j = 0; j < tarjeta.apus.length; j++) {
                let apu = tarjeta.apus[j];
                let cantidad = $("#input-apu-"+apu.consecutivo).val();
                let total = cantidad * apu.valor_unidad;
                arrayOrden[i].apus[j].cantidad = cantidad;
                arrayOrden[i].apus[j].valor_total = total;
                totalTarjeta+= total;
                costoDirecto+= total;
                $("#total-apu-"+apu.consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
                    total
                ));
            }
        }
        $("#subtotal-tarjeta-"+tarjeta.consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalTarjeta
        ));
    }

    $("#directo-costo").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        costoDirecto
    ));

    $("#costo_directo_card").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        costoDirecto
    ));
}

function calcularCostosIndirectos() {
    costoIndirecto = 0;
    for (let i = 0; i < itemsCostosIndirectos.length; i++) {
        let indirecto = itemsCostosIndirectos[i];
        var porcentaje = $("#"+indirecto.nombre+'-porcentaje').val();
        var total = costoDirecto * (porcentaje / 100);
        itemsCostosIndirectos[i].porcentaje = porcentaje;
        costoIndirecto+= total;
        $("#"+indirecto.nombre+'-total').text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            total
        ));
    }
    $("#indirecto-total").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        costoIndirecto
    ));
    $("#costo_indirecto_card").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        costoIndirecto
    ));
}

function changePorcentajeIndirecto() {
    calcularCostosIndirectos();
    calcularTotal();
}

function changeValorDirecto() {
    calcularCostosDirectos();
    calcularCostosIndirectos();
    calcularTotal();
}

function calcularTotal() {
    costoTotal = 0;
    costoTotal = costoDirecto + costoIndirecto;
    var textTotal = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        costoTotal
    );
    $("#presupuesto_general_card").text(textTotal);
    $("#presupuesto_general_card").text(textTotal);

    
}
//CALCULAR 
$(".input-cantidad").on('keydown', function(event) {
    if(event.keyCode == 13){
        calcularCostosDirectos();
        calcularCostosIndirectos();
        calcularTotal();
    }
});
//METODO POST PARA CREAR ACTIVIDAD
$(document).on('click', '#crearActividades', function () {
    let data = {
        'costo_directo': costoDirecto,
        'costo_indirecto': costoIndirecto,
        'costo_total': costoTotal,
        'tarjetas': arrayOrden,
        'indirectos': itemsCostosIndirectos
    }

    $("#crearActividades").hide();
    $("#crearActividadesLoading").show();

    $.ajax({
        url: 'actividades-create',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            $("#id_actividades_up").val(res.data.id);
            $("#crearActividades").hide();
            $("#actualizarActividades").show();
            $("#crearActividadesLoading").hide();
            Swal.fire({
                title: "Actividad creada!",
                text: "La Actividad fue creada con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $("#crearActividades").show();
        $("#crearActividadesLoading").hide();
        Swal.fire({
            title: "Error!",
            text: "Error al crear nueva Actividad!",
            icon: "error",
            timer: 1500
        });
    });
});
//METODO PUT PARA ACTUALIZAR ACTIVIDAD
$(document).on('click', '#actualizarActividades', function () {
    let data = {
        'id': $("#id_actividades_up").val(),
        'costo_directo': costoDirecto,
        'costo_indirecto': costoIndirecto,
        'costo_total': costoTotal,
        'tarjetas': arrayOrden,
        'indirectos': itemsCostosIndirectos
    }

    $("#actualizarActividades").hide();
    $("#crearActividadesLoading").show();

    $.ajax({
        url: 'actividades-update',
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){
            $("#actualizarActividades").show();
            $("#crearActividadesLoading").hide();
            Swal.fire({
                title: "Actividad actualizada!",
                text: "La Actividad fue actualizada con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {
        $("#actualizarActividades").show();
        $("#crearActividadesLoading").hide();
        Swal.fire({
            title: "Error!",
            text: "Error al actualizar nueva Actividad!",
            icon: "error",
            timer: 1500
        });
    });
});

function clearFormActividad() {
    $('#example5').empty();

    id_apu = 0;
    id_tarjeta = 0;
    arrayTarjetas = [];
    arrayApuUsados = [];
    arrayOrden = [];
    costoDirecto = 0;
    costoIndirecto = 0;
    costoTotal = 0;
    itemsCostosIndirectos = [
        { 'nombre': 'administracion', 'porcentaje': 0, 'total': 0 },
        { 'nombre': 'imprevistos', 'porcentaje': 0, 'total': 0 },
        { 'nombre': 'utilidad', 'porcentaje': 0, 'total': 0 },
    ];
    calcularCostosIndirectos();
    $("#id_actividades_up").val('');
    $("#directo-costo").text('0,00');
    $("#costo_directo_card").text('0,00');
    $("#presupuesto_general_card").text('0,00');
    $("#administracion-porcentaje").val(0);
    $("#imprevistos-porcentaje").val(0);
    $("#utilidad-porcentaje").val(0);
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

$(function () {

    $('#id_apu').select2({
        theme: 'bootstrap-5',
        delay: 250,
        placeholder: "Seleccione un Apu",
        language: {
            noResults: function() {
                return "No hay resultado";
            },
            searching: function() {
                return "Buscando..";
            }
        },
        ajax: {
            url: 'apu-combo',
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

    $('#id_apu').on('select2:close', function(event) {
        var dataApu = $('#id_apu').select2('data');

        if (dataApu && dataApu.length) {
            id_apu++;
            dataApu = dataApu[0];
            let data = {
                'id_tarjeta': id_tarjeta,
                'id_apu': dataApu.id,
                'consecutivo': id_apu,
                'nombre': dataApu.nombre,
                'unidad_medida': dataApu.unidad_medida,
                'cantidad': 0,
                'valor_unidad': dataApu.valor_total,
                'valor_total': 0,
            }
        
            arrayApuUsados.push(data);
            crearAPUItemHtml(data);
        }

        $('#id_apu').val('');
        $('#id_apu').change();
        actualizarOrdenItems();
    });

});

function verApg(consecutivo) {
    
    for (let index = 0; index < arrayApuUsados.length; index++) {
        var id_actividad = $("#id_actividades_up").val();
        const element = arrayApuUsados[index];

        var cantidad = $("#input-apu-"+consecutivo).val();
        var tarjetaEncontrada = arrayTarjetas.find(tarjeta => tarjeta.consecutivo === element.id_tarjeta);
        
        if (element.consecutivo == consecutivo) {
            window.open("/apg/"+element.id_apu+"/"+cantidad+"/"+tarjetaEncontrada.nombre+"/"+id_actividad, '_blank');
        }
    }

}

initData();