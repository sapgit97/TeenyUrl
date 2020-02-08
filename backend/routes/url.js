// importing express dependency
const express = require('express');
// setting up express router
const router = express.Router();
// importing valid-url dependancy
const validateUrl = require('valid-url');
// importing shortid dependancy
const shortid = require('shortid');
// importing config dependancy
const config = require('config');
// importing url model
const url = require('../models/url');

/*
 *  @route POST /api/v1/url
 *  @desc  creates a short url
 */
router.post('/url', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
    
    // validating base url
    if (!validateUrl.isUri(baseUrl)) {
        return res.status(400).json('Invalid base url');
    }
    
    // check long url
    if (validateUrl.isUri(longUrl)) {
        try {
            // checking if url in database already
            let getUrl = await url.findOne({ longUrl });
            
            // if url found in database already
            if (getUrl) {
                // response body is database url
                res.json(getUrl);
            } else {
                // generating url code
                const urlCode = shortid.generate();

                // generating short url 
                const shortUrl = baseUrl + '/' + urlCode;

                // initializing hits
                const hits = 0;

                // creating database url object
                getUrl = new url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    hits,
                    createdAt: new Date()
                });

                // saving url object to database
                await getUrl.save();

                // response body is generated url object
                res.json(getUrl);
            }
        } catch(error) {
            // server error
            console.error(error);
            res.status(500).json('Internal server error');
        }
    } else {
        // invalid url input
        res.status(400).json('Invalid url input');
    }
});

/*
 *  @route GET /api/v1/urls/:page/:limit
 *  @desc  gets all urls reverse sorted by number of hits
 */
router.get('/urls/:page/:limit', async (req, res) => {
    try {
        const limit = parseInt(req.params.limit);
        const skip = (parseInt(req.params.page)-1) * limit;

        // getting urls sorted by hits
        const getUrl = await url.find().sort({'hits': -1}).limit(limit).skip(skip);

        // response body is generated url object
        res.json(getUrl);
    } catch(error) {
        // server error
        console.error(error);
        res.status(400).json('Invalid url input');
    }
});

// exporting the router
module.exports = router;