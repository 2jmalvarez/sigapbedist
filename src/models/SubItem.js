const { Schema, model } = require('mongoose');

const subitemSchema = new Schema({
  ID: String,
  mostrar: String,
  version: String,
  nombre: String,
  descripcion: String,
  fechaVigencia: Date,
  tipo: String,
  //mostrar: String
  // opciones: [{
  //   nombre: String,
  //   valor: Number,  // que sea entre 0 y 1 validar que la suman de todas las hojas de una misma plantilla sea 100%
  // }],
  activo: {
    type: Boolean,
    default: true,
  }
  //marcar si tiene observaciones, vinculo a observaciones 
}, {
  timestamps: true
});

module.exports = model('Subitem', subitemSchema, 'subitems');



// {"_id":{"$oid":"5ede76eb1244093420bace30"},"ID":"42","mostrar":"Los turnos son otorgados de manera:","version":"0","nombre":"","descripcion":"","fechaVigencia":{"$date":"1970-01-01T00:00:00.000Z"},"activo":false,"tipo":"","updatedAt":{"$date":"2020-07-23T05:50:30.960Z"}}