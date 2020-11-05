const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bajaSchema = Schema({
    folio: String,
    Fecha: Date,
    Orden: String,
    Operacion: String,
    Modelo: String,
    Defectos: String,
    Cantidad: Number,
    Comentarios: String,
    Retrabajo: String,
    FechaRetrabajo: Date,
    Retrabajable: String,
    RetrabajadoPersona: String,
    Costo: Number,
    ComentariosRe: String

});

module.exports = mongoose.model('bajaPNC', bajaSchema);