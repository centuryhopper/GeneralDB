import express from 'express'
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()
const PORT = process.env.PORT || 3000
const imagesRouter = require('./routers/images')
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.use('/images' , imagesRouter)

app.listen(PORT, () => console.log("server is running"))
