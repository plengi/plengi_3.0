<div class="modal fade" id="manoObrasFormModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="textManoObrasCreate" style="display: none;">Agregar mano de obra</h5>
                <h5 class="modal-title" id="textManoObrasUpdate" style="display: none;">Editar mano de obra</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <form id="manoObrasForm" style="margin-top: 10px;">
                    <div class="row">

                        <input type="text" class="form-control" name="id_manoObra_up" id="id_manoObra_up" style="display: none;">

                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Nombre <span style="color: red">*</span></label>
                            <input type="text" class="form-control form-control-sm" name="nombre" id="nombre" required>

                            <div class="invalid-feedback">
                                El nombre es requerido
                            </div>
                        </div>

                        <div class="form-group form-group col-12 col-sm-6 col-md-6">
                            <label for="exampleFormControlSelect1">Unidad de medida<span style="color: red">*</span></label>
                            <select class="form-control form-control-sm" id="unidad_medida">
                                <option value="ml">MIN</option>
                                <option value="cm">HORA</option>
                                <option value="cm">DIA</option>
                            </select>

                            <div class="invalid-feedback">
                                La unidad de medidad es requerida
                            </div>
                        </div>

                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Valor unitario <span style="color: red">*</span></label>
                            <input type="number" class="form-control form-control-sm" name="valor_unitario" id="valor_unitario" min="1" required>

                            <div class="invalid-feedback">
                                El valor unitario es requerido
                            </div>
                        </div>

                        <div class="form-group form-group col-12 col-sm-6 col-md-6">
                            <label for="exampleFormControlSelect1">Tipo proveedor<span style="color: red">*</span></label>
                            <select class="form-control form-control-sm" id="tipo_proveedor">
                                <option value="1">Proveedor 1</option>
                                <option value="2">Proveedor 2</option>
                                <option value="3">Proveedor 3</option>
                                <option value="4">Proveedor 4</option>
                                <option value="5">Proveedor 5</option>
                            </select>

                        </div>



                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn bg-gradient-danger btn-sm" data-bs-dismiss="modal">Cancelar</button>
                <button id="saveManoObra"type="button" class="btn bg-gradient-success btn-sm">Guardar</button>
                <button id="updateManoObra"type="button" class="btn bg-gradient-success btn-sm">Guardar</button>
                <button id="saveManoObraLoading" class="btn btn-success btn-sm ms-auto" style="display:none; float: left;" disabled>
                    Cargando
                    <i class="fas fa-spinner fa-spin"></i>
                </button>
            </div>
        </div>
    </div>
</div>
