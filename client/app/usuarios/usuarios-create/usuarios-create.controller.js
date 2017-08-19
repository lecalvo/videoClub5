'use strict';
(function(){

class UsuariosCreateComponent {
  constructor(usuariosService, $state) {
    this.usuariosService = usuariosService;
    this.tiposDocumentosService = tiposDocumentosService;
    this.$state = $state;
    this.showValidaDocumento = false;
    this.usuario = {
      activo:true
    };
  }

  createUser(){
    console.log(this.usuario);
    console.log("{numDocumento:"+this.usuario.numDocumento+"}");
  	this.usuariosService.save(this.usuario).$promise
  	.then(response => {
  		console.log("Usuario registrado correctamente ",response);
        this.$state.go('usuarios-list');
  	})
  	.catch(err=>{
  		console.log("Error al crear el usuario ",err);
  	})
  }
}

validarNumDocumento(){
  console.log("numDocumento:  "this.usuario.numDocumento+"}");
  this.usuariosService.query({numDocumento:this.usuario.numDocumento}).$promise
  .then(response =>{
    console.log("valida",response);
    this.validarNumDocumento = true;
    console.log(response.length);
    if(this.usuario.numDocumento ==undefined || response.length <=0){
      this.validarEmail = false;
    }
  })
  .catch(err=>{
    console.log("No existe",err);
  })
}
}
angular.module('videoclubApp')
  .component('usuariosCreate', {
    templateUrl: 'app/usuarios/usuarios-create/usuarios-create.html',
    controller: UsuariosCreateComponent,
    controllerAs:'vm'
  });

})();
