"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const PortfolioContactSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    email: String,
    subject: String,
    message: String,
});
PortfolioContactSchema.plugin(uniqueValidator);
const collectionName = 'PortfolioContact';
const PortfolioContactModel = mongoose.model('PortfolioContact', PortfolioContactSchema, collectionName);
module.exports = PortfolioContactModel;
