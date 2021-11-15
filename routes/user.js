// path : '/api/auth'

const { Router } = require('express')
const { check } = require('express-validator')
const { renewUserToken, loginUser, registerUser, } = require('../controllers/user')
const validarCampos = require('../middlewares/validate')
const validarJwt = require('../middlewares/verifyJWT')
const router = Router()




// login
router.post('/', [
    check('email', 'debe ser un correo valido').isEmail(),
    check('password', 'password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    validarCampos

], loginUser)


router.post('/register',
    [
        check('email', 'debe ser un correo valido').isEmail(),
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos

    ], registerUser)


router.get('/renew',
    [
        validarJwt,

    ], renewUserToken)

module.exports = router

