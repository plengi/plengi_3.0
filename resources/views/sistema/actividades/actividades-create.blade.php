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

        </div>
    </div>

    <div class="card mb-4">
        <div class="card-body">
            <div style="border-bottom: solid 1px;">
                <p style="margin-bottom: 0px; text-align: center; background-color: #2d67ce; color: white; font-weight: bold; font-size: 18px;">
                    PRESUPUESTO GENERAL
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

            <!-- <div id="tarjeta1" class="list-group-item tarjeta-desing" style="padding: 0px; border-radius: 5px; border-color: black; margin-bottom: 10px;">
                    <p class="text-nombre">
                        ACTIVIDADES PRELIMINARES
                    </p>
                    <p class="text-numero">
                        1.
                    </p>

                    <div class="list-group nested-sortable item-actividades">
                        <div class="list-group-item nested row" >
                            <div class="col-1 item-componente-1">
                                1.1
                            </div>
                            <div class="col-4 item-componente-1">
                                Nombre del apu
                            </div>
                            <div class="col-1 item-componente-1">
                                Ud
                            </div>
                            <div class="col-2 item-componente-1">
                                <input type="text" class="input-cantidad" />
                            </div>
                            <div class="col-2 item-componente-1">
                                Valor Unitario
                            </div>
                            <div class="col-2 item-componente-2">
                                Valor Total
                            </div>
                        </div>

                        <div class="list-group-item nested row" >
                            <div class="col-1 item-componente-1">
                                1.1
                            </div>
                            <div class="col-4 item-componente-1">
                                Nombre del apu
                            </div>
                            <div class="col-1 item-componente-1">
                                Ud
                            </div>
                            <div class="col-2 item-componente-1">
                                Cantidad
                            </div>
                            <div class="col-2 item-componente-1">
                                Valor Unitario
                            </div>
                            <div class="col-2 item-componente-2">
                                Valor Total
                            </div>
                        </div>
                    </div>

                    <div class="row foot-totals">
                        <div class="col-8 item-componente-2">
                            <p style="margin-bottom: 0px;"></p>
                        </div>
                        <div class="col-2 item-componente-2">
                            <p style="margin-bottom: 0px;">Subtotal</p>
                        </div>
                        <div class="col-2 item-componente-3">
                            <p style="margin-bottom: 0px; text-align: end;">212 &nbsp;</p>
                        </div>
                    </div>

                </div> -->

            <div id="example5" class="list-group " draggable="false" style="margin-top: 10px;">

                <!-- <div class="list-group-item nested row item-group">
                    <div class="col-1 item-componente-1">
                        1.1
                    </div>
                    <div class="col-4 item-componente-1">
                        Nombre del apu
                    </div>
                    <div class="col-1 item-componente-1">
                        Ud
                    </div>
                    <div class="col-2 item-componente-1">
                        Cantidad
                    </div>
                    <div class="col-2 item-componente-1">
                        Valor Unitario
                    </div>
                    <div class="col-2 item-componente-2">
                        Valor Total
                    </div>
                </div>

                <div id="tarjeta2" class="list-group-item tarjeta-desing">
                    <p class="text-nombre">
                        TARJETA NUEVA
                    </p>
                    <p class="text-numero">
                        2.
                    </p>

                    <div class="list-group nested-sortable item-actividades">

                        <div class="list-group-item row item-group">
                            <div class="col-1 item-componente-1">
                                1.1
                            </div>
                            <div class="col-4 item-componente-1">
                                Nombre del apu
                            </div>
                            <div class="col-1 item-componente-1">
                                Ud
                            </div>
                            <div class="col-2 item-componente-1">
                                Cantidad
                            </div>
                            <div class="col-2 item-componente-1">
                                Valor Unitario
                            </div>
                            <div class="col-2 item-componente-2">
                                Valor Total
                            </div>
                        </div>

                        <div class="list-group-item row item-group" >
                            <div class="col-1 item-componente-1">
                                1.1
                            </div>
                            <div class="col-4 item-componente-1">
                                Nombre del apu
                            </div>
                            <div class="col-1 item-componente-1">
                                Ud
                            </div>
                            <div class="col-2 item-componente-1">
                                Cantidad
                            </div>
                            <div class="col-2 item-componente-1">
                                Valor Unitario
                            </div>
                            <div class="col-2 item-componente-2">
                                Valor Total
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8 item-componente-2">
                            <p style="margin-bottom: 0px;"></p>
                        </div>
                        <div class="col-2 item-componente-2">
                            <p style="margin-bottom: 0px;">Subtotal</p>
                        </div>
                        <div class="col-2 item-componente-3">
                            <p style="margin-bottom: 0px; text-align: end;">0 &nbsp;</p>
                        </div>
                    </div>

                </div>  -->
                
            </div>

        </div>
    </div>

</div>
