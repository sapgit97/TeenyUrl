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
    
    /* Testing => urls analytics
    *  @route GET /api/v1/urls/:page/:limit
    *  @desc  gets all urls reverse sorted by number of hits
    */
    describe('/GET /urls/:page/:limit', () => {
        
        it('should return 200', (done) => {
            chai.request(server)
                .get('/api/v1/urls/1/1')
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /* Testing => valid long url
    *  @route POST /api/v1/url
    *  @desc  creates a short url
    */
    describe('/POST /api/v1/url', () => {
        after((done) => {
            url.remove({}, (err) => { 
            done();           
            });        
        });

        it('should return 200', (done) => {
            const postUrl = {
                longUrl: 'https://www.google.com/'
            };
            chai.request(server)
                .post('/api/v1/url')
                .send(postUrl)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('longUrl').eql(postUrl.longUrl);
                        res.body.should.have.property('shortUrl');
                        res.body.should.have.property('urlCode');
                        res.body.should.have.property('hits').eql(0);
                        res.body.should.have.property('createdAt');
                    done();
                });
        });
    });


    /* Testing => invalid long url
    *  @route POST /api/v1/url
    *  @desc  creates a short url
    */
   describe('/POST /api/v1/url', () => {
    after((done) => {
        url.remove({}, (err) => { 
        done();           
        });        
    });

    it('should return 400', (done) => {
        const postUrl = {
            longUrl: 'com/'
        };
        chai.request(server)
            .post('/api/v1/url')
            .send(postUrl)
            .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
    });
});
});