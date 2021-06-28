const supertest =  require('supertest')
const {app} =  require('../')
const Person = require('../models/Person')

const api = supertest(app)

const getAllPersons = async () => {
    const personsDB = await Person.find({})
    return personsDB.map(person => person.toJSON())
}

module.exports = {
    api, 
    getAllPersons
}