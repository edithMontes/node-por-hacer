const opciones_del_yargs = {
  descripcion: {
    alias: "d",
    demand: true
  },
  completado: {
    alias: "c",
    default: true
  }
};
const argv = require("yargs")
  .command("crear", "Crear un elemento por hacer", opciones_del_yargs)
  .command(
    "actualizar",
    "Actualiza el estado completado de una tarea",
    opciones_del_yargs
  )
  .command("borrar", "Borrar un elemento por hacer", opciones_del_yargs)

  .help().argv;

module.exports = {
  argv
};
