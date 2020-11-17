const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SacabocadosSchema = Schema({
    folio: String,
    fecha: Date,
    inspector: String,
    hora: String,
    modelo: String,
    pieza: String,
    ins1: String,
    ins2: String,
    ins3: String,
    def1: Array,
    def2: Array,
    def3: Array


});

const sacabocados = mongoose.model('sacabocados', SacabocadosSchema);

const sacabocados_collection = {
    createSacabocados : function ( newSac ) {
        return taladro
            .create( newSac )
            .then( sac => {
                return sac;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    sacabocados,
    sacabocados_collection
}