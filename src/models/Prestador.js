const { Schema, model } = require('mongoose');

const prestadorSchema = new Schema({
  ID: Number,
  D_PRESTADOR: String,
  C_PRESTADOR: String,
  N_CUIT_CUIL: String,
  N_SAP: String,
  C_UGL: String,
  D_CALLE: String,
  N_PUERTA: String,
  C_PISO_DEPTO: String,
  C_CP8: String,
  C_CP4: String,
  N_X: String,
  N_Y: String,
  TELEFONO: String,
  EMAIL: String,
  N_PRESTADOR: String,
  M_HABILITADO: String,
  F_INICIO: String,
  F_FIN: String,
  C_PROVINCIA_PAMI: String,
  C_DEPARTAMENTO_PAMI: String,
  C_LOCALIDAD_PAMI: String,
  //TipoPrestador:{ 
  //   type: Schema.Types.ObjectId,
  //   ref: 'TipoPrestador'
  // },
  mostrar: String,
  activo: {
    type: Boolean,
    default: true,
  }

}, {
  timestamps: true
});

module.exports = model('Prestador', prestadorSchema, 'prestadores');



