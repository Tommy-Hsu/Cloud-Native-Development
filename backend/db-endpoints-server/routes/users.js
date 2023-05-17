const router = require('express').Router();
let User = require('../models/user.model');

// get all the users in database
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add new user into database
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const engagedActivity = [];
    const hostedActivity = [];

    const newUser = new User({
        username,
        engagedActivity,
        hostedActivity,
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;