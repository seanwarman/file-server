const app = require('express')() 
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./app/router.js')

const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cors())

router(app)

app.listen(port)
