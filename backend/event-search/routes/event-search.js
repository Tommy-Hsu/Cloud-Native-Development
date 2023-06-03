const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/all-events').get((req, res) => {
    Activity.find()
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/event-search').get((req, res) => {
    // Schema
    // activityType: {type: String, required: true},
    // name: {type: String, required: true},
    // description: {type: String, required: true},
    // price: {type: Number, required: true},
    // minMember: {type: Number, required: true},
    // currentMember: {type: Number, required: true},
    // date: {type: Date, required: true},

    const activityType=req.query.activityType;
    const name=req.query.name;

    if (activityType == undefined) { activityType = "*"; }
    if (name == undefined) { name = "*"; }

    console.log(activityType);
    console.log(name);

    Activity.find({name: new RegExp('^'+name+'$', "i"), activityType: activityType})
    .then(activities => res.json(activities))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;