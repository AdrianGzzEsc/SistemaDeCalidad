const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaladroSchema = Schema({
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

const taladro = mongoose.model('taladro', TaladroSchema);

const taladro_collection = {
    createTaladro : function ( newTal ) {
        return taladro
            .create( newTal )
            .then( tal => {
                return tal;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    taladro,
    taladro_collection
}