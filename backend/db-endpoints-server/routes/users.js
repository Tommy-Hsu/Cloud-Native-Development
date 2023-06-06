const router = require('express').Router();
const mongoose = require('mongoose');
let Group = require('../models/group.model');


// get a user's joined groups in database
router.route('/').get((req, res) => {
    const query_gid = req.query.gid;
    const query_uid = req.query.uid;

    if (query_gid) {
        const gid = new mongoose.Types.ObjectId(query_gid);
        console.log(`[db-endpoint-server] Get QUERY gid ${gid}`);

        Group.find({"_id": gid})
        .then(groups => res.json(groups))
        .catch(err => res.status(400).json('Error: ' + err));

    } else if (query_uid){
        const uid = new mongoose.Types.ObjectId(query_uid);
        console.log(`[db-endpoint-server] Get QUERY uid ${uid}`);

        // 找自己發起的活動
        Group.find({"leader": uid})
        .then(hostgroups => {

            // 找自己參加的活動
            Group.find({"attends.uid": uid})
            .then(joingroups => {
                res.json({
                    hostgroups,
                    joingroups
                })
            })
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }
});


// JOIN: add a user to the specific group in database
router.route('/').post((req, res) => {
    const query_gid = req.query.gid;
    const query_uid = req.query.uid;

    const gid = new mongoose.Types.ObjectId(query_gid);
    const uid = new mongoose.Types.ObjectId(query_uid);
    console.log(`[db-endpoint-server] Get JOIN request - gid ${gid}, uid ${uid}`);

    Group.findOneAndUpdate(
        {"_id": gid},
        { $inc: { "number": 1} })
    .then(() => {
        Group.findOneAndUpdate(
            {"_id": gid},
            {"$push": {"attends": {"uid": uid}}})
        .then(() => {
            res.json('[Join] Group joined!')
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// DELETE: delete a user from the specific group in database
router.route('/').delete((req, res) => {
    const query_gid = req.query.gid;
    const query_uid = req.query.uid;
    const delete_joined = req.query.deletejoin;

    const gid = new mongoose.Types.ObjectId(query_gid);
    const uid = new mongoose.Types.ObjectId(query_uid);
    console.log(`[db-endpoint-server] Get DELETE request - [gid] ${gid}, [uid] ${uid}, [deletejoin] ${delete_joined}`);

    if (delete_joined == "true") {
        Group.findOneAndUpdate(
            {"_id": gid}, 
            { $inc: { "number": -1} })
        .then(() => {
            Group.findOneAndUpdate(
                {"_id": gid},
                {$pull: {"attends": {"uid": uid,}}}, {new: true})
            .then(() => {
                res.json('[Join] Group deleted!')
            })
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
        Group.findByIdAndDelete(gid)
        .then(() => res.json('[Host] Group deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    
});

module.exports = router;