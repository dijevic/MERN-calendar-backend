const moment = require('moment')

const isDate = (value) => {


    if (!value) {
        return false
    }
    const date = moment(value)
    if (!date.isValid()) {
        return false
    }

    return true


}


module.exports = isDate