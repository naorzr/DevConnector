const expect = require('expect');
const request = require('supertest');

const User = require('../models/User');
const {depopulateUsers} = require('./seeds');
const {app} = require('../server');

beforeEach(depopulateUsers);

describe('POST /register',() => {
    var userOne = {
        name: 'naor',
        email: "naor@gmail.com",
        password: '123456',
        password2: '123456'
    };

    it('Should register a new user', (done) => {
        request(app)
            .post('/api/users/register')
            .send(userOne)
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                name: userOne.name,
                email: userOne.email,
                });
                expect(res.body.password).toNotBeA(userOne.password); //password needs to be hashed
                expect(res.body.password).toExist();
                expect(res.body.avatar).toExist();
            })
            .end((err,res) => {
                if(err) return done(err);
                done();
            })
    });

});