const { Schema, model } = require('mongoose');

const rolSchema = new Schema({
    rol: String,
    mostrar: String,
    activo: {
        type: Boolean,
        default: true,
      }
}, {
    timestamps: true
});

module.exports = model('Rol', rolSchema, 'roles');