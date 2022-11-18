const DataUri = require('datauri/parser')
const path = require('path')

const dataURIChild = new DataUri()

module.exports = (originalName, buffer) => {
  const extension = path.extname(originalName)
  return dataURIChild.format(extension, buffer).content
}
