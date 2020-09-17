const { Schema, model } = require('mongoose');

const informeCompletoSchema = new Schema({
  auditorias: {
    type: Schema.Types.ObjectId,
    ref: 'Auditoria',
    autopopulate: true
  },
  secciones: [
    {
      secciones: {
        type: Schema.Types.ObjectId,
        ref: 'Seccion'
        , autopopulate: true
      },
      items: [
        {
          items: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
            , autopopulate: true
          },
          subitems: [{
            type: Schema.Types.ObjectId,
            ref: 'Subitem'
            , autopopulate: true
          }],
        }
      ]
    }
  ],

  
  // usuarios: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Users'
  //   , autopopulate: true
  // },
  // valorMaximo: Number,
  // valorObtenido: Number,
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

module.exports = model('CompInforme', informeCompletoSchema, 'compinformes');
