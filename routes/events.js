// path : '/api/events'

const { Router } = require('express')
const { check } = require('express-validator')
const { getEvents, newEvent, updateEvent, deleteEvent } = require('../controllers/events')
const isDate = require('../helpers/isDate')

const validarCampos = require('../middlewares/validate')
const { validarJwt } = require('../middlewares/verifyJWT')
const router = Router()


router.use(validarJwt)

// login
router.get('/', getEvents)


router.post('/',
    [

        check('title', 'el titulo es obligatorio').not().isEmpty(),
        check('start', 'fecha de inicio es oblgatoria').custom(isDate),
        check('end', 'fecha de inicio es oblgatoria').custom(isDate),

        validarCampos
    ],
    newEvent)


router.put('/:id',
    [
        check('id', 'mongo id no valido').isMongoId(),
        validarCampos
    ], updateEvent)

router.delete('/:id',
    [
        check('id', 'mongo id no valido').isMongoId(),
        validarCampos
    ],

    deleteEvent)



module.exports = router
