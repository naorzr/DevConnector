const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load user model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test',(req, res) => res.json({msg: "Users Works"}));

// @route   GET api/users/register
// @desc    Registers users
// @access  Public
router.post('/register',(req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
              return res.status(400).json({email: 'Email already exists'});  
            }
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default avatar
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(e => console.log(e));
                });
            });

        })
        .catch(e => console.log(e));
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT token
// @access  Public
router.post('/login',(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json({email: 'User Not Found'});
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //User Matched
                        
                        const payload = {   // Create JWT Payload
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };

                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey, 
                            { expiresIn: 3600*24},
                             (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                        });
                    } else           {
                        return res.status(400).json({password: 'Incorrect Password'});
                    }
                })
                .catch(e => console.log(e));
        })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({msg: 'Success'}) ;
});

module.exports = router;