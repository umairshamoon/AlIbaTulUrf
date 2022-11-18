module.exports = function (function_, data) {
  const rep = `\"`
  const { error } = function_(data)
  if (error) {
    throw Error(
      error.details[0].message
        .replace(rep, '')
        .replace(rep, '')
        .replace('_', ' ')
        .replace('_', ' ')
        .replace('.', ' ')
    )
  }
}
