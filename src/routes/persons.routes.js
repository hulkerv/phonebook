const { Router } = require('express')
const router = Router()
const {getAll,
       getOne,
       createPerson,
       deletePerson,
       info} = require('../controllers/persons.controllers')

// Info
router.get('/info', info)

// Get All Persons
router.get('/', getAll)

// Get One Person
router.get('/:id', getOne)

// Create Person
router.post('/', createPerson)

// Delete Person
router.delete('/:id', deletePerson)


module.exports = router