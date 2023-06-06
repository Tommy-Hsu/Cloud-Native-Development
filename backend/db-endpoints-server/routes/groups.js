const router = require('express').Router();
let Group = require('../models/group.model');

// get all the users in database
// router.route('/').get((req, res) => {
//     User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// add new user into database
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const leader = req.body.leader;
    const type = req.body.type;
    const descript = req.body.descript;
    const price = req.body.price;
    const end_date = req.body.end_date;
    const least = req.body.least;
    const attends = req.body.attends;

    const newGroup = new Group({
        title,
        leader,
        type,
        descript,
        price,
        end_date,
        least,
        attends
    });

    newGroup.save()
    .then(() => res.json('Group added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;