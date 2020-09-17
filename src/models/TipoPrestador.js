const { Schema, model } = require('mongoose');

const tipoPrestadorSchema = new Schema({
  ID: String,
  descripcion: String,
  active: Boolean,
  fechaVigencia: Date,
  mostrar: String,
  activo: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

module.exports = model('TipoPrestador', tipoPrestadorSchema, 'tipoPrestadores');
