const isValidBody = (body) => {

    if (Object.values(body).length === 0) {
        return false
    }

    return true

}

module.exports = isValidBody