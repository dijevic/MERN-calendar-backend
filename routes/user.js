// path : '/api/auth'

const { Router } = require('express')
const { check, body } = require('express-validator')
const {
    renewUserToken,
    loginUser,
    registerUser,
    ForgotPassword,
    changePaswword,
    registrationCheckingEmail,
    updateUser } = require('../controllers/user')

const validarCampos = require('../middlewares/validate')
const { validarJwt, validarResetJwt, validarRegistrationJWT } = require('../middlewares/verifyJWT')
const router = Router()




// login
router.post('/', [
    check('email', 'debe ser un correo valido').isEmail(),
    check('password', 'password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    validarCampos

], loginUser)


router.post('/register',
    [
        validarRegistrationJWT,
        validarCampos

    ], registerUser)


router.get('/renew',
    [
        validarJwt,

    ], renewUserToken)


router.put('/forgot-password',

    [
        check('email', 'debe ser un correo valido').isEmail(),
        validarCampos

    ], ForgotPassword)

router.put('/change-password',

    [
        validarResetJwt,
        check('password', 'una contrasena es requerida').not().isEmpty(),
        check('password', 'debe ser de mas de 6 digitos la clave').isLength({ min: 6 }),
        validarCampos
    ], changePaswword)

router.post('/start-registration',
    [
        check('email', 'debe ser un correo valido').isEmail(),
        check('password', 'debe ser de mas de 6 digitos la clave').isLength({ min: 6 }),
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        validarCampos

    ], registrationCheckingEmail)


router.put('/update-user',

    [
        validarJwt,
        body().not().isEmpty(),
        validarCampos
    ], updateUser)

module.exports = router



