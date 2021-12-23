const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)

const rootDir = __dirname + '/home/'

async function response(req, res) {
    const { params } = req
    const { userName } = params
    const filePath = params[0]

    if (!filePath) {
      return
    }

  try {
    const path = `${rootDir}${userName}${filePath}`

    const file = await readFile(path, 'utf8')

    res.send(file)
  } catch (e) {
    console.error(e)
    res.status(404).send(e)

  }
}

module.exports = function(app) {
  app.get('/:userName*?', response)
}
