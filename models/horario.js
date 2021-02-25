const { Schema, model } = require('mongoose');

const HorarioSchema = Schema({
    horaInicio: {
        type: String,
        required: true
    },
    horaFin: {
        type: String,
        required: true
    },
    // dias: [{
    //     type: String,
    //     required: true
    // }],
    trabajadorServicio: {
        type: Schema.Types.ObjectId,
        ref: 'trabajadorServicio',
        required: false
    },
});


HorarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Horario', HorarioSchema);