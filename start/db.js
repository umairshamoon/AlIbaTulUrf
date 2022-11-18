const { connect } = require('mongoose')

module.exports = function (url) {
  connect(url)
    .then(() => {
      console.log('Database Connected')
    })
    .catch((err) => {
      console.log('Error in connecting to DataBase', err.message)
    })
}
