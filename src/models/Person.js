const {Schema, model} = require('mongoose')

const personSchema = new Schema({
    name: String,
    number: Number,
    date: Date
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = model('Person', personSchema)
