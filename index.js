const express = require('express')
const http = require('http')
const router = require('./router.js')
require('dotenv').config()

const app = express()
const server = http.createServer(app)

const port = 8080

router(app)

// io.on('connection', (socket) => {
//   console.log('a user connected')

//   socket.on('disconnect', () => {
//     console.log('user disconnected')

//   })

//   socket.on('chat message', msg => {
//     console.log('message: ', msg)

//     io.emit('chat message', msg)

//   })
// })


server.listen(port, () => {
  console.log(`listening on ${port}`)
})
