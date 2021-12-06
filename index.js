require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Phonebook = require('./models/phonebook')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.use(morgan((tokens, req, res) => {
  let out = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]
  if (tokens.method(req, res) === "POST") {
  	//console.log(JSON.stringify(req.body))
  	out = out.concat(JSON.stringify(req.body))
  }
  return out.join(' ')
}))

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]


// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.get('/', (request, response) => {
  response.send('<h1>Phonebook App!</h1>')
})

app.get('/info', (request, response) => {
  Phonebook.find({}).then(persons => {
    let html = `
      <p>Phonebook has info for ${persons.length} people.</p>
      <p>${new Date()}</p>`
    response.send(html);
  })
  
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.name.toString().length === 0) {
    return response.status(400).json({ error: 'Name is missing.' })
  }
  if (body.number === undefined || body.number.toString().length === 0) {
    return response.status(400).json({ error: 'Phone number is missing.' })
  }
  const newPerson = {
    name: body.name,
    number: body.number,
  }
  // { new: true } will cause our event handler to be called with the 
  // new modified document instead of the original.
  Phonebook.findByIdAndUpdate(request.params.id, newPerson, {new: true, runValidators: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  
})

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    console.log(error)
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id).then(person => {
    response.status(204).json(person)
  }).catch(err => {
    next(err);
    // response.status(400).json({error: `Could not find a person with id ${request.params.id}.`})
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if (body.name === undefined || body.name === '') {
  //   return response.status(400).json({ error: 'Name is missing.' })
  // }
  // if (body.number === undefined || body.number === '') {
  //   return response.status(400).json({ error: 'Phone number is missing.' })
  // }
  const newPerson = new Phonebook({
    name: body.name,
    number: body.number,
  })

  newPerson.save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
  .catch(err => {
    next(err)
  })
  // // Try to find if a person with the same name exists
  // Phonebook.find({name: body.name}).then(person => {
  //   console.log(`Found persons: ${person}`)
  //   // if (person.length > 0) {
  //   //   return response.status(400).json({ error: `Person with name ${person.name} already exists in the database.`})
  //   // }
  //   const newPerson = new Phonebook({
  //     name: body.name,
  //     number: body.number,
  //   })
  
  //   newPerson.save()
  //   .then(savedPerson => savedPerson.toJSON())
  //   .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
  //   .catch(err => {
  //     next(err)
  //   })
  // }).catch(err => {
  //   console.log(`Caught error: ${err.message}`)
  //   return response.status(400).json({error: `Could not add person with name ${body.name}.`})
  // })
  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
