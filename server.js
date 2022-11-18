const express = require('express')
const app = express()
const { PORT, MONGO_URI } = require('./config')

//MIDDILWARES
require('./middleware/server.middlewares')(app, express)

//start
require('./start/db')(MONGO_URI)
require('./start/routes')(app, express)

//starting server
require('http')
  .createServer(app)
  .listen(PORT, () => {
    console.clear()
    console.log(`Listening at port ${PORT}`)
  })
