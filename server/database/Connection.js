const mongoose = require('mongoose')

//===========================Connection Request ============================
const DB = process.env.DATABASE

//===========================Connection With Databse ============================
mongoose.connect('mongodb://localhost/audioNFT')
    .then(() => console.log("Database Connectd"))
    .catch((error)=> console.log(error))