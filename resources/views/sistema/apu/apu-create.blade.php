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

            <div style="place-content: center; display: flex; color: black; font-weight: bold;">
                TOTAL APU:&nbsp;
                <div id="totalGeneralApu">0</div>
            </div>
    
        </div>
    </div>

    <div class="card mb-4">
        <div class="card-body" style="overflow: auto; padding: 0.5rem;">
            <!-- TABLA DE EQUIPOS -->
            <table id="apuEquipos" class="table table-bordered display responsive" width="100%">
                <thead>
                    <tr style="background-color: #2dce89; color: white;">
                        <th style="border-radius: 15px 0px 0px 0px !important;">EQUIPO</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Tarifa</th>
                        <th>Rendimiento</th>
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
                        <td id="apuEquiposTotal" style="text-align: end;">0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="card-body" style="overflow: auto; padding: 0.5rem;">
            <!-- TABLA DE MATERIALES -->
            <table id="apuMateriales" class="table table-bordered display responsive" width="100%">
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
                        <td id="apuMaterialesTotal" style="text-align: end;">0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="card-body" style="overflow: auto; padding: 0.5rem;">
            <!-- TABLA DE MANO OBRA -->
            <table id="apuManoObra" class="table table-bordered display responsive" width="100%">
                <thead>
                    <tr style="background-color: #4d2dce; color: white;">
                        <th style="border-radius: 15px 0px 0px 0px !important;">MANO OBRA</th>
                        <th>Cantidad</th>
                        <th>Salario</th>
                        <th>Prestaciones</th>
                        <th>Salario total</th>
                        <th>Rendimiento</th>
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
                        <td id="apuManoObraTotal" style="text-align: end;">0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>

    </div>

</div>
