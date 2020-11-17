const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspeccionProcesoSchema = Schema({
    folio: String,
    fecha: Date,
    inspector: String,
    hora: String

});

const inspeccionProceso = mongoose.model('InspeccionProceso', inspeccionProcesoSchema);

const inspeccionProc_collection = {
    createInspeccion : function ( newInsp ) {
        return inspeccionProceso
            .create( newInsp )
            .then( insp => {
                return insp;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    inspeccionProceso,
    inspeccionProc_collection
}