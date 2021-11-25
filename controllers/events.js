const { response, request } = require('express')
const checkDate = require('../helpers/checkDateValidator')
const Evento = require('../models/Events')


const getEvents = async (req = request, res = response) => {

    // query != parametros ( no son obligatorios)

    const eventos = await Evento.find()
        .populate('usuario', 'name')

    const total = await Evento.countDocuments()
    const finalEvents = await checkDate(eventos)
    res.json({
        ok: true,
        status: 200,
        msg: 'success',
        eventos: finalEvents,
        total

    })
}
const newEvent = async (req = request, res = response) => {
    try {
        const { title, start, end, notes } = req.body

        const evento = await new Evento({ title, start, end, notes })
        evento.usuario = req.usuario.id

        const newEvent = await evento.save()


        res.json({
            ok: true,
            status: 200,
            msg: 'success',
            newEvent


        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            ok: false,
            status: 500,
            msg: 'hable con el administrador'
        })
    }
}
const updateEvent = async (req = request, res = response) => {
    const idEvent = req.params.id
    // id seteado en l;a request
    const uid = req.usuario.id

    try {

        const evento = await Evento.findById(idEvent)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                status: 404,
                msg: `missing event id valid`
            })
        }
        if (uid != evento.usuario.toString()) {
            return res.status(401).json({
                ok: false,
                status: 401,
                msg: `unauthorized`
            })
        }

        const data = {
            ...req.body,
            usuario: req.usuario
        }

        const eventUpdate = await Evento.findByIdAndUpdate(idEvent, data, { new: true })


        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'success',
            evento: eventUpdate

        })



    } catch (e) {
        console.log(e)
        res.status(500).json({
            ok: false,
            status: 500,
            msg: 'hable con el administrador'
        })
    }







}
const deleteEvent = async (req = request, res = response) => {
    const idEvent = req.params.id

    // id seteado en l;a request
    const uid = req.usuario.id

    try {

        const evento = await Evento.findById(idEvent)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                status: 404,
                msg: `missing event id valid`
            })
        }
        if (uid != evento.usuario.toString()) {
            return res.status(401).json({
                ok: false,
                status: 401,
                msg: `unauthorized`
            })
        }

        const eventDeleted = await Evento.findByIdAndDelete(idEvent)


        res.status(200).json({
            ok: true,
            status: 200,
            msg: 'success',
            evento: eventDeleted

        })



    } catch (e) {
        console.log(e)
        res.status(500).json({
            ok: false,
            status: 500,
            msg: 'hable con el administrador'
        })
    }



}



module.exports = {

    newEvent,
    updateEvent,
    deleteEvent,
    getEvents
}

