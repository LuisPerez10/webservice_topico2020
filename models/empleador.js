const { Schema, model } = require('mongoose');

const EmpleadorSchema = Schema({

    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    estado: {
        type: String,
        default: 'habilitado' //  disponible, inhabilitado, trabajando
    },
    puntuacion: {
        type: String
    }

}, { collection: 'empleadores' });


EmpleadorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Empleador', EmpleadorSchema);