"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config = require('./utils/config');
const logger = require('./utils/logger');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const imagesRouter = require('./routers/images');
const portfolioContactsRouter = require('./routers/portfolio_contacts');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((res) => {
    console.log('Connected to db');
})
    .catch((err) => {
    console.log(`error connecting to db`, err);
});
app.use(express_1.default.json());
// app.use('/images' , imagesRouter)
app.use('/portfolio_contacts', portfolioContactsRouter);
app.listen(PORT, () => console.log(`server is running http://localhost:${PORT}/`));
