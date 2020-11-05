const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const altaSchema = Schema({
    folio: String,
    Fecha: Date,
    Orden: String,
    Operacion: String,
    Modelo: String,
    Defectos: Array,
    Cantidad: Number,
    Comentarios: String,
    Retrabajo: String

});

module.exports = mongoose.model('altaPNC', altaSchema);