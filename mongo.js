const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const setupDb = () => {
  const password = process.argv[2]
  const url =
  `mongodb+srv://geoph9:${password}@cluster0.tmepi.mongodb.net/phonebook-app?retryWrites=true&w=majority`

  mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
  })

  const phonebookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 2,
      unique: true,
    },
    number: {
      type: String,
      required: true,
    },
  })
  phonebookSchema.plugin(uniqueValidator);

  const Contact = mongoose.model('Contact', phonebookSchema)
  return Contact
}

const printContacts = () => {
  const Contact = setupDb();
  console.log("Phonebook:")
  Contact.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

const addNewContact = () => {
  const Contact = setupDb();
  const name = process.argv[3]
  const phonenumber = process.argv[4]
  const note = new Contact({
    name: name,
    number: phonenumber,
  })
  
  note.save().then(result => {
    console.log(`Added ${name} number ${phonenumber} to the phonebook.`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  printContacts();
} else if (process.argv.length === 5) {
  addNewContact();
} else {
  console.log('Please provide the password as an argument in order to see the current contacts: node mongo.js <password>')
  console.log('If you want to add a new contact then use the following format: node mongo.js <password> <name> <phonenumber>')
  process.exit(1)
}