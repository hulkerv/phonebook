const { server } = require('../index')
const {api, getAllPersons} = require('./helpers')
const Person =  require('../models/Person')
const mongoose = require('mongoose')

describe('Creating a new person', ()=>{

    beforeEach( async() => {
        // Delete Persons
        await Person.deleteMany({})
        
        const person = new Person({name:'Kevin', number:4241556973})
        
        await person.save()
    })
    
    test('works as expected creating a fresh person', async () => {
        
        // Get Persons Before Create
        const personsAtStart = await getAllPersons()
        
        // Create a New Person
        const newPerson = {
            name: 'Karelys',
            number: 4125689732,
        }
        
        // Call To The App
        await api
            .post('/api/persons')
            .send(newPerson)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        // Get Persons After Create
        const personsAtEnd = await getAllPersons()
        
        // Test Persons Collection Length
        expect(personsAtEnd).toHaveLength(personsAtStart.length + 1)
        
        //Get All Persons Name
        const personsName= personsAtEnd.map(person => person.name)
    
        expect(personsName).toContain(newPerson.name)
    })
        
        test('creation fails tith proper statuscode and message if name is already taken', async() => {
            const personsAtStart = await getAllPersons()
            
            const newPerson = {
                name: 'Kevin', 
                number: 4241556974
            }
            
            const result = await api
                .post('/api/persons')
                .send(newPerson)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(result.body.errors.name.message).toContain('expected `name` to be unique')
            
            const personsAtEnd = await getAllPersons()
            expect(personsAtEnd).toHaveLength(personsAtStart.length)
        })
        
        test('creation fails tith proper statuscode and message if number is already taken', async() => {
            const personsAtStart = await getAllPersons()
            
            const newPerson = {
                name: 'Karelys', 
                number: 4241556973
            }
            
            const result = await api
                .post('/api/persons')
                .send(newPerson)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(result.body.errors.number.message).toContain('expected `number` to be unique')
            
            const personsAtEnd = await getAllPersons()
            expect(personsAtEnd).toHaveLength(personsAtStart.length)
        })
    
    afterAll(() =>{
        mongoose.connection.close()
        server.close()
    })
})