const JWT = require('jsonwebtoken')

const generaJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name }

        JWT.sign(payload, process.env.PRIVATESECRETJWTKEY, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                reject(`no se puede generar el token`)
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = generaJWT