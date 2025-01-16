const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async (req, res) =>{
    try{
        mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log('connected to DB')
    }
    catch{
        console.error("Error connecting to DB", error.message)
    }
   
}

module.exports = connectDB