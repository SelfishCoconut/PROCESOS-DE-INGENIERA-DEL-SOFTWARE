function Sistema() {
  this.usuarios = {};
  this.agregarUsuario = function (nick) {
    let res = {"nick": -1};
    if (!this.usuarios[nick]) {
      this.usuarios[nick] = new Usuario(nick);
      res.nick = nick;
    } else {
      console.log("el nick " + nick + " está en uso");
    }
    return res;
  };

  this.obtenerUsuarios=function(){
    return this.usuarios;
  }

  this.usuarioActivo = function (nick) {
      return { nick: this.usuarios.hasOwnProperty(nick) };
  }

  this.eliminarUsuario=function(nick){
    if(this.usuarios.hasOwnProperty(nick)){
        delete this.usuarios[nick];
        return {deleted: true, nick: nick};
    }
    return {deleted: false, nick: nick};
  }

  this.numeroUsuarios = function () {
    return JSON.stringify({num: Object.keys(this.usuarios).length});
  }

}
function Usuario(nick) {
  this.nick = nick;
}

module.exports.Sistema=Sistema;
