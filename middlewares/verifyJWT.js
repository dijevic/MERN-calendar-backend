const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const Usuario = require('../models/Usuario')



const validarJwt = async (req = request, res = response, next) => {

    let token = req.header('x-token')

    if (!token) {
        return res.status(401).json({ message: `unauthorized, missing JWT` })
    }

    try {

        const { uid, name } = jwt.verify(token, process.env.PRIVATESECRETJWTKEY)
        const usuario = await Usuario.findById(uid)
        if (!usuario) {
            return res.status(401).json({ message: `user not found` })
        }

        // paso mi usuario a mi request y lo dejo ahi seteado
        req.usuario = usuario
        next()



    } catch (err) {
        console.log(err)
        res.status(401).json({ msg: `invalid JWT` })
    }



}
const validarResetJwt = async (req = request, res = response, next) => {

    let token = req.header('reset-token')

    if (!token) {
        return res.status(401).json({ message: `unauthorized, missing JWT` })
    }

    try {

        const { uid } = jwt.verify(token, process.env.PRIVATESECRETJWTKEY)
        const usuario = await Usuario.findById(uid)
        if (!usuario) {
            return res.status(401).json({ msg: `user not found` })
        }
        if (usuario.resetToken != token) {
            return res.status(401).json({ msg: `something went wrong ` })
        }

        // paso mi usuario a mi request y lo dejo ahi seteado
        req.usuario = usuario
        next()



    } catch (err) {
        console.log(err)
        res.status(401).json({ msg: `invalid JWT` })
    }



}
const validarRegistrationJWT = async (req = request, res = response, next) => {

    let token = req.header('registration-token')

    if (!token) {
        return res.status(401).json({ message: `unauthorized, missing JWT` })
    }

    try {

        const { email, password, name } = jwt.verify(token, process.env.PRIVATEREGISTRATIONKEY)
        const usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(401).json({ msg: `user Registered already` })
        }

        // paso mi usuario a mi request y lo dejo ahi seteado
        req.userData = { email, password, name }
        next()



    } catch (err) {
        console.log(err)
        res.status(401).json({ msg: `invalid JWT` })
    }



}

module.exports = { validarJwt, validarResetJwt, validarRegistrationJWT }
