const app = require('./config')
app.listen(app.get('port'), ( ) => console.log(`Server on por ${app.get('port')}`))