const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Armado2Schema = Schema({
    folio: String,
    fecha: Date,
    inspector: String,
    hora: String,
    modelo: String,
    pieza: String,
    ins1: String,
    def1: Array


});

const armado2 = mongoose.model('armado2', Armado2Schema);

const armado2_collection = {
    createArmado2 : function ( newAr2 ) {
        return armado2
            .create( newAr2 )
            .then( arm2 => {
                return arm2;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    armado2,
    armado2_collection
}