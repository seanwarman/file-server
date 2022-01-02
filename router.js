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
  try {
    return res.render('index.ejs', { homeDirs: ['sean', 'yuri', 'ella'] })

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

module.exports = function(app) {
  app.get('/', renderIndex)
  app.get('/assets/:asset', sendAsset)
  app.get('/:userName*?', response)
}
