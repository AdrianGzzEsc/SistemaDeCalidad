const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const piezasSchema = Schema({

    nombre: String

});

module.exports = mongoose.model('piezas', piezasSchema);