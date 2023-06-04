const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {type: String, required: true},
    type: {type: Number, required: true},
    category: {type: Number, require: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    minMember: {type: Number, required: true},
    currentMember: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;