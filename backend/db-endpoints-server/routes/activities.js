const router = require('express').Router();
let Activity = require('../models/activity.model');
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'item-images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({
    storage: storage
})

// get all the activity in database
router.route('/').get((req, res) => {
    Activity.find()
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add new exercise into database
router.route('/add').post(upload.single("item_image"), (req, res) => {
    const activityType = req.body.activityType;
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const minMember = Number(req.body.minMember);
    const currentMember = 0;
    const date = Date.parse(req.body.date);

    const newActivity = new Activity({
        activityType,
        name,
        description,
        price,
        minMember,
        currentMember,
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
        activity.activityType = req.body.activityType;
        activity.name = req.body.name;
        activity.description = req.body.description;
        activity.price = Number(req.body.price);
        activity.minMember = Number(req.body.minMember);
        activity.date = Date.parse(req.body.date);

        activity.save()
        .then(() => res.json('Activity updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;