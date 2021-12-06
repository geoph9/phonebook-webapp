const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

// console.log("Connecting to", url)

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
    number: {
        type: String,
        minLength: [8, 'Phone number must contain at least 8 digits.'],
        required: true,
    },
})
phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)

