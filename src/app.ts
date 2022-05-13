import express from 'express'
import mongoose, { ConnectOptions } from "mongoose"
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()
const PORT = process.env.PORT || 3000
const imagesRouter = require('./routers/images')
const portfolioContactsRouter = require('./routers/portfolio_contacts')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
.then((res) => {
    console.log(
        'Connected to db'
        );
    })
.catch((err) => {
    console.log(
        `error connecting to db`,
        err
        );
    })

app.use(express.json());
// app.use('/images' , imagesRouter)
app.use('/portfolio_contacts' , portfolioContactsRouter)


app.listen(PORT, () => console.log(`server is running http://localhost:${PORT}/`))
