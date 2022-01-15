const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const bodyParser = require('body-parser')
const marked = require('marked')
const fs = require('fs')
const promisify = require('util').promisify

const httpRouter = require('./router.js')
const socketRouter = require('./socket-router.js')

const app = express()
const readFile = promisify(fs.readFile)

app.use(bodyParser.json())
app.set('views', './app')
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').renderFile)
app.engine('md', async (filePath, options, cb) => {
  const file = await readFile(filePath, 'utf8')
  return cb(null, marked.parse(file))

})

const server = http.createServer(app)
const io = new Server(server)

httpRouter(app)
socketRouter(io)

const port = process.argv[2] || 80

server.listen(port, () => {
  console.log(`listening on ${port}`)
})
