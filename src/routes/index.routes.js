const {Router} = require('express');
const router = Router();
let persons = require('../database')

// Index
router.get('/', (req,res) => res.send('Hello World'))

// Get All Persons
router.get('/api/persons', (req,res) => res.json(persons))

// Get One Person
router.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end
    
})

// Create Person
router.post('/api/persons', (req,res) => {
    const person = req.body
	const findName = persons.find(personName => personName.name === person.name)
	const findNumber = persons.find(personNumber => personNumber.number === person.number)
    
	if(!person || !person.name){
		return res.status(400).json({
			error: "person.name is missing"
		})
	}
    if(!person.number){
		return res.status(400).json({
			error: "person.number is missing"
		})
	}
    if(findName){
		return res.status(400).json({
			error: "person.name is already exist"
		})
	}
    if(findNumber){
		return res.status(400).json({
			error: "person.number is already exist"
		})
	}
	
	const ids= persons.map(person => person.id)
	const maxId = Math.max(...ids)
	
	const newPerson = {
		id: maxId + 1,
		name: person.name,
		number: person.number
	}

	persons = [...persons, newPerson]
	
	res.status(201).json(newPerson)
} );

// Delete Person
router.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
    
})

// Info
router.get('/info', (req,res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
                
    `)
});

module.exports = router