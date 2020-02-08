// importing express dependency
const express = require('express');
// setting up express router
const router = express.Router();
// importing url model
const url = require('../models/url');

/*
 *  @route GET /:code
 *  @desc  gets original url from short url
 */
router.get('/:code', async (req, res) => {
    try {
        // checking if url in database already
        const getUrl = await url.findOne({ urlCode: req.params.code });

        // if url found in database already
        if (getUrl) {
            // increment hits to url
            getUrl.hits++;
            // update createdAt field
            getUrl.createdAt = new Date()
            //save the updated url object
            await getUrl.save();
            // response is redirect to original url
            return res.redirect(getUrl.longUrl);
        } else {
            // response is no url found
            return res.status(404).json('No url found');
        }
    } catch (error) {

        // server error
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

// exporting the router
module.exports = router;