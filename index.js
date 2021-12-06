const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const router = require('./router.js')
const io = new Server(server)

const port = 3000

router(app)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')

  })

  socket.on('chat message', msg => {
    console.log('message: ', msg)

    io.emit('chat message', msg)

  })
})


server.listen(port, () => {
  console.log(`listening on ${port}`)
})
