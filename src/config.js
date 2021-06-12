// Requeriments
const express = require('express')

// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 3001)

// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Routes
app.use(require('./routes/index.routes'))

module.exports = app