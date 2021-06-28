const Person =  require('../models/Person')
const personsCtrls = {}

// Get All Persons
personsCtrls.getAll = async ( req, res, next ) => {
    try{
        const persons = await Person.find({})
        res.json(persons)
    }catch(err){
        next(err)
    }
}

// Get One Person
personsCtrls.getOne = async ( req, res, next ) => {
    try{
        const { id } = req.params
        const person = await Person.findById(id)
        res.json(person) 
    }catch(err){
        next(err)
    }
}

// Create Person
personsCtrls.createPerson = async ( req, res, next ) => {
        const { name, number } = req.body

        if(!name) return res.status(400).json({error: "name is missing"})
        if(!number) return res.status(400).json({error: "number is missing"})
        
        const newPerson = new Person({
            name,
            number,
            date: new Date()
        })

    try{ 
        const savedPerson = await newPerson.save()
	    res.status(201).json(savedPerson)  
    }catch(error){
        res.status(400).json(error)
    }
}

// Delete Person
personsCtrls.deletePerson = async ( req, res, next ) => {
    try{ 
        
        const { id } = req.params 
        
        await Person.findByIdAndRemove(id) 
        
        res.status(204).end()
        
    }catch(err){
        
        next(err)
        
    }
}

// Persons Info
personsCtrls.info = async (req,res) => {
    const persons = await Person.find({})
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>             
    `)
}

module.exports = personsCtrls