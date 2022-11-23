const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')

module.exports = function (app, express) {
  app.use(express.urlencoded({ extended: false }))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(helmet())
  app.use(compression())
  app.use(morgan('dev'))
}
