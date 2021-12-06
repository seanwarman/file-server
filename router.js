const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)

function response(path) {
  return async (req, res) => {
    try {
      const { params } = req
      const { file: filename } = params

      const ext = filename.slice(filename.lastIndexOf('.'), -1)
      const file = await readFile(`${path}/${filename}`, 'utf8')

      res.send(file)
    } catch (e) {
      res.status(404).send(e)

    }
  }
}
module.exports = function(app) {
  app.get('/:file', response(__dirname + '/app/userhome'))
}
