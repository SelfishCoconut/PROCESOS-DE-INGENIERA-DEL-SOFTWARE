

function ControlWeb() {
  this.mostrarAgregarUsuario = function () {
    $("#bnv").remove();
    $("#mAU").remove();
    let cadena = '<div id="mAU">';
    cadena = cadena + '<div class="card"><div class="card-body">';
    cadena = cadena + '<div class="form-group">';
    cadena = cadena + '<label for="nick">Nick:</label>';
    cadena =
      cadena +
      '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
    cadena =
      cadena +
      '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
    cadena =
      cadena +
      '<div><a href="/auth/google"><img src="./cliente/img/google-signin.png" style="height:40px;"></a></div>';
    cadena = cadena + "</div>";
    cadena = cadena + "</div></div></div>";
    cadena = cadena + '<label for="nick">Name:</label>';
    cadena = cadena + '<input type="text" class="form-control" id="nick">';
    cadena =
      cadena +
      '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
    cadena = cadena + "</div>";
    $("#au").empty();
    $("#au").append(cadena);
    $("#btnAU").on("click", function () {
      let nick = $("#nick").val();
      rest.agregarUsuario(nick);
      $("#mAU").remove();
    });
  };
  this.mostrarLogin = function () {
    if ($.cookie("nick")) {
      return true;
    }
    $("#fmLogin").remove();
    $("#registro").load("./cliente/login.html", function () {
      $("#btnLogin").on("click", function (e) {
        e.preventDefault();
        let email = $("#email").val();
        let pwd = $("#pwd").val();

        if (email && pwd) {
          rest.loginUsuario(email, pwd);
          console.log(email + " " + pwd);
        }
      });
    });
  };

  this.mostrarRegistro = function () {
    $("#fmRegistro").remove();
    $("#registro").load("./cliente/registro.html", function () {
      $("#btnRegistro").on("click", function (e) {
        e.preventDefault();
        let nick = $("#nombre").val();
        let email = $("#email").val();
        let pwd = $("#pwd").val();
        if (email && pwd) {
          rest.registrarUsuario(email, pwd);
          console.log(email + " " + pwd);
        }
      });
    });
  };

  this.limpiar = function () {
    $("#au").empty();
    $("#registro").empty();
    $("#msg").empty();
  };


  this.mostrarObtenerUsuarios = function () {
    let cadena = '<div id="mOEU" class="form-group">';
    cadena =
      cadena +
      '<button id="btnOEU" type="submit" class="btn btn-primary">Get Users</button>';
    cadena = cadena + "</div>";
    $("#au").empty();
    $("#au").append(cadena);
    $("#btnOEU").on("click", function () {
      $.getJSON("/obtenerUsuarios", function (data) {
        let ul = $("<ul></ul>");
        Object.keys(data).forEach(function (key) {
          let li = $("<li></li>").text(key);
          ul.append(li);
        });
        $("#au").append(ul);
        $("#mOEU").remove();
      });
    });
  };

  this.mostrarNumeroUsuarios = function () {
    let cadena = '<div id="mNU" class="form-group">';
    cadena =
      cadena +
      '<button id="btnNU" type="submit" class="btn btn-primary">Get Users Number</button>';
    cadena = cadena + "</div>";
    $("#au").empty();
    $("#au").append(cadena);
    $("#btnNU").on("click", function () {
      rest.numeroUsuarios();
      $("#mNU").remove();
    });
  };

  this.mostrarUsuarioActivo = function (nick) {
    let cadena = '<div id="mUA" class="form-group">';
    cadena = cadena + '<label for="nick">Name:</label>';
    cadena =
      cadena +
      '<input type="text" class="form-control" id="nick" value="' +
      nick +
      '">';
    cadena =
      cadena +
      '<button id="btnUA" type="submit" class="btn btn-primary">Get Active User</button>';
    cadena = cadena + "</div>";
    $("#au").empty();
    $("#au").append(cadena);
    $("#btnUA").on("click", function () {
      let nick = $("#nick").val();
      rest.usuarioActivo(nick);
      $("#mUA").remove();
    });
  };

  this.mostrarEliminarUsuario = function (nick) {
    let cadena = '<div id="mEU" class="form-group">';
    cadena = cadena + '<label for="nick">Name:</label>';
    cadena =
      cadena +
      '<input type="text" class="form-control" id="nick" value="' +
      nick +
      '">';
    cadena =
      cadena +
      '<button id="btnEU" type="submit" class="btn btn-primary">Delete User</button>';
    cadena = cadena + "</div>";
    $("#au").empty();
    $("#au").append(cadena);
    $("#btnEU").on("click", function () {
      let nick = $("#nick").val();
      rest.eliminarUsuario(nick);
      $("#mEU").remove();
    });
  };

  this.comprobarSesion = function () {
    let nick = $.cookie("nick");
    if (nick) {
      this.mostrarMensaje("Bienvenido al sistema, " + nick);
    } else {
      this.mostrarMensaje("No has iniciado sesión");
      //this.mostrarRegistro();
      this.mostrarLogin();
    }
  };

  this.mostrarMensaje = function (msg) {
    console.log(msg);
  };

  this.salir = function () {
    $.removeCookie("nick");
    location.reload();
  };
}
