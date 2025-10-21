const modelo = require("./modelo.js");

describe("El sistema", function () {
  let sistema;
  beforeEach(function () {
    sistema = new modelo.Sistema();
  });

  it("debe agregar un usuario", function () {
    let res = sistema.agregarUsuario("pepito");
    expect(res.nick).toEqual("pepito");
    expect(sistema.obtenerUsuarios().hasOwnProperty("pepito")).toBeTruthy();
  });

  it("no debe agregar un usuario si ya existe", function () {
    let res = sistema.agregarUsuario("pepito");
    expect(res.nick).toEqual("pepito");
    res = sistema.agregarUsuario("pepito");
    expect(res.nick).toEqual(-1);
  });

  it("debe obtener los usuarios", function () {
    sistema.agregarUsuario("pepito");
    sistema.agregarUsuario("juanito");
    let usuarios = sistema.obtenerUsuarios();
    expect(Object.keys(usuarios).length).toEqual(2);
    expect(usuarios.hasOwnProperty("pepito")).toBeTruthy();
    expect(usuarios.hasOwnProperty("juanito")).toBeTruthy();
  });

  it("debe obtener el usuario activo", function () {
    sistema.agregarUsuario("pepito");
    let res = sistema.usuarioActivo("pepito");
    expect(res.nick).toBeTruthy();
  });

  it("debe eliminar un usuario", function () {
    sistema.agregarUsuario("pepito");
    let res = sistema.eliminarUsuario("pepito");
    expect(res.deleted).toBeTruthy();
    expect(res.nick).toEqual("pepito");
    expect(sistema.obtenerUsuarios().hasOwnProperty("pepito")).toBeFalsy();
  });

  it("debe obtener el numero de usuarios", function () {
    sistema.agregarUsuario("pepito");
    sistema.agregarUsuario("juanito");
    let res = sistema.numeroUsuarios();
    expect(JSON.parse(res).num).toEqual(2);
  });
});


