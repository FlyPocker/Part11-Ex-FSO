const personsRouter = require('express').Router()
const Number = require('../models/numbers')

personsRouter.get('/', (request, response, next) => {
  Number.find({}).then(numbers => {
    response.json(numbers)
  })
  .catch(error => next(error))
})

personsRouter.get('/info', (request, response, next) => {
  Number.countDocuments({})
    .then(count => {
      const currentTime = new Date().toString();
      response.send(
        `<div>
            <p>Phonebook has ${count} numbers</p>
            <p>${currentTime}</p>
        </div>`        
      )
    })
    .catch(error => next(error))
})

personsRouter.get('/:id', (request, response, next) => {
  Number.findById(request.params.id)
    .then(number => {
      if(number) {
        response.json(number)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Number.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body
  if(!body.name || !body.number) {
    return response.status(400).json({error: 'name or number is missing'})
  }
  Number.findOne({name: body.name}).then(existingNumber => {
    if(existingNumber) {
      return response.status(400).json({error: 'name must be unique'})
    }
    
    const number = new Number({
      name: body.name,
      number: body.number
    })
    
    number.save().then(savedNumber => {
      response.status(201).json(savedNumber)
    })
    .catch(error => next(error))
  })
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body
  
  Number.findByIdAndUpdate(
    request.params.id, 
    { name, number }, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      if(updatedNote){
        response.json(updatedNote)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

module.exports = personsRouter