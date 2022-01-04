const { promisify } = require('util')
const { readdirSync } = require('fs')
const readFile = promisify(require('fs').readFile)
const execFile = promisify(require('child_process').execFile)

const rootDir = __dirname + '/home/'

async function response(req, res) {
  const { params } = req
  const { userName } = params
  const filePath = params[0]

  if (!filePath) {
    return
  }

  try {
    return res.render(`${userName}${filePath}`)
  } catch (e) {
    console.log('Not a template file, sending it raw instead...')
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

async function renderIndex(req, res) {

  const homeDirs = readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  try {
    return res.render('index.ejs', { homeDirs })

  } catch (e) {
    console.error(e)
    res.status(404).send(e)

  }

}

async function sendAsset(req, res) {
  const { params } = req
  const { asset } = params

  try {
    const path = __dirname + '/assets/' + asset
    const file = await readFile(path)
    res.send(file)
  } catch (e) {
    console.error(e)
    res.status(404).send(e)
  }

}

async function createServer(req, res) {
  const { params } = req
  const { userName, passwordHash } = params

  try {
    // TODO: prevent making the dir if there's a docker error.

    await execFile(__dirname + '/docker-useradd.sh', [userName, 'password'])
    res.send('Server created')

  } catch (error) {
    if (error.message.includes('Command failed')) return res.status(503).send({ message: 'Docker failed' })
    if (error.message.includes('File exists')) return res.status(409).send({ message: 'User exists' })
    res.status(500).send({ message: error.message })

  }
}

module.exports = function(app) {
  app.get('/', renderIndex)
  app.get('/assets/:asset', sendAsset)
  app.get('/create-server/:userName/:passwordHash', createServer)
  app.get('/:userName*?', response)
}
