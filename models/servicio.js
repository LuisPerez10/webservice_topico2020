const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        default: 'habilitado'
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    }
});


ServicioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Servicio', ServicioSchema);