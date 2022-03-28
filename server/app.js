const express = require('express');
const dotenv = require('dotenv');
const cookiParser = require('cookie-parser');
const app = express();

//===========================CONFIG FILE PATH===========================//
dotenv.config({ path: './config.env' })

//===========================DATABASE CONNECTION PATH===========================//
require('./database/Connection')

app.use(cookiParser());

//===========================Middleware ===========================//
app.use(express.json());

//===========================Create Route ===========================//
app.use(require('./router/Routes'))

//===========================Listing Server ==========================//
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is Listining on port ${PORT}`);
})


