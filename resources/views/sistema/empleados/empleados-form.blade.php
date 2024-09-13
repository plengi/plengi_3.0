<div class="modal fade" id="empleadosFormModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="textEmpleadosCreate" style="display: none;">Agregar empleado</h5>
                <h5 class="modal-title" id="textEmpleadosUpdate" style="display: none;">Editar empleado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <form id="empleadosForm" style="margin-top: 10px;">
                    <div class="row">

                        <input type="text" class="form-control" name="id_empleado_up" id="id_empleado_up" style="display: none;">

                        <div class="form-group col-12">
                            <label for="example-text-input" class="form-control-label">Nombre <span style="color: red">*</span></label>
                            <input type="text" class="form-control form-control-sm" name="nombre" id="nombre" required>

                            <div class="invalid-feedback">
                                El nombre es requerido
                            </div>
                        </div>

                        <div class="form-group form-group col-12">
                            <label for="exampleFormControlSelect1">Tipo <span style="color: red">*</span></label>
                            <select class="form-control form-control-sm" id="tipo" name="tipo">
                                <option value="ml">MIN</option>
                                <option value="cm">HORA</option>
                                <option value="cm">DIA</option>
                            </select>

                            <div class="invalid-feedback">
                                El tipo es requerido
                            </div>
                        </div>

                        <div class="form-group col-12">
                            <label for="example-text-input" class="form-control-label">Salario <span style="color: red">*</span></label>
                            <input type="number" class="form-control form-control-sm" name="salario" id="salario" min="0" required>

                            <div class="invalid-feedback">
                                El valor unitario es requerido
                            </div>
                        </div>


                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn bg-gradient-danger btn-sm" data-bs-dismiss="modal">Cancelar</button>
                <button id="saveEmpleado"type="button" class="btn bg-gradient-success btn-sm">Guardar</button>
                <button id="updateEmpleado"type="button" class="btn bg-gradient-success btn-sm">Guardar</button>
                <button id="saveEmpleadoLoading" class="btn btn-success btn-sm ms-auto" style="display:none; float: left;" disabled>
                    Cargando
                    <i class="fas fa-spinner fa-spin"></i>
                </button>
            </div>
        </div>
    </div>
</div>
