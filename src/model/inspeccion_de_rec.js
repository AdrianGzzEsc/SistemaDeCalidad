const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspeccionSchema = Schema({
    folio: Number,
    fecha: Date,
    inspector: String,
    entrada: Number,
    OC: Number,
    Doc_Pro: Number,
    Provedor: String,
    Material: String,
    Cantidad: Number,
    Unidad: String,
    Inspeccion: String,

});

module.exports = mongoose.model('Inspeccion_de_Recepciones', inspeccionSchema);