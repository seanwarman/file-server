const pty = require('node-pty')
const os = require('os')

const shell = os.platform() === 'darwin' ? 'zsh' : 'bash'

const termCmdIn = proc => data => {
  proc.write(data)
}

const windResize = proc => ({ cols, rows }) => {
  cols > 0 && rows > 0 && proc.resize(cols, rows)
}

const termCmdOut = io => data => {
  data && io.emit('term-cmd', data)
}

module.exports = io => io.on('connection', socket => {
  // TODO: work out how to keep the process running after the user's closed the
  // window. So when they refresh they don't have to start from scratch.

  socket.on('user-connect', ({ userName, id }) => {
    if (id !== socket.id) {
      console.log('Ids don\'t match')
      return
    }

    const proc = pty.spawn('docker', ['exec', '-it', '-u', userName, `${userName}-server`, 'bash'] , {
      name: socket.id,
      cwd: __dirname,
      env: process.env,
    })

    // In
    socket.on('window-resize', windResize(proc))
    socket.on('term-cmd', termCmdIn(proc))

    // Out
    proc.on('data', termCmdOut(io))
  })
})

