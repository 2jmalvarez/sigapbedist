const { Schema, model } = require('mongoose');

const auditoriaSchema = new Schema({
  idauditoria: Number,
  fechaProgr: Date, // solo esta deberia estar
  fechaReal: Date,
  modalidad: String,
  // fechaAuditoria: Date,
  plantillasInformes: {
      type: Schema.Types.ObjectId,
      ref: 'PlantillaInforme',
      autopopulate: true
    },
  estado: String, //
  UGL: String,
  cumplimiento: Number,
  GDE: String,
  usuarios :{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
    , autopopulate: {select : "mostrar"}
  },
  integrantes: [
    {
      secciones: {
        type: Schema.Types.ObjectId,
        ref: 'Seccion', 
        autopopulate: {select : "mostrar"}
      },
      usuarios: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        autopopulate: {select : "mostrar"}
      },
      responsable: Boolean,
    }
  ],
  // usuarios:  [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
      
  //   }
  //   // referente de: auditoria; hoja; integrante 
  // ],
  prestadores: {
    type: Schema.Types.ObjectId,
    ref: 'Prestador'
    , autopopulate: {select : "mostrar D_PRESTADOR N_CUIT_CUIL C_UGL C_LOCALIDAD_PAMI D_CALLE N_PUERTA N_SAP TELEFONO EMAIL" }
  },
  // puntaje: Number,//ver
  mostrar: String,
  N_UGL: Number,
  N_CUIT_CUIL: String,
  N_SAP: String,
  activo: {
    type: Boolean,
    default: true,
  },
  puntajeObtenido: Number
  // Referente de Equipo: usuario

}, {
  timestamps: true
});
auditoriaSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Auditoria', auditoriaSchema, 'auditorias');


