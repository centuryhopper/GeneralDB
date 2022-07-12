const { v4 } = require('uuid')
import express from 'express'
const router = express.Router()
const portfolioContactModel = require('../models/portfolio_contact_model')

router.route('/').get(async (req, res) => {
    let results : string[] = ['placeholder']

    try {
        const contactModels = await portfolioContactModel.find({})
        for (const contactModel of contactModels)
        {
            results.push(contactModel)
        }

    } catch (e : any) {
        results.push(`${e.name} ||| ${e.message}`)

    }

    res.send(results)

}).post(async (req, res) => {
    try {
        const obj = req.body

        const values = Object.values(obj)

        // make sure object is valid before sending to database
        if (values.length < 4 || values.some(elem => elem === undefined || elem === null || elem === ''))
            throw new Error('not all fields were filled properly')

        var contact = new portfolioContactModel({
            id: v4(),
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        })

        await contact.save()

        res.send(`saved a contact\'s information: ${JSON.stringify(obj)} into the database!`)
    } catch (e: any) {
        res.send(e.message)
    }
})

module.exports = router

