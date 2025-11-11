  const datos = require("./cad.js");

  function Sistema() {
    this.cad = new datos.CAD();
    this.cad.conectar(function (db) {
      console.log("Conectado a Mongo Atlas");
    });

    this.usuarios = {};
    this.agregarUsuario = function (nick) {
      let res = { nick: -1 };
      if (!this.usuarios[nick]) {
        this.usuarios[nick] = new Usuario(nick);
        res.nick = nick;
      } else {
        console.log("el nick " + nick + " está en uso");
      }
      return res;
    };
    this.usuarioGoogle = function (usr, callback) {
      this.cad.buscarOCrearUsuario(usr, function (obj) {
        callback(obj);
      });
    };
    this.obtenerUsuarios = function () {
      return this.usuarios;
    };

    this.usuarioActivo = function (nick) {
      return { nick: this.usuarios.hasOwnProperty(nick) };
    };

    this.eliminarUsuario = function (nick) {
      if (this.usuarios.hasOwnProperty(nick)) {
        delete this.usuarios[nick];
        return { deleted: true, nick: nick };
      }
      return { deleted: false, nick: nick };
    };

    this.numeroUsuarios = function () {
      return JSON.stringify({ num: Object.keys(this.usuarios).length });
    };

    this.registrarUsuario = function (obj, callback) {
      console.log(obj);
      let modelo = this;
      if (!obj.nick) {
        obj.nick = obj.email;
      }
      this.cad.buscarUsuario(obj, function (usr) {
        if (!usr) {
          modelo.cad.insertarUsuario(obj, function (res) {
            callback(res);
          });
        } else {
          callback({ email: -1 });
        }
      });
    };
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

  module.exports.Sistema = Sistema;
