<div id="create-apu-component" style="content-visibility: auto; overflow: auto; display: none;">

    <div class="card mb-4">
        <div class="card-body">
    
            <form class="row" id="apuForm">

                <input type="text" class="form-control" name="id_apu_up" id="id_apu_up" style="display: none;">
    
                <div class="form-group col-12 col-sm-6 col-md-6">
                    <label for="example-text-input" class="form-control-label">Nombre APU</label>
                    <input type="text" class="form-control form-control-sm" name="nombre_apu" id="nombre_apu" onfocus="this.select();" required>

                    <div class="invalid-feedback">
                        El nombre es requerido
                    </div>
                </div>
    
                <div class="form-group form-group col-12 col-sm-6 col-md-6">
                        <label for="exampleFormControlSelect1">Unidad de medida<span style="color: red">*</span></label>
                        <select class="form-control form-control-sm" id="unidad_medida">
                            <option value="ml">Ml</option>
                            <option value="cm">Cm</option>
                            <option value="m">M</option>
                            <option value="pulgada">Pulgada</option>
                            <option value="pie">Pie</option>
                        </select>
    
                        <div class="invalid-feedback">
                            La unidad de medidad es requerida
                        </div>
                    </div>
    
                <div class="form-group col-12 col-sm-6 col-md-6">
                    <label for="exampleFormControlSelect1">Seleccione tipo de recurso<span style="color: red">*</span></label>
                    <select class="form-control form-control-sm" id="tipo_recurso" name="tipo_recurso">
                            <option value="">Todos</option>
                            <option value="0">Materiales</option>
                            <option value="1">Equipo</option>
                            <option value="2">Mano de obra</option>
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
    
        </div>
    </div>

    <div class="card mb-4">
        <div class="card-body" style="overflow: auto;">

            <table class="table table-responsive table-hover table-bordered">
                <!-- HEADER PRINCIPAL -->
                <thead>
                    <tr>
                        <th class="table-dark" scope="col" style="border-radius: 10px 0px 0px 0px; border: white;">#</th>
                        <th class="table-dark" scope="col">Nombre</th>
                        <th class="table-dark" scope="col">Cantidad</th>
                        <th class="table-dark" scope="col">Unidad</th>
                        <th class="table-dark" scope="col">Tipo</th>
                        <th class="table-dark" scope="col">Costo item</th>
                        <th class="table-dark" scope="col" style="border-radius: 0px 10px 0px 0px; border: white;">Costo total</th>
                    </tr>
                </thead>
                <!-- MATERIALES -->

                <tbody id="items-materiales" style="font-size: 13px;" class="table-group-divider">
                    <!-- <tr>
                        <td style="text-align: -webkit-center;">
                            <span class="btn badge bg-gradient-danger drop-row-grid" onclick="deleteProductoVenta()" id="delete-material_" style="margin-bottom: 0;">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </td>
                        <td>Nombre</td>
                        <td style="padding: 3px 0px;">
                            <input type="number" class="form-control form-control-sm" id="cantidad_material_" onfocus="this.select();">
                        </td>
                        <td>Unidad</td>
                        <td style="padding: 3px 0px;">
                            <input type="number" class="form-control form-control-sm" id="cantidad_material_" onfocus="this.select();">
                        </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr>
                    <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr>
                    <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr> -->
                </tbody>
                <thead id="footer-materiales" style="border: hidden;">
                    <tr style="font-size: 12px; overflow: auto;">
                        <th style="padding: 0.5rem 1.5rem;" class="table-success" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem;" class="table-success" scope="col">TOTAL MATERIALES</th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-success" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-success" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-success" scope="col">% DESPERDICIO</th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-success" scope="col" id="costo_total_materiales"></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-success" scope="col" id="valor_total_materiales">0</th>
                    </tr>
                </thead>
                <!-- EQUIPO -->

                <tbody id="items-equipos" style="font-size: 13px;" class="table-group-divider">
                    <!-- <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr>
                    <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr>
                    <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr> -->
                </tbody>
                <thead id="footer-equipos" style="border: hidden;">
                    <tr style="font-size: 12px; overflow: auto;">
                        <th style="padding: 0.5rem 1.5rem;" class="table-warning" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem;" class="table-warning" scope="col">TOTAL EQUIPOS</th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-warning" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-warning" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-warning" scope="col">% RENDIMIENTO</th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-warning" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end;" class="table-warning" scope="col" id="valor_total_equipos">0</th>
                    </tr>
                </thead>
                <!-- MANO DE OBRA -->

                <tbody id="items-mano_obra" style="font-size: 13px;" class="table-group-divider">
                    <!-- <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr>
                    <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr>
                    <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                        <td>Unidad</td>
                        <td>Desperdicio </td>
                        <td>Costo item</td>
                        <td>Costo total</td>
                    </tr> -->
                </tbody>
                <thead id="footer-mano_obra" style="border: hidden;">
                    <tr style="font-size: 12px; overflow: auto;">
                        <th style="padding: 0.5rem 1.5rem; background-color: #d5d5f5;" class="table-primary" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem; background-color: #d5d5f5;" class="table-primary" scope="col">TOTAL MANOS DE OBRA</th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end; background-color: #d5d5f5;" class="table-primary" scope="col"></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end; background-color: #d5d5f5;" class="table-primary" scope="col" ></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end; background-color: #d5d5f5;" class="table-primary" scope="col" >% RENDIMIENTO</th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end; background-color: #d5d5f5;" class="table-primary" scope="col" ></th>
                        <th style="padding: 0.5rem 1.5rem; text-align: end; background-color: #d5d5f5;" class="table-primary" scope="col" id="valor_total_manoobra">0</th>
                    </tr>
                </thead>
                <!-- FOOTERS PRINCIPAL -->
                <tfoot style="font-size: 14px; font-weight: bold;">
                    <tr>
                        <td class="table-dark" scope="col">TOTALES</td>
                        <td class="table-dark" scope="col"></td>
                        <td class="table-dark" scope="col" style="text-align: end;" id="cantidad_total_apu">0</td>
                        <td class="table-dark" scope="col" style="text-align: end;" ></td>
                        <td class="table-dark" scope="col" style="text-align: end;" ></td>
                        <td class="table-dark" scope="col" style="text-align: end;" id="costo_total_apu">0</td>
                        <td class="table-dark" scope="col" style="text-align: end;" id="valor_total_apu">0</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    </div>

</div>
