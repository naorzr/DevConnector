const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile')
// Load User Profile
const User = require('../../models/User')
// Load Standard fields
const {standardFields} = require('../../models/Profile');
const {socialFields} = require('../../models/Profile');


// @route   GET api/profile/test
// @desc    Tests post route
// @access  Public
router.get('/test',(req, res) => res.json({msg: "Profile Works"}));

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt',{session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(e => res.status(404).json(e));
});

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt',{session: false}), (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    standardFields.forEach(field => {
        if(req.body[field]) profileFields[field] = req.body[field];
    });
    
});

module.exports = router;