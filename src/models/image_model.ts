
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ImageSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    desc: String,
    image : {
        data: Buffer,
        contentType: String
    }
})


ImageSchema.plugin(uniqueValidator)
const ImageModel = mongoose.model('imageModel', ImageSchema)
module.exports = ImageModel
