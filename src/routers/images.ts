import { resolveSrv } from 'dns/promises'
import express from 'express'
const router = express.Router()
const imgModel = require('../models/image_model')

// no callbacks needed as parameters when doing .promises
const fs = require('fs').promises




router.route('/').get(
    async (req, res) => {


        try {
            const base64 = await fs.readFile("./test_images/0.png", "base64")
            // res.send(`base64: ${base64}`)
            const buffer = Buffer.from(base64, "base64");

            // TODO: add the buffer contents into the mongodb database
            res.send(buffer)

            await fs.writeFile("output.png", buffer)

        } catch (e) {
            res.send(e)

        }



        // await imgModel.findOne({uid: "0"}, async (err:any, data:any) => {
        //     if (err) console.log(err)
        //     else
        //     {
        //         console.log(data.image.data);
        //         const buffer = Buffer.from(data.image.data, "base64")
        //         await fs.writeFile("dummy.png", buffer, function (error:any) {
        //             if (error) throw error;
        //             console.log('File saved.')
        //         })
        //         res.send('success')
        //     }

        // }).clone().catch((err:any)=>{ console.log(err)})
    // await imgModel.find({}, (err:any, data:any) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else
    //     {
    //         res.send(data)
    //     }
    // }).clone().catch((err:any)=>{ console.log(err)})
}).post(async (req:any, res:any, next:any) => {


    const DIR = '/Users/leozhang/Documents/Github/nasa_daily_pic_collection/archive/'

    await fs.readdir(DIR, (err: Error, files: string[]) => {
        if (err) {
            throw err
        }

        // console.log(files.length)

        // files object contains all files names
        // log them on console
        files.forEach((file:string, idx:number) => {
            // console.log(file, idx)
            var img = new imgModel({
                // name: req.body.name,
                // desc: req.body.desc,
                uid: idx,
                name: file,
                desc: 'image ' + idx,
                image: {
                    // data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    data: DIR+file,
                    contentType: 'image/png'
                }
            })

            img.save((err:any, data:any) => {
                // console.log(data);
                if (err)
                {
                    throw err
                }
                else
                {
                }
            })
        })
    })


    res.send(`inserted all images into the database`)

})


// router.post('/upload', (req, res) => {
//     res.send('uploaded images to db')
// })


module.exports = router

