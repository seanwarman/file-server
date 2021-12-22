const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)

// This part can change to the dir you want to store your user's in.
// For example on linux this could just be /home...
const homedir = __dirname + '/app'

async function response(req, res) {
  const { params } = req
  const { file: filename, username } = params
  const path = `${homedir}/${username}`

  try {
    const filepath = `${path}/${filename}`
    const ext = filename.slice(filename.lastIndexOf('.'), -1)
    const file = await readFile(filepath, 'utf8')

    res.send(file)
  } catch (e) {
    console.error(e)
    res.status(404).send(e)

  }
}


module.exports = function(app) {
  app.get('/:username/:file', response)
}
