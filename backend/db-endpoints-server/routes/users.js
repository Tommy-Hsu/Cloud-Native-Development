const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('../models/user.model');
let Group = require('../models/group.model');


// get all the users in database
// router.route('/').get((req, res) => {
//     User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:id').get((req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    Group.find({"attends.uid": id})
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const filter = {"uid": id};
    console.log(filter);

    Group.findOneAndUpdate({"attends.uid": id}, {$pull: {"attends.0": filter}}, {new: true})
    .then(() => res.json('Group deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add new user into database
// router.route('/add').post((req, res) => {
//     const username = req.body.username;
//     const newUser = new User({
//         username,
//     });

//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;