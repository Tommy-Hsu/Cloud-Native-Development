const router = require('express').Router();
let Session = require('../models/session.model');

// get all the users in database
router.route('/').get((req, res) => {
    Session.find()
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add new user into database
router.route('/add').post((req, res) => {
    const session = req.body.session;
    const uid = req.body.uid;

    const newSession = new Session({
        session,
        uid,
    });

    newSession.save()
    .then(() => res.json('Session added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;