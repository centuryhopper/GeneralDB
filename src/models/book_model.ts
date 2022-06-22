
export {}
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const BookSchema = mongoose.Schema({
    id : {
        type: String,
        unique: true,
        required: true,
    },
    title : String,
    author: String,
    isbn: {
        10: String,
        13: String,
    },
    audioBookLink: String,
})


BookSchema.plugin(uniqueValidator)

const collectionName = 'BookCollection'
const BookModel = mongoose.model('Book', BookSchema, collectionName)
module.exports = BookModel
