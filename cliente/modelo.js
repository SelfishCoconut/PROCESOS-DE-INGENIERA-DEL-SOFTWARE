function Sistema() {
  this.usuarios = {};
  this.agregarUsuario = function (nick) {
    this.usuarios[nick] = new Usuario(nick);
  };

  this.obtenerUsuarios=function(){
    return this.usuarios;
  }

  this.usuarioActivo = function (nick) {
    return this.usuarios.hasOwnProperty(nick);
  }

  this.eliminarUsuario = function (nick) {
    if (this.usuarioActivo(nick)) {
      delete this.usuarios[nick];
    }
  }  

  this.numeroUsuarios = function () {
    return Object.keys(this.usuarios).length;
  }
  this.loginUsuario = function (obj, callback) {
    this.cad.buscarUsuario({ email: obj.email }, function (usr) {
      if (usr && usr.password === obj.password) {
        callback(usr);
      } else {
        callback({ email: -1 });
      }
    });
  };

}
function Usuario(nick) {
  this.nick = nick;
}
