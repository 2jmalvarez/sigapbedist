const { Schema, model } = require('mongoose');

const PlantillaInforme = new Schema({
  ID: String,
  mostrar: String,
  secciones: [
    {
      secciones: {
        type: Schema.Types.ObjectId,
        ref: 'Seccion',
        autopopulate: true
      },
      // hojas: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Hoja'
      // },
      aplica: Boolean,
      orden: Number,
      porcentaje: Number, //validar que la suman de todas las hojas de una misma plantilla sea 100% 
    }
  ],
  tipoPrestadores: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TipoPrestador',
      autopopulate: true,
    }
  ],
  version: String,
  nombre: String,
  descripcion: String,
  fechaVigencia: Date,
  activo: {
    type: Boolean,
    default: true,
  }

}, {
  timestamps: true
});


PlantillaInforme.plugin(require('mongoose-autopopulate'));

module.exports = model('PlantillaInforme', PlantillaInforme, 'plantillasInformes');
