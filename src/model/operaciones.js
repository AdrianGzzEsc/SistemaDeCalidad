const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operacionesSchema = Schema({

    nombre: String,
    defectos: [String],
    planta: String

});

module.exports = mongoose.model('operaciones', operacionesSchema);