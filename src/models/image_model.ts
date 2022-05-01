
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ImageSchema = mongoose.Schema({
    name : String,
    desc: String,
    image : {
        data: Buffer,
        contentType: String
    },
    uid: {
        type: String,
        unique: true,
        required: true,
    },
})


ImageSchema.plugin(uniqueValidator)

const collectionName = 'images'
const ImageModel = mongoose.model('imageModel', ImageSchema, collectionName)
module.exports = ImageModel
