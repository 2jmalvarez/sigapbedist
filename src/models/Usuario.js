const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");
// import bcrypt from "bcryptjs";

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

usuarioSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

usuarioSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

usuarioSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Usuario', usuarioSchema, 'usuarios');