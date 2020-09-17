const { Schema, model } = require('mongoose');

const profesionSchema = new Schema({
    profesion: String,
    mostrar: String,
    activo: {
        type: Boolean,
        default: true,
      }
}, {
    timestamps: true
});

module.exports = model('Profesion', profesionSchema, 'profesiones');