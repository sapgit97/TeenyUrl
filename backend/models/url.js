// importing mongoose dependancy
const mongoose = require('mongoose');
// importing config dependancy
const config = require('config');

// creating schema
const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    hits: Number,
    createdAt: { type: Date, expires: config.get('urlExpiry'), default: Date.now }
});

// exporting mongoose model
module.exports = mongoose.model('url', urlSchema);