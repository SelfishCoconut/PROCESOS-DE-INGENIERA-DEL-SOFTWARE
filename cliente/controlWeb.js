function ControlWeb(){
    this.mostrarAgregarUsuario = function(){
        let cadena='<div id="mAU" class="form-group">';
        cadena = cadena + '<label for="nick">Name:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';
        $("#au").empty();
        $("#au").append(cadena);
        $("#btnAU").on("click",function(){
            let nick=$("#nick").val();
            rest.agregarUsuario(nick);
            $("#mAU").remove();
        });
    }

    this.mostrarObtenerUsuarios = function(){
        let cadena='<div id="mOEU" class="form-group">';
        cadena = cadena + '<button id="btnOEU" type="submit" class="btn btn-primary">Get Users</button>';
        cadena = cadena + '</div>';
        $("#au").empty();
        $("#au").append(cadena);
        $("#btnOEU").on("click",function(){
            $.getJSON("/obtenerUsuarios", function(data) {
                let ul = $("<ul></ul>");
                Object.keys(data).forEach(function(key) {
                    let li = $("<li></li>").text(key);
                    ul.append(li);
                });
                $("#au").append(ul);
                $("#mOEU").remove();
            });
        });
    }

    this.mostrarNumeroUsuarios = function(){
        let cadena='<div id="mNU" class="form-group">';
        cadena = cadena + '<button id="btnNU" type="submit" class="btn btn-primary">Get Users Number</button>';
        cadena = cadena + '</div>';
        $("#au").empty();
        $("#au").append(cadena);
        $("#btnNU").on("click",function(){
            rest.numeroUsuarios();
            $("#mNU").remove();
        });
    }

    this.mostrarUsuarioActivo = function(nick){
        let cadena='<div id="mUA" class="form-group">';
        cadena = cadena + '<label for="nick">Name:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick" value="'+nick+'">';
        cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">Get Active User</button>';
        cadena = cadena + '</div>';
        $("#au").empty();
        $("#au").append(cadena);
        $("#btnUA").on("click",function(){
            let nick=$("#nick").val();
            rest.usuarioActivo(nick);
            $("#mUA").remove();
        });
    }

    this.mostrarEliminarUsuario = function(nick){
        let cadena='<div id="mEU" class="form-group">';
        cadena = cadena + '<label for="nick">Name:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick" value="'+nick+'">';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Delete User</button>';
        cadena = cadena + '</div>';
        $("#au").empty();
        $("#au").append(cadena);
        $("#btnEU").on("click",function(){
            let nick=$("#nick").val();
            rest.eliminarUsuario(nick);
            $("#mEU").remove();
        });
    }
}