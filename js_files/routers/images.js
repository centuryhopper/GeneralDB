"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v4 } = require('uuid');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const imgModel = require('../models/image_model');
// no callbacks needed as parameters when doing .promises
const fs = require('fs').promises;
// I just care about storing and retrieving images for this image router, so I don't plan on creating any put or delete routes.
router.route('/').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let results = ['placeholder'];
    try {
        const imageDatas = yield imgModel.find({});
        for (const imageData of imageDatas) {
            const buffer = imageData.image.data;
            const filePathComplete = `${process.env.DESTINATION_PATH}${imageData.name}`;
            yield fs.writeFile(filePathComplete, buffer);
            results.push(`saved image to ${filePathComplete}`);
        }
    }
    catch (e) {
        results.push(`${e.name} ||| ${e.message}`);
    }
    res.send(results);
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const DIR = process.env.SOURCE_PATH;
    let results = ['placeholder'];
    try {
        const files = yield fs.readdir(DIR);
        // if (files.length !== new Set(files).size)
        //     throw new Error('the list is not unique')
        // else
        // {
        //     console.log('list is unique');
        // }
        // files object contains all files names
        // log them on console
        for (const [idx, file] of files.entries()) {
            // console.log(file)
            // if (idx !== 0) break
            const fileContentsInBase64 = yield fs.readFile(DIR + file, "base64");
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
            });
            const res = yield img.save();
            results.push(`saved image named: ${file}`);
        }
    }
    catch (e) {
        results.push(`(${e.name} ||| ${e.message})`);
    }
    res.send(results);
}));
module.exports = router;
