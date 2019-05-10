const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile("db/data.json", data, err => {
    //fs.writeFile recibe 3 parametros:ruta donde se guarda, datos a guardar y una funcion donde
    //personalizamos para el error
    if (err) throw new Error("No se pudo grabar", err);
  });
};

const cargarDB = () => {
  //el arreglo listadoPorHacer recibe todo lo que hay guardado en el archivo de json
  try {
    listadoPorHacer = require("../db/data.json");
  } catch (error) {
    listadoPorHacer = []; //un archivo json es válido cuando al menos esta vacío entre corchetes se declara eso
  }
};

const crear = descripcion => {
  cargarDB();
  let porHacer = {
    descripcion,
    completado: false
  };
  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
};

const getListado = () => {
  cargarDB();
  return listadoPorHacer;
};

const buscar = descripcion => {
  //se esta buscando el index que coincide con la descripcion a buscar, el findIndex es una funcion de js
  //que incluye un for para recorrer el arreglo que en este caso es listadoPorHacer y la palabra tarea
  //es libre para simplemente asignar el valor que va obteniendo al recorrer cada item
  let index = listadoPorHacer.findIndex(
    tarea => tarea.descripcion === descripcion
  );
  return index;
};
const actualizar = (descripcion, completado = true) => {
  cargarDB();
  let index = buscar(descripcion);
  if (index >= 0) {
    //quiere decir que encontró el valor, el findIdex retorna -1 cuando no lo encuentra
    listadoPorHacer[index].completado = completado;
    guardarDB(); //guardamos cambios en el archivo de .JSON
    return true;
  } else {
    return false;
  }
};

const borrar = descripcion => {
  cargarDB();
  let index = buscar(descripcion);
  if (index >= 0) {
    delete listadoPorHacer[index];
    guardarDB();
    return true;
  } else {
    return false;
  }
};
module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
};
