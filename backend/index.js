// importing express dependency
const express = require('express');
// importing database dependecies
const connectDb = require('./config/db');
// importing config dependancy
const config = require('config');
// importing cors dependancy
const cors = require('cors');

//connecting to database
connectDb();
// creating express application
const app = express();
// using cors
app.use(cors());
// accepts json data to api
app.use(express.json({extended: false}));

// configuring routes
app.use('/', require('./routes/index'));
app.use('/api/v1', require('./routes/url'));

// getting port
const PORT = process.env.PORT || config.get('port');
// app listening on given port
app.listen(PORT, () => console.log('Server running on port ', PORT));

module.exports = app; // for testing