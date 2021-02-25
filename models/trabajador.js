const { Schema, model } = require('mongoose');

const TrabajadorSchema = Schema({

    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    estado: {
        type: String,
        default: 'inhabilitado' //  disponible, inhabilitado, trabajando
    },
    puntuacion: {
        type: String
    },
    trabajadorServicio: [{
        type: Schema.Types.ObjectId,
        ref: 'TrabajadorServicio',
        require: true
    }]

}, { collection: 'trabajadores' });


TrabajadorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Trabajador', TrabajadorSchema);