require('dotenv').config();
const app = require('./app.js');
const connectDB = require('./config/db.js')

const path = require('path');

const PORT = process.env.PORT || 3000

connectDB()


app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});

