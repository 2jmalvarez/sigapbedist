const { Schema, model } = require('mongoose');

const informeSchema = new Schema({
  ID:Number,
  fechaInicio: Date,
  fechaFin: Date,
  auditorias: {
    type: Schema.Types.ObjectId,
    ref: 'Auditoria',
    autopopulate: true
  },
  ConsideracionesGenerales: String,
  CumplimientoTiempos: String,
  DisposicionLlamado: String,
  ActitudDuranteLlamado: String,
  Fortalezas: String,
  Oportunidades: String,
  hojas: [
    {
      hojas: {
        type: Schema.Types.ObjectId,
        ref: 'Hoja'
        , autopopulate: true
      },
      cumplimiento: Number,
      observaciones: String,
      Fortalezas: String,
      Oportunidades: String,
      aplica: Boolean,
    }
  ],
  items: [
    {
      items: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
        , autopopulate: true
      },
      aplica: Boolean,
      observaciones: String,
    }
  ],
  // subitems: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Subitem'
  //   , autopopulate: true
  // },
  subitems: [{
    subitems: {
      type: Schema.Types.ObjectId,
      ref: 'Subitem'
      , autopopulate: true
    },
    aplica: Boolean,
    val: Boolean, //Boolean
  }],
  usuarios: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
    , autopopulate: { select: "mostrar" }
    // , unique
  },
  comentarios: String,
  GDE: String,
  mostrar: Number,
  // aplica: Boolean,
  // valorObtenido: Number, //Boolean
  // valorMaximo: Number,
  // opciones: String,
  activo: {
    type: Boolean,
    default: true,
  }
  // nombre: String,
  // valor: Number,
  /* este no va a este nivel */
  // aplica: {
  //   type: Boolean,
  //   default: true,
  // },
  // mostrar: String, // no va

}, {
  timestamps: true
});
informeSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Informe', informeSchema, 'informes');
