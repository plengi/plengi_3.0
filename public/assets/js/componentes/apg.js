var id_materiales = 0;
var id_equipos = 0;
var id_manos = 0;
var id_transportes = 0;
var totalGeneralApg = 0;

let arrayProductos = {
    'materiales': [],
    'equipos': [],
    'mano_obra': [],
    'transportes': []
};

function mostrarAPG() {
    $("#nombre_apg").val(apu.nombre);
    $("#cantidad_apg_general").val(cantidadGeneral);

    if (apu.detalles.length) {
        var productos = apu.detalles
        for (let index = 0; index < productos.length; index++) {
            var producto = productos[index];

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
                    'costo_total': parseFloat(producto.total),
                    'cantidad_apg': producto.cantidad_total * cantidadGeneral,
                    'costo_total_apg': parseFloat(producto.total)  * cantidadGenerals,
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
                    'costo_total': parseFloat(producto.total),
                    'cantidad_apg': producto.cantidad * cantidadGeneral,
                    'costo_total_apg': parseFloat(producto.total)  * (cantidadGeneral),
                }
                arrayProductos.equipos.push(data);
                addItemToTable(data, 'equipos');
            }

            if (producto.producto.tipo_producto == 2) {
                id_manos++;
                var prestaciones = producto.prestaciones;
                console.log('producto: ',producto);
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
                    'costo_total': parseFloat(producto.total),
                    'cantidad_apg': producto.cantidad * cantidadGeneral,
                    'costo_total_apg': parseFloat(producto.total)  * cantidadGeneral,
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
                    'costo_total': parseFloat(producto.total),
                    'cantidad_apg': producto.distancia * cantidadGeneral,
                    'costo_total_apg': parseFloat(producto.total)  * cantidadGeneral,
                }
                arrayProductos.transportes.push(data);
                addItemToTable(data, 'transportes');
            }
        }
    }
}

function addItemToTable (data, tipo) {
    if (tipo == 'equipos') {
        console.log('data: ',data);
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
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.cantidad_apg}" onfocus="this.select();" onchange="calcularCantidadEquipo(${data.consecutivo})">
            </td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total_apg,
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
                data.cantidad_apg,
            )}</td>
            <td id="costo_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo,
            )}</td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total_apg,
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
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.cantidad_apg}" onfocus="this.select();" onchange="calcularCantidadManoObra(${data.consecutivo})">
            </td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total_apg,
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
                <input type="number" style="text-align: end;" class="form-control form-control-sm" id="desperdicio_${tipo}_${data.consecutivo}" value="${data.cantidad_apg}" onfocus="this.select();" onchange="calcularProducto('${tipo}', ${data.consecutivo})">
            </td>
            <td id="total_${tipo}_${data.consecutivo}" style="text-align: end;" >${new Intl.NumberFormat('de-DE').format(
                data.costo_total_apg,
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

function calcularTotalesProductos () {
    var subtotalEquipos = 0;
    arrayProductos['equipos'].forEach(equipo => {
        subtotalEquipos+= equipo.costo_total_apg;
    });
    $("#apgEquiposTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalEquipos
    ));

    var subtotalMateriales = 0;
    arrayProductos['materiales'].forEach(equipo => {
        subtotalMateriales+= equipo.costo_total_apg;
    });
    $("#apgMaterialesTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalMateriales
    ));

    var subtotalManoObra = 0;
    arrayProductos['mano_obra'].forEach(equipo => {
        subtotalManoObra+= equipo.costo_total_apg;
    });
    $("#apgManoObraTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalManoObra
    ));

    var subtotalTransportes = 0;
    arrayProductos['transportes'].forEach(transporte => {
        subtotalTransportes+= transporte.costo_total_apg;
    });
    $("#apgTransportesTotal").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        subtotalTransportes
    ));

    totalGeneralApg = (subtotalEquipos + subtotalMateriales + subtotalManoObra + subtotalTransportes);
    $("#totalGeneralApg").text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        totalGeneralApg
    ));

}

function calcularProducto (tipo, consecutivo, cantidad = 0) {

    var index = encontrarIndex(arrayProductos[tipo], consecutivo);
    var data = arrayProductos[tipo][index];

    if (!cantidad) {
        var cantidad = parseInt($("#cantidad_"+tipo+"_"+consecutivo).val());
    }

    if (tipo == 'equipos') {
        var rendimiento = arrayProductos[tipo][index].porcentaje_rendimiento;
        var totalEquipo = ((cantidad * data.costo) / rendimiento);
        console.log('totalEquipo: ',totalEquipo);
        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalEquipo
        ));

        $("#desperdicio_"+tipo+"_"+consecutivo).val(cantidad);
        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].costo_total_apg = totalEquipo;
    }

    if (tipo == 'materiales') {
        var desperdicio = parseInt($("#desperdicio_"+tipo+"_"+consecutivo).val());
        var cantidadTotal = desperdicio ? cantidad + (cantidad * (desperdicio / 100)) : cantidad;
        var totalMaterial = cantidadTotal * data.costo;

        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalMaterial * cantidadGeneral
        ));

        $("#cantidadtotal_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            cantidadTotal * cantidadGeneral
        ));

        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].porcentaje_desperdicio = desperdicio;
        arrayProductos[tipo][index].cantidad_total = cantidadTotal * cantidadGeneral;
        arrayProductos[tipo][index].costo_total_apg = totalMaterial;
    }

    if (tipo == 'mano_obra') {
        var rendimiento = arrayProductos[tipo][index].porcentaje_rendimiento;
        var totalEquipo = (cantidad * data.costo_unitario) / rendimiento;

        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalEquipo * cantidadGeneral
        ));

        $("#desperdicio_"+tipo+"_"+consecutivo).val(cantidad * cantidadGeneral);

        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].porcentaje_rendimiento = rendimiento;
        arrayProductos[tipo][index].costo_total_apg = totalEquipo;
    }

    if (tipo == 'transportes') {
        var distancia = $("#distancia_"+tipo+"_"+consecutivo).val();
        var totalTransporte = cantidad * data.costo * distancia;

        $("#total_"+tipo+"_"+consecutivo).text(new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
            totalTransporte
        ));

        arrayProductos[tipo][index].cantidad = cantidad;
        arrayProductos[tipo][index].distancia = distancia;
        arrayProductos[tipo][index].costo_total_apg = totalTransporte;
    }

    calcularTotalesProductos();
}

function calcularCantidadEquipo (consecutivo) {
    var cantidadNueva = parseInt($("#desperdicio_equipos_"+consecutivo).val()) / cantidadGeneral;


    $("#cantidad_equipos_"+consecutivo).val(cantidadNueva);
    calcularProducto('equipos', consecutivo, cantidadNueva);
}

function calcularCantidadManoObra (consecutivo) {
    var cantidadNueva = parseInt($("#desperdicio_mano_obra_"+consecutivo).val()) / cantidadGeneral;
    
    $("#cantidad_mano_obra_"+consecutivo).val(cantidadNueva);
    calcularProducto('mano_obra', consecutivo, cantidadNueva);
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

function calcularApg () {
    var cantidadNueva = $("#cantidad_apg_general").val();
    cantidadGeneral = parseInt(cantidadNueva);
    
    arrayProductos.equipos.forEach((valor) => {
        calcularProducto('equipos', valor.consecutivo);
    });
    arrayProductos.mano_obra.forEach((valor) => {
        calcularProducto('mano_obra', valor.consecutivo);
    });
    arrayProductos.materiales.forEach((valor) => {
        calcularProducto('materiales', valor.consecutivo);
    });
    // arrayProductos.transportes.forEach((valor) => {
    //     calcularProducto('transportes', valor.consecutivo);
    // });
    
    calcularTotalesProductos();
}

$(document).on('click', '#ActualizarApu', function () {
    
    var form = document.querySelector('#apgForm');

    if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
    }

    $("#volverApu").hide();
    $("#actualizarApu").hide();
    $("#crearApuLoading").show();

    let data = {
        id_apu: idApu,
        id_actividad: idActividad,
        nombre: $("#nombre_apg").val(),
        varlor_total: totalGeneralApg,
        cantidad: cantidadGeneral,
        productos: getProductos()
    }

    $.ajax({
        url: '/apg',
        method: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    }).done((res) => {
        if(res.success){

            $("#ActualizarApu").show();
            $("#crearApgLoading").hide();
            Swal.fire({
                title: "APU actualizado!",
                text: "El APU fue actualizado con exito!",
                icon: "success",
                timer: 1500
            });
        }
    }).fail((err) => {

        $("#ActualizarApu").show();
        $("#crearApgLoading").hide();
        Swal.fire({
            title: "Error!",
            text: "Error al actualizar APU!",
            icon: "error",
            timer: 1500
        });
    });
});

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

mostrarAPG();