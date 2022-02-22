const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defectosSchema = Schema({

    nombre: String,
    planta: String

});

module.exports = mongoose.model('defectos', defectosSchema);