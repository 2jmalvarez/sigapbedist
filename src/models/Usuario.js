const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    ID: Number,
    nombre: String,
    apellido: String,
    correo: String,
    legajo:
            // String,
         {
            type: String,
            // unique: true,
        },
    contrasenia: String,
    profesiones: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profesion',
            autopopulate: true
        }
    ],
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rol',
            autopopulate: true
        }
    ],
    mostrar: String,
    activo: {
        type: Boolean,
        default: true,
      }
    // nuevoAtr : {
    //     type: String
    // }
}, {
    timestamps: true
});

usuarioSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Usuario', usuarioSchema, 'usuarios');