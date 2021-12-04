const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./server/router.js')

const app = express() 
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cors())

router(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
