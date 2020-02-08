// importing mongoose dependancy
const mongoose = require('mongoose');

// importing config dependancy
const config = require('config');

// getting mongodb connection url
const dbUrl = config.get('mongoUrl');

// function to connect to mongodb
const connectDb = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDb connected...');
    } catch(error) {
        console.error(error.message);
        process.exit(1);
    }
}

// exporting the connectDb function
module.exports = connectDb;