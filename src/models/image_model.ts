const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ImageSchema = mongoose.Schema({
    id : {
        type: String,
        unique: true,
    },
    name : {
            type: String,
            unique: true,
            required: [true, 'please enter a name'],
    },
    description: String,
    image : {
        data: Buffer,
        contentType: String
    },

})


ImageSchema.plugin(uniqueValidator)

const collectionName = 'images'
const ImageModel = mongoose.model('imageModel', ImageSchema, collectionName)
module.exports = ImageModel
