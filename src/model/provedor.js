const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provedoresSchema = Schema({

    nombre: String

});

module.exports = mongoose.model('proveedores', provedoresSchema);