const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Armado1Schema = Schema({
    folio: String,
    fecha: Date,
    inspector: String,
    hora: String,
    modelo: String,
    pieza: String,
    ins1: String,
    def1: Array


});

const armado1 = mongoose.model('armado1', Armado1Schema);

const armado1_collection = {
    createArmado1 : function ( newAr1 ) {
        return armado1
            .create( newAr1 )
            .then( arm1 => {
                return arm1;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    armado1,
    armado1_collection
}