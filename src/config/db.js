const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const connectDB = async () =>{
    try{
       await  mongoose.connect(process.env.DB_CONNECTION_STRING) 

        console.log('connected to DB')
     } catch (error){
        console.error("Error connecting to DB", error.message)
    }
   
};

module.exports = connectDB




