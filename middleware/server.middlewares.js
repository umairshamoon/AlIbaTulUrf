const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

module.exports = function (app, express) {
  app.use(express.urlencoded({ extended: false }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('dev'))
}
