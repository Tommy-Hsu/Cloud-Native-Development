const router = require('express').Router();
const prom = require("prom-client");
const os = require("os");
let Activity = require('../models/activity.model');
var ipAddresses = new Array();


const accessCounter = new prom.Counter({
    name: 'access_activity_log_total',
    help: 'Access Activity Log - total Access Activity requests'
});
  
const clientIpGauge = new prom.Gauge({
    name: 'access_client_ip_current',
    help: 'Access Activity Log - current unique IP addresses'
});
  
  //setup Prometheus with hostname label:
  const defaultLabels = { hostname: os.hostname() };
  prom.register.setDefaultLabels(defaultLabels);
  prom.collectDefaultMetrics();


// get all the activity in database
router.route('/').get((req, res) => {
    //metrics:
    accessCounter.inc();
    ipAddresses.push(req.body.clientIp);
    let uniqueIps = Array.from(new Set(ipAddresses));
    clientIpGauge.set(uniqueIps.length);

    Activity.find()
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/metrics').get(async (req, res) => {
    res.set('Content-Type', prom.register.contentType);
    let metrics = await prom.register.metrics();
    res.send(metrics);
});

// add new exercise into database
router.route('/add').post((req, res) => {
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