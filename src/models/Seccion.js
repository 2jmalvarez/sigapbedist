const { Schema, model } = require('mongoose');

const seccionSchema = new Schema({
  ID: String,
  mostrar: String,
  hojas: [
    {
      hojas: {
        type: Schema.Types.ObjectId,
        ref: 'Hoja',
        autopopulate: true
      },

    }
  ],
  version: String,
  nombre: String,
  descripcion: String,
  fechaVigencia: Date,
  position: Number,
  activo: {
    type: Boolean,
    default: true,
  },
  //estado: String, // collecion -> no iniciada, en proceso, completa ,bloqueada
  aplica: {
    type: Boolean,
    default: true,
  }
  // Campo observaciones texto libre
  //marcar si tiene observaciones, vinculo a observaciones 
}, {
  timestamps: true
});

seccionSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Seccion', seccionSchema, 'secciones');
