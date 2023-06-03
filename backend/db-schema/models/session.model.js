const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;
const sessionSchema = new Schema({
    session: {
        type: String,
        unique: true,
        required: true
    },
    uid: {type: ObjectId, required: true},
}, {
    timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;