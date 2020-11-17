const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnchapadoraSchema = Schema({
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

const enchapadora = mongoose.model('enchapadora', EnchapadoraSchema);

const enchapadora_collection = {
    createEnchapadora : function ( newEnc ) {
        return enchapadora
            .create( newEnc )
            .then( esc => {
                return esc;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    enchapadora,
    enchapadora_collection
}