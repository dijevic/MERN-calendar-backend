const { validationResult } = require('express-validator')


const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json(
            errors.mapped()
        )
    }
    next()

}

module.exports = validarCampos
