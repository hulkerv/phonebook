// .env Config
require('dotenv').config()

// Server Config
const app = require('./config')

// Database connection
require('./database')

// Start the server
app.listen(app.get('port'), ( ) => console.log(`Server on por ${app.get('port')}`))