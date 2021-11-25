const moment = require('moment')
const Evento = require('../models/Events')
const checkDate = async (events) => {

    const today = moment()
    const eventosVigentes = []
    const eventosVencidos = []

    events.map(event => (today.isSameOrAfter(moment(event.end))) ? eventosVencidos.push(event) : eventosVigentes.push(event))


    if (eventosVencidos.length > 0) {

        eventosVencidos.map(async (event) => {

            const eventDeleted = await Evento.findByIdAndDelete(event.uid)
        })

    }

    return eventosVigentes





}

module.exports = checkDate