const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelosSchema = Schema({

    nombre: String

});

const modelosModel = mongoose.model( 'modelos', modelosSchema );

const Modelo = {
    getModelo : function() {
        return modelosModel
            .find()
            .then( modelos => {
                return modelos;
            })
            .catch( err => {
                throw new Error( err.message );
            })
    }
}

module.exports = mongoose.model('modelos', modelosSchema);