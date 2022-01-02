const express = require('express')
const http = require('http')
const router = require('./router.js')
const marked = require('marked')
const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)

const app = express()
app.set('views', './home')
app.engine('ejs', require('ejs').renderFile)
app.engine('md', async (filePath, options, cb) => {
  const file = await readFile(filePath, 'utf8')
  return cb(null, marked.parse(file))

})

const server = http.createServer(app)

const port = process.argv[2] || 80

router(app)

server.listen(port, () => {
  console.log(`listening on ${port}`)
})
