const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)

const routerBasePath = __dirname + '/app/userhome'

function response(path) {
  return async (req, res) => {
    try {
      const { params } = req
      const { file: filename } = params
      const filepath = `${path}/${filename}`
      const ext = filename.slice(filename.lastIndexOf('.'), -1)
      const file = await readFile(filepath, 'utf8')

      res.send(file)
    } catch (e) {
      res.status(404).send(e)

    }
  }
}
module.exports = function(app) {
  app.get('/:file', response(routerBasePath))
}
