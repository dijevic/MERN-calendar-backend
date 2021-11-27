const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
        required: false,
        default: null
    },



});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;
    return usuario
}
// no olvidar el singular y la mayuscula
module.exports = model('Usuario', UserSchema);
