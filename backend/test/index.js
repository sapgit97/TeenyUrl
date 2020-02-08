//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// importing express dependency
const express = require('express');
// setting up express router
const router = express.Router();
// importing url model
const url = require('../models/url');
// importing chai dependancy
const chai = require('chai');
// importing chaiHttp dependancy
const chaiHttp = require('chai-http');
// importing index
const server = require('../index');
// importing mongoose dependancy
const mongoose = require('mongoose');
// importing config dependancy
const config = require('config');

// setting up chai.should()
const should = chai.should();


chai.use(chaiHttp);

// parent test block
describe('index', () => {
    
    /* Testing => code not found
    *  @route GET /:code
    *  @desc  gets original url from short url
    */
    describe('/GET :code', () => {

        it('should return 404', (done) => {
            chai.request(server)
                .get('/qFuxku89')
                .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.eql('No url found');
                    done();
                });
        });
    });

    /* Testing => code found
    *  @route GET /:code
    *  @desc  gets original url from short url
    */
    describe('/GET :code', () => {
        after((done) => {
            url.remove({}, (err) => { 
            done();           
            });        
        });
        // saving url object to database
        new url({
            longUrl: 'https://www.google.com/',
            shortUrl: config.get('baseUrl') + '/qFuxkux9',
            urlCode: 'qFuxkux9',
            hits: 0,
            createdAt: new Date()
            }).save();
        it('should return 200', (done) => {
            chai.request(server)
                .get('/qFuxkux9')
                .end((err, res) => {
                        res.should.have.status(200);
                    done();
                });
        });
    });
});