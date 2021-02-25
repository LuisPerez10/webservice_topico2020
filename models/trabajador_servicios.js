const { Schema, model } = require('mongoose');

const TrabajadorServicioSchema = Schema({
    estado: {
        type: String,
        required: true,
        default: 'inhabilitado'
    },
    costoDia: {
        type: String,
        required: false
    },
    puntuacion: {
        type: String,
        required: false,
    },
    servicio: {
        type: Schema.Types.ObjectId,
        ref: 'servicio',
        required: false
    },
    dias: [{
        type: String,
        required: true
    }],

    // trabajador id

    trabajador: {
        type: Schema.Types.ObjectId,
        ref: 'trabajador',
        required: true
    },
    horarios: [{
        type: Schema.Types.ObjectId,
        ref: 'horario',
        required: false,
    }]
});


TrabajadorServicioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('TrabajadorServicio', TrabajadorServicioSchema);