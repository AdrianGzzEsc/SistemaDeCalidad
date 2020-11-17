const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Armado3Schema = Schema({
    folio: String,
    fecha: Date,
    inspector: String,
    hora: String,
    modelo: String,
    pieza: String,
    ins1: String,
    def1: Array


});

const armado3 = mongoose.model('armado3', Armado3Schema);

const armado3_collection = {
    createArmado3 : function ( newAr3 ) {
        return armado3
            .create( newAr3 )
            .then( arm3 => {
                return arm3;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    armado3,
    armado3_collection
}