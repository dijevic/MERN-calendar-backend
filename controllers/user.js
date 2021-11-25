const { response, request } = require('express')
const moment = require('moment')

const Usuario = require('../models/Usuario')

const { encriptar, comprobarContrasena } = require('../helpers/encriptar')
const { sendRecoverEmail, sendRegistrationEmail } = require('../helpers/sendEmail')
const { generaJWT, generarRegistrationJWT } = require('../helpers/generarJwt')


const renewUserToken = async (req = request, res = response) => {

    const usuario = req.usuario
    const token = await generaJWT(usuario.id, usuario.name)

    res.json({
        ok: true,
        status: 200,
        msg: 'token checked',
        userId: usuario.id,
        name: usuario.name,
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
                ok: false,
                password,
                pp: usuario.password
            })
        }

        // genero JWT

        const token = await generaJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'success login',
            userId: usuario.id,
            name: usuario.name,
            token,
            date: moment(new Date().getTime()),
            ip: req.ip
        })

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

const registerUser = async (req = request, res = response) => {


    try {
        let { password, } = req.userData


        const data = {
            ...req.userData,
            password: encriptar(password)

        }
        const usuario = new Usuario(data)


        await usuario.save()

        // genero JWT 
        const token = await generaJWT(usuario.id, usuario.name)
        res.status(200).json({
            ok: true,
            msg: 'success register',
            userId: usuario.id,
            name: usuario.name,
            token,
        })

    } catch (e) {
        console.log(`error 500`)
        throw new Error(e)
    }
}


const ForgotPassword = async (req = request, res = response) => {
    const { email } = req.body

    try {


        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(404).json({
                msg: `a link was send to your email !`,
                status: 404,
                ok: false

            })

        }
        // genero JWT para la base de datos


        const resetToken = await generaJWT(usuario.id, usuario.name)
        // guardar token en db  

        await Usuario.findByIdAndUpdate(usuario.id, { resetToken }, { new: true })



        // Todo: camabiar a vriable d entorno
        const link = `https://calndar-mern2021.herokuapp.com/auth/change-password/${resetToken}`

        sendRecoverEmail(usuario.email, link)



        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'a link was send to your email !',
        })

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

const changePaswword = async (req = request, res = response) => {
    const { password } = req.body

    try {

        const usuario = req.usuario
        const checkPassword = comprobarContrasena(password, usuario.password)
        if (checkPassword) {
            return res.json({
                ok: false,
                status: 404,
                msg: `you have to set a password different to your last password`
            })
        }

        const data = {
            password: encriptar(password),
            resetToken: null
        }

        await Usuario.findByIdAndUpdate(usuario.id, data)
        const token = await generaJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'password has been changed successfully',
            id: usuario.id,
            name: usuario.name,
            token
        })

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


const registrationCheckingEmail = async (req = request, res = response) => {


    try {
        const { email, password, name } = req.body


        const checkEmail = await Usuario.findOne({ email })


        if (checkEmail) {
            return res.status(404).json({
                msg: `unsuccess, email registred already`,
                status: 404,
                ok: false

            })

        }


        // genero JWT 
        const token = await generarRegistrationJWT(email, password, name)
        const link = `https://calndar-mern2021.herokuapp.com/auth/finish-registration/${token}`
        // envio el email
        // http://localhost:3000/auth/finish-registration/121231231
        try {

            sendRegistrationEmail(email, link)

        } catch (e) {
            console.log(e)
            return res.status(404).json({
                ok: false,
                status: 404,
                msg: `something went wrong`,
                token
            })
        }

        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'an email has been send to your email !',
            token
        })

    } catch (e) {
        console.log(`error 500`)
        throw new Error(e)
    }
}

module.exports = {
    renewUserToken,
    loginUser,
    registerUser,
    ForgotPassword,
    changePaswword,
    registrationCheckingEmail

}