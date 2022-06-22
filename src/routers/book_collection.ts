const { v4 } = require('uuid')
import express from 'express'
const router = express.Router()
const bookModel = require('../models/book_model')

/* TODO add these to the database

    cracking the coding interview (gale lockman mcdowell)

    how to win friends and influence people (dale carnegie)
    ISBN-10 : 0671027034
    ISBN-13 : 978-0671027032
    https://www.youtube.com/watch?v=YKAfKprBXQc

    atomic habits
    four-work week (tim ferris)
    i will teach you to be rich (ramit sethi)

    automate the boring stuff with python 2nd edition (al sweigart)
    ISBN-13: 978-1593279929
    ISBN-10: 1593279922

    C++ crash course (josh lospinoso)
    ISBN-13: 978-1593278885
    ISBN-10: 1593278888


    https://www.reddit.com/r/datascience/comments/qfj9u5/what_kind_of_books_do_you_recommend/

    Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems 2nd Edition
    ISBN-13: 978-1492032649
    ISBN-10: 1492032646

 */

router.route('/').get(async (req, res) => {
    let results : string[] = ['placeholder']

    try {
        const contactModels = await bookModel.find({})
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
        var contact = new bookModel({
            id: v4(),
            title: req.body.title,
            author: req.body.author,
            isbn: {
                13: req.body.isbn13,
                10: req.body.isbn10
            },
            audioBookLink: req.body.audioBookLink
        })

        await contact.save()

        res.send(`saved the book "${req.body.title}" into the database!`)
    } catch (e: any) {
        res.send(e.message)
    }
})

module.exports = router
