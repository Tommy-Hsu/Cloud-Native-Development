const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('../models/user.model');
let Group = require('../models/group.model');


// get a user's joined groups in database
router.route('/').get((req, res) => {
    const query_gid = req.query.gid;
    const query_uid = req.query.uid;

    if (query_gid) {
        const gid = new mongoose.Types.ObjectId(query_gid);
        console.log('gid', gid);

        Group.find({"_id": gid})
        .then(groups => res.json(groups))
        .catch(err => res.status(400).json('Error: ' + err));

    } else if (query_uid){
        const uid = new mongoose.Types.ObjectId(query_uid);
        console.log('uid', uid);

        Group.find({"attends.uid": uid})
        .then(groups => res.json(groups))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

// get a user's joined groups in database
// router.route('/:gid').get((req, res) => {
//     const gid = new mongoose.Types.ObjectId(req.params.gid);

//     Group.find({"_id": gid})
//     .then(groups => res.json(groups))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


// add a user to the specific group in database
router.route('/').post((req, res) => {
    const query_gid = req.query.gid;
    const query_uid = req.query.uid;

    const gid = new mongoose.Types.ObjectId(query_gid)
    const uid = new mongoose.Types.ObjectId(query_uid);

    Group.findOneAndUpdate({"_id": gid},
    {"$push": {"attends": {"uid": uid, "number": 0}}})
    .then(() => res.json('Group Joined!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// delete a user from the specific group in database
router.route('/').delete((req, res) => {
    const query_gid = req.query.gid;
    const query_uid = req.query.uid;

    const gid = new mongoose.Types.ObjectId(query_gid)
    const uid = new mongoose.Types.ObjectId(query_uid);

    Group.findOneAndUpdate({"_id": gid}, 
    {$pull: {"attends": {"uid": uid,}}}, {new: true})
    .then(() => res.json('Group deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;