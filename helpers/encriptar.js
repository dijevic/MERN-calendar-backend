const bcrypt = require('bcrypt')

// encriptar contrase;a
const encriptar = (password) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash

}

// comprobar contrase;a
const comprobarContrasena = (password, passwordDB) => {
    return bcrypt.compareSync(password, passwordDB)
}

module.exports = { encriptar, comprobarContrasena }