<div class="modal fade" id="proyectosFormModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="textProyectosCreate" style="display: none;">Agregar proyecto</h5>
                <h5 class="modal-title" id="textProyectosUpdate" style="display: none;">Editar proyecto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <form id="proyectoForm" style="margin-top: 10px;">
                    <div class="row">

                        <input type="text" class="form-control" name="id_proyecto_up" id="id_proyecto_up" style="display: none;">

                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Nombre <span style="color: red">*</span></label>
                            <input type="text" class="form-control form-control-sm" name="nombre" id="nombre" required>

                            <div class="invalid-feedback">
                                El nombre es requerido
                            </div>
                        </div>

                        <div class="form-group form-group col-12 col-sm-6 col-md-6">
                            <label for="exampleFormControlSelect1">Tipo de obra<span style="color: red">*</span></label>
                            <select class="form-control form-control-sm" id="tipo_obra">
                                <option value="">Seleccione una opcion</option>
                                <option value="1">A</option>
                                <option value="2">B</option>
                                <option value="3">C</option>
                            </select>

                            <div class="invalid-feedback">
                                El tipo de obra es requerido
                            </div>
                        </div>

                        <div class="form-group col-12 col-sm-6 col-md-6" >
                            <label for="exampleFormControlSelect1" style=" width: 100%;">Ubicación</label>
                            <select class="form-control form-control-sm" name="id_ciudad" id="id_ciudad">
                            </select>
                            <div class="invalid-feedback">
                                El campo es requerido
                            </div>
                        </div>

                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Fecha</label>
                            <input name="fecha" id="fecha" class="form-control form-control-sm" type="date" require>
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn bg-gradient-danger btn-sm" data-bs-dismiss="modal">Cancelar</button>
                <button id="saveProyecto"type="button" class="btn bg-gradient-success btn-sm">Guardar</button>
                <button id="updateProyecto"type="button" class="btn bg-gradient-success btn-sm">Guardar</button>
                <button id="saveProyectoLoading" class="btn btn-success btn-sm ms-auto" style="display:none; float: left;" disabled>
                    Cargando
                    <i class="fas fa-spinner fa-spin"></i>
                </button>
            </div>
        </div>
    </div>
</div>
