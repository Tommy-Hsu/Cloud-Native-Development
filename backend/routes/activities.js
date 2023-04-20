const router = require('express').Router();
let Activity = require('../models/activity.model');

// get all the activity in database
router.route('/').get((req, res) => {
    Activity.find()
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add new exercise into database
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newActivity = new Activity({
        name,
        location,
        description,
        date,
    });

    newActivity.save()
    .then(() => res.json('Activity added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Activity.findById(req.params.id)
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Activity.findByIdAndDelete(req.params.id)
    .then(() => res.json('Activity deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Activity.findById(req.params.id)
    .then(activity => {
        activity.name = req.body.name;
        activity.location = req.body.location;
        activity.description = req.body.description;
        activity.date = Date.parse(req.body.date);

        activity.save()
        .then(() => res.json('Activity updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;