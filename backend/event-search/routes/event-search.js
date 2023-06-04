const router = require('express').Router();
let Group = require('../models/groups.model');

router.route('/all-events').get((req, res) => {
    Group.find()
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/event-search').get((req, res) => {
    // Schema
    // type: {type: String, required: true},
    // title: {type: String, required: true},
    // description: {type: String, required: true},
    // price: {type: Number, required: true},
    // minMember: {type: Number, required: true},
    // currentMember: {type: Number, required: true},
    // date: {type: Date, required: true},

    var type=req.query.type;
    var category=req.query.category;
    var title=req.query.title;

    if (type == undefined) { type = ""; }
    if (category == undefined) { category = ""; }
    if (title == undefined) { title = ""; }

    console.log(type);
    console.log(title);

    Group.find({title: {$regex: title, $options: 'i'}, type: {$regex: type}})
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;