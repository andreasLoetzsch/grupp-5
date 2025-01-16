require('dotenv').config();
const app = require('./app.js');

const path = require('path');

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});

