const { Schema, model } = require('mongoose');

const item2Schema = new Schema({
  ID: String,
  mostrar: String,
  midSubItem: [
    
      {
        type: Schema.Types.ObjectId,
        ref: 'midSubItem'
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

module.exports = model('Item2', item2Schema, 'items2');

