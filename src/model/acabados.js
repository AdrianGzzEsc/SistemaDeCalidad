const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcabadosSchema = Schema({
    folio: String,
    fecha: Date,
    inspector: String,
    hora: String,
    modelo: String,
    pieza: String,
    ins1: String,
    def1: Array

});

const acabados = mongoose.model('acabados', AcabadosSchema);

const acabados_collection = {
    createAcabados : function ( newAca ) {
        return acabados
            .create( newAca )
            .then( aca => {
                return aca;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    acabados,
    acabados_collection
}