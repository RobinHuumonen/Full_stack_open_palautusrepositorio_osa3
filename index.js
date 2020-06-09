require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Note = require('./models/person')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('showPOSTData', function (req, res) {
  return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :showPOSTData'))

let persons = [
  { 
    name: "Arto Hellas", 
    number: "040-123456",
    id: 1
  },
{ 
  name: "Ada Lovelace", 
  number: "39-44-5323523",
  id: 2
},
{ 
  name: "Dan Abramov", 
  number: "12-43-234345",
  id: 3
},
{ 
  name: "Mary Poppendieck", 
  number: "39-23-6423122",
  id: 4
},
{
  name: "Ryan Frost",
  number: "672-5673",
  id: 5
},
{
  name: "Guy C. Roberts",
  number: "1-748-576-8229",
  id: 6
}
]

app.get('/', (req, res) => {
  res.send('<h1>Works</h1>')
})

app.get('/api/persons', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/info', (req, res) => {
  const info = {
    phonebookSize: persons.length,
    timeStamp: new Date(),
  }
  res.send(
    `<div>
      <p>Phone book has info for ${info.phonebookSize} people
      </p>
      <p>${info.timeStamp}</p>
    </div>`
  )

})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const generateId = () => {
  const id = persons.length > 0 
    ? Math.floor(Math.random() * Math.pow(10, 3))
    : 0
  if (persons.some(person => person.id === id)) {
    return generateId()
  }
  else {
    return id
  }
}

app.post('/api/persons',(req, res) => {
  const body = req.body
  if (body.name === null || body.name.length === 0) {
      return res.status(400).json({
        error: 'Missing name'
      })
    }

  if (body.number === null || body.number.length === 0) {
      return res.status(400).json({
        error: 'Missing number'
      })
  }

  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }

  const person = {
      name: body.name,
      number: body.number,
      id: generateId()
  }

  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})