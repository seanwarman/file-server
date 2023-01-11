const HttpMaster = require('http-master');
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const router = require('./router.js')
const marked = require('marked')
const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)
require('dotenv').config()

const { PORT, GOTTY_PORT, EXPRESS_PORT } = process.env

const app = express()

const httpMaster = new HttpMaster();

httpMaster.init({
  watchConfig: true,
  ports: {
    [PORT]: {
      router: {
        '/consolews': `0.0.0.0:${GOTTY_PORT}/ws`,
        '/console/*': `0.0.0.0:${GOTTY_PORT}/[1]`,
        '/auth_token.js': `0.0.0.0:${GOTTY_PORT}/auth_token.js`,
        '*': EXPRESS_PORT
      },
    },
  },
}, e => {
  console.log(e)
})

app.use(bodyParser.json())
app.set('views', './home')
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').renderFile)
app.engine('md', async (filePath, options, cb) => {
  const file = await readFile(filePath, 'utf8')
  return cb(null, marked.parse(file))
})

const server = http.createServer(app)

router(app)

server.listen(EXPRESS_PORT, () => {
  console.log(`listening on ${PORT}`)
})
