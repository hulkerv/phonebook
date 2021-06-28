const uniqueValidator = require('mongoose-unique-validator')
const {Schema, model} = require('mongoose')

const personSchema = new Schema({
    name: {
        type:String,
        unique:true
    },
    number: {
        type:Number,
        unique:true
    },
    date: Date
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = model('Person', personSchema)
