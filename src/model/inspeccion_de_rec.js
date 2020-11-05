const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspeccionSchema = Schema({
    folio: Number,
    fecha: Date,
    inspector: String,
    entrada: Number,
    OC: Number,
    Doc_Pro: Number,
    Provedor: String,
    Material: String,
    Cantidad: Number,
    Unidad: String,
    Inspeccion: String,

});

const inspeccion_de_rec_model = mongoose.model('Inspeccion_de_Recepciones', inspeccionSchema);

const inspeccion_de_rec = {
    createInsp : function( newInsp ) {
        return inspeccion_de_rec_model
            .create( newInsp )
            .then( insp => {
                return insp;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

//module.exports = mongoose.model('Inspeccion_de_Recepciones', inspeccionSchema);

module.exports = {
    inspeccion_de_rec
};