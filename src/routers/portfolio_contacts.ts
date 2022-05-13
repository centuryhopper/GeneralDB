const { v4 } = require('uuid')
import express from 'express'
const router = express.Router()
const portfolioContactModel = require('../models/portfolio_contact_model')

router.post('/', async (req, res) => {
    try {
        const obj = req.body

        var contact = new portfolioContactModel({
            id: v4(),
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        })

        await contact.save()

        res.send('saved a contact\'s information into the database!')
    } catch (e: any) {
        res.send(e.message)
    }
})

module.exports = router
