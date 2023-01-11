const { promisify } = require('util')
const { readdirSync } = require('fs')
const CryptoJS = require('crypto-js')
const readFile = promisify(require('fs').readFile)
const execFile = promisify(require('child_process').execFile)
const exec = promisify(require('child_process').exec)

const { MASTER_PASSWORD, MASTER_USER, BASE_URL, GOTTY_PORT } = require('./env.js')

const rootDir = __dirname + '/home/'

async function response(req, res) {
  const { params, query } = req
  const { userName } = params
  const filePath = params[0]

  if (!filePath) {
    return
  }

  try {
    return res.render(`${userName}${filePath}`, query)
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
  try {
    const { stdout, stderr } = await exec('docker ps -f "ancestor=file-server" --format "{{.Names}}"')

    if (stderr) throw Error(stderr)

    const servers = stdout
      .split('\n')
      .map(name => name.replace(/-server/, ''))
      .filter(name => name.length)

    res.render('index.ejs', {
      servers,
      baseUrl: BASE_URL || 'http://localhost',
      gottyPort: GOTTY_PORT || '8080',
    })

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
  const { params, headers } = req
  const { userName } = params
  const { authorisation } = headers

  if (!authorisation) return res.status(401).end()

  // Un-base64 the auth header and remove the 'Basic ' bit from the beginning...
  const encrypted = new Buffer
    .from(authorisation, 'base64').toString().split(' ')[1]

  // Decrypt it using your master password. Then convert the CryptoJS object into a utf8 string...
  const decrypted = CryptoJS.AES.decrypt(encrypted, MASTER_USER + MASTER_PASSWORD).toString(CryptoJS.enc.Utf8)

  console.log('@FILTER decrypted: ', decrypted)

  // Finally split the user:password format...
  const auth = decrypted.split(':')

  const [username, password] = auth

  console.log('@FILTER username: ', username)
  console.log('@FILTER password: ', password)

  // If the username isn't the same the client probably used the wrong master
  // password so return unauthorised...
  if (username !== userName) return res.status(401).end()

  try {
    // TODO: prevent making the dir if there's a docker error.

    const { stdout, stderr } = await execFile(__dirname + '/docker-useradd.sh', [username, password])
    console.log('@FILTER stdout: ', stdout)
    console.log('@FILTER stderr: ', stderr)

    res.send('Server created')

  } catch (error) {
    console.log('@FILTER error: ', error)
    if (error.message.includes('Command failed')) return res.status(503).send({ message: 'Docker failed' })
    if (error.message.includes('File exists')) return res.status(409).send({ message: 'User exists' })
    res.status(500).send({ message: error.message })

  }
}

async function getModule(req, res) {
  const { params } = req
  const { initialPath } = params
  const path = params[0]

  if (!path || (initialPath !== 'node_modules' && initialPath !== 'bower_components')) {
    return res.status(404).end()
  }

  try {
    const file = await readFile(initialPath + path, 'utf8')
    res.send(file)
  } catch (error) {
    res.status(500).end()
  }
}

module.exports = function(app) {
  app.get('/', renderIndex)
  app.get('/assets/:asset', sendAsset)
  app.get('/modules/:initialPath*?', getModule)
  app.get('/create-server/:userName', createServer)
  app.get('/:userName*?', response)
}
