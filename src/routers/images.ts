
import express from 'express'
import mongoose, { ConnectOptions } from "mongoose"
const multer = require('multer')
const router = express.Router()
const imgModel = require('../models/image_model')
const fs = require('fs')
const path = require('path')

mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
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
    });

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        cb(null, 'uploads')
    },
    filename: (req:any,file:any,cb:any) =>
    {
        // cb(null, file.originalname)
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: storage}).single('image')

router.get('/', (req, res) => {
    res.send('images home page')
})

router.post('/upload', (req, res) => {
    res.send('uploaded images to db')
})


module.exports = router

