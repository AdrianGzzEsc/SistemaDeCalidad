const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EscuadradoraSchema = Schema({
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

const escuadradora = mongoose.model('escuadradora', EscuadradoraSchema);

const escuadradora_collection = {
    createEscuadradora : function ( newEsc ) {
        return escuadradora
            .create( newEsc )
            .then( esc => {
                return esc;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    escuadradora,
    escuadradora_collection
}