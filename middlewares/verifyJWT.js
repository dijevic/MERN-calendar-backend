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
        res.status(401).json({ message: `invalid JWT` })
    }



}

module.exports = validarJwt