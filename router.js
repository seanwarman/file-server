const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)

// This part can change to the dir you want to store your user's in.
// For example on linux this could just be /home...
const homeDir = __dirname + '/app/'

async function response(req, res) {
  try {
    const { params } = req
    const { userName } = params
    const filePath = params[0]

    if (!filePath) {
      throw Error('No filePath param')
    }

    const path = `${homeDir}${userName}${filePath}`

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
