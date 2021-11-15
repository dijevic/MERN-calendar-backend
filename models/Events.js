const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }


});

EventSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;
    return usuario
}
// no olvidar el singular y la mayuscula
module.exports = model('Evento', EventSchema);
