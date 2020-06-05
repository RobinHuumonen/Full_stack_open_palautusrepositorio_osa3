const express = require('express')
const app = express()

app.use(express.json())

const persons = [
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
  res.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})