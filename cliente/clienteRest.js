function ClienteRest() {
  this.agregarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/agregarUsuario/" + nick, function (data) {
      console.log("Respuesta del servidor: " + JSON.stringify(data));
      if (data.nick != -1) {
        console.log("Usuario " + nick + " ha sido registrado");
      } else {
        console.log("El nick ya está en uso");
      }
    });
  };
  this.agregarUsuario2 = function (nick) {
    $.ajax({
      type: "GET",
      url: "/agregarUsuario/" + nick,
      success: function (data) {
        console.log("Respuesta del servidor: " + JSON.stringify(data));
        if (data.nick != -1) {
          console.log("Usuario " + nick + " ha sido registrado");
        } else {
          console.log("El nick ya está en uso");
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      },
      contentType: "application/json",
    });
  };
  this.obtenerUsuarios = function () {
    $.getJSON("/obtenerUsuarios", function (data) {
      console.log("Respuesta del servidor: " + JSON.stringify(data));
    });
  };
  this.numeroUsuarios = function () {
    $.getJSON("/numeroUsuarios", function (data) {
      console.log("Respuesta del servidor: " + JSON.stringify(data));
    });
  };
  this.usuarioActivo = function (nick) {
    $.getJSON("/usuarioActivo/" + nick, function (data) {
      console.log("Respuesta del servidor: " + JSON.stringify(data));
    });
  };
  this.eliminarUsuario = function (nick) {
    $.getJSON("/eliminarUsuario/" + nick, function (data) {
      console.log("Respuesta del servidor: " + JSON.stringify(data));
    });
  };
}

