const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  ID: String,
  mostrar: String,
  subitems: [
    {
      subitems: {
        type: Schema.Types.ObjectId,
        ref: 'Subitem',
        autopopulate: true,
      }, 
      orden: Number,
      porcentaje: Number, //validar que la suman de todos los subitems de un mismo item sea 100%
      peso: Number,
      // cuenta: Boolean,
      // valorMaximo: Number,
      // valorObtenido: Number,
      aplica: {
        type: Boolean,
        default: true,
      },
      // observaciones: String,
      //marcar si tiene observaciones, vinculo a observaciones 
    }
  ],
  version: String,
  nombre: String,
  descripcion: String,
  fechaVigencia: Date,
  activo: {
    type: Boolean,
    default: true, 
  },
  

}, {
  timestamps: true
});

itemSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Item', itemSchema, 'items');

