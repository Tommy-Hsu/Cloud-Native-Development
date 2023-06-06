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

    var type=[req.query.type];
    var category=[req.query.category];
    var title=req.query.title;

    if (type[0] == undefined) { type = [0, 1]; }
    if (category[0] == undefined) { category = [0, 1, 2, 3, 4, 5]; }
    if (title == undefined) { title = ""; }

    console.log(title);
    console.log(type);
    console.log(category)

    Group.find({title: {$regex: title, $options: 'i'}, type: {$in: type}, category: {$in: category}})
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;