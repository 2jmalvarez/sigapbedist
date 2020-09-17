const { Schema, model } = require('mongoose');

const midSubitemSchema = new Schema({
  subitems: {
    type: Schema.Types.ObjectId,
    ref: 'Subitem'
  }, 
  orden: Number,
  porcentaje: Number, //validar que la suman de todos los subitems de un mismo item sea 100%
  // valorMaximo: Number,
  // valorObtenido: Number,
  aplica: {
    type: Boolean,
    default: true,
  },
  

}, {
  timestamps: true
});

module.exports = model('midSubItem', midSubitemSchema, 'midsubitems');

