const mongoose = require('mongoose')
// Prosessiargumentti indeksillä 2 = 1.

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://innl:${password}@clusterforosa3-t1gu0.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
  }
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length >= 4) {
  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else {
  console.log('Phone book: ');
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number);
      
    })
    mongoose.connection.close()
  })
}


