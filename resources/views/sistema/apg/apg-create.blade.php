<div id="create-apg-component" style="content-visibility: auto; overflow: auto">

    <div class="card mb-4">
        <div class="card-body">

            <h3 style="text-align: center; font-size: 18px;">{{ $tarjeta }}</h3>

            <form class="row" id="apgForm">

                <input type="text" class="form-control" name="id_apg_up" id="id_apg_up" style="display: none;">

                <div class="form-group col-12 col-sm-6 col-md-6">
                    <label for="example-text-input" class="form-control-label">Nombre APG</label>
                    <input type="text" class="form-control form-control-sm" name="nombre_apg" id="nombre_apg" onfocus="this.select();" required>

                    <div class="invalid-feedback">
                        El nombre es requerido
                    </div>
                </div>

                <div class="form-group col-6 col-sm-2 col-md-2">
                    <label for="example-text-input" class="form-control-label">Item</label>
                    <input type="text" class="form-control form-control-sm" name="capitulo_apg_general" id="capitulo_apg_general" value="" disabled>
                </div>

                <div class="form-group col-6 col-sm-2 col-md-2">
                    <label for="example-text-input" class="form-control-label">Unidad</label>
                    <input type="text" class="form-control form-control-sm" name="unidad_apg_general" id="unidad_apg_general" onfocus="this.select();" value="{{ $apu->unidad_medida }}" disabled>
                </div>

                <div class="form-group col-6 col-sm-2 col-md-2">
                    <label for="example-text-input" class="form-control-label">Cantidad</label>
                    <input type="text" class="form-control form-control-sm" name="cantidad_apg_general" id="cantidad_apg_general" onfocus="this.select();" onchange="calcularApg()" required disabled>
                </div>

                <div class="form-group col-12 col-sm-6 col-md-6">
                    <label for="exampleFormControlSelect1">Seleccione tipo de recurso<span style="color: red">*</span></label>
                    <select class="form-control form-control-sm" id="tipo_recurso" name="tipo_recurso">
                            <option value="">Todos</option>
                            <option value="0">Materiales</option>
                            <option value="1">Equipo</option>
                            <option value="2">Mano de obra</option>
                            <option value="3">Transporte</option>
                    </select>
                </div>

                <div class="form-group col-12 col-sm-6 col-md-6" >
                    <label for="exampleFormControlSelect1" style=" width: 100%;">Seleccione un recurso</label>
                    <select class="form-control form-control-sm" name="id_producto" id="id_producto">
                    </select>
                    <div class="invalid-feedback">
                        El campo es requerido
                    </div>
                </div>
                
            </form>

            <div style="place-content: end; display: flex; color: black; font-weight: bold;">
                TOTAL APG:&nbsp;
                <div id="totalGeneralApg">0</div>
            </div>

        </div>
    </div>

    <div class="card mb-4">
        <div class="card-body" style="overflow: auto; padding: 0.5rem;">
            <!-- TABLA DE EQUIPOS -->
            <table id="apgEquipos" class="table table-bordered display responsive" width="100%">
                <thead>
                    <tr style="background-color: #2dce89; color: white;">
                        <th style="border-radius: 15px 0px 0px 0px !important;">EQUIPO</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Tarifa</th>
                        <th>Cantidad</th>
                        <th>Valor total</th>
                        <th style="border-radius: 0px 15px 0px 0px !important;">Acciones</th>
                    </tr>
                </thead>

                <tbody id="items-equipos" style="font-size: 13px;" class="table-group-divider">
                </tbody>

                <tfoot style="font-size: 14px; font-weight: bold;">
                    <tr style="background-color: #c7e4c3;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Subtotal</td>
                        <td id="apgEquiposTotal" style="text-align: end;">0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="card-body" style="overflow: auto; padding: 0.5rem;">
            <!-- TABLA DE MATERIALES -->
            <table id="apgMateriales" class="table table-bordered display responsive" width="100%">
                <thead>
                    <tr style="background-color: #2d9bce; color: white;">
                        <th style="border-radius: 15px 0px 0px 0px !important;">MATERIALES</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Desperdicio</th>
                        <th>Cantidad Total</th>
                        <th>Valor unitario</th>
                        <th>Valor total</th>
                        <th style="border-radius: 0px 15px 0px 0px !important;">Acciones</th>
                    </tr>
                </thead>

                <tbody id="items-materiales" style="font-size: 13px;" class="table-group-divider">
                </tbody>

                <tfoot style="font-size: 14px; font-weight: bold;">
                    <tr style="background-color: #c3d8e4;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Subtotal</td>
                        <td id="apgMaterialesTotal" style="text-align: end;">0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="card-body" style="overflow: auto; padding: 0.5rem;">
            <!-- TABLA DE TRANSPORTE -->
            <table id="apgTransportes" class="table table-bordered display responsive" width="100%">
                <thead>
                    <tr style="background-color: #ce2d2d; color: white;">
                        <th style="border-radius: 15px 0px 0px 0px !important;">TRANSPORTE</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Tarifa</th>
                        <th>Distancia</th>
                        <th>Valor total</th>
                        <th style="border-radius: 0px 15px 0px 0px !important;">Acciones</th>
                    </tr>
                </thead>

                <tbody id="items-transportes" style="font-size: 13px;" class="table-group-divider">
                </tbody>

                <tfoot style="font-size: 14px; font-weight: bold;">
                    <tr style="background-color: #e4c3c3;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Subtotal</td>
                        <td id="apgTransportesTotal" style="text-align: end;">0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="card-body" style="overflow: auto; padding: 0.5rem;">
            <!-- TABLA DE MANO OBRA -->
            <table id="apgManoObra" class="table table-bordered display responsive" width="100%">
                <thead>
                    <tr style="background-color: #4d2dce; color: white;">
                        <th style="border-radius: 15px 0px 0px 0px !important;">MANO OBRA</th>
                        <th>Cantidad</th>
                        <th>Salario</th>
                        <th>Prestaciones</th>
                        <th>Salario total</th>
                        <th>Cantidad</th>
                        <th>Valor total</th>
                        <th style="border-radius: 0px 15px 0px 0px !important;">Acciones</th>
                    </tr>
                </thead>

                <tbody id="items-mano_obra" style="font-size: 13px;" class="table-group-divider">
                </tbody>

                <tfoot style="font-size: 14px; font-weight: bold;">
                    <tr style="background-color: #d5c3e4;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Subtotal</td>
                        <td id="apgManoObraTotal" style="text-align: end;">0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

    </div>

</div>
