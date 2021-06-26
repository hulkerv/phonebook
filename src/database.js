const mongoose = require('mongoose')

const {MONGO_DB_URI} = process.env

mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db =>{
        console.log('Database is connected')
})
    .catch(err =>{
        console.log(err)
})