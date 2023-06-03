const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;
const groupSchema = new Schema({
    title: {type: String, required: true},
    leader: {type: ObjectId, required: true},
    type: {type: Number, required: true},
    descript: {type: String, required: true},
    price: {type: Number, required: true},
    end_date: {type: String, required: true},
    least: {type: Number, required: true},
    attends: {
        uid: {type: ObjectId, required: true},
        number: {type: Number, required: true},
    },
}, {
    timestamps: true,
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;