const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const altaSchema = Schema({
    folio: String,
    Fecha: Date,
    Orden: String,
    Proceso: String,
    Modelo: String,
    Defectos: Array,
    Cantidad: Number,
    Comentarios: String,
    Retrabajo: String,
    inspector: String
});

const altaPNC = mongoose.model('altaPNC', altaSchema);

const altaPNC_collection = {
    createAlta : function( newAlta ) {
        return altaPNC
            .create( newAlta )
            .then( alta => {
                return alta;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = {
    altaPNC,
    altaPNC_collection
};

//module.exports = mongoose.model('altaPNC', altaSchema);