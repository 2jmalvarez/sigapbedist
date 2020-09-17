const { Schema, model } = require('mongoose');

const observacionSchema = new Schema({
  coleccion: String,
  IDelemento: String,
  observacion: String,
  activo: {
    type: Boolean,
    default: true,
  }

}, {
  timestamps: true
});

module.exports = model('Observacion', observacionSchema, 'observaciones');
