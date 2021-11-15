const express = require('express');
const cors = require('cors');
const { dbConection } = require('../DB/db.config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            authUser: '/api/auth',
            events: '/api/events'
        }
        this.dbConection()
        this.middlewares()
        this.routes()


    }

    async dbConection() {
        await dbConection()
    }

    middlewares() {
        this.app.use(express.static('public'))
        this.app.use(cors())

        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.paths.authUser, require('../routes/user'))
        this.app.use(this.paths.events, require('../routes/events'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en el puerto , ${this.port}`)
        })

    }

}

module.exports = {
    Server
}