const { Schema, model } = require('mongoose');

const hojaSchema = new Schema({
  ID: String,
  mostrar: String,
  usuarios:  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      autopopulate: {select : "mostrar"},
    }
  ],
  profesiones:  [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profesion',
        autopopulate: true,
      }
    ],
  items: [
    { items:   {
          type: Schema.Types.ObjectId,
          ref: 'Item',
          autopopulate: true,
      },
      orden: Number,
      porcentaje: Number, //validar que la suman de todos los items de una misma hoja sea 100%
      peso: Number,
      aplica: {
        type: Boolean,
        default: true,
      }
    }
  ],
  version: String,
  nombre: String,
  descripcion: String,
  fechaVigencia: Date,
  position: Number,
  peso: Number,
  aplica: {
    type: Boolean,
    default: true,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  // Campo observaciones texto libre
  //marcar si tiene observaciones, vinculo a observaciones 
}, {
  timestamps: true
});

hojaSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Hoja', hojaSchema, 'hojas');
