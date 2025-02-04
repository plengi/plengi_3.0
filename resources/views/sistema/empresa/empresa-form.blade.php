<div class="modal fade" id="empresaFormModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="textEmpresaCreate" style="display: block;">Agregar Empresa</h5>
                <h5 class="modal-title" id="textEmpresaUpdate" style="display: none;">Editar Empresa</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            
            <div class="modal-body">
                <form id="empresaForm" style="margin-top: 10px;">
                    <div class="row">
                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Razon social</label>
                            <input type="text" class="form-control form-control-sm" name="razon_social_empresa" id="razon_social_empresa" onfocus="this.select();" required>
                        </div>

                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Nit</label>
                            <input type="text" class="form-control form-control-sm" name="nit_empresa" id="nit_empresa" onfocus="this.select();" required>
                        </div>

                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">DV</label>
                            <input type="text" class="form-control form-control-sm" name="dv_empresa" id="dv_empresa" onfocus="this.select();" required>
                        </div>
        
                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Email</label>
                            <input type="text" class="form-control form-control-sm" name="email_empresa" id="email_empresa" onfocus="this.select();" required>
                        </div>
        
                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Telefono</label>
                            <input type="text" class="form-control form-control-sm" name="telefono_empresa" id="telefono_empresa" onfocus="this.select();">
                        </div>
        
                        <div class="form-group col-12 col-sm-6 col-md-6">
                            <label for="example-text-input" class="form-control-label">Dirección</label>
                            <input type="text" class="form-control form-control-sm" name="direccion_empresa" id="direccion_empresa" onfocus="this.select();">
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <span href="javascript:void(0)" class="btn bg-gradient-danger btn-sm" data-bs-dismiss="modal">
                    Cancelar
                </span>
                <button id="saveEmpresa" href="javascript:void(0)" class="btn bg-gradient-success btn-sm">Guardar</button>
                <button id="updateEmpresa" href="javascript:void(0)" class="btn bg-gradient-success btn-sm" style="display: none;">Actualizar</button>
                <button id="saveEmpresaLoading" class="btn btn-success btn-sm ms-auto" style="display:none; float: left;" disabled>
                    Cargando
                    <i class="fas fa-spinner fa-spin"></i>
                </button>
            </div>
        </div>
    </div>
</div>