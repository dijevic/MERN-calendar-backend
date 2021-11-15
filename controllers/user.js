const { response, request } = require('express')
const moment = require('moment')

const Usuario = require('../models/Usuario')

const { encriptar, comprobarContrasena } = require('../helpers/encriptar')
const generaJWT = require('../helpers/generarJwt')


const renewUserToken = async (req = request, res = response) => {

    const usuario = req.usuario
    const token = await generaJWT(usuario.id, usuario.name)

    res.json({
        ok: true,
        status: 200,
        msg: 'token checked',
        usuario,
        token
    })
}
const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body

    try {

        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(404).json({
                msg: `unsuccess, email or password wrong correo`,
                status: 404,
                ok: false

            })

        }

        // comparo la contrasena

        const validPassword = comprobarContrasena(password, usuario.password)
        if (!validPassword) {
            return res.status(404).json({
                msg: `unsuccess, email or password wrong`,
                status: 404,
                ok: false
            })
        }

        // genero JWT

        const token = await generaJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'success login',
            userId: usuario.uid,
            token,
            date: moment(new Date().getTime()),
            ip: req.ip
        })

    } catch (e) {
        console.log(`error 500`)
        throw new Error(e)
    }
}


// registro de un nuevo usuario 

const registerUser = async (req = request, res = response) => {


    try {
        const { email, password } = req.body

        const usuario = new Usuario(req.body)
        const checkEmail = await Usuario.findOne({ email })


        if (checkEmail) {
            return res.status(404).json({
                msg: `unsuccess, email registred already`,
                status: 404,
                ok: false

            })

        }
        usuario.password = encriptar(password)
        await usuario.save()

        // genero JWT 
        const token = await generaJWT(usuario.id, usuario.name)
        res.status(200).json({
            ok: true,
            msg: 'success register',
            usuario,
            token,
            date: moment(new Date().getTime()),
            ip: req.ip
        })

    } catch (e) {
        console.log(`error 500`)
        throw new Error(e)
    }
}

module.exports = {
    renewUserToken,
    loginUser,
    registerUser
}