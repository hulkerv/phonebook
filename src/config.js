// Requeriments
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 3001)

// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
morgan.token("reqBody", (req,res) => {
    return JSON.stringify(req.body)   
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqBody"))
app.use(cors())

// Routes
app.use(require('./routes/index.routes'))

module.exports = app