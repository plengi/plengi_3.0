<div id="create-actividades-component" style="content-visibility: auto; overflow: auto; display: none;">

    <div class="card mb-4">
        <div class="card-body">

            <form class="row" id="actividadesForm">

                <input type="text" class="form-control" name="id_actividades_up" id="id_actividades_up" style="display: none;">

                <div class="form-group col-12 col-sm-6 col-md-4">
                    <label for="example-text-input" class="form-control-label">Nombre Actividad</label>
                    <input type="text" class="form-control form-control-sm" name="nombre_actividades" id="nombre_actividades" onfocus="this.select();" required>

                    <div class="invalid-feedback">
                        El nombre es requerido
                    </div>
                </div>

                <div class="form-group col-12 col-sm-6 col-md-4">
                    <label for="exampleFormControlSelect1" style=" width: 100%;">Seleccione un APU</label>
                    <select class="form-control form-control-sm" name="id_apu" id="id_apu">
                    </select>
                    <div class="invalid-feedback">
                        El campo es requerido
                    </div>
                </div>

                <div class="form-group col-12 col-sm-6 col-md-4">
                    <label for="example-text-input" class="form-control-label">Agregar tarjeta</label>
                    <input type="text" class="form-control form-control-sm" name="nombre_tarjeta" id="nombre_tarjeta" onfocus="this.select();">

                    <div class="invalid-feedback" style="position: absolute;">
                        El nombre de la tarjeta es obligatorio
                    </div>

                    <span id="agregarTarjeta" href="javascript:void(0)" class="btn badge bg-gradient-info" style="margin-bottom: 0rem !important; min-width: 40px; height: 31px; float: inline-end; margin-top: -32px; align-content: center;">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </span>
                </div>

            </form>

            <div style="place-content: center; display: flex; color: black; font-weight: bold;">
                TOTAL ACTIVIDAD:&nbsp;
                <div id="totalGeneralActividad">0,00</div>
            </div>

        </div>
    </div>

    <div class="card mb-4">
        <div class="card-body">

            <div style="border-bottom: solid 1px;">
                <p id="text-presupuesto-general" style="margin-bottom: 0px; text-align: center; background-color: #2d67ce; color: white; font-weight: bold; font-size: 18px; border-top-right-radius: 5px; border-top-left-radius: 5px;">
                    PRESUPUESTO GENERAL: 0,00
                </p>
                <div class="row">
                    <div class="col-1" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        Item
                    </div>
                    <div class="col-4" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        Apu
                    </div>
                    <div class="col-1" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        Ud
                    </div>
                    <div class="col-2" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        Cantidad
                    </div>
                    <div class="col-2" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        Valor Unitario
                    </div>
                    <div class="col-2" style="font-size: 13px; font-weight: 500;color: black;">
                        Valor Total
                    </div>
                </div>
            </div>

            <div id="example5" class="list-group " draggable="false" style="margin-top: 10px;">
                
            </div>

            <div class="row" style="height: 30px; background-color: #b4bede; width: 100%; margin-left: 0px; border-radius: 5px; margin-bottom: 10px; border: solid 1px black;">
                <div class="col-10" style="font-size: 13px; font-weight: 500;color: black; text-align: end; font-weight: 600; align-content: center; font-weight: 700;">
                    COSTOS DIRECTOS
                </div>
                <div class="col-2" id="directo-costo" style="font-size: 16px; font-weight: 500;color: black; font-weight: 600; text-align: end; align-content: center; font-weight: 700;">
                    0.00
                </div>
            </div>

            <div >
                <p style="text-align: center; background-color: #059d7f; color: #ffffff; font-weight: bold; font-size: 15px; margin-bottom: 1px; border-top-right-radius: 5px; border-top-left-radius: 5px;">
                    COSTOS INDIRECTOS
                </p>

                <div class="row">
                    <div class="col-8" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black; text-align: end; font-weight: 600;">
                        % ADMINISTRACIÓN
                    </div>
                    <div class="col-2" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        <input type="number" class="input-cantidad" id="administracion-porcentaje" value="0" onchange="changePorcentajeIndirecto()" onfocus="this.select();" />
                    </div>
                    <div class="col-2" id="administracion-total" style="font-size: 13px; font-weight: 500;color: black; font-weight: 600; text-align: end; margin-left: -5px;">
                        0.00
                    </div>
                </div>
                <p  class="line-item"></p>
                <div class="row">
                    <div class="col-8" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black; text-align: end; font-weight: 600;">
                        % IMPREVISTOS
                    </div>
                    <div class="col-2" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        <input type="number" class="input-cantidad" id="imprevistos-porcentaje" value="0" onchange="changePorcentajeIndirecto()" onfocus="this.select();"/>
                    </div>
                    <div class="col-2" id="imprevistos-total" style="font-size: 13px; font-weight: 500;color: black; font-weight: 600; text-align: end; margin-left: -5px;">
                        0.00
                    </div>
                </div>
                <p  class="line-item"></p>
                <div class="row">
                    <div class="col-8" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black; text-align: end; font-weight: 600;">
                        % UTILIDAD
                    </div>
                    <div class="col-2" style="font-size: 13px;border-right: solid 1px;font-weight: 500;color: black;">
                        <input type="number" class="input-cantidad" id="utilidad-porcentaje" value="0" onchange="changePorcentajeIndirecto()" onfocus="this.select();"/>
                    </div>
                    <div class="col-2" id="utilidad-total" style="font-size: 13px; font-weight: 500;color: black; font-weight: 600; text-align: end; margin-left: -5px;">
                        0.00
                    </div>
                </div>
                <div class="row" style="height: 30px; background-color: #b4bede; width: 100%; margin-left: 0px; border-radius: 5px; margin-bottom: 10px; border: solid 1px black;">
                    <div class="col-10" style="font-size: 13px; font-weight: 500;color: black; text-align: end; font-weight: 600; align-content: center; font-weight: 700;">
                        COSTOS INDIRECTOS
                    </div>
                    <div class="col-2" id="indirecto-total" style="font-size: 16px; font-weight: 500;color: black; font-weight: 600; text-align: end; align-content: center; font-weight: 700;">
                        0.00
                    </div>
                </div>
                
            </div>

        </div>
    </div>

</div>
