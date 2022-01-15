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

  const proc = pty.spawn(shell, [] , {
    name: socket.id,
    cwd: __dirname,
    env: process.env,
    handleFlowControl: true,
  })

  // In
  socket.on('term-cmd', termCmdIn(proc))
  socket.on('window-resize', windResize(proc))

  // Out
  proc.on('data', termCmdOut(io))
})

