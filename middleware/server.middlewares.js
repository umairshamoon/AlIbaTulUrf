const cors = require('cors')
const morgan = require('morgan')

module.exports = function (app, express) {
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())
  app.use(morgan('dev'))
}
