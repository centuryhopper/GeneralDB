const { v4 } = require('uuid')
import express from 'express'
const router = express.Router()
const imgModel = require('../models/image_model')

// no callbacks needed as parameters when doing .promises
const fs = require('fs').promises

// I just care about storing and retrieving images for this image router, so I don't plan on creating any put or delete routes.

router.route('/').get(
    async (req, res) => {

        let results : string[] = ['placeholder']

        try {
            const imageDatas = await imgModel.find({})
            for (const imageData of imageDatas)
            {
                const buffer = imageData.image.data
                const filePathComplete = `${process.env.DESTINATION_PATH}${imageData.name}`
                await fs.writeFile(filePathComplete, buffer)
                results.push(`saved image to ${filePathComplete}`)
            }



        } catch (e : any) {
            results.push(`${e.name} ||| ${e.message}`)

        }

        res.send(results)
    }
)
.post(
    async (req:any, res:any, next:any) => {

        const DIR = process.env.SOURCE_PATH

        let results : string[] = ['placeholder']

        try {
            const files : string[] = await fs.readdir(DIR)

            // if (files.length !== new Set(files).size)
            //     throw new Error('the list is not unique')
            // else
            // {
            //     console.log('list is unique');
            // }

            // files object contains all files names
            // log them on console
            for (const [idx, file] of files.entries())
            {
                // console.log(file)
                // if (idx !== 0) break
                const fileContentsInBase64 = await fs.readFile(DIR+file, "base64")
                const buffer = Buffer.from(fileContentsInBase64, "base64");

                // console.log(file, idx)
                var img = new imgModel({
                    id: v4(),
                    name: file,
                    description: 'NASA image of the day',
                    image: {
                        // when retrieving the data from the mongodb database, we can directly pass it to fs.writeFile
                        data: buffer,
                        contentType: 'image/png'
                    }
                })

                const res = await img.save()
                results.push(`saved image named: ${file}`)
            }
        }
        catch (e : any) {
            results.push(`(${e.name} ||| ${e.message})`)
        }

        res.send(results)
    }
,)




module.exports = router

