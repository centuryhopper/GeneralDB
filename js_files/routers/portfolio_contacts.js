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
const portfolioContactModel = require('../models/portfolio_contact_model');
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = req.body;
        var contact = new portfolioContactModel({
            id: v4(),
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        });
        yield contact.save();
        res.send('saved a contact\'s information into the database!');
    }
    catch (e) {
        res.send(e.message);
    }
}));
module.exports = router;
